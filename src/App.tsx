import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { SomethingList } from './pages/SomethingList/SomethingList';
import { SomethingDetails } from './pages/SomethingDetails/SomethingDetails';
import { RootLayout } from "./components/RootLayout/RootLayout";
import {Login} from "./pages/Login/Login.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'items', element: <SomethingList /> },
            { path: 'items/:id', element: <SomethingDetails /> },
            { path: 'login', element: <Login /> },
        ],
    },
]);

const App: React.FC = () => {
    return <RouterProvider router={router} />;
}

export default App;