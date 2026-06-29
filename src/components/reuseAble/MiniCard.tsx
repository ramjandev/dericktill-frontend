import CommonHeader from "@/components/common/header/CommonHeader";

import type { StrategyType } from "@/store/features/property/types/calculation";
import { Building2, RefreshCw, TrendingUp } from "lucide-react";
import type { FC } from "react";
import CardContainer from "../common/CardContainer";
import MiniSpinner from "../common/custom/MiniSpinner";
interface MiniCardProps {
  activeTab: StrategyType;
  isCalculating: boolean;
}
const MiniCard: FC<MiniCardProps> = ({ activeTab, isCalculating }) => {
  return (
    <CardContainer className=" flex flex-col items-center justify-center">
      {isCalculating ? (
        <MiniSpinner />
      ) : (
        <div>
          {activeTab === "BRRRR" ? (
            <RefreshCw size={64} className="text-[#BEDBFF] mb-3" />
          ) : activeTab === "TURNKEY" ? (
            <TrendingUp size={64} className="text-[#B9F8CF] mb-3" />
          ) : (
            <Building2 size={64} className="text-[#E9D4FF] mb-3" />
          )}
        </div>
      )}

      <CommonHeader
        size="xl"
        className="font-semibold! text-[#1E2939]! text-center! "
      >
        Ready to Analyze Your{" "}
        {activeTab === "SECTION_8"
          ? "Section 8"
          : activeTab === "TURNKEY"
            ? "Turnkey"
            : "BRRRR"}{" "}
        {activeTab === "BRRRR" ? "Deal" : "Property"}
      </CommonHeader>
      <CommonHeader size="md" className="text-sm text-[#6A7282]! text-center!">
        Enter property details on the left to calculate{" "}
        {activeTab === "BRRRR"
          ? "your BRRRR returns, refinance value, and cash-out potential."
          : activeTab === "TURNKEY"
            ? "cash flow, returns, and investment metrics."
            : "Section 8 rent, cash flow, and investment metrics."}
      </CommonHeader>
    </CardContainer>
  );
};

export default MiniCard;
