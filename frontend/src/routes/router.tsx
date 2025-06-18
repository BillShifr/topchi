import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MapPage from '../pages/mapPage/MapPage.tsx';
import {JSX} from "react";
import MainPage from "../pages/mainPage/MainPage.tsx";

const routes: ({ path: string; element: JSX.Element })[] = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '*',
        element: <MainPage/>,
    },
];

export const router = createBrowserRouter(routes);