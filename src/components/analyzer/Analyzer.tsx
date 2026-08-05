import { Link } from "react-router-dom";
import one from "@/assets/images/1.png";
import two from "@/assets/images/2.png";
import three from "@/assets/images/3.png";

function Analyzer() {
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
            to="/"
            className="rounded-xl px-7 py-4 text-white inline-block"
            style={{
              background: `
      linear-gradient(180deg, rgba(1, 36, 38, 0.62) 3.34%, rgba(102, 102, 102, 0) 99.99%),
      linear-gradient(180deg, #00848A 0.01%, rgba(0, 22, 23, 0.91) 117.49%)
    `,
            }}
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
