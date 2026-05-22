"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

export default function Map({
  position,
}: {
  position: [number, number];
}) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      zoomControl={false}
      className="h-80 w-full rounded-3xl z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          Your current location
        </Popup>
      </Marker>
    </MapContainer>
  );
}