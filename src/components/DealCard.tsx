import type { StrategyType } from "@/store/features/property/types/calculation";
import type {
  BrrrrCalculationResponse,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "@/store/features/property/types/output";
import { Building2, RefreshCw, TrendingUp } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { LuSave } from "react-icons/lu";
import CommonButton from "./common/button/CommonButton";
import StatusBoardDeal from "./StatusBoardDeal";

interface DealCardProps {
  response:
    | BrrrrCalculationResponse
    | TurnkeyCalculationResponse
    | Section8DSCRResponse;
  activeTab: StrategyType;
  setActiveTab: Dispatch<SetStateAction<StrategyType>>;
  setShowSaveModal: (val: boolean) => void;
  ratingColorClass?: string;
}

const DealCard: FC<DealCardProps> = ({
  response,
  activeTab,
  setActiveTab,
  setShowSaveModal,
  ratingColorClass = "",
}) => {
  // Derive display metrics safely across all 3 response shapes
  const brrrrData = (response as BrrrrCalculationResponse).data;
  const turnkeyData = (response as TurnkeyCalculationResponse).data
    ?.responseData;
  const section8Data = (response as Section8DSCRResponse).data?.responseData;

  const monthlyCashFlow =
    brrrrData?.monthlyCashFlow_m ??
    turnkeyData?.KeyMetrics?.monthlyCashFlow ??
    section8Data?.KeyMetrics?.monthlyCashFlow ??
    0;

  const cocReturn =
    brrrrData?.postRefiCoC_m ?? turnkeyData?.KeyMetrics?.CashOnCashReturn ?? 0;

  const capRate = brrrrData?.capRate_m ?? turnkeyData?.KeyMetrics?.capRate ?? 0;

  const dealRating =
    brrrrData?.dealScoreboard?.rating ??
    turnkeyData?.dealScoreboard?.rating ??
    section8Data?.dealScoreboard?.rating ??
    "";

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const dealMetrics = [
    { label: "Cash Flow", value: `${fmt(monthlyCashFlow)}/mo` },
    { label: "CoC Return", value: `${cocReturn.toFixed(1)}%` },
    { label: "Cap Rate", value: `${(capRate ?? 0).toFixed(1)}%` },
  ];

  const getIcon = () => {
    switch (activeTab) {
      case "BRRRR":
        return <RefreshCw size={20} />;
      case "TURNKEY":
        return <TrendingUp size={20} />;
      default:
        return <Building2 size={20} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <CommonButton
          onClick={() => setActiveTab("BRRRR")}
          variant="tertiary"
          className="rounded-full!"
        >
          {getIcon()}
          {activeTab} Strategy
        </CommonButton>

        <CommonButton
          onClick={() => setShowSaveModal(true)}
          variant="primary"
          className="bg-black! text-white!"
        >
          <LuSave size={14} strokeWidth={1.8} />
          Save Deal
        </CommonButton>
      </div>

      <StatusBoardDeal
        dealMetrics={dealMetrics}
        dealRating={dealRating}
        ratingColorClass={ratingColorClass}
      />
    </div>
  );
};

export default DealCard;
