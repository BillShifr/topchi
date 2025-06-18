import React from 'react';
import { Box, Button, Stack } from '@mui/material';

interface MapActionButtonsProps {
    onOpenSearch: () => void;
    onOpenAdd: () => void;
}

export default function MapActionButtons({ onOpenSearch, onOpenAdd }: MapActionButtonsProps) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Stack spacing={1}>
                <Button variant="contained" color="primary" onClick={onOpenSearch}>
                    Найти
                </Button>
                <Button variant="contained" color="secondary" onClick={onOpenAdd}>
                    Добавить
                </Button>
            </Stack>
        </Box>
    );
}
