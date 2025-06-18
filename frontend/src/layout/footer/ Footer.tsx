import { Box, Typography } from '@mui/material';
import './footer.css';

const Footer = () => {
    return (
        <Box className="app-footer">
            <Typography variant="body2" align="center" color="textSecondary">
                © {new Date().getFullYear()} Спортивный Хаб. Все права защищены.
            </Typography>
        </Box>
    );
};

export default Footer;
