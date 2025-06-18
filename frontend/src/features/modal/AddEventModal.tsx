import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import L from 'leaflet';

interface AddEventModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (event: {
        id: string;
        title: string;
        position: [number, number];
        activity: string;
    }) => void;
    position: L.LatLng | null;
}

const activityTypes = [
    { value: 'running', label: 'Бег' },
    { value: 'yoga', label: 'Йога' },
    { value: 'workout', label: 'Воркаут' },
    { value: 'skiing', label: 'Лыжи' },
    { value: 'cycling', label: 'Велосипед' },
    { value: 'swimming', label: 'Плавание' },
];

export default function AddEventModal({ open, onClose, onAdd, position }: AddEventModalProps) {
    const [title, setTitle] = useState('');
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState(dayjs());
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!title || !activity || !position) return;
        const newEvent = {
            id: Date.now().toString(),
            title,
            activity,
            position: [position.lat, position.lng] as [number, number],
        };
        onAdd(newEvent);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setActivity('');
        setDate(dayjs());
        setDescription('');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Добавить тренировку</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Название"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        select
                        label="Тип активности"
                        fullWidth
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                    >
                        {activityTypes.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Дата и время"
                            value={date}
                            onChange={(newValue) => setDate(newValue || dayjs())}
                            // slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Описание"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={!position}>
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
