import ctaImg from "@/assets/images/cta.png";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/store/features/auth/auth.slice";

function CTA() {
  const token = useSelector(selectAccessToken);

  return (
    <section className="w-full bg-[#021329] py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url(${ctaImg})`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="w-full lg:w-7/12 flex flex-col items-center text-center">
          {/* Main Heading */}
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight font-inter tracking-tight">
            Ready to analyze <br className="hidden sm:inline" />
            smarter?
          </h2>

          {/* Subtitle Description */}
          <p className="text-[#94A3B8] text-sm sm:text-base font-normal mt-4 max-w-lg leading-relaxed">
            Join hundreds of investors using Feasible Real estate to find and
            close better real estate deals.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              to={token ? "/app" : "/login"}
              className="bg-linear-to-b from-[#0E6C67] to-[#074744] hover:from-[#117C76] hover:to-[#0A5652] text-white font-medium text-sm px-7 py-3 rounded-lg border border-[#148780]/40 shadow-lg shadow-[#063836]/40 transition-all duration-200 cursor-pointer"
            >
              Get Access on Whop
            </Link>

            <a
              href={"https://discord.com/invite/w7zujrsAa9"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <FaDiscord className="w-5 h-5 text-[#5865F2]" />
              <span>Free Discord</span>
            </a>
          </div>

          {/* Bottom Accent Line */}
          <div className="mt-12 sm:mt-16 flex items-center justify-center w-full max-w-md mx-auto">
            <div className="h-0.5 w-full bg-[#0B7C76]/70 rounded-full" />
            <div className="flex gap-1 ml-2">
              <span className="w-0.75 h-3 bg-[#0B7C76] -skew-x-12 rounded-xs" />
              <span className="w-0.75 h-3 bg-[#0B7C76] -skew-x-12 rounded-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
