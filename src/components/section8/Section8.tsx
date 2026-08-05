import sectionImg from "@/assets/images/section8.png";
import { CircleCheck } from "lucide-react";

function Section8() {
  return (
    <div
      className="py-29.5"
      style={{
        background:
          "linear-gradient(135deg, rgba(10, 94, 98, 0.25) 0%, rgba(7, 64, 66, 0.34) 7.5%, rgba(5, 47, 48, 0.44) 15%, rgba(4, 28, 28, 0.63) 30%, rgba(3, 17, 17, 0.81) 45%, #020B0A 60%)",
      }}
    >
      <div className="px-6 lg:px-31">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-39 items-center">
          {/* content  */}
          <div>
            <p
              className="text-[16px] text-[#0FC1CA] rounded-2xl inline-block px-4 py-2 mb-8"
              style={{
                border: "1.238px solid rgba(15, 193, 202, 0.25)",
                background: "rgba(15, 193, 202, 0.10)",
              }}
            >
              BIGGEST DIFFERENTIATOR
            </p>
            <h3 className="text-white text-[60px] font-bold leading-tight font-inter mb-7.5">
              The only analyzer with built-in
              <span className="text-[#0FC1CA]"> Section 8 / HUD data.</span>
            </h3>
            <p className="text-[19px] text-[#D1D0D0] mb-7.5">
              Most analyzers guess at rental income. Ours pulls real HUD Fair
              Market Rents by bedroom count and zip code — so your Section 8
              projections are grounded in actual government data, not optimistic
              estimates.
            </p>
            <div>
              <ul>
                <li className="text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75" />
                  Live HUD Fair Market Rent by zip code & bedroom count
                </li>
                <li className="text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75" />
                  Automatic Section 8 income modeling
                </li>
                <li className="text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75" />
                  Compare Section 8 vs market rent side by side
                </li>
                <li className="text-[19px] text-[#D1D0D0] flex gap-1 items-center mb-3.5">
                  <CircleCheck className="text-[#0FC1CA] mr-4.75" />
                  Updated with latest HUD payment schedules
                </li>
              </ul>
            </div>
          </div>
          {/* imgae  */}
          <div>
            <img src={sectionImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section8;
