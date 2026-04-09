import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Signup = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName]                   = useState('');
    const [email, setEmail]                 = useState('');
    const [password, setPassword]           = useState('');
    const [confirmPassword, setConfirm]     = useState('');
    const [showPassword, setShowPw]         = useState(false);
    const [showConfirm, setShowConfirm]     = useState(false);
    const [error, setError]                 = useState('');
    const [loading, setLoading]             = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim())         return setError('Full name is required.');
        if (!email.trim())        return setError('Email address is required.');
        if (password.length < 6)  return setError('Password must be at least 6 characters.');
        if (password !== confirmPassword)
                                  return setError('Passwords do not match.');

        setLoading(true);
        try {
            const result = await register(name, email, password);
            if (result.success) {
                navigate('/student');
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /* ----- helpers ----- */
    const inputBase =
        'w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition';

    const strengthScore = password.length === 0 ? 0
        : password.length < 6 ? 1
        : password.length < 10 ? 2
        : 3;
    const strengthLabel = ['', 'Weak', 'Fair', 'Strong'];
    const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-400'];

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
            <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-2xl shadow-xl shadow-primary-100/50 border border-primary-50">

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto mb-3 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50">
                        <UserPlus className="h-7 w-7 text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Create account</h2>
                    <p className="mt-2 text-sm text-slate-500">Join WellNest as a student</p>
                </div>

                {/* Form */}
                <form id="signup-form" onSubmit={handleSubmit} className="space-y-4" noValidate>

                    {/* Error banner */}
                    {error && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Full Name */}
                    <div>
                        <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1">
                            Full name
                        </label>
                        <input
                            id="signup-name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setError(''); }}
                            placeholder="Jane Doe"
                            className={inputBase}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email address
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            placeholder="you@student.edu"
                            className={inputBase}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="Min. 6 characters"
                                className={`${inputBase} pr-11`}
                            />
                            <button
                                type="button"
                                id="toggle-signup-password"
                                onClick={() => setShowPw((v) => !v)}
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {/* Strength bar */}
                        {password.length > 0 && (
                            <div className="mt-2 space-y-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3].map((s) => (
                                        <div
                                            key={s}
                                            className={`h-1.5 flex-1 rounded-full transition-all ${
                                                s <= strengthScore ? strengthColor[strengthScore] : 'bg-slate-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400">
                                    Strength: <span className="font-medium">{strengthLabel[strengthScore]}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-700 mb-1">
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                id="signup-confirm"
                                type={showConfirm ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                                placeholder="Repeat your password"
                                className={`${inputBase} pr-11`}
                            />
                            <button
                                type="button"
                                id="toggle-signup-confirm"
                                onClick={() => setShowConfirm((v) => !v)}
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            >
                                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {/* Match indicator */}
                        {confirmPassword.length > 0 && (
                            <p className={`mt-1.5 text-xs flex items-center gap-1 ${
                                password === confirmPassword ? 'text-green-600' : 'text-red-500'
                            }`}>
                                <CheckCircle className="h-3.5 w-3.5" />
                                {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        id="signup-submit"
                        type="submit"
                        disabled={loading}
                        className="group w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block" />
                        ) : (
                            <>
                                <UserPlus className="h-5 w-5" />
                                Create my account
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
