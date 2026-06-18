// components/IncomeExpensesCard.tsx

import { formatCurrencyDecimal } from "../utils/calculations";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";

interface IncomeExpensesCardProps {
  monthlyRent: number;
  annualRent: number;
  effectiveIncome: number;
  totalExpenses: number;
  netCashFlow: number;
}

const IncomeExpensesCard: React.FC<IncomeExpensesCardProps> = ({
  monthlyRent,
  annualRent,
  effectiveIncome,
  totalExpenses,
  netCashFlow,
}) => {
  return (
    <CardContainer>
      <CommonHeader size="lg" className="pb-4">
        Income & Expenses
      </CommonHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CardContainer
          size="sm"
          className="rounded-[10px]! border-[1.173px] border-[#B9F8CF]! bg-[#F0FDF4]! space-y-3"
        >
          <CommonHeader size="lg" className="text-[#008236]!">
            Income
          </CommonHeader>

          <div className="flex justify-between">
            <CommonHeader size="sm">Gross Monthly Rent</CommonHeader>
            <CommonHeader size="md" className="text-[#101828]! font-semibold!">
              {formatCurrencyDecimal(monthlyRent)}
            </CommonHeader>
          </div>

          <div className="flex justify-between border-b-[1.173px] pb-2 border-[#F3F4F6]">
            <CommonHeader size="sm">Gross Annual Rent</CommonHeader>
            <CommonHeader size="md" className="text-[#101828]! font-semibold!">
              {formatCurrencyDecimal(annualRent)}
            </CommonHeader>
          </div>

          <div className="flex justify-between">
            <CommonHeader size="sm">
              Effective Income (after vacancy)
            </CommonHeader>
            <CommonHeader size="md" className="text-[#101828]! font-semibold!">
              {formatCurrencyDecimal(effectiveIncome)}
            </CommonHeader>
          </div>
        </CardContainer>

        <CardContainer
          size="sm"
          className="rounded-[10px]! border-[1.173px] border-[#FFD6A8]! bg-[#FFF7ED]! space-y-3"
        >
          <CommonHeader size="lg" className="text-[#C10007]!">
            Expenses
          </CommonHeader>

          <div className="flex justify-between border-b-[1.173px] pb-2 border-[#F3F4F6]">
            <CommonHeader size="sm">Total Operating Expenses</CommonHeader>
            <CommonHeader size="md" className="text-[#C10007]! font-medium!">
              {formatCurrencyDecimal(totalExpenses)}
            </CommonHeader>
          </div>

          <div className="flex justify-between">
            <CommonHeader size="sm" className="font-bold!">
              Net Cash Flow
            </CommonHeader>
            <CommonHeader size="md" className="text-[#9F0712]! font-bold!">
              {formatCurrencyDecimal(netCashFlow)}
            </CommonHeader>
          </div>
        </CardContainer>
      </div>
    </CardContainer>
  );
};

export default IncomeExpensesCard;
