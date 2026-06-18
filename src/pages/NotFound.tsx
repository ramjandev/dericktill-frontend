import { useEffect, useState } from "react";

const NotFound = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] flex items-center justify-center overflow-hidden px-6 py-16 font-sans">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 animate-[gridPan_20s_linear_infinite]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute -left-48 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(132,90,223,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-48 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Corner brackets */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-5 h-5 border-purple-500/40 ${cls}`}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl w-full animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
        {/* Eyebrow */}
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-purple-400 mb-8 animate-[fadeUp_0.8s_0.1s_both]">
          Error · Page not found
        </p>

        {/* 404 heading */}
        <div className="relative inline-block mb-8 leading-none select-none">
          {/* Shadow layer */}
          <span
            aria-hidden
            className="absolute top-1.5 left-1.5 text-[clamp(120px,20vw,200px)] font-extrabold tracking-tighter z-10"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(132,90,223,0.4)",
            }}
          >
            404
          </span>

          {/* Glitch layer */}
          <span
            aria-hidden
            className="absolute top-0 left-0 text-[clamp(120px,20vw,200px)] font-extrabold tracking-tighter text-orange-500 z-20 transition-all duration-75"
            style={{
              clipPath: glitch
                ? "polygon(0 20%, 100% 20%, 100% 50%, 0 50%)"
                : "polygon(0 0, 0 0, 0 0, 0 0)",
              transform: glitch ? "translateX(-4px)" : "translateX(0)",
              opacity: glitch ? 0.6 : 0,
            }}
          >
            404
          </span>

          {/* Main text */}
          <span
            className="relative z-30 text-[clamp(120px,20vw,200px)] font-extrabold tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-14 h-px mx-auto mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, #845ADF, transparent)",
          }}
        />

        {/* Title */}
        <h1 className="text-[clamp(20px,4vw,28px)] font-bold text-white mb-4">
          You've wandered off the map
        </h1>

        {/* Description */}
        <p className="font-mono text-[13px] text-white/35 leading-[1.8] max-w-md mx-auto mb-12">
          The page you're looking for doesn't exist,
          <br />
          was moved, or never existed in the first place.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            style={{
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            ← Go home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            style={{
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            Go back
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] text-white/20 tracking-widest whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
        SYSTEM · HTTP 404 · RESOURCE_NOT_FOUND
      </div>

      {/* Keyframes — add to your global CSS or tailwind.config.js */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gridPan {
          from { transform: translate(0, 0); }
          to   { transform: translate(60px, 60px); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
