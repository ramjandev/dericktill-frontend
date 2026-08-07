import React from "react";
import { FaDiscord } from "react-icons/fa6";
import { motion } from "framer-motion";
import defaultHeroImg from "@/assets/images/hero.png";
import defaultHeroShape from "@/assets/images/hero-shape.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/store/features/auth/auth.slice";

export interface HeroSectionProps {
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  description?: string;
  whopUrl?: string;
  discordUrl?: string;
  trustCount?: string;
  heroImageSrc?: string;
  heroShapeSrc?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  badgeText = "Real Estate Deal Analyzer — Now Live",
  titlePrefix = "Analyze",
  titleHighlight = "Deals",
  titleSuffix = "Close Faster.",
  description = "Professional-grade BRRRR, Turnkey, and Section 8 deal analysis in seconds. Score deals, model cash flow, and know exactly when to walk away.",
  whopUrl = "/login",
  discordUrl = "https://discord.com/invite/w7zujrsAa9",
  trustCount = "500+",
  heroImageSrc = "images/hero.png",
  heroShapeSrc = "images/hero-shape.png",
  className = "",
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>(heroImageSrc);
  const [shapeSrc, setShapeSrc] = React.useState<string>(heroShapeSrc);
  const token = useSelector(selectAccessToken);

  return (
    <section
      className={`relative overflow-hidden min-h-[calc(100vh-68px)] flex flex-col justify-between pt-6 lg:pt-8 pb-0 text-white ${className}`}
    >
      {/* Top Left Hero Shape */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none select-none">
        <img
          src={shapeSrc}
          alt=""
          onError={() => setShapeSrc(defaultHeroShape)}
          className="w-auto h-full max-h-screen lg:max-w-285 object-contain object-top-left"
        />
      </div>

      {/* Bottom Center Ambient Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none max-w-full rounded-full opacity-50"
        style={{
          width: "1039px",
          height: "301px",
          background: "#12B9C1",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-37.5 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end flex-1">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex flex-col items-start text-left my-auto py-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 mb-6 text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
              <span className="w-2.5 h-2.5 bg-[#00D1B2] rounded-xs shadow-[0_0_10px_rgba(0,209,178,0.9)] shrink-0" />
              <span className="font-inter">{badgeText}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[75px] font-bold font-inter text-white leading-[1.12] mb-6">
              {titlePrefix}{" "}
              <span className="text-[#0FC1CA] drop-shadow-[0_0_25px_rgba(0,209,178,0.3)]">
                {titleHighlight}.
              </span>
              <br />
              {titleSuffix}
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-normal">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <Link
                to={token ? "/app" : whopUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 rounded-xl border border-[#00D1B2]/40 bg-[linear-gradient(180deg,#005D63_0%,#003337_100%)] hover:bg-[linear-gradient(180deg,#00767E_0%,#00444A_100%)] hover:border-[#00D1B2]/70 hover:shadow-[0_0_25px_rgba(0,209,178,0.35)] active:scale-[0.98]"
              >
                Get Access on Whop
              </Link>

              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <FaDiscord className="w-5 h-5 text-[#5865F2]" />
                <span>Free Discord</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="text-slate-400 text-sm font-normal flex items-center gap-1.5">
              Already trusted by{" "}
              <span className="text-[#00D1B2] font-semibold">{trustCount}</span>{" "}
              real estate investors
            </div>
          </motion.div>

          {/* Right Image Column - Flush at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 w-full relative flex items-end justify-center lg:justify-end self-end"
          >
            {/* Ambient image background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#00D1B2]/15 blur-3xl rounded-full pointer-events-none" />

            <img
              src={imgSrc}
              alt="Real Estate Deal Analyzer Dashboard"
              onError={() => setImgSrc(defaultHeroImg)}
              className="relative z-10 w-full max-w-2xl lg:max-w-none max-h-[calc(100vh-100px)] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
