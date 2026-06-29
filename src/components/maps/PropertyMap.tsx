import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
interface PropertyMapProps {
  lat: number;
  lng: number;
  address: string;
  zipCode: string;
}
const PropertyMap: React.FC<PropertyMapProps> = ({
  lat,
  lng,
  address,
  zipCode,
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-border  h-72">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <span className="text-xs font-medium">{address}</span>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay badges on top of map */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-3 z-[400] pointer-events-none">
        <p className="text-white text-sm font-medium leading-snug">{address}</p>
        <p className="text-white/60 text-xs mt-0.5">
          {lat.toFixed(4)}°N, {Math.abs(lng).toFixed(4)}°W
        </p>
      </div>
      <span className="absolute top-3 left-3 z-[400] bg-black/55 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        📍 {zipCode}
      </span>
    </div>
  );
};
export default PropertyMap;
