// components/FinancingMortgagesCard.tsx

import { formatCurrencyDecimal } from "../utils/calculations";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";

interface FinancingMortgagesCardProps {
  purchaseLoanAmount: number;
  loanPointsCost: number;
  monthlyMortgage: number;
  annualMortgage: number;
}

const FinancingMortgagesCard: React.FC<FinancingMortgagesCardProps> = ({
  purchaseLoanAmount,
  loanPointsCost,
  monthlyMortgage,
  annualMortgage,
}) => {
  return (
    <CardContainer>
      <CommonHeader size="lg" className="pb-4">
        Financing & Mortgages
      </CommonHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CardContainer
          size="sm"
          className="rounded-[10px]! border-[1.173px] border-[#BAE6FD]! bg-[#F0F9FF]! space-y-3"
        >
          <CommonHeader size="lg" className="text-[#1C398E]!">
            Initial Loan
          </CommonHeader>

          <div className="flex justify-between">
            <CommonHeader size="sm">Purchase Loan Amount</CommonHeader>
            <CommonHeader size="md" className="text-[#101828]! font-semibold!">
              {formatCurrencyDecimal(purchaseLoanAmount)}
            </CommonHeader>
          </div>

          <div className="flex justify-between border-b-[1.173px] pb-2 border-[#F3F4F6]">
            <CommonHeader size="sm">Loan Points Cost</CommonHeader>
            <CommonHeader size="md" className="text-[#101828]! font-semibold!">
              {formatCurrencyDecimal(loanPointsCost)}
            </CommonHeader>
          </div>
        </CardContainer>

        <CardContainer
          size="sm"
          className="rounded-[10px]! border-[1.173px] border-[#B9F8CF]! bg-[#F0FDF4]! space-y-3"
        >
          <CommonHeader size="lg" className="text-[#008236]!">
            Refinance Mortgage
          </CommonHeader>

          <div className="flex justify-between text-sm border-b-[1.173px] pb-2 border-[#F3F4F6]">
            <CommonHeader size="sm">Monthly Payment</CommonHeader>
            <CommonHeader size="md" className="text-[#C10007]! font-medium!">
              {formatCurrencyDecimal(monthlyMortgage)}
            </CommonHeader>
          </div>

          <div className="flex justify-between text-sm">
            <CommonHeader size="sm">Annual Payment</CommonHeader>
            <CommonHeader size="md" className="text-[#9F0712]!">
              {formatCurrencyDecimal(annualMortgage)}
            </CommonHeader>
          </div>
        </CardContainer>
      </div>
    </CardContainer>
  );
};

export default FinancingMortgagesCard;
