import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack,
} from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    onSearch: (params: { activity: string; date: string; location: string }) => void;
}

const activities = [
    { id: 'running', label: 'Бег' },
    { id: 'workout', label: 'Тренировка' },
    { id: 'yoga', label: 'Йога' },
    { id: 'skiing', label: 'Лыжи' },
];

export default function SearchEventModal({ open, onClose, onSearch }: Props) {
    const [activity, setActivity] = React.useState('');
    const [date, setDate] = React.useState('');
    const [location, setLocation] = React.useState('');

    const handleSearch = () => {
        onSearch({ activity, date, location });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Поиск тренировки</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        select
                        label="Тип активности"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        fullWidth
                    >
                        {activities.map((a) => (
                            <MenuItem key={a.id} value={a.id}>
                                {a.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        type="date"
                        label="Дата"
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Местоположение (город)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSearch} variant="contained">
                    Найти
                </Button>
            </DialogActions>
        </Dialog>
    );
}
