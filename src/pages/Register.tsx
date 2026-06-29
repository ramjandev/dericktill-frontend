import ButtonWithLoading from "@/components/common/button/ButtonWithLoading";
import CommonButton from "@/components/common/button/CommonButton";
import CommonHeader from "@/components/common/header/CommonHeader";
import { inputClass } from "@/components/deal/SaveDealModal";
import { useRegisterUserMutation } from "@/store/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration failed:", err.data?.message || err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        <div className="flex flex-col items-center justify-center pb-6 pt-10">
          <CommonHeader size="2xl">Create Account</CommonHeader>
          <CommonHeader size="md" className="text-center!">
            Register to start managing your real estate deals
          </CommonHeader>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={inputClass.label}>Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className={inputClass.input}
              {...register("name")}
            />
            {errors.name && (
              <p className={inputClass.error}>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={inputClass.label}>Email</label>
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

          {/* Phone */}
          <div>
            <label className={inputClass.label}>Phone</label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              className={inputClass.input}
              {...register("phone")}
            />
            {errors.phone && (
              <p className={inputClass.error}>{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className={inputClass.label}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={inputClass.input}
              {...register("password")}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
            {errors.password && (
              <p className={inputClass.error}>{errors.password.message}</p>
            )}
          </div>

          <CommonButton
            variant="secondary"
            type="submit"
            className="w-full mb-10 mt-8 p-3!"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonWithLoading title="Registering..." />
            ) : (
              "Register"
            )}
          </CommonButton>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary cursor-pointer font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
