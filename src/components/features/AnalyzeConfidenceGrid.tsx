import React from "react";
import { motion } from "framer-motion";
import defaultGridBg from "@/assets/images/grid-bg.png";

export interface FeatureItem {
  id?: string | number;
  title: string;
  description: string;
  gridBgSrc?: string;
}

export interface AnalyzeConfidenceGridProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
  gridBgSrc?: string;
  className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Deal Score (0–100)",
    description:
      "Every deal gets a composite score across Cash Flow, CoC Return, Cap Rate, DSCR, and 1% Rule — so you stop guessing.",
  },
  {
    id: 2,
    title: "3 Strategy Modes",
    description:
      "Switch between BRRRR, Turnkey, and Section 8 analysis. Each mode models the deal the way that strategy actually works.",
  },
  {
    id: 3,
    title: "Full Cash Flow Model",
    description:
      "Income,maintenance, CapEx, management — every expense modeled so your monthly net is accurate, not optimistic.",
  },
  {
    id: 4,
    title: "Instant Results",
    description:
      "Enter a property address and numbers, get your full analysis in under 5 seconds. No spreadsheets, no formulas.",
  },
  {
    id: 5,
    title: "Save & Compare Deals",
    description:
      "Save deals to your account and compare side-by-side. Build your deal history and never second-guess a past analysis.",
  },
  {
    id: 6,
    title: "Community Insights",
    description:
      "Access our free Discord to share deals, ask questions, and learn from a community of active real estate investors.",
  },
];

const AnalyzeConfidenceGrid: React.FC<AnalyzeConfidenceGridProps> = ({
  title = "Everything you need to analyze with confidence",
  subtitle = "Built for serious investors. Every metric that matters, structured so you can decide in seconds.",
  features = DEFAULT_FEATURES,

  className = "",
}) => {
  return (
    <section
      className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 text-white bg-transparent ${className}`}
    >
      <div className="max-w-384 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold font-inter tracking-tight text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto font-normal leading-relaxed opacity-90">
            {subtitle}
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const cardBg = defaultGridBg;

            return (
              <motion.div
                key={feature.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                className="group relative  p-11.25 min-h-75   flex flex-col justify-start transition-all duration-300    "
                style={{
                  backgroundImage: `url(${cardBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10">
                  <h3 className="text-[20px] font-semibold font-inter text-white mb-3 tracking-wide  ">
                    {feature.title}
                  </h3>
                  <p className="text-[#C3C3C3] text-[16px] font-normal">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnalyzeConfidenceGrid;
