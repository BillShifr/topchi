import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

type Props = {
    selected: string;
    onChange: (value: string) => void;
};

export default function ActivityFilter({ selected, onChange }: Props) {
    const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
        if (newValue !== null) {
            onChange(newValue);
        } else {
            onChange('');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <ToggleButtonGroup
                value={selected}
                exclusive
                onChange={handleChange}
                aria-label="activity filter"
                size="small"
            >
                <ToggleButton value="running" aria-label="Бег">
                    <DirectionsRunIcon /> Бег
                </ToggleButton>
                <ToggleButton value="yoga" aria-label="Йога">
                    <SelfImprovementIcon /> Йога
                </ToggleButton>
                <ToggleButton value="workout" aria-label="Воркаут">
                    <FitnessCenterIcon /> Воркаут
                </ToggleButton>
                <ToggleButton value="skiing" aria-label="Лыжи">
                    <DownhillSkiingIcon /> Лыжи
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
