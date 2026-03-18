import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const loadUser = async (currentToken) => {
        const tokenToUse = currentToken || token;
        if (tokenToUse) {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${tokenToUse}`;
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/me`);
                setUser(res.data.data);
                return res.data.data;
            } catch (err) {
                try {
                    const adminRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/me`);
                    setUser(adminRes.data.data);
                    return adminRes.data.data;
                } catch (adminErr) {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    return null;
                }
            }
        }
        setLoading(false);
        return null;
    };

    useEffect(() => {
        loadUser().finally(() => setLoading(false));
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        const userData = await loadUser(res.data.token);
        return { ...res.data, user: userData };
    };

    const loginAdmin = async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        const userData = await loadUser(res.data.token);
        return { ...res.data, user: userData };
    };

    const register = async (userData) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users/register`, userData);
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            token,
            login,
            loginAdmin,
            register,
            logout,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
