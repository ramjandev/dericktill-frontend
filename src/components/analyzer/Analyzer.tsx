import { Link } from "react-router-dom";
import one from "@/assets/images/1.png";
import two from "@/assets/images/2.png";
import three from "@/assets/images/3.png";

import { useSelector } from "react-redux";
import { selectAccessToken } from "@/store/features/auth/auth.slice";

function Analyzer() {
    const token = useSelector(selectAccessToken);
  return (
    <div className="bg-transparent py-8">
      <div className="px-6 lg:px-31">
        {/* section title  */}
        <div className="text-center mb-30.5">
          <h3 className="text-white text-[30px] lg:text-[64px] font-bold mb-3">
            See the analyzer in action
          </h3>
          <p className="text-[16px] text-[#D1D0D0] mb-10">
            Built for serious investors. Every metric that matters, structured
            so you can decide in seconds.
          </p>
          <Link
                         to={token ? "/app" : "/login"}
                         className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 rounded-xl border border-[#00D1B2]/40 bg-[linear-gradient(180deg,#005D63_0%,#003337_100%)] hover:bg-[linear-gradient(180deg,#00767E_0%,#00444A_100%)] hover:border-[#00D1B2]/70 hover:shadow-[0_0_25px_rgba(0,209,178,0.35)] active:scale-[0.98]"
                       >
                         Get Access on Whop
                       </Link>
        </div>

        {/* content  */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <img src={one} alt="one" />
          </div>
          <div>
            <img src={two} alt="one" />
          </div>
          <div>
            <img src={three} alt="one" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyzer;
