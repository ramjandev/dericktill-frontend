import CommonHeader from "./common/header/CommonHeader";

interface MetricCardProps {
  label: string;
  value: string | number;
  iconColor?: string;
  iconBgColor?: string;
  icon?: React.ReactNode;
  textColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  iconBgColor,
  iconColor,
  textColor,
}) => {
  return (
    <div className="bg-white rounded-xl  border-[1.173px] border-[#F3F4F6] p-4">
      <div className="flex items-center justify-between mb-1">
        <CommonHeader size="sm">{label}</CommonHeader>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-[20px] ${iconBgColor} ${iconColor}  `}
        >
          {icon}
        </div>
      </div>
      <CommonHeader
        size="2xl"
        className={`${textColor ? textColor : "text-[#101828]!"} `}
      >
        {value}
      </CommonHeader>
    </div>
  );
};
export default MetricCard;
