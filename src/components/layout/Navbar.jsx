import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isAuthPage = location.pathname === '/login';

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-8 w-8 text-primary-500 fill-primary-100" />
                        <Link to="/" className="text-2xl font-bold font-heading text-primary-700 tracking-tight">
                            WellNest
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        {!user && !isAuthPage && (
                            <>
                                <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Home</Link>
                                <Link to="/login" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                    Sign In
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/student'}
                                    className="flex items-center space-x-1 text-slate-600 hover:text-primary-600 font-medium transition-colors"
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    <span>Dashboard</span>
                                </Link>
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                <div className="flex items-center space-x-2 text-slate-700">
                                    <UserCircle className="h-5 w-5 text-primary-500" />
                                    <span className="font-medium">{user.name}</span>
                                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full capitalize">
                                        {user.role}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
