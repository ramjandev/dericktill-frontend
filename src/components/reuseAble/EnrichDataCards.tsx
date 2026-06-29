import type { PropertyEnrichResponse } from "@/store/features/property/types/enrich";
import { formatCurrencyDecimal } from "@/utils/calculations";
import { Home, Shield } from "lucide-react";
import { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";
import CardContainer from "../common/CardContainer";
import CommonHeader from "../common/header/CommonHeader";

interface EnrichDataCardsProps {
  showCrimeData: PropertyEnrichResponse | null;
}

const EnrichDataCards: React.FC<EnrichDataCardsProps> = ({ showCrimeData }) => {
  const [activeTab, setActiveTab] = useState<"rentals" | "sales">("rentals");

  if (!showCrimeData) return null;

  const crime = showCrimeData.data?.crime;
  const rentals = showCrimeData.data?.comps?.rental ?? [];
  const sold = showCrimeData.data?.comps?.sold ?? [];

  const avgRent = rentals.length
    ? rentals.reduce((sum, r) => sum + r.rent, 0) / rentals.length
    : 0;

  const avgSalePrice = sold.length
    ? sold.reduce((sum, s) => sum + s.price, 0) / sold.length
    : 0;

  const avgPricePerSqFt = sold.length
    ? sold.reduce((sum, s) => sum + s.pricePerSqFt, 0) / sold.length
    : 0;

  const riskStyle =
    crime?.riskLabel === "LOW"
      ? { bg: "bg-[#DCFCE7]", text: "text-[#166534]" }
      : crime?.riskLabel === "MEDIUM"
        ? { bg: "bg-[#FEF3C7]", text: "text-[#92400E]" }
        : { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]" };

  const ratePerHundredK =
    crime?.totalIncidents && crime?.population
      ? Math.round((crime.totalIncidents / crime.population) * 100000)
      : null;

  const formatSoldDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalComps = rentals.length + sold.length;

  return (
    <>
      <CardContainer className="">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#BA7517]" />
              <CommonHeader size="lg">Crime data</CommonHeader>
            </div>
            <p className="text-sm text-[#717182] mt-0.5">
              Safety score and crime statistics for this area
            </p>
          </div>
          {crime && (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${riskStyle.bg} ${riskStyle.text}`}
            >
              {crime.riskLabel.charAt(0) +
                crime.riskLabel.slice(1).toLowerCase()}{" "}
              risk
            </span>
          )}
        </div>

        {crime ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
              <div className="bg-[#F9FAFB] rounded-xl p-3">
                <p className="text-xs text-[#717182] mb-1">Crime score</p>
                <p className="text-xl font-semibold text-[#0A0A0A] leading-tight">
                  {crime.crimeScore}
                  <span className="text-sm font-normal text-[#717182]">
                    /100
                  </span>
                </p>
              </div>
              <div className="bg-[#F9FAFB] rounded-xl p-3">
                <p className="text-xs text-[#717182] mb-1">Total incidents</p>
                <p className="text-xl font-semibold text-[#0A0A0A] leading-tight">
                  {crime.totalIncidents.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#F9FAFB] rounded-xl p-3">
                <p className="text-xs text-[#717182] mb-1">Population</p>
                <p className="text-xl font-semibold text-[#0A0A0A] leading-tight">
                  {crime.population
                    ? crime.population >= 1_000_000
                      ? `${(crime.population / 1_000_000).toFixed(1)}M`
                      : crime.population >= 1_000
                        ? `${(crime.population / 1_000).toFixed(0)}K`
                        : crime.population.toLocaleString()
                    : "—"}
                </p>
              </div>
              <div className="bg-[#F9FAFB] rounded-xl p-3">
                <p className="text-xs text-[#717182] mb-1">Rate per 100k</p>
                <p className="text-xl font-semibold text-[#0A0A0A] leading-tight">
                  {ratePerHundredK ? ratePerHundredK.toLocaleString() : "—"}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mb-3">
              {crime.crimesByType?.map((c) => {
                const isViolent = c.type.toLowerCase().includes("violent");
                return (
                  <div key={c.type} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 w-36 shrink-0">
                      {isViolent ? (
                        <span className="text-[#BA7517] text-sm">⚠</span>
                      ) : (
                        <Home size={13} className="text-[#378ADD]" />
                      )}
                      <span className="text-sm text-[#717182]">
                        {isViolent ? "Violent crime" : "Property crime"}
                      </span>
                    </div>
                    <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isViolent ? "bg-[#EF9F27]" : "bg-[#378ADD]"}`}
                        style={{ width: `${c.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#0A0A0A] w-28 text-right shrink-0">
                      {c.count.toLocaleString()} ({c.percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#717182] leading-relaxed">
              {crime.areaSummary}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <BsPlusSquare size={28} className="text-[#99A1AF] mb-3" />
            <CommonHeader size="md" className="text-[#717182]!">
              Enter address above to check crime data
            </CommonHeader>
          </div>
        )}
      </CardContainer>

      <CardContainer className="">
        {/* Outer header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Home size={18} className="text-[#4F39F6]" />
              <CommonHeader size="lg">Comparable Properties</CommonHeader>
            </div>
            <p className="text-sm text-[#717182] mt-0.5">
              Recent rental listings and sales in the area
            </p>
          </div>
          {totalComps > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] whitespace-nowrap">
              {rentals.length} rental{rentals.length !== 1 ? "s" : ""} ·{" "}
              {sold.length} sale{sold.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="bg-[#EEF2FF]/30 border-[1.173px] border-[#C6D2FF] rounded-[14px] p-5">
          {/* Inner header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Home size={16} className="text-[#4F39F6]" />
              <span className="text-sm font-medium text-[#0A0A0A]">
                Comparable Properties
              </span>
            </div>
            <IoAlertCircleOutline size={16} className="text-[#99A1AF]" />
          </div>
          <p className="text-sm text-[#717182] mb-4">
            Recent rental listings and sales in the area
          </p>

          {/* Tab switcher */}
          {(rentals.length > 0 || sold.length > 0) && (
            <div className="flex gap-1 bg-[#F3F4F6] rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab("rentals")}
                className={`flex-1 text-sm font-medium py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                  activeTab === "rentals"
                    ? "bg-white text-[#4F39F6] shadow-sm"
                    : "text-[#717182] hover:text-[#0A0A0A]"
                }`}
              >
                Rentals
                {rentals.length > 0 && (
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === "rentals"
                        ? "bg-[#EEF2FF] text-[#4F39F6]"
                        : "bg-[#E5E7EB] text-[#717182]"
                    }`}
                  >
                    {rentals.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("sales")}
                className={`flex-1 text-sm font-medium py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                  activeTab === "sales"
                    ? "bg-white text-[#4F39F6] shadow-sm"
                    : "text-[#717182] hover:text-[#0A0A0A]"
                }`}
              >
                Sales
                {sold.length > 0 && (
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === "sales"
                        ? "bg-[#EEF2FF] text-[#4F39F6]"
                        : "bg-[#E5E7EB] text-[#717182]"
                    }`}
                  >
                    {sold.length}
                  </span>
                )}
              </button>
            </div>
          )}

          {activeTab === "rentals" && (
            <>
              {rentals.length > 0 ? (
                <div className="space-y-3">
                  {/* Avg rent summary */}
                  <div className="bg-white rounded-xl border border-[#C6D2FF] px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#717182] mb-0.5">Avg Rent</p>
                      <p className="text-lg font-semibold text-[#4F39F6]">
                        {formatCurrencyDecimal(avgRent)}/mo
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F39F6]">
                      {rentals.length} comp{rentals.length !== 1 ? "s" : ""}{" "}
                      found
                    </span>
                  </div>

                  {/* Rental comp rows */}
                  {rentals.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white rounded-xl border border-[#C6D2FF] px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-[#0A0A0A] mb-1">
                        {r.address}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#717182]">
                        <span>{r.propertyType}</span>
                        <span>
                          {r.bedrooms}bd / {r.bathrooms}ba
                        </span>
                        {r.squareFootage && (
                          <span>{r.squareFootage.toLocaleString()} sqft</span>
                        )}
                        <span className="font-semibold text-[#4F39F6]">
                          {formatCurrencyDecimal(r.rent)}/mo
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Estimates */}
                  <div className="bg-white rounded-xl border border-[#C6D2FF] px-4 py-3 flex items-center justify-between">
                    <p className="text-sm text-[#0A0A0A]">Rent estimate</p>
                    <p className="text-sm italic text-[#99A1AF]">
                      {showCrimeData.data?.comps?.estimates?.rentEstimate
                        ? formatCurrencyDecimal(
                            showCrimeData.data.comps.estimates.rentEstimate,
                          )
                        : "Not available"}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-[#C6D2FF] px-4 py-3 flex items-center justify-between">
                    <p className="text-sm text-[#0A0A0A]">Value estimate</p>
                    <p className="text-sm italic text-[#99A1AF]">
                      {showCrimeData.data?.comps?.estimates?.valueEstimate
                        ? formatCurrencyDecimal(
                            showCrimeData.data.comps.estimates.valueEstimate,
                          )
                        : "Not available"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-sm text-[#717182]">
                  No rental comps found
                </div>
              )}
            </>
          )}

          {activeTab === "sales" && (
            <>
              {sold.length > 0 ? (
                <div className="space-y-3">
                  {/* Avg sale summary */}
                  <div className="bg-white rounded-xl border border-[#C6D2FF] px-4 py-3 flex items-center justify-between">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-[#717182] mb-0.5">
                          Avg Sale Price
                        </p>
                        <p className="text-lg font-semibold text-[#4F39F6]">
                          {formatCurrencyDecimal(avgSalePrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#717182] mb-0.5">
                          Avg $/sqft
                        </p>
                        <p className="text-lg font-semibold text-[#4F39F6]">
                          {formatCurrencyDecimal(avgPricePerSqFt)}/ft²
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F39F6]">
                      {sold.length} comp{sold.length !== 1 ? "s" : ""} found
                    </span>
                  </div>

                  {/* Sold comp rows */}
                  {sold.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white rounded-xl border border-[#C6D2FF] px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-[#0A0A0A] mb-1">
                        {s.address}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#717182]">
                        <span>{s.propertyType}</span>
                        <span>
                          {s.bedrooms}bd / {s.bathrooms}ba
                        </span>
                        {s.squareFootage && (
                          <span>{s.squareFootage.toLocaleString()} sqft</span>
                        )}
                        <span className="font-semibold text-[#4F39F6]">
                          {formatCurrencyDecimal(s.price)}
                        </span>
                        <span>·</span>
                        <span>{formatCurrencyDecimal(s.pricePerSqFt)}/ft²</span>
                        {s.soldDate && (
                          <>
                            <span>·</span>
                            <span>Sold {formatSoldDate(s.soldDate)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-sm text-[#717182]">
                  No sold comps found
                </div>
              )}
            </>
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default EnrichDataCards;
