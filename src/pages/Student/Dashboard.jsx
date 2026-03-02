import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Calendar, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute right-0 top-0 opacity-10">
                    <Sparkles className="w-64 h-64 -mt-10 -mr-10" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold font-heading mb-2">Hello, {user.name.split(' ')[0]} 👋</h1>
                    <p className="text-primary-100 text-lg max-w-xl">
                        Welcome back to WellNest. Take a moment for yourself today. Your well-being is the foundation of your success.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Stats/Widgets */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Daily Steps</h3>
                            <Activity className="h-5 w-5 text-emerald-500" />
                        </div>
                        <p className="text-3xl font-bold font-heading text-slate-900">8,432</p>
                        <p className="text-sm text-slate-500 mt-1">Goal: 10,000</p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-700">Mood Tracker</h3>
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold font-heading text-slate-900">Good</p>
                    <p className="text-sm text-slate-500 mt-1">Consistent for 3 days</p>
                    <div className="mt-4 flex gap-2">
                        {['😭', '😕', '😐', '🙂', '😊'].map((emoji, i) => (
                            <button key={i} className={`flex-1 py-1 rounded-lg text-xl hover:bg-slate-100 transition-colors ${i === 3 ? 'bg-primary-50 ring-1 ring-primary-200' : ''}`}>
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold font-heading text-slate-800 mb-6">Recommended for you</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                                🧘‍♀️
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">10-Minute Stress Relief</h4>
                                <p className="text-sm text-slate-500">Video Guide • Mental Health</p>
                            </div>
                        </div>
                        <Link to="/student/resources" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 transition-colors">
                            Watch
                        </Link>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">
                                🥗
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Quick Exam Week Recipes</h4>
                                <p className="text-sm text-slate-500">Article • Nutrition</p>
                            </div>
                        </div>
                        <Link to="/student/resources" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 transition-colors">
                            Read
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
