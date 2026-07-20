import CommonContainer from "@/components/common/CommonContainer";
import CommonHeader from "@/components/common/header/CommonHeader";
import PricingPage from "@/components/plan/PricingPage";
import {
  Calculator,
  DollarSign,
  Home as HomeIcon,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Calculator,
    title: "Real-time Deal Analysis",
    desc: "Get instant calculations as you adjust inputs with live feedback",
    color: "bg-[#DBEAFE]",
    iconColor: "text-[#155DFC]",
  },
  {
    icon: TrendingUp,
    title: "BRRRR Calculator",
    desc: "Calculate refinance value, equity, and cash-out potential",
    color: "bg-[#DCFCE7]",
    iconColor: "text-[#00A63E]",
  },
  {
    icon: HomeIcon,
    title: "Section 8 Rent Estimation",
    desc: "Estimate HUD rent based on ZIP code and bedroom count",
    color: "bg-[#F3E8FF]",
    iconColor: "text-[#9810FA]",
  },
  {
    icon: DollarSign,
    title: "Deal Rating System",
    desc: "Automatic classification as GOOD, ALRIGHT, or BAD deals",
    color: "bg-[#FEF9C2]",
    iconColor: "text-[#D08700]",
  },
];

const Home = () => {
  return (
    <CommonContainer>
      <div className="flex-1 flex flex-col w-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center sm:px-6 pt-16 ">
          <h1
            className="
            text-3xl sm:text-5xl md:text-6xl 
            leading-tight sm:leading-tight md:leading-[1.2]
    text-center bg-gradient-to-r from-[#101828] to-[#364153] 
    bg-clip-text text-white font-bold
    mb-4 max-w-3xl
  "
          >
            Analyze Real Estate Deals
            <br />
            in Seconds
          </h1>
          <p className="text-white text-lg  ">
            Instantly calculate cash flow, ROI, and investment performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3  justify-center pb-10 sm:pb-16 pt-6  w-full">
            <Link
              to="/analyze"
              className="text-white  text-base font-medium px-7 py-4 rounded-xl bg-[linear-gradient(180deg,rgba(1,36,38,0.62)_3.34%,rgba(102,102,102,0)_99.99%),linear-gradient(180deg,#00848A_0.01%,rgba(0,22,23,0.91)_117.49%)]  "
            >
              Analyze Deal
            </Link>
            <Link
              to="/saved"
              className="bg-white text-black text-base font-semibold px-7 py-3 rounded-[8px] transition-all flex items-center justify-center    "
            >
              View Sample Deals
            </Link>
          </div>
        </div>

        <PricingPage />
        <div className="sm:pb-16">
          <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color, iconColor }) => (
              <div
                key={title}
                className="h-[234px] rounded-[14px] border-[1.173px] border-[#F3F4F6] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] flex flex-col p-8"
              >
                <div
                  className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon size={24} className={iconColor} />
                </div>
                <CommonHeader>{title}</CommonHeader>
                <CommonHeader size="sm" className="mt-1">
                  {desc}
                </CommonHeader>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};

export default Home;
