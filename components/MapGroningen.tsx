import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom icon for the pin
const GroningenIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function MapGroningen() {
  return (
    <MapContainer
      center={[53.2193835, 6.5665018]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: 320, borderRadius: 12, zIndex: 0 }}
    >
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[53.2193835, 6.5665018]} icon={GroningenIcon}>
      <Popup>
        NP-Restaurant
        <br />
        Hoofdstraat 123, Groningen
      </Popup>
      </Marker>
    </MapContainer>
  );
}
