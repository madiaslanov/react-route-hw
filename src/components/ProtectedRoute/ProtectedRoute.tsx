import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export function ProtectedRoute({children}: ProtectedRouteProps) {
    const {currentUser} = useAuth();

    if (!currentUser) {
        return <Navigate to="/login"/>;
    }

    return children;
}