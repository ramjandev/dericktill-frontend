import React from "react";
import { FaCheck } from "react-icons/fa";
import CardContainer from "../common/CardContainer";
import CommonHeader from "../common/header/CommonHeader";

interface StrategyCardProps {
  label: string;
  icon?: React.ReactNode;
  desc: string;
  tags: string[];
  bgColor: string;
  color: string;
  tabBg: string;

  className?: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({
  label,
  icon,
  desc,
  tags,
  color,
  bgColor,
  tabBg,
  className = "",
}) => {
  return (
    <CardContainer
      className={`rounded-[10px] border-[1.173px] ${bgColor} mt-5 ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`${label === "BRRRR" ? "text-[#155DFC]" : label === "Turnkey" ? "text-[#00A63E]" : "text-[#9810FA]"} text-2xl`}
        >
          {icon}
        </span>
        <CommonHeader className={color}>{label} Strategy</CommonHeader>
      </div>

      <CommonHeader size="sm" className={color}>
        {label} {desc}
      </CommonHeader>

      <div className="flex gap-2 flex-wrap mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1  ${tabBg} ${color}`}
          >
            <FaCheck size={10} /> {tag}
          </span>
        ))}
      </div>
    </CardContainer>
  );
};

export default StrategyCard;
