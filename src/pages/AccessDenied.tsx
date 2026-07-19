import CommonButton from "@/components/common/button/CommonButton";
import CommonContainer from "@/components/common/CommonContainer";
import CommonHeader from "@/components/common/header/CommonHeader";
import { WHOP_CHECKOUT_URL } from "@/config/runtime";
import { ArrowLeft, ExternalLink, ShieldOff } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const reasonCopy: Record<string, string> = {
  "membership-required":
    "An active Whop membership is required to access this workspace.",
  "owner-only": "This workspace is limited to approved owner accounts.",
  "subscription-inactive": "Your Whop subscription is not active right now.",
};

const sanitizeReason = (value: string | null) => {
  if (!value) return null;

  const trimmed = value.trim().slice(0, 80);
  return /^[a-z0-9_-]+$/i.test(trimmed) ? trimmed : null;
};

const AccessDenied = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Access denied";
  }, []);

  const reason = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return sanitizeReason(params.get("reason"));
  }, [location.search]);

  const message = reason
    ? reasonCopy[reason] ?? reasonCopy["membership-required"]
    : reasonCopy["membership-required"];

  return (
    <CommonContainer>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#07131f] text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-200">
              <ShieldOff size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Membership required
              </p>
              <CommonHeader size="2xl" className="text-white">
                Access denied
              </CommonHeader>
            </div>
          </div>

          <p className="text-sm leading-6 text-white/75">{message}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CommonButton
              variant="secondary"
              className="w-full bg-white text-black"
              onClick={() => navigate("/login", { replace: true })}
            >
              <ArrowLeft size={16} />
              Return to login
            </CommonButton>

            {WHOP_CHECKOUT_URL ? (
              <a
                href={WHOP_CHECKOUT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/85 hover:text-white"
              >
                <ExternalLink size={16} />
                Open Whop checkout
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};

export default AccessDenied;
