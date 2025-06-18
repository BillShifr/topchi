import React, { useState } from 'react';
import MapView from '../../features/map/MapView';
import MapActionButtons from '../../features/map/MapActionButtons';
import ActivityFilter from '../../features/map/ActivityFilter';
import SearchEventModal from '../../features/modal/SearchEventModal';
import AddEventModal from '../../features/modal/AddEventModal';
import { Box, Container } from '@mui/material';
import L from 'leaflet';

type Event = {
    id: string;
    title: string;
    position: [number, number];
    activity: string;
};

export default function MapPage() {
    const [events, setEvents] = useState<Event[]>([
        { id: '1', title: 'Бег в парке', position: [55.75, 37.61], activity: 'running' },
        { id: '2', title: 'Йога на траве', position: [55.76, 37.62], activity: 'yoga' },
    ]);

    const [searchOpen, setSearchOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false); // 🔹 добавили
    const [filter, setFilter] = useState<string>('');
    const [selectedPosition, setSelectedPosition] = useState<L.LatLng | null>(null);

    const filteredEvents = filter ? events.filter((e) => e.activity === filter) : events;

    const handleOpenSearch = () => setSearchOpen(true);
    const handleCloseSearch = () => setSearchOpen(false);

    const handleSearchParams = (params: { activity: string; date: string; location: string }) => {
        console.log('Search params:', params);
    };

    const handleMapClick = (latlng: L.LatLng) => {
        setSelectedPosition(latlng);
    };

    const handleOpenAdd = () => {
        if (selectedPosition) {
            setAddOpen(true);
        } else {
            alert('Нажмите на карту, чтобы выбрать место для события');
        }
    };

    const handleCloseAdd = () => {
        setAddOpen(false);
        setSelectedPosition(null);
    };

    const handleAddEvent = (newEvent: Event) => {
        setEvents((prev) => [...prev, newEvent]);
        handleCloseAdd();
    };

    return (
        <Box className="page-wrapper">
            <Container className="map-container" sx={{ position: 'relative' }}>
                <ActivityFilter selected={filter} onChange={setFilter} />
                <Box className="map-section" sx={{ position: 'relative' }}>
                    <MapView events={filteredEvents} onMapClick={handleMapClick} />
                    <MapActionButtons onOpenSearch={handleOpenSearch} onOpenAdd={handleOpenAdd} />
                </Box>
            </Container>

            <SearchEventModal
                open={searchOpen}
                onClose={handleCloseSearch}
                onSearch={handleSearchParams}
            />

            <AddEventModal
                open={addOpen}
                onClose={handleCloseAdd}
                onAdd={handleAddEvent}
                position={selectedPosition}
            />
        </Box>
    );
}
