import {
  useSavePropertyBrrrrMutation,
  useSavePropertySection8Mutation,
  useSavePropertyTurnkeyMutation,
} from "@/store/features/property/propertyApi";
import type { StrategyType } from "@/store/features/property/types/calculation";
import type { HudResponse } from "@/store/features/property/types/hud";
import type {
  BrrrrCalculationResponse,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "@/store/features/property/types/output";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonWithLoading from "../common/button/ButtonWithLoading";
import CommonButton from "../common/button/CommonButton";
import CardContainer from "../common/CardContainer";
import CommonHeader from "../common/header/CommonHeader";

interface SaveDealModalProps {
  response:
    | BrrrrCalculationResponse
    | TurnkeyCalculationResponse
    | Section8DSCRResponse;
  activeTab: StrategyType;
  onClose: () => void;

  hudData: HudResponse | null;
}

export const inputClass = {
  form: "",
  label: "block text-sm text-black mb-2 font-medium",
  input:
    "w-full rounded-[8px] border-[1.173px] border-[rgba(0,0,0,0)] bg-[#F3F3F5] shadow-[0_0_0_0.095px_rgba(161,161,161,0.02)] text-sm text-[#717182] p-2 outline-none",
  error: "text-red-500 text-sm mt-1",
};

const SaveDealModal: React.FC<SaveDealModalProps> = ({
  response,
  onClose,
  activeTab,

  hudData,
}) => {
  const [savePropertyBrrrr, { isLoading: isLoadingBrrrr }] =
    useSavePropertyBrrrrMutation();
  const [savePropertyTurnkey, { isLoading: isLoadingTurnkey }] =
    useSavePropertyTurnkeyMutation();
  const [savePropertySection8, { isLoading: isLoadingSection8 }] =
    useSavePropertySection8Mutation();
  const [name, setName] = useState("");

  const isLoading = isLoadingBrrrr || isLoadingTurnkey || isLoadingSection8;

  const navigate = useNavigate();
  const handleSave = async () => {
    if (!response || !name.trim()) return;
    try {
      if (activeTab === "BRRRR") {
        const { data } = response as BrrrrCalculationResponse;
        await savePropertyBrrrr({
          name,
          ...data,
        }).unwrap();
      } else if (activeTab === "TURNKEY") {
        const { data } = response as TurnkeyCalculationResponse;
        await savePropertyTurnkey({
          name,
          ...data,
        }).unwrap();
      } else {
        const { data } = response as Section8DSCRResponse;
        await savePropertySection8({
          name,
          ...data,
          studio: hudData?.data?.fmr?.studio || 0,
          oneBedroom: hudData?.data?.fmr?.oneBedroom || 0,
          twoBedroom: hudData?.data?.fmr?.twoBedroom || 0,
          threeBedroom: hudData?.data?.fmr?.threeBedroom || 0,
          fourBedroom: hudData?.data?.fmr?.fourBedroom || 0,
          latitude: hudData?.data?.geocode?.latitude || 0,
          longitude: hudData?.data?.geocode?.longitude || 0,
        }).unwrap();
      }

      navigate("/saved");
      onClose();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <CardContainer size="sm" className="bg-white max-w-md w-full ">
        <div className="flex items-center justify-between ">
          <CommonHeader size="lg">Save Deal</CommonHeader>
          <button
            onClick={onClose}
            className="text-black transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <CommonHeader size="sm">
          Enter a name for your deal to save it.
        </CommonHeader>
        <div className="py-4">
          <label className={inputClass.label}>Deal Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., 123 Main St Investment"
            className={inputClass.input}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && name.trim() && handleSave()}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <CommonButton
            onClick={onClose}
            className="bg-white! text-black! border border-[#000]/10"
          >
            Cancel
          </CommonButton>
          <CommonButton
            onClick={() => name.trim() && handleSave()}
            disabled={!name.trim() || isLoading}
            className="bg-[#030213]! text-white!"
          >
            {isLoading ? <ButtonWithLoading title="Saving..." /> : "Save Deal"}
          </CommonButton>
        </div>
      </CardContainer>
    </div>
  );
};

export default SaveDealModal;
