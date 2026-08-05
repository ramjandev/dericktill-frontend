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
    window.location.href = `${API_BASE_URL}/api/v1/auth/whop`;
  };

  return (
    <CommonContainer>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
        <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#07131f]/95 text-white shadow-[0_35px_100px_rgba(0,0,0,0.38)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_38%)]" />

          <div className="relative flex flex-col items-center p-6 text-center sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
              <ShieldCheck size={24} />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/45">
              Secure access
            </p>

            <CommonHeader size="3xl" className="mt-3 justify-center text-white">
              Continue with Whop
            </CommonHeader>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
              Sign in with your Whop account to verify membership and access the
              protected workspace.
            </p>

            <div className="mt-6 max-w-md rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/70">
              Whop handles authentication and returns you to the app
              automatically after verification.
            </div>

            <button
              type="button"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleWhopLogin}
              disabled={isRedirecting}
              aria-label="Continue with Whop"
              aria-busy={isRedirecting}
            >
              {isRedirecting ? (
                <span className="inline-flex items-center gap-2">
                  Redirecting to Whop...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Continue with Whop <ArrowRight size={17} />
                </span>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-white/45">
              No password is required in this app.
            </p>
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};

export default Login;
