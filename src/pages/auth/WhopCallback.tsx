import CommonButton from "@/components/common/button/CommonButton";
import CommonContainer from "@/components/common/CommonContainer";
import CommonHeader from "@/components/common/header/CommonHeader";
import { API_BASE_URL } from "@/config/runtime";
import {
  clearStoredAccessToken,
  extractApiErrorMessage,
  extractCurrentUserSession,
  extractExchangeSession,
  getAuthStatus,
  storeAccessToken,
} from "@/store/features/auth/auth.helpers";
import { logout, setUser } from "@/store/features/auth/auth.slice";
import {
  useLazyCurrentUserQuery,
  useWhopExchangeMutation,
} from "@/store/features/auth/auth.api";
import { ArrowLeft, CircleAlert, LoaderCircle, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

type CallbackState =
  | { phase: "loading"; message: string }
  | { phase: "error"; title: string; message: string };

const processedCodes = new Set<string>();
const inFlightCodes = new Set<string>();

const WhopCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URLSearchParams(location.search).get("code")?.trim() ?? "";
  const token = useSelector(
    (state: { auth: { accessToken: string | null } }) => state.auth.accessToken,
  );
  const [exchangeWhopCode] = useWhopExchangeMutation();
  const [triggerVerification] = useLazyCurrentUserQuery();
  const [state, setState] = useState<CallbackState>(() =>
    code
      ? {
          phase: "loading",
          message: "Completing your Whop sign-in...",
        }
      : {
          phase: "error",
          title: "Missing temporary code",
          message: "The Whop callback did not include a temporary code.",
        },
  );
  const hasProcessed = useRef(false);

  useEffect(() => {
    document.title = "Signing in with Whop";
  }, []);

  const restartWhopLogin = () => {
    window.location.href = `${API_BASE_URL}/api/v1/auth/whop`;
  };

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    if (!code) {
      return;
    }

    if (processedCodes.has(code) || inFlightCodes.has(code)) {
      return;
    }

    hasProcessed.current = true;
    inFlightCodes.add(code);

    const runExchange = async () => {
      try {
        const response = await exchangeWhopCode({ code }).unwrap();
        const authSession = extractExchangeSession(response);

        if (!authSession) {
          throw new Error("The authentication response was missing token data.");
        }

        dispatch(
          setUser({
            ...authSession,
            user: authSession.user,
          }),
        );
        storeAccessToken(authSession.accessToken);

        const verificationResponse = await triggerVerification().unwrap();
        const verifiedSession =
          extractCurrentUserSession(verificationResponse, {
            accessToken: authSession.accessToken,
            refreshToken: authSession.refreshToken ?? undefined,
          }) ?? authSession;

        if (!verifiedSession.user) {
          throw new Error("Unable to verify the authenticated user.");
        }

        dispatch(
          setUser({
            ...verifiedSession,
            user: verifiedSession.user,
          }),
        );

        window.history.replaceState({}, document.title, location.pathname);
        processedCodes.add(code);
        navigate("/app", { replace: true });
      } catch (error) {
        const authStatus = getAuthStatus(error);
        const safeMessage = extractApiErrorMessage(error);

        clearStoredAccessToken();
        dispatch(logout());
        window.history.replaceState({}, document.title, location.pathname);

        if (authStatus === "access-denied") {
          navigate(
            `/access-denied?reason=${encodeURIComponent("subscription-required")}`,
            { replace: true },
          );
          return;
        }

        setState({
          phase: "error",
          title:
            authStatus === "unauthorized"
              ? "Temporary code expired"
              : authStatus === "conflict"
                ? "Authentication conflict"
                : authStatus === "backend-unavailable"
                  ? "Authentication service unavailable"
                  : "Authentication failed",
          message:
            authStatus === "backend-unavailable"
              ? "We could not reach the backend. Please try again in a moment."
              : authStatus === "unauthorized"
                ? "The Whop temporary code is no longer valid. Start the sign-in flow again."
                : authStatus === "conflict"
                  ? safeMessage
                  : safeMessage,
        });
      } finally {
        inFlightCodes.delete(code);
      }
    };

    void runExchange();
  }, [code, dispatch, exchangeWhopCode, location.pathname, navigate, triggerVerification]);

  if (token && !code) {
    return <Navigate to="/app" replace />;
  }

  return (
    <CommonContainer>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#07131f] text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
              <ShieldAlert size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Whop authentication
              </p>
              <CommonHeader size="2xl" className="text-white">
                Completing sign-in
              </CommonHeader>
            </div>
          </div>

          {state.phase === "loading" && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/80">
              <LoaderCircle size={18} className="animate-spin" />
              <span>{state.message}</span>
            </div>
          )}

          {state.phase === "error" && (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-4">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 text-red-200" size={18} />
                <div className="space-y-2">
                  <h1 className="text-lg font-semibold text-white">{state.title}</h1>
                  <p className="text-sm leading-6 text-white/75">{state.message}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CommonButton
                  variant="secondary"
                  className="w-full bg-white text-black"
                  onClick={restartWhopLogin}
                >
                  Continue with Whop
                </CommonButton>
                <CommonButton
                  variant="secondary"
                  className="w-full border-white/15 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  <ArrowLeft size={16} />
                  Back to login
                </CommonButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </CommonContainer>
  );
};

export default WhopCallback;
