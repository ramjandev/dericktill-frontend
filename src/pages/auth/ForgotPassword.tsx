import ButtonWithLoading from "@/components/common/button/ButtonWithLoading";
import CommonButton from "@/components/common/button/CommonButton";
import CommonHeader from "@/components/common/header/CommonHeader";
import { inputClass } from "@/components/deal/SaveDealModal";
import { useForgotPasswordMutation } from "@/store/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = async (data: ForgotForm) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        {/* Icon */}
        <div className="flex justify-center pt-10 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail size={28} className="text-primary" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pb-6">
          <CommonHeader size="2xl">Forgot Password?</CommonHeader>
          <CommonHeader size="md" className="text-center!">
            Enter your email and we'll send you a 6-digit OTP to reset your
            password
          </CommonHeader>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={inputClass.label}>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={inputClass.input}
              {...register("email")}
            />
            {errors.email && (
              <p className={inputClass.error}>{errors.email.message}</p>
            )}
          </div>

          <CommonButton
            variant="secondary"
            type="submit"
            className="w-full mb-4 mt-6 p-3!"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonWithLoading title="Sending OTP..." />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send OTP <ArrowRight size={16} />
              </span>
            )}
          </CommonButton>

          <p className="text-sm text-center text-gray-500 pb-6">
            Remember your password?{" "}
            <Link to="/login" className="text-primary font-medium">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
