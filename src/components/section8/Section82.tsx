import sectionImg from "@/assets/images/section82.png";
import { CircleCheck } from "lucide-react";

function Section82() {
  return (
    <div className="py-29.5">
      <div className="px-6 lg:px-31">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-39 items-center">
          {/* imgae  */}
          <div>
            <img src={sectionImg} alt="" />
          </div>
          {/* content  */}
          <div>
            <p
              className="text-[16px] text-[#0FC1CA] rounded-2xl inline-block px-4 py-2 mb-8"
              style={{
                border: "1.238px solid rgba(15, 193, 202, 0.25)",
                background: "rgba(15, 193, 202, 0.10)",
              }}
            >
              REAL MARKET DATA
            </p>

            <h3 className="text-white text-[27px] md:text-[60px] font-bold leading-tight font-inter mb-7.5">
              Comps pulled from
              <span className="text-[#0FC1CA]"> real sales data,</span> not
              guesses.
            </h3>
            <p className="text-sm md:text-[19px] text-[#D1D0D0] mb-7.5">
              Our COMPS data shows you what comparable properties actually sold
              for — so your ARV and purchase price decisions are backed by
              market reality, not wishful thinking.
            </p>
            <div>
              <ul>
                <li className="text-sm md:text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75 shrink-0" />
                  Comparable sales pulled from real market transactions
                </li>
                <li className="text-sm md:text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75 shrink-0" />
                  Filter by property type, bedrooms, and distance
                </li>
                <li className="text-sm md:text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75 shrink-0" />
                  Automatic ARV estimation based on comps
                </li>
                <li className="text-sm md:text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75 shrink-0" />
                  Paired with Section 8 data for the full picture
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section82;
