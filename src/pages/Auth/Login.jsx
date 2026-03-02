import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role);
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/student');
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl shadow-primary-100/50 border border-primary-50">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 font-heading">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to access your dashboard
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <button
                        onClick={() => handleLogin('student')}
                        className="group relative w-full flex justify-center items-center space-x-3 py-4 px-4 border border-transparent text-lg font-medium rounded-xl text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        <span>Login as Student</span>
                        <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">Or administration</span>
                        </div>
                    </div>

                    <button
                        onClick={() => handleLogin('admin')}
                        className="group relative w-full flex justify-center items-center space-x-3 py-4 px-4 border border-slate-200 text-lg font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all transform hover:-translate-y-1 hover:shadow-sm"
                    >
                        <ShieldCheck className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:scale-110 transition-all" />
                        <span>Login as Administrator</span>
                        <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">
                        Secure login portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
