import { RiCircleFill } from "react-icons/ri";
import CardContainer from "./common/CardContainer";

interface DealMetrics {
  dealMetrics: { label: string; value: string }[];
  dealRating: string;
  ratingColorClass: string;
}
const StatusBoardDeal: React.FC<DealMetrics> = ({
  dealMetrics,
  dealRating,
  ratingColorClass,
}) => {
  return (
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
            <span className="text-xs text-[#4A5565] font-medium">{label}</span>
            <span
              className={`text-xl text-[#9F0712] font-bold ${ratingColorClass}`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </CardContainer>
  );
};

export default StatusBoardDeal;
