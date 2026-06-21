import ButtonWithLoading from "@/components/common/button/ButtonWithLoading";
import CommonButton from "@/components/common/button/CommonButton";
import CommonHeader from "@/components/common/header/CommonHeader";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/store/features/auth/auth.api";
import { setResetToken } from "@/store/features/auth/auth.slice";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const location = useLocation();
  const email: string = location.state?.email || "";
  const navigate = useNavigate();

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch();

  // countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const updated = [...otp];
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setOtp(updated);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    try {
      const res = await verifyOtp({ email, otp: code }).unwrap();
      dispatch(setResetToken(res.data.token));
      toast.success("OTP verified successfully");
      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      toast.error(err.data?.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
      toast.success("A new OTP has been sent");
      setOtp(Array(OTP_LENGTH).fill(""));
      setCountdown(60);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        {/* Icon */}
        <div className="flex justify-center pt-10 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck size={28} className="text-primary" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pb-6">
          <CommonHeader size="2xl">Check Your Email</CommonHeader>
          <CommonHeader size="md" className="text-center!">
            We sent a 6-digit code to{" "}
            <span className="text-primary font-medium">{email}</span>
          </CommonHeader>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 py-4" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                w-11 h-13 text-center text-xl font-semibold rounded-xl border-2 outline-none transition-all
                ${digit ? "border-primary bg-primary/5 text-primary" : "border-gray-200 bg-gray-50 text-gray-800"}
                focus:border-primary focus:bg-primary/5
              `}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div className="flex justify-center items-center gap-1 py-3 text-sm text-gray-500">
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-primary font-medium hover:underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          ) : (
            <span>
              Resend code in{" "}
              <span className="text-primary font-semibold tabular-nums">
                0:{String(countdown).padStart(2, "0")}
              </span>
            </span>
          )}
        </div>

        <CommonButton
          variant="secondary"
          type="button"
          onClick={handleVerify}
          className="w-full mb-6 mt-4 p-3!"
          disabled={isVerifying || otp.join("").length < OTP_LENGTH}
        >
          {isVerifying ? (
            <ButtonWithLoading title="Verifying..." />
          ) : (
            "Verify OTP"
          )}
        </CommonButton>
      </div>
    </div>
  );
};

export default VerifyOtp;
