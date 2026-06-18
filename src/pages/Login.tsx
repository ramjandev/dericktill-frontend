import ButtonWithLoading from "@/components/common/button/ButtonWithLoading";
import CommonButton from "@/components/common/button/CommonButton";
import CommonHeader from "@/components/common/header/CommonHeader";
import { inputClass } from "@/components/SaveDealModal";
import { useLoginMutation } from "@/store/features/auth/auth.api";
import { setUser } from "@/store/features/auth/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login(data).unwrap();
      dispatch(
        setUser({
          user: res.data.result.user,
          accessToken: res.data.result.tokens.accessToken,
        }),
      );
      Cookies.set("accessToken", res.data.result.tokens.accessToken);
      toast.success("Login successful");
      navigate("/analyze");
    } catch (err: any) {
      console.error("Login failed:", err.data?.message || err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 ">
        <div className="flex flex-col items-center justify-center pb-6 pt-10">
          <CommonHeader size="2xl">Welcome Back</CommonHeader>
          <CommonHeader size="md" className="text-center!">
            Login to save and manage your real estate deals
          </CommonHeader>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              <ButtonWithLoading title="Logging..." />
            ) : (
              <>
                <LogIn size={16} /> Login
              </>
            )}
          </CommonButton>
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary cursor-pointer font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
