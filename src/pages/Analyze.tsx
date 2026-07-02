import CommonContainer from "@/components/common/CommonContainer";
import MiniSpinner from "@/components/common/custom/MiniSpinner";
import { useDebounce } from "@/components/common/custom/useDebounce";
import TabSwitcher from "@/components/common/TabSwitcher";
import DealCard from "@/components/deal/DealCard";
import DealInputsPanel from "@/components/deal/DealInputsPanel";
import EnrichDataCards from "@/components/reuseAble/EnrichDataCards";
import HUDPropertyDashboard from "@/components/reuseAble/HUDPropertyDashboard";
import MiniCard from "@/components/reuseAble/MiniCard";
import StrategyCard from "@/components/reuseAble/StrategyCard";
import type { DealInputsSchema } from "@/components/schema/dealSchema";
import {
  useCalculateBrrrrMutation,
  useCalculateSection8Mutation,
  useCalculateTurnkeyMutation,
  useEnrichAddressMutation,
  useHudSection8Mutation,
} from "@/store/features/property/propertyApi";
import type {
  PropertyBrrr,
  PropertySection8,
  PropertyTurnkey,
} from "@/store/features/property/types/brr";
import type { StrategyType } from "@/store/features/property/types/calculation";
import type { PropertyEnrichResponse } from "@/store/features/property/types/enrich";
import type { HudResponse } from "@/store/features/property/types/hud";
import type {
  BrrrrCalculationResponse,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "@/store/features/property/types/output";
import { Building2, RefreshCw, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import DealResultsPanel from "../components/deal/DealResultsPanel";
import SaveDealModal from "../components/deal/SaveDealModal";
import type { DealInputs } from "../types";

interface Tab {
  id: StrategyType;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  desc: string;
  tags: string[];
  tabBg: string;
}

const TABS: Tab[] = [
  {
    id: "BRRRR",
    label: "BRRRR",
    icon: <RefreshCw size={14} />,
    bgColor: " border-[#8EC5FF] bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE]",
    color: "text-[#1C398E]!",
    tabBg: "bg-[#BEDBFF]!",
    desc: "Buy, Rehab, Rent, Refinance, Repeat. Purchase undervalued properties, renovate them, rent them out, then refinance to pull out equity and repeat the process.",
    tags: ["Equity Recycling", "Forced Appreciation", "Scale Rapidly"],
  },
  {
    id: "TURNKEY",
    label: "Turnkey",
    icon: <TrendingUp size={14} />,
    bgColor: " border-[#7BF1A8] bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7]",
    color: "text-[#016630]!",
    tabBg: "bg-[#B9F8CF]",
    desc: "Buy & Hold rental properties that are move-in ready. Focus on cash flow, appreciation, and long-term passive income with minimal renovation needed.",
    tags: ["Immediate Cash Flow", "Low Maintenance", "Passive Income"],
  },
  {
    id: "SECTION_8",
    label: "Section 8",
    icon: <Building2 size={14} />,
    bgColor: "border-[#DAB2FF] bg-gradient-to-r from-[#FAF5FF] to-[#F3E8FF]",
    color: "text-[#59168B]",
    tabBg: "bg-[#E9D4FF]",
    desc: "Government-subsidized housing program. Tenants pay a portion of rent while the government covers the rest, providing stable and guaranteed income.",
    tags: ["Guaranteed Rent", "Gov Subsidized", "Stable Income"],
  },
];
const DEFAULT_INPUTS: DealInputs = {
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",

  bedrooms: 3,

  purchasePrice: 150000,
  downPayment: 30000,
  downPaymentPercent: 20,

  arv: 200000,
  monthlyRent: 1500,
  rehabCost: 10000,
  rehabDurationMonths: 6,
  propertyTax: 200,
  insurance: 100,
  utilities: 150,
  otherExpenses: 100,

  propertyLink: "https://example.com",

  vacancyRate: 5,
  maintenanceRate: 5,
  capexRate: 5,
  propertyMgmtRate: 10,

  interestRate: 6,
  loanTerm: 30,
  loanPoints: 1,

  closingCost: 5000,
  holdingCost: 2000,

  refinanceLtv: 75,
  refinanceInterestRate: 6.5,
  refinanceLoanTerm: 30,
  refinanceCost: 4000,

  // Turnkey-specific
  lenderFees: 2000,
  marketRent: 1600,
  section8Rent: 1400,
  crimeScore: 0,
};

const Analyze = () => {
  const [showCrimeData, setShowCrimeData] =
    useState<PropertyEnrichResponse | null>(null);

  const [activeTab, setActiveTab] = useState<StrategyType>("BRRRR");
  const [inputs, setInputs] = useState<DealInputs>(DEFAULT_INPUTS);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [response, setResponse] = useState<
    | BrrrrCalculationResponse
    | TurnkeyCalculationResponse
    | Section8DSCRResponse
    | null
  >(null);

  const [enrichAddress, { isLoading: isEnrichLoading }] =
    useEnrichAddressMutation();

  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  const [calculateBrrrr, { isLoading: isBrrrrLoading }] =
    useCalculateBrrrrMutation();
  const [calculateTurnkey, { isLoading: isTurnkeyLoading }] =
    useCalculateTurnkeyMutation();
  const [calculateSection8, { isLoading: isSection8Loading }] =
    useCalculateSection8Mutation();

  const isCalculating = isBrrrrLoading || isTurnkeyLoading || isSection8Loading;

  const handleChange = (key: keyof DealInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const buildBrrrPayload = (data: DealInputsSchema): PropertyBrrr => ({
    stateAddress: data.streetAddress,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    bedRooms: data.bedrooms,
    purchasePrice: data.purchasePrice,
    downPayment: data.downPayment,
    downPaymentPercent: data.downPaymentPercent,
    arvAfterRepairValue: data.arv ?? 0,
    monthlyRent: data.monthlyRent,
    rehabCost: data.rehabCost ?? 0,
    rehabDurationMonths: data.rehabDurationMonths ?? 0,
    annualPropertyTax: data.propertyTax ?? 0,
    annualInsurance: data.insurance ?? 0,
    annualUtilities: data.utilities ?? 0,
    annualOtherExpense: data.otherExpenses ?? 0,
    vacancyRate: data.vacancyRate,
    maintenanceRate: data.maintenanceRate,
    managementRate: data.propertyMgmtRate,
    capexRate: data.capexRate,
    interestRate: data.interestRate,
    loanTerm: data.loanTerm,

    refinanceLtv: data.refinanceLtv ?? 0,
    refinanceInterestRate: data.refinanceInterestRate ?? 0,
    refinanceLoanTerm: data.refinanceLoanTerm ?? 0,
    closingCost: data.closingCost,
    refinanceCost: data.refinanceCost ?? 0,
    holdingCost: data.holdingCost,
    loanPoints: data.loanPoints ?? 0,
    crimeScore: showCrimeData?.data.crime?.crimeScore ?? 0,
  });

  const buildTurnkeyPayload = (data: DealInputsSchema): PropertyTurnkey => ({
    stateAddress: data.streetAddress,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    bedRooms: data.bedrooms,
    purchasePrice: data.purchasePrice,
    downPayment: data.downPayment,
    downPaymentPercent: data.downPaymentPercent,
    arvAfterRepairValue: data.arv,
    monthlyRent: data.monthlyRent,
    rehabCost: data.rehabCost,
    annualPropertyTax: data.propertyTax,
    annualInsurance: data.insurance,
    annualUtilities: data.utilities,
    annualOtherExpense: data.otherExpenses,
    vacancyRate: data.vacancyRate,
    maintenanceRate: data.maintenanceRate,
    managementRate: data.propertyMgmtRate,
    capexRate: data.capexRate,
    interestRate: data.interestRate,
    loanTerm: data.loanTerm,
    loanPoints: data.loanPoints,
    lenderFees: data.lenderFees,
    closingCost: data.closingCost,
    holdingCost: data.holdingCost,
    section8Rent: data.section8Rent,
    crimeScore: showCrimeData?.data.crime?.crimeScore ?? 0,
  });

  const buildSection8Payload = (data: DealInputsSchema): PropertySection8 => ({
    stateAddress: data.streetAddress,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    bedRooms: data.bedrooms,
    purchasePrice: data.purchasePrice,
    downPayment: data.downPayment,
    arvAfterRepairValue: data.arv ?? 0,
    monthlyRent: data.monthlyRent,
    rehabCost: data.rehabCost ?? 0,
    annualPropertyTax: data.propertyTax ?? 0,
    annualInsurance: data.insurance ?? 0,
    annualUtilities: data.utilities ?? 0,
    annualOtherExpense: data.otherExpenses ?? 0,
    vacancyRate: data.vacancyRate,
    maintenanceRate: data.maintenanceRate,
    managementRate: data.propertyMgmtRate,
    capexRate: data.capexRate,
    interestRate: data.interestRate,
    loanTerm: data.loanTerm,
    refinanceLtv: data.refinanceLtv ?? 0,
    refinanceInterestRate: data.refinanceInterestRate ?? 0,
    refinanceLoanTerm: data.refinanceLoanTerm ?? 0,
    closingCost: data.closingCost,
    refinanceCost: data.refinanceCost ?? 0,
    holdingCost: data.holdingCost,
    crimeScore: showCrimeData?.data.crime?.crimeScore ?? 0,
  });

  const handleCalculate: SubmitHandler<DealInputsSchema> = async (data) => {
    try {
      // Enrich address to get crime data
      const fullAddress = `${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}`;

      const enrichRes = await fetchEnrichWithCache(fullAddress);
      setShowCrimeData(enrichRes);

      if (activeTab === "BRRRR") {
        const res = await calculateBrrrr(buildBrrrPayload(data)).unwrap();
        setResponse(res);
      } else if (activeTab === "TURNKEY") {
        const res = await calculateTurnkey(buildTurnkeyPayload(data)).unwrap();
        setResponse(res);
      } else {
        const res = await calculateSection8(
          buildSection8Payload(data),
        ).unwrap();
        setResponse(res);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Calculation API error:", error);
    }
  };

  // Analyze.tsx

  const enrichCacheRef = useRef<Map<string, PropertyEnrichResponse>>(new Map());

  const fetchEnrichWithCache = async (address: string) => {
    // Return cached result if exists
    if (enrichCacheRef.current.has(address)) {
      return enrichCacheRef.current.get(address)!;
    }

    const result = await enrichAddress({ address }).unwrap();

    // Store in cache
    enrichCacheRef.current.set(address, result);
    return result;
  };
  //auto enrich address
  const fullAddress =
    `${inputs.streetAddress}, ${inputs.city}, ${inputs.state} ${inputs.zipCode}`.trim();

  const debouncedAddress = useDebounce(fullAddress, 800);

  useEffect(() => {
    if (
      !inputs.streetAddress.trim() ||
      !inputs.city.trim() ||
      !inputs.state.trim() ||
      !inputs.zipCode.trim()
    )
      return;

    const run = async () => {
      try {
        const enrichRes = await fetchEnrichWithCache(debouncedAddress);
        setShowCrimeData(enrichRes);
      } catch {
        setShowCrimeData(null);
      }
    };

    run();
  }, [debouncedAddress]);

  const dealRating =
    response && "data" in response
      ? ((response as BrrrrCalculationResponse).data.dealScoreboard?.rating ??
        (response as TurnkeyCalculationResponse).data?.responseData
          ?.dealScoreboard?.rating ??
        "")
      : "";

  const ratingColorClass =
    dealRating === "GOOD DEAL"
      ? "text-green-600"
      : dealRating === "AVERAGE DEAL"
        ? "text-yellow-600"
        : "text-red-600";

  //Hud auto enrich
  const [hudData, setHudData] = useState<HudResponse | undefined>();
  const [hudSection8, { isLoading: isHudEnrich }] = useHudSection8Mutation();

  const hudCacheRef = useRef<Map<string, HudResponse>>(new Map());

  const fetchHudWithCache = async (address: string) => {
    if (hudCacheRef.current.has(address)) {
      return hudCacheRef.current.get(address)!;
    }

    const result = await hudSection8({ address }).unwrap();
    hudCacheRef.current.set(address, result);
    return result;
  };

  useEffect(() => {
    if (activeTab !== "SECTION_8") return;
    if (
      !inputs.streetAddress.trim() ||
      !inputs.city.trim() ||
      !inputs.state.trim() ||
      !inputs.zipCode.trim()
    )
      return;

    const run = async () => {
      try {
        const hud = await fetchHudWithCache(debouncedAddress);
        setHudData(hud);
      } catch {
        setShowCrimeData(null);
      }
    };

    run();
  }, [debouncedAddress, activeTab]);
  return (
    <CommonContainer>
      <div className="flex-1 flex flex-col w-full">
        {response && (
          <DealCard
            response={response}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowSaveModal={setShowSaveModal}
            ratingColorClass={ratingColorClass}
          />
        )}

        <div className="flex-1 w-full mt-5">
          <TabSwitcher
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onChange={() => setResponse(null)}
          />

          <StrategyCard
            label={activeTabData.label}
            icon={activeTabData.icon}
            desc={activeTabData.desc}
            tags={activeTabData.tags}
            tabBg={activeTabData.tabBg}
            bgColor={activeTabData.bgColor}
            color={activeTabData.color}
          />

          <div className="flex flex-col lg:flex-row gap-7.5 pt-7.5">
            <div className="space-y-6 w-full lg:max-w-100">
              <DealInputsPanel
                inputs={inputs}
                setInputs={setInputs}
                dealType={activeTab}
                onChange={handleChange}
                onCalculate={handleCalculate}
                hasResults={!!response}
                isLoading={isCalculating}
              />
            </div>

            <div className="flex-1 space-y-6">
              {response ? (
                <DealResultsPanel
                  response={response}
                  activeTab={activeTab}
                  inputs={inputs}
                />
              ) : (
                <MiniCard isCalculating={isCalculating} activeTab={activeTab} />
              )}
              {isEnrichLoading || isHudEnrich ? (
                <MiniSpinner />
              ) : (
                <>
                  <EnrichDataCards showCrimeData={showCrimeData} />

                  {activeTab === "SECTION_8" && hudData && (
                    <HUDPropertyDashboard data={hudData} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {showSaveModal && response && (
          <SaveDealModal
            response={response}
            activeTab={activeTab}
            onClose={() => setShowSaveModal(false)}
            hudData={hudData!!}
          />
        )}
      </div>
    </CommonContainer>
  );
};

export default Analyze;
