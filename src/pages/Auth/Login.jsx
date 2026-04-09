import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, Eye, EyeOff, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';

const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition';

const Login = () => {
    const { login, adminLogin } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('student');

    // Student fields
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw]     = useState(false);

    // Admin fields
    const [adminEmail, setAdminEmail]         = useState('');
    const [accessKey, setAccessKey]           = useState('');
    const [showKey, setShowKey]               = useState(false);

    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError('');
        setEmail(''); setPassword(''); setShowPw(false);
        setAdminEmail(''); setAccessKey(''); setShowKey(false);
    };

    /* ── Student submit ── */
    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email.trim()) return setError('Email is required.');
        if (!password)     return setError('Password is required.');
        
        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/student');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /* ── Admin submit ── */
    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!adminEmail.trim()) return setError('Email is required.');
        if (!accessKey)         return setError('Access key is required.');
        
        setLoading(true);
        try {
            const result = await adminLogin(adminEmail, accessKey);
            if (result.success) {
                navigate('/admin');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
            <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-2xl shadow-xl shadow-primary-100/50 border border-primary-50">

                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 font-heading">Welcome back</h2>
                    <p className="mt-2 text-sm text-slate-500">Sign in to access your dashboard</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex rounded-xl overflow-hidden border border-slate-200">
                    <button type="button" id="tab-student" onClick={() => switchTab('student')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${activeTab === 'student' ? 'bg-primary-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                        <User className="h-4 w-4" /> Student
                    </button>
                    <button type="button" id="tab-admin" onClick={() => switchTab('admin')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${activeTab === 'admin' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                        <ShieldCheck className="h-4 w-4" /> Administrator
                    </button>
                </div>

                {/* Error banner */}
                {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* ── STUDENT FORM ── */}
                {activeTab === 'student' && (
                    <form id="login-form" onSubmit={handleStudentSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                            <input id="login-email" type="email" autoComplete="email" value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                placeholder="you@student.edu" className={inputCls} />
                        </div>
                        <div>
                            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <input id="login-password" type={showPw ? 'text' : 'password'}
                                    autoComplete="current-password" value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    placeholder="••••••••" className={`${inputCls} pr-11`} />
                                <button type="button" onClick={() => setShowPw(v => !v)} tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                                    {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <button id="login-submit" type="submit" disabled={loading}
                            className="group w-full flex justify-center items-center gap-2 py-3.5 px-4 text-base font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading
                                ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                : <><User className="h-5 w-5" /> Sign in as Student <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" /></>}
                        </button>
                    </form>
                )}

                {/* ── ADMIN FORM ── */}
                {activeTab === 'admin' && (
                    <form id="admin-login-form" onSubmit={handleAdminSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                            <input id="admin-email" type="email" autoComplete="email" value={adminEmail}
                                onChange={(e) => { setAdminEmail(e.target.value); setError(''); }}
                                placeholder="admin@example.com" className={inputCls} />
                        </div>
                        <div>
                            <label htmlFor="admin-access-key" className="block text-sm font-medium text-slate-700 mb-1">Admin Access Key</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input id="admin-access-key" type={showKey ? 'text' : 'password'}
                                    autoComplete="off" value={accessKey}
                                    onChange={(e) => { setAccessKey(e.target.value); setError(''); }}
                                    placeholder="Enter admin access key" className={`${inputCls} pl-10 pr-11`} />
                                <button type="button" onClick={() => setShowKey(v => !v)} tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                                    {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <button id="admin-login-submit" type="submit" disabled={loading}
                            className="group w-full flex justify-center items-center gap-2 py-3.5 px-4 text-base font-semibold rounded-xl text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 transition-all transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading
                                ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                : <><ShieldCheck className="h-5 w-5" /> Sign in as Administrator <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" /></>}
                        </button>
                    </form>
                )}

                {/* Footer */}
                <p className="text-center text-sm text-slate-500">
                    {activeTab === 'student' ? (
                        <>Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors">Sign Up</Link>
                        </>
                    ) : (
                        <span className="text-xs text-slate-400">Use the admin access key provided by your institution.</span>
                    )}
                </p>

            </div>
        </div>
    );
};

export default Login;
