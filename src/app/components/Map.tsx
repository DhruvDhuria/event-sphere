"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";



let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({
  latitude,
  longitude,
  eventName,
}: {
  latitude: number;
  longitude: number;
  eventName: string;
}) => {

   if (latitude === undefined || longitude === undefined) {
     return (
       <div style={{ height: "400px", width: "100%" }}>Loading map...</div>
     );
   }

  const position: [number, number] = [latitude, longitude];

  console.log("latitude: ",latitude, "longitude: ", longitude)
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{eventName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
