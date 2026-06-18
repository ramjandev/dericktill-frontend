import {
  useSavePropertyBrrrrMutation,
  useSavePropertySection8Mutation,
  useSavePropertyTurnkeyMutation,
} from "@/store/features/property/propertyApi";
import type { StrategyType } from "@/store/features/property/types/calculation";
import type {
  BrrrrCalculationResponse,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "@/store/features/property/types/output";
import { X } from "lucide-react";
import { useState } from "react";
import ButtonWithLoading from "./common/button/ButtonWithLoading";
import CommonButton from "./common/button/CommonButton";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";

interface SaveDealModalProps {
  response:
    | BrrrrCalculationResponse
    | TurnkeyCalculationResponse
    | Section8DSCRResponse;
  activeTab: StrategyType;
  onClose: () => void;
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
}) => {
  const [savePropertyBrrrr, { isLoading: isLoadingBrrrr }] =
    useSavePropertyBrrrrMutation();
  const [savePropertyTurnkey, { isLoading: isLoadingTurnkey }] =
    useSavePropertyTurnkeyMutation();
  const [savePropertySection8, { isLoading: isLoadingSection8 }] =
    useSavePropertySection8Mutation();
  const [name, setName] = useState("");

  const isLoading = isLoadingBrrrr || isLoadingTurnkey || isLoadingSection8;
  const handleSave = async () => {
    if (!response || !name.trim()) return;
    try {
      if (activeTab === "BRRRR") {
        const { data } = response as BrrrrCalculationResponse;
        await savePropertyBrrrr({
          name,
          strategy: data.strategy,
          stateAddress: data.stateAddress,
          purchasePrice: data.purchasePrice,
          downPayment: data.downPayment,
          annualInsurance: data.annualInsurance,
          annualPropertyTax: data.annualPropertyTax,
          vacancyRate: data.vacancyRate,
          maintenanceRate: data.maintenanceRate,
          managementRate: data.managementRate,
          capexRate: data.capexRate,
          allInCost_m: data.allInCost_m,
          initialCashInvested_m: data.initialCashInvested_m,
          monthlyCashFlow_m: data.monthlyCashFlow_m,
          postRefiCoC_m: data.postRefiCoC_m,
          cashOutAmount_m: data.cashOutAmount_m,
          cashLeftInDeal_m: data.cashLeftInDeal_m,
          equityCaptured_m: data.equityCaptured_m,
          refinanceLoanAmount_m: data.refinanceLoanAmount_m,
          capRate_m: data.capRate_m,
          DSCR_m: data.DSCR_m,
          netOperatingIncome_m: data.netOperatingIncome_m,
          incomeExpance: data.incomeExpance,
          dealScoreboard: {
            ...data.dealScoreboard,
            breakdown: data.dealScoreboard.breakdown.map((item) => ({
              ...item,
              value:
                typeof item.value === "boolean"
                  ? Number(item.value)
                  : item.value,
            })),
          },
        }).unwrap();
      } else if (activeTab === "TURNKEY") {
        const { data } = response as TurnkeyCalculationResponse;
        await savePropertyTurnkey({
          name,
          strategy: data.strategy,
          stateAddress: data.stateAddress,
          purchasePrice: data.purchasePrice,
          downPayment: data.downPayment,
          annualInsurance: data.annualInsurance,
          annualPropertyTax: data.annualPropertyTax,
          vacancyRate: data.vacancyRate,
          maintenanceRate: data.maintenanceRate,
          managementRate: data.managementRate,
          capexRate: data.capexRate,
          responseData: {
            ...data.responseData,
            dealScoreboard: {
              ...data.responseData.dealScoreboard,
              breakdown: data.responseData.dealScoreboard.breakdown.map(
                (item) => ({
                  ...item,
                  value:
                    typeof item.value === "boolean"
                      ? Number(item.value)
                      : item.value,
                }),
              ),
            },
          },
        }).unwrap();
      } else {
        const { data } = response as Section8DSCRResponse;
        await savePropertySection8({
          name,
          strategy: data.strategy,
          stateAddress: data.stateAddress,
          purchasePrice: data.purchasePrice,
          downPayment: data.downPayment,
          annualInsurance: data.annualInsurance,
          annualPropertyTax: data.annualPropertyTax,
          vacancyRate: data.vacancyRate,
          maintenanceRate: data.maintenanceRate,
          managementRate: data.managementRate,
          capexRate: data.capexRate,
          responseData: {
            ...data.responseData,
            dealScoreboard: {
              ...data.responseData.dealScoreboard,
              breakdown: data.responseData.dealScoreboard.breakdown.map(
                (item) => ({
                  ...item,
                  value:
                    typeof item.value === "boolean"
                      ? Number(item.value)
                      : item.value,
                }),
              ),
            },
          },
        }).unwrap();
      }

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
