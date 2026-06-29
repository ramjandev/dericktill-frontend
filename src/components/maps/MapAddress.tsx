import type { FMRData, GeoCode } from "@/store/features/property/types/hud";
import CommonHeader from "../common/header/CommonHeader";

interface MapAddressProps {
  geocode: GeoCode;
  fmr: FMRData;
}
const MapAddress: React.FC<MapAddressProps> = ({ geocode, fmr }) => {
  return (
    <div className="bg-white  border border-border  rounded-xl p-5 flex flex-col justify-between gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <CommonHeader size="xs">Address</CommonHeader>

          <CommonHeader size="sm" className="font-bold! text-black!">
            {geocode.formattedAddress}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader size="xs">County</CommonHeader>
          <CommonHeader size="sm" className="font-bold! text-black!">
            {geocode.county}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader size="xs">State</CommonHeader>
          <CommonHeader size="sm" className="font-bold! text-black!">
            {geocode.state}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader size="xs">Coordinates</CommonHeader>
          <CommonHeader size="sm" className="font-bold! text-black!">
            {geocode.latitude.toFixed(4)}, {geocode.longitude.toFixed(4)}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader size="xs">FIPS code</CommonHeader>
          <CommonHeader size="sm" className="font-bold! text-black!">
            {fmr.diagnostics.fipsCode}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader size="xs">FMR year</CommonHeader>
          <CommonHeader size="sm" className="font-bold! text-black!">
            {fmr.year}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader size="xs">Entity ID</CommonHeader>
          <CommonHeader size="sm" className="font-bold! text-black!">
            {fmr.diagnostics.entityId}
          </CommonHeader>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="text-[10px] bg-blue-50  text-blue-600  border border-blue-200 px-2.5 py-1 rounded-full">
          HUD API
        </span>
        <span className="text-[10px] bg-emerald-50  text-emerald-700  border border-emerald-200  px-2.5 py-1 rounded-full">
          FIPS Endpoint
        </span>
        {fmr.diagnostics.success && (
          <span className="text-[10px] bg-zinc-100 d text-zinc-600  px-2.5 py-1 rounded-full">
            ✓ Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default MapAddress;
