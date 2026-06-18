import CommonButton from "@/components/common/button/CommonButton";
import DashboardCardSkeleton from "@/components/common/button/DashboardCardSkeleton";
import CommonContainer from "@/components/common/CommonContainer";
import LoadingSpinner from "@/components/common/custom/LoadingSpinner";
import Pagination from "@/components/common/custom/Pagination";
import CommonHeader from "@/components/common/header/CommonHeader";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import SaveDetails from "@/components/SaveDetails";
import {
  useCalculationDetailsQuery,
  useDeleteDealMutation,
  useGetCalculationQuery,
} from "@/store/features/property/propertyApi";
import { formatDate } from "@/utils/calculations";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const ratingStyles: Record<
  string,
  { bg: string; text: string; dot: string; border: string }
> = {
  "GOOD DEAL": {
    bg: "bg-green-500",
    text: "text-white",
    dot: "🟢",
    border: "border-green-200",
  },

  "AVERAGE DEAL": {
    bg: "bg-yellow-400",
    text: "text-white",
    dot: "🟡",
    border: "border-yellow-200",
  },
  "BAD DEAL": {
    bg: "bg-red-500",
    text: "text-white",
    dot: "🔴",
    border: "border-red-200",
  },
  DEFAULT: {
    bg: "bg-gray-400",
    text: "text-white",
    dot: "⚪",
    border: "border-gray-200",
  },
};
const SavedDealsPage = () => {
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  const [page, setPage] = useState("1");
  const { data, isLoading } = useGetCalculationQuery({ page, limit: "10" });
  const { data: dealDetails, isLoading: dealDetailsLoading } =
    useCalculationDetailsQuery(selectedDealId!, {
      skip: !selectedDealId,
      refetchOnMountOrArgChange: true,
    });

  const savedDeals = data?.data.data || [];
  const selectedDeal = dealDetails?.data;
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [deleteDeal] = useDeleteDealMutation();

  const handleDelete = async (id: string) => {
    setDeleteId(id);

    try {
      await deleteDeal(id).unwrap();
    } catch (error: any) {
      console.error("Delete failed:", error);
    } finally {
      setDeleteId(null);
    }
  };
  const navigate = useNavigate();
  const handleNewDeal = () => {
    setSelectedDealId(null);
    navigate("/analyze");
  };
  const lists = new Array(9).fill(null);

  console.log("savedDeals.length", savedDeals.length > 10);
  return (
    <div className="">
      {!selectedDealId ? (
        <CommonContainer>
          <div className="flex items-center justify-between mb-6">
            <div>
              <CommonHeader size="3xl" className="text-white">
                Saved Deals
              </CommonHeader>

              <CommonHeader size="md" className="text-white!">
                {savedDeals.length} {savedDeals.length === 1 ? "deal" : "deals"}
                saved
              </CommonHeader>
            </div>
            <CommonButton
              onClick={handleNewDeal}
              variant="primary"
              className=""
            >
              <Plus size={16} />
              <span>New Deal</span>
            </CommonButton>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lists.map((_, index) => (
                <DashboardCardSkeleton key={index} />
              ))}
            </div>
          ) : savedDeals.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 text-sm mb-4">No saved deals yet</p>
              <button className="bg-gray-900 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-800 transition-all">
                <Link to="/analyze">Analyze Your First Deal</Link>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedDeals.map((deal) => {
                const style =
                  ratingStyles[deal.scoreBoardStatus ?? "DEFAULT"] ??
                  ratingStyles["DEFAULT"];
                const isPositive = (deal.cashOnCashReturn as number) >= 0;
                return (
                  <div
                    key={deal.propertyId}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  >
                    {/* Rating header */}
                    <div
                      className={`${style.bg} px-4 py-2.5 flex items-center gap-2`}
                    >
                      <span className="text-base">{style.dot}</span>
                      <span
                        className={`font-display font-bold text-sm ${style.text}`}
                      >
                        {deal.scoreBoardStatus}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {deal.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                        <Calendar size={11} />
                        {formatDate(deal.createdAt)}
                      </div>
                      <div className="border-t border-gray-100 pt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Cash Flow</span>
                          <span
                            className={`font-semibold ${isPositive ? "text-gray-900" : "text-red-600"}`}
                          >
                            {deal.monthlyNetCashFlow}/mo
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">CoC Return</span>
                          <span
                            className={`font-semibold ${(deal.capRate as number) >= 0 ? "text-gray-900" : "text-red-600"}`}
                          >
                            {deal.capRate}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Purchase Price</span>
                          <span className="font-semibold text-gray-900">
                            {deal.purchasePrice}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <CommonButton
                          onClick={() => setSelectedDealId(deal.propertyId)}
                          className="flex-1 border border-[#000000]/10"
                        >
                          View Details
                        </CommonButton>
                        <button
                          onClick={() => setDeleteId(deal.propertyId)}
                          className="p-2.5 bg-[#D4183D] text-white rounded-md  cursor-pointer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CommonContainer>
      ) : dealDetailsLoading ? (
        <LoadingSpinner />
      ) : (
        selectedDeal && (
          <SaveDetails
            selectedDeal={selectedDeal}
            setSelectedDealId={setSelectedDealId}
            setPage={(p) => setPage(String(p))}
          />
        )
      )}
      {deleteId && (
        <DeleteConfirmModal
          onConfirm={() => {
            handleDelete(deleteId);
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
      {!selectedDeal && savedDeals.length > 10 && !dealDetailsLoading && (
        <div className="py-8">
          <Pagination
            currentPage={Number(page)}
            totalPages={data?.data.meta.totalPages ?? 1}
            onPageChange={(p) => setPage(String(p))}
          />
        </div>
      )}
    </div>
  );
};

export default SavedDealsPage;
