import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../mock/data';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Try to get user from localStorage completely optionally, for mock persistence
        const savedUser = localStorage.getItem('wellnest_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (role) => {
        const selectedUser = role === 'admin' ? mockUsers.admin : mockUsers.student;
        setUser(selectedUser);
        localStorage.setItem('wellnest_user', JSON.stringify(selectedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wellnest_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
