import CommonButton from "@/components/common/button/CommonButton";
import CommonContainer from "@/components/common/CommonContainer";
import CommonHeader from "@/components/common/header/CommonHeader";
import { API_BASE_URL } from "@/config/runtime";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const Login = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    document.title = "Login with Whop";
  }, []);

  const handleWhopLogin = () => {
    setIsRedirecting(true);
    window.location.assign(`${API_BASE_URL}/api/v1/auth/whop`);
  };

  return (
    <CommonContainer>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#07131f] text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Secure access
              </p>
              <CommonHeader size="2xl" className="text-white">
                Continue with Whop
              </CommonHeader>
            </div>
          </div>

          <p className="max-w-lg text-sm leading-6 text-white/75">
            Access is managed through Whop. Sign in with your Whop account to
            verify membership and open the protected app.
          </p>

          <CommonButton
            variant="secondary"
            type="button"
            className="mt-8 w-full bg-white text-black py-3"
            onClick={handleWhopLogin}
            disabled={isRedirecting}
            aria-label="Continue with Whop"
            aria-busy={isRedirecting}
          >
            {isRedirecting ? (
              <span className="inline-flex items-center gap-2">
                Redirecting...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                Continue with Whop <ArrowRight size={16} />
              </span>
            )}
          </CommonButton>
        </div>
      </div>
    </CommonContainer>
  );
};

export default Login;
