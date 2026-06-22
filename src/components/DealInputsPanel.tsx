import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, DollarSign, Home, Wrench } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { IoLocationOutline } from "react-icons/io5";
import type { DealInputs } from "../types";

import type { StrategyType } from "@/store/features/property/types/calculation";
import ButtonWithLoading from "./common/button/ButtonWithLoading";
import CommonButton from "./common/button/CommonButton";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";
import InputField from "./InputField";
import { inputClass } from "./SaveDealModal";
import { dealInputSchema, type DealInputsSchema } from "./schema/dealSchema";

interface DealInputsPanelProps {
  inputs: DealInputs;
  setInputs: React.Dispatch<React.SetStateAction<DealInputs>>;
  dealType: StrategyType;
  onChange: (key: keyof DealInputs, value: string | number) => void;
  onCalculate: SubmitHandler<DealInputsSchema>;
  hasResults: boolean;
  isLoading?: boolean;
}

const DealInputsPanel: React.FC<DealInputsPanelProps> = ({
  inputs,
  dealType,
  onChange,
  onCalculate,
  isLoading,
}) => {
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<DealInputsSchema>({
    resolver: zodResolver(dealInputSchema),
    defaultValues: {
      streetAddress: inputs.streetAddress,
      city: inputs.city,
      state: inputs.state,
      zipCode: inputs.zipCode,
      bedrooms: inputs.bedrooms,
      purchasePrice: inputs.purchasePrice,
      downPayment: inputs.downPayment,
      downPaymentPercent: inputs.downPaymentPercent,
      arv: inputs.arv,
      monthlyRent: inputs.monthlyRent,
      rehabCost: inputs.rehabCost,
      propertyTax: inputs.propertyTax,
      insurance: inputs.insurance,
      utilities: inputs.utilities,
      otherExpenses: inputs.otherExpenses,
      propertyLink: inputs.propertyLink,
      vacancyRate: inputs.vacancyRate,
      maintenanceRate: inputs.maintenanceRate,
      capexRate: inputs.capexRate,
      propertyMgmtRate: inputs.propertyMgmtRate,
      refinanceLtv: inputs.refinanceLtv,
      refinanceInterestRate: inputs.refinanceInterestRate,
      refinanceLoanTerm: inputs.refinanceLoanTerm,
      closingCost: inputs.closingCost,
      refinanceCost: inputs.refinanceCost,
      holdingCost: inputs.holdingCost,
      interestRate: inputs.interestRate,
      loanTerm: inputs.loanTerm,
      loanPoints: inputs.loanPoints,
      // Turnkey-specific
      lenderFees: inputs.lenderFees,
      marketRent: inputs.marketRent,
      section8Rent: inputs.section8Rent,
      crimeScore: inputs.crimeScore,
    },
    mode: "onSubmit",
  });

  // Keep RHF in sync when parent inputs change (e.g. AdjustableSettings)
  useEffect(() => {
    (Object.keys(inputs) as Array<keyof DealInputs>).forEach((key) => {
      setValue(key as keyof DealInputsSchema, inputs[key] as never);
    });
  }, [inputs, setValue]);

  const handleNum = (key: keyof DealInputs) => (v: string) => {
    const parsed = v === "" ? 0 : (parseFloat(v) ?? 0);
    onChange(key, parsed);
    setValue(key as keyof DealInputsSchema, parsed as never);
    trigger(key as keyof DealInputsSchema);

    if (key === "downPaymentPercent" && inputs.purchasePrice) {
      const amount = (parsed / 100) * inputs.purchasePrice;
      onChange("downPayment", amount);
      setValue("downPayment", amount as never);
    }
  };

  const handleStr = (key: keyof DealInputs) => (v: string) => {
    onChange(key, v);
    setValue(key as keyof DealInputsSchema, v as never);
    trigger(key as keyof DealInputsSchema);
  };

  const Err = ({ field }: { field: keyof DealInputsSchema }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1">
        {errors[field]?.message as string}
      </p>
    ) : null;

  return (
    <CardContainer
      size="lg"
      className="rounded-[14px]! border-[1.173px] border-[#F3F4F6]! bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)] space-y-6"
    >
      <CommonHeader className="text-[#1E2939]!">Deal Inputs</CommonHeader>
      {/* Property Location */}
      <CardContainer
        size="md"
        className="rounded-[10px]! border-[1.173px] border-[#E5E7EB]! bg-[#F9FAFB]! space-y-4"
      >
        <CommonHeader className="text-[#1E2939]!">
          <IoLocationOutline size={20} className="text-[#155DFC]" />
          Property Location
        </CommonHeader>
        <div className="space-y-3">
          <div>
            <InputField
              label="Street Address"
              value={inputs.streetAddress}
              onChange={handleStr("streetAddress")}
              placeholder="123 Main St"
            />
            <Err field="streetAddress" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <InputField
                label="City"
                value={inputs.city}
                onChange={handleStr("city")}
                placeholder="Springfield"
              />
              <Err field="city" />
            </div>
            <div>
              <InputField
                label="State"
                value={inputs.state}
                onChange={handleStr("state")}
                placeholder="CA"
              />
              <Err field="state" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <InputField
                label="ZIP Code"
                value={inputs.zipCode}
                onChange={handleStr("zipCode")}
                placeholder="12345"
              />
              <Err field="zipCode" />
            </div>
          </div>
        </div>
      </CardContainer>
      {/* Purchase Details */}
      <CardContainer className="rounded-[10px]! border-[1.173px] border-[#B9F8CF]! bg-[#F0FDF4]! space-y-4">
        <CommonHeader className="text-[#1E2939]!">
          <Home size={20} className="text-[#00A63E]" />
          Purchase Details
        </CommonHeader>
        <div className="space-y-3">
          <div>
            <InputField
              label="Purchase Price"
              value={inputs.purchasePrice ?? ""}
              onChange={handleNum("purchasePrice")}
              prefix="$"
              placeholder="250000"
            />
            <Err field="purchasePrice" />
          </div>
          <div>
            <InputField
              label="Down Payment"
              value={inputs.downPayment ?? ""}
              onChange={() => {}}
              prefix="$"
              placeholder="50000"
              disabled
            />
            <Err field="downPayment" />
          </div>
          <div>
            <InputField
              label="Down Payment Percent"
              value={inputs.downPaymentPercent ?? ""}
              onChange={handleNum("downPaymentPercent")}
              suffix="%"
              placeholder="20"
            />
            <Err field="downPaymentPercent" />
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <InputField
                label="Interest Rate"
                value={inputs.interestRate ?? ""}
                onChange={handleNum("interestRate")}
                suffix="%"
                placeholder="7"
                note="annual"
              />
              <Err field="interestRate" />
            </div>
            <div>
              <InputField
                label="Bedrooms"
                value={inputs.bedrooms}
                onChange={handleNum("bedrooms")}
                type="number"
              />
              <Err field="bedrooms" />
            </div>
            <div>
              <InputField
                label="Loan Term"
                value={inputs.loanTerm ?? ""}
                onChange={handleNum("loanTerm")}
                suffix="yrs"
                placeholder="30"
              />
              <Err field="loanTerm" />
            </div>{" "}
            <div>
              <InputField
                label="Loan Points"
                value={inputs.loanPoints ?? ""}
                onChange={handleNum("loanPoints")}
                prefix="$"
                placeholder="0"
              />
              <Err field="loanPoints" />
            </div>
          </div>
          {dealType === "BRRRR" && (
            <div>
              <InputField
                label="ARV – After Repair Value"
                value={inputs.arv ?? ""}
                onChange={handleNum("arv")}
                prefix="$"
                placeholder="300000"
                note="for BRRRR"
              />
              <Err field="arv" />
            </div>
          )}
        </div>
      </CardContainer>
      <CardContainer className="rounded-[10px]! border-[1.173px] border-[#E9D4FF]! bg-[#FAF5FF]! space-y-4">
        <CommonHeader className="text-[#1E2939]!">
          <DollarSign size={20} className="text-[#9810FA]" />
          Income & Rehab
        </CommonHeader>
        <div className="space-y-3">
          {dealType !== "SECTION_8" && (
            <div>
              <InputField
                label="Monthly Rent"
                value={inputs.monthlyRent ?? ""}
                onChange={handleNum("monthlyRent")}
                prefix="$"
                placeholder="2000"
              />
              <Err field="monthlyRent" />
            </div>
          )}
          {dealType !== "SECTION_8" && (
            <div>
              <InputField
                label="Rehab Cost"
                value={inputs.rehabCost ?? ""}
                onChange={handleNum("rehabCost")}
                prefix="$"
                placeholder="0"
              />
              <Err field="rehabCost" />
            </div>
          )}

          {dealType === "SECTION_8" && (
            <div>
              <InputField
                label="Section 8 Rent"
                value={inputs.section8Rent ?? ""}
                onChange={handleNum("section8Rent")}
                prefix="$"
                placeholder="1800"
              />
              <Err field="section8Rent" />
            </div>
          )}

          {/* Turnkey-specific fields */}
          {dealType === "TURNKEY" && (
            <>
              <div>
                <InputField
                  label="Lender Fees"
                  value={inputs.lenderFees ?? ""}
                  onChange={handleNum("lenderFees")}
                  prefix="$"
                  placeholder="0"
                />
                <Err field="lenderFees" />
              </div>
              <div>
                <InputField
                  label="Market Rent"
                  value={inputs.marketRent ?? ""}
                  onChange={handleNum("marketRent")}
                  prefix="$"
                  placeholder="2100"
                />
                <Err field="marketRent" />
              </div>
            </>
          )}
        </div>
      </CardContainer>
      {/* Operating Expenses */}
      <CardContainer className="rounded-[10px]! border-[1.173px] border-[#FFD6A8]! bg-[#FFF7ED]! space-y-4">
        <CommonHeader className="text-[#1E2939]!">
          <Wrench size={20} className="text-[#F54900]" />
          Operating Expenses
        </CommonHeader>
        <div className="space-y-3">
          <div>
            <InputField
              label="Property Tax"
              value={inputs.propertyTax ?? ""}
              onChange={handleNum("propertyTax")}
              prefix="$"
              note="annual"
            />
            <Err field="propertyTax" />
          </div>
          <div>
            <InputField
              label="Insurance"
              value={inputs.insurance ?? ""}
              onChange={handleNum("insurance")}
              prefix="$"
              note="annual"
            />
            <Err field="insurance" />
          </div>
          <div>
            <InputField
              label="Utilities"
              value={inputs.utilities ?? ""}
              onChange={handleNum("utilities")}
              prefix="$"
              note="monthly"
            />
            <Err field="utilities" />
          </div>
          <div>
            <InputField
              label="Other Expenses"
              value={inputs.otherExpenses ?? ""}
              onChange={handleNum("otherExpenses")}
              prefix="$"
              note="monthly"
            />
            <Err field="otherExpenses" />
          </div>
        </div>
      </CardContainer>
      {/* Expense Rates / Reserves */}
      <CardContainer className="rounded-[10px]! border-[1.173px] border-[#BAE6FD]! bg-[#F0F9FF]! space-y-4">
        <CommonHeader className="text-[#1E2939]!">
          <Wrench size={20} className="text-[#155DFC]" />
          Expense Rates / Reserves
        </CommonHeader>
        <div className="space-y-3">
          <div>
            <InputField
              label="Vacancy Rate"
              value={inputs.vacancyRate ?? ""}
              onChange={handleNum("vacancyRate")}
              placeholder="75"
              suffix="%"
            />
            <Err field="vacancyRate" />
          </div>
          <div>
            <InputField
              label="Maintenance Rate"
              value={inputs.maintenanceRate ?? ""}
              onChange={handleNum("maintenanceRate")}
              placeholder="7.5"
              suffix="%"
            />
            <Err field="maintenanceRate" />
          </div>
          <div>
            <InputField
              label="Management Rate"
              value={inputs.propertyMgmtRate ?? ""}
              onChange={handleNum("propertyMgmtRate")}
              placeholder="7.5"
              suffix="%"
            />
            <Err field="propertyMgmtRate" />
          </div>

          <div>
            <InputField
              label="Capex Rate"
              value={inputs.capexRate ?? ""}
              onChange={handleNum("capexRate")}
              placeholder="7.5"
              suffix="%"
            />
            <Err field="capexRate" />
          </div>
        </div>
      </CardContainer>
      {/* Refinance Details */}

      {dealType === "BRRRR" && (
        <CardContainer className="rounded-[10px]! border-[1.173px] border-[#B9F8CF]! bg-[#F0FDF4]! space-y-4">
          <CommonHeader className="text-[#1E2939]!">
            <Home size={20} className="text-[#00A63E]" />
            Refinance Details
          </CommonHeader>
          <div className="space-y-3">
            <div>
              <InputField
                label="Refinance LTV"
                value={inputs.refinanceLtv ?? ""}
                onChange={handleNum("refinanceLtv")}
                suffix="%"
                placeholder="75"
                note="e.g. 75%"
              />
              <Err field="refinanceLtv" />
            </div>
            <div>
              <InputField
                label="Refinance Interest Rate"
                value={inputs.refinanceInterestRate ?? ""}
                onChange={handleNum("refinanceInterestRate")}
                suffix="%"
                placeholder="7.5"
                note="annual"
              />
              <Err field="refinanceInterestRate" />
            </div>
            <div>
              <InputField
                label="Refinance Loan Term"
                value={inputs.refinanceLoanTerm ?? ""}
                onChange={handleNum("refinanceLoanTerm")}
                suffix="yrs"
                placeholder="30"
              />
              <Err field="refinanceLoanTerm" />
            </div>
          </div>
        </CardContainer>
      )}
      {/* Additional Costs */}
      <CardContainer className="rounded-[10px]! border-[1.173px] border-[#E9D4FF]! bg-[#FAF5FF]! space-y-4">
        <CommonHeader className="text-[#1E2939]!">
          <DollarSign size={20} className="text-[#9810FA]" />
          Additional Costs
        </CommonHeader>
        <div className="space-y-3">
          <div>
            <InputField
              label="Closing Cost"
              value={inputs.closingCost ?? ""}
              onChange={handleNum("closingCost")}
              prefix="$"
              placeholder="5000"
            />
            <Err field="closingCost" />
          </div>
          <div>
            <InputField
              label="Refinance Cost"
              value={inputs.refinanceCost ?? ""}
              onChange={handleNum("refinanceCost")}
              prefix="$"
              placeholder="3000"
            />
            <Err field="refinanceCost" />
          </div>
          <div>
            <InputField
              label="Holding Cost"
              value={inputs.holdingCost ?? ""}
              onChange={handleNum("holdingCost")}
              prefix="$"
              note="monthly"
              placeholder="500"
            />
            <Err field="holdingCost" />
          </div>
        </div>
      </CardContainer>
      {/* Property Link */}
      <div className="border-t border-[#000]/10 pt-4">
        <label className={inputClass.label}>
          Property Link{" "}
          <span className="text-[#4A5565] font-normal">
            (optional – for reference)
          </span>
        </label>
        <input
          type="url"
          value={inputs.propertyLink}
          onChange={(e) => {
            onChange("propertyLink", e.target.value);
            setValue("propertyLink", e.target.value);
            trigger("propertyLink");
          }}
          placeholder="https://zillow.com/homedetails/..."
          className={inputClass.input}
        />
        <Err field="propertyLink" />
      </div>
      <CommonButton
        onClick={handleSubmit(onCalculate)}
        className="bg-[#030213]! text-[#ffffff]! w-full py-3!"
        disabled={isLoading}
      >
        {isLoading ? (
          <ButtonWithLoading title="Calculating..." />
        ) : (
          <>
            <Calculator size={20} />
            Calculate Deal Analysis
          </>
        )}
      </CommonButton>
    </CardContainer>
  );
};

export default DealInputsPanel;
