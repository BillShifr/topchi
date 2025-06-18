import {Box} from '@mui/material';
import Header from '../../layout/header/Header.tsx';
import Footer from '../../layout/footer/ Footer.tsx';
import MapPage from "../mapPage/MapPage.tsx";

export default function MainPage() {
    return (
        <Box className="page-wrapper">
            <Header/>
            <MapPage/>
            <Footer/>
        </Box>
    );
}