import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Logo from './Logo';
import './header.css';

const Header = () => {
    return (
        <AppBar position="static" className="app-header" elevation={1}>
            <Toolbar className="toolbar">
                <Logo />
                <Box className="header-title">
                    <Typography variant="h6" component="div">
                        Спортивный Хаб
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
