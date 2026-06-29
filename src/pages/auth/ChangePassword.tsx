import ButtonWithLoading from "@/components/common/button/ButtonWithLoading";
import CommonButton from "@/components/common/button/CommonButton";
import CommonHeader from "@/components/common/header/CommonHeader";
import { inputClass } from "@/components/deal/SaveDealModal";
import { useChangePasswordMutation } from "@/store/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

const changeSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must differ from current password",
    path: ["newPassword"],
  });

type ChangeForm = z.infer<typeof changeSchema>;

function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthColors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-500",
];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
const strengthTextColors = [
  "text-red-400",
  "text-orange-400",
  "text-yellow-500",
  "text-green-500",
];

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const navigate = useNavigate();

  const toggle = (field: keyof typeof show) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangeForm>({ resolver: zodResolver(changeSchema) });

  const watchedNew = watch("newPassword", "");
  const strength = getStrength(watchedNew);

  const onSubmit = async (data: ChangeForm) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password changed successfully");
      reset();
      navigate("/");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        {/* Icon */}
        <div className="flex justify-center pt-10 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock size={28} className="text-primary" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pb-6">
          <CommonHeader size="2xl">Change Password</CommonHeader>
          <CommonHeader size="md" className="text-center!">
            Update your account password to keep it secure
          </CommonHeader>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="relative">
            <label className={inputClass.label}>Current Password</label>
            <input
              type={show.old ? "text" : "password"}
              placeholder="••••••••"
              className={inputClass.input}
              {...register("oldPassword")}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => toggle("old")}
            >
              {show.old ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
            {errors.oldPassword && (
              <p className={inputClass.error}>{errors.oldPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className={inputClass.label}>New Password</label>
            <input
              type={show.new ? "text" : "password"}
              placeholder="••••••••"
              className={inputClass.input}
              {...register("newPassword")}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => toggle("new")}
            >
              {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
            {errors.newPassword && (
              <p className={inputClass.error}>{errors.newPassword.message}</p>
            )}
          </div>

          {/* Strength bar */}
          {watchedNew.length > 0 && (
            <div className="space-y-1.5 px-0.5">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      strength >= level
                        ? strengthColors[strength - 1]
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              {strength > 0 && (
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-medium ${strengthTextColors[strength - 1]}`}
                  >
                    {strengthLabels[strength - 1]}
                  </p>
                  <div className="flex gap-2">
                    {[
                      { label: "8+ chars", pass: watchedNew.length >= 8 },
                      { label: "A-Z", pass: /[A-Z]/.test(watchedNew) },
                      { label: "0-9", pass: /[0-9]/.test(watchedNew) },
                      { label: "!@#", pass: /[^A-Za-z0-9]/.test(watchedNew) },
                    ].map((rule) => (
                      <span
                        key={rule.label}
                        className={`text-xs flex items-center gap-0.5 ${
                          rule.pass ? "text-green-500" : "text-gray-300"
                        }`}
                      >
                        <Check size={10} />
                        {rule.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <label className={inputClass.label}>Confirm New Password</label>
            <input
              type={show.confirm ? "text" : "password"}
              placeholder="••••••••"
              className={inputClass.input}
              {...register("confirmPassword")}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => toggle("confirm")}
            >
              {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
            {errors.confirmPassword && (
              <p className={inputClass.error}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <CommonButton
            variant="secondary"
            type="submit"
            className="w-full mb-6 mt-6 p-3!"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonWithLoading title="Saving..." />
            ) : (
              "Update Password"
            )}
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
