import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Home} from './pages/Home/Home';
import {About} from './pages/About/About';
import {SomethingList} from './pages/SomethingList/SomethingList';
import {SomethingDetails} from './pages/SomethingDetails/SomethingDetails';
import {RootLayout} from "./components/RootLayout/RootLayout";
import {Login} from "./pages/Login/Login";
import {Signup} from './pages/Signup/Signup';
import {Profile} from './pages/Profile/Profile';
import {ProtectedRoute} from './components/ProtectedRoute/ProtectedRoute';
import {AuthProvider} from './context/AuthContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'about', element: <About/>},
            {path: 'items', element: <SomethingList/>},
            {path: 'items/:id', element: <SomethingDetails/>},
            {path: 'login', element: <Login/>},
            {path: 'signup', element: <Signup/>},
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

const App: React.FC = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    );
}

export default App;