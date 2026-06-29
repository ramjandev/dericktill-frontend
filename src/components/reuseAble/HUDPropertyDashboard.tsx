import type { HudResponse } from "@/store/features/property/types/hud";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CommonHeader from "../common/header/CommonHeader";
import FMRCard from "../maps/FMRCard";
import { fmt, pctDelta } from "../maps/Helpers";
import MapAddress from "../maps/MapAddress";
import MapCharts from "../maps/MapCharts";
import MapHeader from "../maps/MapHeader";
import PropertyMap from "../maps/PropertyMap";
import StatCard from "../maps/StatCard";
import ZipTable from "../maps/ZipTable";

// Fix Leaflet default marker icon broken by webpack/vite bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type UnitType =
  | "studio"
  | "oneBedroom"
  | "twoBedroom"
  | "threeBedroom"
  | "fourBedroom";

const UNIT_LABELS: Record<UnitType, string> = {
  studio: "Studio",
  oneBedroom: "1 BR",
  twoBedroom: "2 BR",
  threeBedroom: "3 BR",
  fourBedroom: "4 BR",
};

const UNIT_KEYS: UnitType[] = [
  "studio",
  "oneBedroom",
  "twoBedroom",
  "threeBedroom",
  "fourBedroom",
];

type HUDPropertyDashboardProps = { data: HudResponse };

const HUDPropertyDashboard: React.FC<HUDPropertyDashboardProps> = ({
  data,
}) => {
  const inner = data?.data;
  if (!inner?.geocode || !inner?.fmr?.allZipCodeData) return null;

  const { geocode, fmr } = inner;

  const timestamp = data?.timestamp ?? "";

  const msaRow = fmr.allZipCodeData.find((z) => z.zipCode === "MSA level");

  const chartData = UNIT_KEYS.map((key) => ({
    name: UNIT_LABELS[key],
    "This ZIP": fmr[key],
    "MSA avg": msaRow?.[key] ?? 0,
  }));

  const statCards: { label: string; key: UnitType }[] = [
    { label: `Studio · ${geocode.zipCode}`, key: "studio" },
    { label: `2 BR · ${geocode.zipCode}`, key: "twoBedroom" },
    { label: `4 BR · ${geocode.zipCode}`, key: "fourBedroom" },
  ];

  return (
    <div className="bg-zinc-50  p-5 font-sans space-y-5 rounded-2xl">
      <MapHeader fmr={fmr} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PropertyMap
          lat={geocode.latitude}
          lng={geocode.longitude}
          address={geocode.formattedAddress}
          zipCode={geocode.zipCode}
        />

        <MapAddress geocode={geocode} fmr={fmr} />
      </div>

      <div>
        <CommonHeader size="lg">
          Fair market rents · ZIP {geocode.zipCode}
        </CommonHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
          {UNIT_KEYS.map((key) => (
            <FMRCard
              key={key}
              label={UNIT_LABELS[key]}
              value={fmr[key]}
              msaValue={msaRow?.[key] ?? 0}
              highlight={key === "twoBedroom"}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {statCards.map(({ label, key }) => {
          const { display, positive } = pctDelta(
            fmr[key],
            msaRow?.[key] ?? fmr[key],
          );
          return (
            <StatCard
              key={key}
              label={label}
              value={fmt(fmr[key])}
              delta={display}
              positive={positive}
            />
          );
        })}
      </div>

      <MapCharts zipCode={geocode.zipCode} chartData={chartData} />

      <ZipTable
        rows={fmr.allZipCodeData}
        targetZip={fmr.diagnostics.targetZip}
      />

      {timestamp && (
        <div className="flex items-center justify-center gap-2">
          <CommonHeader size="xs">
            Data from {fmr.raw.source} · Updated{" "}
            {new Date(timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CommonHeader>
        </div>
      )}
    </div>
  );
};

export default HUDPropertyDashboard;
