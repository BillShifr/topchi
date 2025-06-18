import {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import {Box, MenuItem, Select, Typography} from '@mui/material';
import {useAuth} from '../context/AuthContext';
import axios from 'axios';

type Event = {
    id: string;
    title: string;
    activity: string;
    date: string;
    venue?: Venue;
};

type Venue = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

const activityOptions = [
    'all', 'running', 'workout', 'yoga', 'skiing', 'cycling', 'swimming'
];

export default function MapPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [filter, setFilter] = useState('all');
    const {token, user} = useAuth();

    const fetchData = async () => {
        try {
            const [ev, ven] = await Promise.all([
                axios.get('/api/events'),
                axios.get('/api/venues'),
            ]);
            setEvents(ev.data);
            setVenues(ven.data);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredEvents = events.filter(e => filter === 'all' || e.activity === filter);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            {/* Header / Label */}
            <Box sx={{p: 2, display: 'flex', alignItems: 'center', gap: 2, backgroundColor: '#f5f5f5'}}>
                <Typography variant="h6">Фильтр активности:</Typography>
                <Select value={filter} onChange={e => setFilter(e.target.value)} size="small">
                    {activityOptions.map(a => (
                        <MenuItem key={a} value={a}>{a}</MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Main Map Section */}
            <Box sx={{flex: 1}}>
                <MapContainer center={[55.75, 37.6]} zoom={11} style={{height: '100%', width: '100%'}}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; OpenStreetMap'
                    />
                    {/* Отображаем события */}
                    {filteredEvents.map(e => (
                        e.venue &&
                        <Marker key={e.id} position={[e.venue.latitude, e.venue.longitude]}>
                            <Popup>
                                <strong>{e.title}</strong><br/>
                                {e.activity} — {new Date(e.date).toLocaleString()}
                            </Popup>
                        </Marker>
                    ))}
                    {/* Отображаем все площадки */}
                    {venues.map(venue => (
                        <Marker
                            key={venue.id}
                            position={[venue.latitude, venue.longitude]}
                            icon={L.icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                                iconAnchor: [12, 41]
                            })}
                        >
                            <Popup>
                                <strong>{venue.name}</strong>
                            </Popup>
                        </Marker>
                    ))}
                    <AddEventOnClick token={token!} onAdd={fetchData}/>
                </MapContainer>
            </Box>

            {/* Footer */}
            <Box sx={{p: 2, backgroundColor: '#f0f0f0', textAlign: 'center'}}>
                <Typography variant="body2">© 2025 Sports Training Hub</Typography>
            </Box>
        </Box>
    );
}

function AddEventOnClick({token, onAdd}: { token: string, onAdd: () => void }) {
    useMapEvents({
        click(e) {
            const confirmed = confirm('Добавить новое событие здесь?');
            if (confirmed) {
                const title = prompt('Введите название события');
                const activity = prompt('Тип активности (running/workout/yoga/etc)');
                const date = prompt('Дата и время в формате YYYY-MM-DD HH:mm');

                if (title && activity && date) {
                    axios.post('/api/events', {
                        title,
                        activity,
                        date,
                        venue: {
                            name: title,
                            latitude: e.latlng.lat,
                            longitude: e.latlng.lng
                        }
                    }, {
                        headers: {Authorization: `Bearer ${token}`}
                    }).then(() => {
                        alert('Событие добавлено!');
                        onAdd(); // обновить данные после добавления
                    }).catch(err => {
                        console.error(err);
                        alert('Ошибка при добавлении события');
                    });
                }
            }
        }
    });
    return null;
}
