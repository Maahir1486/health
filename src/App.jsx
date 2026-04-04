import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home/index';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

import StudentLayout from './pages/Student/index';
import AdminLayout from './pages/Admin/index';

// Route guards
const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/student/*"
        element={
          <ProtectedRoute roleRequired="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roleRequired="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
              <p>A Project for FSAD KL University.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
