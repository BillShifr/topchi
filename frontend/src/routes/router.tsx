import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MapPage from '../pages/MapPage';
import {JSX} from "react";

const routes: ({ path: string; element: JSX.Element })[] = [
    {
        path: '/',
        element: <MapPage/>,
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
        element: <MapPage/>,
    },
];

export const router = createBrowserRouter(routes);