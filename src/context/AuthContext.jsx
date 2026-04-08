import React, { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('wellnest_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    /**
     * register(name, email, password)
     * Calls POST /api/auth/register — Spring Boot creates user, returns JWT.
     */
    const register = async (name, email, password) => {
        try {
            const { data } = await authAPI.register({ name, email, password });
            _saveSession(data);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            return { success: false, message };
        }
    };

    /**
     * login(email, password)
     * Calls POST /api/auth/login — validates student credentials via Spring Boot.
     */
    const login = async (email, password) => {
        try {
            const { data } = await authAPI.login({ email, password });
            _saveSession(data);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Invalid email or password.';
            return { success: false, message };
        }
    };

    /**
     * adminLogin(email, accessKey)
     * Calls POST /api/auth/admin-login — verifies access key server-side.
     */
    const adminLogin = async (email, accessKey) => {
        try {
            const { data } = await authAPI.adminLogin({ email, accessKey });
            _saveSession(data);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Invalid admin access key.';
            return { success: false, message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wellnest_user');
        localStorage.removeItem('wellnest_token');
    };

    // Persist JWT + user profile from API response
    const _saveSession = (data) => {
        const profile = {
            id:    data.id,
            name:  data.name,
            email: data.email,
            role:  data.role.toLowerCase(),
        };
        setUser(profile);
        localStorage.setItem('wellnest_user', JSON.stringify(profile));
        localStorage.setItem('wellnest_token', data.token);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, adminLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
