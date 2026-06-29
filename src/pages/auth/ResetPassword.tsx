import ButtonWithLoading from "@/components/common/button/ButtonWithLoading";
import CommonButton from "@/components/common/button/CommonButton";
import CommonHeader from "@/components/common/header/CommonHeader";
import { inputClass } from "@/components/deal/SaveDealModal";
import { useResetPasswordMutation } from "@/store/features/auth/auth.api";
import { clearResetToken } from "@/store/features/auth/auth.slice";
import type { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

const resetSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetForm = z.infer<typeof resetSchema>;

const strengthLevels = [
  { label: "Weak", color: "bg-red-400", min: 1 },
  { label: "Fair", color: "bg-orange-400", min: 2 },
  { label: "Good", color: "bg-yellow-400", min: 3 },
  { label: "Strong", color: "bg-green-500", min: 4 },
];

function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const { resetToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>({ resolver: zodResolver(resetSchema) });

  const watchedPassword = watch("newPassword", "");
  const strength = getStrength(watchedPassword);
  const strengthInfo = strengthLevels[Math.min(strength - 1, 3)];

  const onSubmit = async (data: ResetForm) => {
    if (!resetToken) return;
    try {
      await resetPassword({
        token: resetToken!,
        newPassword: data.newPassword,
      }).unwrap();
      dispatch(clearResetToken());

      toast.success("Password reset successfully");

      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        {/* Icon */}
        <div className="flex justify-center pt-10 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <KeyRound size={28} className="text-primary" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pb-6">
          <CommonHeader size="2xl">Reset Password</CommonHeader>
          <CommonHeader size="md" className="text-center!">
            Create a new strong password for your account
          </CommonHeader>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div className="relative">
            <label className={inputClass.label}>New Password</label>
            <input
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              className={inputClass.input}
              {...register("newPassword")}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
            {errors.newPassword && (
              <p className={inputClass.error}>{errors.newPassword.message}</p>
            )}
          </div>

          {/* Strength bar */}
          {watchedPassword.length > 0 && (
            <div className="space-y-1.5 px-0.5">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      strength >= level ? strengthInfo?.color : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs font-medium ${
                  strength <= 1
                    ? "text-red-400"
                    : strength === 2
                      ? "text-orange-400"
                      : strength === 3
                        ? "text-yellow-500"
                        : "text-green-500"
                }`}
              >
                {strength > 0 ? strengthInfo?.label : ""}
              </p>
            </div>
          )}

          {/* Password rules hint */}
          {watchedPassword.length > 0 && (
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
              {[
                { label: "8+ characters", pass: watchedPassword.length >= 8 },
                {
                  label: "Uppercase letter",
                  pass: /[A-Z]/.test(watchedPassword),
                },
                { label: "Number", pass: /[0-9]/.test(watchedPassword) },
                {
                  label: "Special character",
                  pass: /[^A-Za-z0-9]/.test(watchedPassword),
                },
              ].map((rule) => (
                <span
                  key={rule.label}
                  className={`flex items-center gap-1 ${rule.pass ? "text-green-500" : "text-gray-400"}`}
                >
                  <Check
                    size={11}
                    className={rule.pass ? "opacity-100" : "opacity-30"}
                  />
                  {rule.label}
                </span>
              ))}
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <label className={inputClass.label}>Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className={inputClass.input}
              {...register("confirmPassword")}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
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
              <ButtonWithLoading title="Resetting..." />
            ) : (
              "Reset Password"
            )}
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
