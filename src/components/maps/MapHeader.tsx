import type { FMRData } from "@/store/features/property/types/hud";
import { RiScales3Line } from "react-icons/ri";
import CommonHeader from "../common/header/CommonHeader";

interface MapHeaderProps {
  fmr: FMRData;
}
const MapHeader: React.FC<MapHeaderProps> = ({ fmr }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          <RiScales3Line size={24} />
        </div>
        <div>
          <CommonHeader size="lg">
            HUD Fair Market Rents · {fmr.year}
          </CommonHeader>
          <CommonHeader size="sm">{fmr.county}</CommonHeader>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50  text-emerald-700 d border border-emerald-200  px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          Active
        </span>
        <CommonHeader size="sm"> {fmr.raw.source}</CommonHeader>
      </div>
    </div>
  );
};

export default MapHeader;
