import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import css from "./map.css";

type LeafletProps = {
  position?: [number, number]
  zone?: string
}

export function LeafletMap({ position, zone }: LeafletProps) {
  const mapRef = useRef(null)
  const centermap = {
    lat: -34.6037389,
    lng: -58.3815704,
  };

  useEffect(() => {
    if (position && mapRef.current) {
      // Centra el mapa en la nueva ubicación y ajusta el zoom
      mapRef.current.setView(position, 15);
    }
  }, [position]);

  return (
    <div className={css.mapContainer}>
      <MapContainer ref={mapRef} className={css.map} center={centermap} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position &&
          <Marker position={position}>
            <Popup>
              {zone}
            </Popup>
          </Marker>}
      </MapContainer>
    </div>
  );
};



