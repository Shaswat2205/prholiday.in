import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 border-none">
                <div className="w-12 h-12 border-4 border-secondary-cyan/20 border-t-secondary-cyan rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;
