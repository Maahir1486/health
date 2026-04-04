import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../mock/data';

// Hardcoded admin access key
const ADMIN_ACCESS_KEY = 'mad*456';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('wellnest_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    /**
     * adminLogin(email, accessKey)
     * Admin logs in with any email + the access key 'mad*456'.
     * Returns { success: true } or { success: false, message: '...' }
     */
    const adminLogin = (email, accessKey) => {
        if (!email.trim()) return { success: false, message: 'Email is required.' };
        if (accessKey !== ADMIN_ACCESS_KEY) {
            return { success: false, message: 'Invalid admin access key.' };
        }
        const loggedIn = {
            id: mockUsers.admin.id,
            name: mockUsers.admin.name,
            email: email.trim().toLowerCase(),
            role: 'admin',
        };
        setUser(loggedIn);
        localStorage.setItem('wellnest_user', JSON.stringify(loggedIn));
        return { success: true };
    };

    /**
     * login(email, password)
     * Student-only login — validates against localStorage registered users.
     * Returns { success: true } or { success: false, message: '...' }
     */
    const login = (email, password) => {
        const registeredRaw = localStorage.getItem('wellnest_registered_users');
        const registered = registeredRaw ? JSON.parse(registeredRaw) : [];
        const found = registered.find(
            (u) =>
                u.email.toLowerCase() === email.trim().toLowerCase() &&
                u.password === password
        );
        if (!found) {
            return { success: false, message: 'Invalid email or password.' };
        }
        const loggedIn = { id: found.id, name: found.name, email: found.email, role: 'student' };
        setUser(loggedIn);
        localStorage.setItem('wellnest_user', JSON.stringify(loggedIn));
        return { success: true };
    };

    /**
     * register(name, email, password)
     * Student sign-up — saves to localStorage and auto-logs in.
     * Returns { success: true } or { success: false, message: '...' }
     */
    const register = (name, email, password) => {
        const registeredRaw = localStorage.getItem('wellnest_registered_users');
        const registered = registeredRaw ? JSON.parse(registeredRaw) : [];
        const alreadyExists = registered.some(
            (u) => u.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (alreadyExists) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const newUser = {
            id: `u_${Date.now()}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
            role: 'student',
        };
        localStorage.setItem('wellnest_registered_users', JSON.stringify([...registered, newUser]));
        const loggedIn = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'student' };
        setUser(loggedIn);
        localStorage.setItem('wellnest_user', JSON.stringify(loggedIn));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wellnest_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, adminLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
