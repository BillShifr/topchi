import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#a0ff4f', // салатовый
        },
        background: {
            default: '#f7f7f7',
        },
    },
    shape: {
        borderRadius: 12,
    },
});
