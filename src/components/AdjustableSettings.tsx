import { IoSettingsOutline } from "react-icons/io5";
import type { DealInputs } from "../types";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";
import SliderField from "./SliderField";

interface AdjustableSettingsProps {
  inputs: DealInputs;
  onChange: (key: keyof DealInputs, value: number) => void;
}

const AdjustableSettings: React.FC<AdjustableSettingsProps> = ({
  inputs,
  onChange,
}) => {
  return (
    <CardContainer className="rounded-[14px]! border-[1.173px] border-[#F3F4F6] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)] ">
      <CommonHeader>Adjustable Settings</CommonHeader>

      <CardContainer
        size="md"
        className="rounded-[14px]! border-[1.173px] border-[rgba(0,0,0,0.10)] bg-white mt-6"
      >
        <div className=" gap-2">
          <CommonHeader size="md" className="text-[#0A0A0A]!">
            <IoSettingsOutline size={15} className="" />
            Adjustable Settings
          </CommonHeader>

          <CommonHeader size="md" className="text-[#717182]!">
            Adjust these values to see live updates
          </CommonHeader>
        </div>
        <div className="space-y-6 pt-6">
          <SliderField
            label="Vacancy Rate"
            value={inputs.vacancyRate}
            onChange={(v) => onChange("vacancyRate", v)}
          />
          <SliderField
            label="Maintenance Rate"
            value={inputs.maintenanceRate}
            onChange={(v) => onChange("maintenanceRate", v)}
          />
          <SliderField
            label="CapEx Rate"
            value={inputs.capexRate}
            onChange={(v) => onChange("capexRate", v)}
          />
          <SliderField
            label="Property Management"
            value={inputs.propertyMgmtRate}
            onChange={(v) => onChange("propertyMgmtRate", v)}
          />
        </div>
      </CardContainer>
    </CardContainer>
  );
};

export default AdjustableSettings;
