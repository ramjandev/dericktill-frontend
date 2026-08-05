import ctaImg from "@/assets/images/cta.png";

function CTA() {
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
            <a
              href="#whop"
              className="bg-linear-to-b from-[#0E6C67] to-[#074744] hover:from-[#117C76] hover:to-[#0A5652] text-white font-medium text-sm px-7 py-3 rounded-lg border border-[#148780]/40 shadow-lg shadow-[#063836]/40 transition-all duration-200 cursor-pointer"
            >
              Get Access on Whop
            </a>

            <a
              href="#discord"
              className="bg-white hover:bg-slate-100 text-[#0F172A] font-semibold text-sm px-6 py-3 rounded-lg shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <svg
                className="w-5 h-5 fill-current text-black"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
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
