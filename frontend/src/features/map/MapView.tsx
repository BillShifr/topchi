import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { Box } from '@mui/material';
import L from 'leaflet';

const DEFAULT_POSITION: [number, number] = [55.751244, 37.618423]; // Москва

interface EventMarker {
    id: string;
    title: string;
    position: [number, number];
}

interface MapViewProps {
    events: EventMarker[];
    onMapClick: (latlng: L.LatLng) => void;
}

const MapEvents = ({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};

export default function MapView({ events, onMapClick }: MapViewProps) {
    return (
        <Box sx={{ height: '70vh', width: '100%', borderRadius: 2, overflow: 'hidden' }}>
            <MapContainer center={DEFAULT_POSITION} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onMapClick={onMapClick} />
                {events.map(({ id, title, position }) => (
                    <Marker key={id} position={position}>
                        <Popup>{title}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
}
