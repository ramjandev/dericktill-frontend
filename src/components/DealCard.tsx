import type { StrategyType } from "@/store/features/property/types/calculation";
import type {
  BrrrrCalculationResponse,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "@/store/features/property/types/output";
import { Building2, RefreshCw, TrendingUp } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { LuSave } from "react-icons/lu";
import { RiCircleFill } from "react-icons/ri";
import CommonButton from "./common/button/CommonButton";
import CardContainer from "./common/CardContainer";

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
          variant="secondary"
        >
          <LuSave size={14} strokeWidth={1.8} />
          Save Deal
        </CommonButton>
      </div>

      <CardContainer className="bg-[#FEF2F2]! border border-[#FFC9C9]! flex flex-col sm:flex-row sm:items-center justify-between my-2.5 gap-4">
        <div className="flex items-center gap-2">
          <span className={`${ratingColorClass} `}>
            <RiCircleFill size={24} />
          </span>
          <span
            className={`${ratingColorClass} text-xl sm:text-2xl font-extrabold tracking-tight`}
          >
            {dealRating}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {dealMetrics.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="text-xs text-[#4A5565] font-medium">
                {label}
              </span>
              <span
                className={`text-xl text-[#9F0712] font-bold ${ratingColorClass}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </CardContainer>
    </div>
  );
};

export default DealCard;
