import type { PropertyEnrichResponse } from "@/store/features/property/types/enrich";
import { Home, Shield } from "lucide-react";
import { BsPlusSquare } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";
import { formatCurrencyDecimal } from "../utils/calculations";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";

interface EnrichDataCardsProps {
  showCrimeData: PropertyEnrichResponse | null;
}

const EnrichDataCards: React.FC<EnrichDataCardsProps> = ({ showCrimeData }) => {
  if (!showCrimeData) return null;

  const crime = showCrimeData.data?.crime;
  const rentals = showCrimeData.data?.comps?.rental ?? [];
  const avgRent = rentals.length
    ? rentals.reduce((sum, r) => sum + r.rent, 0) / rentals.length
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

  return (
    <>
      {/* ── Crime Data ─────────────────────────────────── */}
      <CardContainer className="">
        {/* Outer header */}
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
            {/* 4 metric boxes */}
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

            {/* Crime type bars */}
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

            {/* Summary */}
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

      {/* ── Comparable Properties ──────────────────────── */}
      <CardContainer className="">
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
          {rentals.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] whitespace-nowrap">
              {rentals.length} rental{rentals.length > 1 ? "s" : ""} found
            </span>
          )}
        </div>

        <div className="bg-[#EEF2FF]/30 border-[1.173px] border-[#C6D2FF] rounded-[14px] p-5">
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
                  {rentals.length} comp{rentals.length > 1 ? "s" : ""} found
                </span>
              </div>

              {/* Comp rows */}
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
            <div className="flex flex-col items-center justify-center py-6">
              <BsPlusSquare size={28} className="text-[#99A1AF] mb-3" />
              <CommonHeader size="md" className="text-[#717182]!">
                Enter address above to view comparable properties
              </CommonHeader>
            </div>
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default EnrichDataCards;
