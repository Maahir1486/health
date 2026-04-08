import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { resourcesAPI, healthAPI } from '../../services/api';
import { Sparkles, Activity, TrendingUp, ArrowRight, Droplets, Plus, PlayCircle, FileText, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    // ── Mood ──────────────────────────────────────────────────
    const moods = [
        { emoji: '😭', label: 'Very Low' },
        { emoji: '😕', label: 'Low' },
        { emoji: '😐', label: 'Neutral' },
        { emoji: '🙂', label: 'Good' },
        { emoji: '😊', label: 'Excellent' }
    ];
    const [selectedMood, setSelectedMood] = useState(2);

    // ── Water ─────────────────────────────────────────────────
    const [waterIntake, setWaterIntake] = useState(0);
    const waterGoal = 8;

    // ── Resources ─────────────────────────────────────────────
    const [recommendedResources, setRecommendedResources] = useState([]);
    const [loadingResources, setLoadingResources] = useState(true);

    // ── Watch ─────────────────────────────────────────────────
    const isWatchConnected = localStorage.getItem('wellnest_watch_connected') === 'true';
    const steps = isWatchConnected ? 8432 : 0;
    const progress = isWatchConnected ? '84%' : '0%';

    // Load previously saved health log from server, then fetch resources
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await healthAPI.getLatest();
                if (data) {
                    setSelectedMood(data.mood ?? 2);
                    setWaterIntake(data.waterIntake ?? 0);
                }
            } catch {
                // No previous log — use defaults
            }

            try {
                setLoadingResources(true);
                const res = await resourcesAPI.getAll();
                setRecommendedResources(res.data.slice(0, 2));
            } catch {
                setRecommendedResources([]);
            } finally {
                setLoadingResources(false);
            }
        };
        loadData();
    }, []);

    // Auto-save health log to backend whenever mood or water changes
    useEffect(() => {
        const saveLog = async () => {
            try {
                await healthAPI.saveLog({ mood: selectedMood, waterIntake, steps });
            } catch {
                // Silently fail — UI still works
            }
        };
        const debounce = setTimeout(saveLog, 800);
        return () => clearTimeout(debounce);
    }, [selectedMood, waterIntake, steps]);

    const handleDrink = () => {
        if (waterIntake < waterGoal) setWaterIntake(prev => prev + 1);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Video':   return <PlayCircle className="h-6 w-6 text-indigo-500" />;
            case 'Article': return <FileText className="h-6 w-6 text-emerald-500" />;
            case 'Blog':    return <BookOpen className="h-6 w-6 text-orange-500" />;
            case 'Post':    return <FileText className="h-6 w-6 text-blue-500" />;
            default:        return <BookOpen className="h-6 w-6 text-indigo-400" />;
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Welcome Banner */}
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

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily Steps */}
                <Link to="/student/smart-sync" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow group">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Daily Steps</h3>
                            <Activity className={`h-5 w-5 ${isWatchConnected ? 'text-emerald-500' : 'text-slate-300'}`} />
                        </div>
                        <p className="text-3xl font-bold font-heading text-slate-900">{steps.toLocaleString()}</p>
                        <p className="text-sm text-slate-500 mt-1">Goal: 10,000</p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-4 relative overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: progress }} />
                    </div>
                    {!isWatchConnected && (
                        <p className="text-[10px] text-primary-600 font-bold uppercase mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Connect Watch <ArrowRight className="h-3 w-3" />
                        </p>
                    )}
                </Link>

                {/* Water Intake */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group text-center md:text-left">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-700">Water Intake</h3>
                        <Droplets className="h-5 w-5 text-blue-500 animate-bounce-slow" />
                    </div>
                    <div className="flex items-baseline gap-1 justify-center md:justify-start">
                        <p className="text-3xl font-bold font-heading text-slate-900">{waterIntake}</p>
                        <p className="text-slate-400 text-sm font-medium">/ {waterGoal} glasses</p>
                    </div>
                    <div className="flex gap-1.5 mt-4">
                        {[...Array(waterGoal)].map((_, i) => (
                            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < waterIntake ? 'bg-blue-500' : 'bg-slate-100'}`} />
                        ))}
                    </div>
                    <button
                        onClick={handleDrink}
                        disabled={waterIntake >= waterGoal}
                        className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl transition-all disabled:opacity-50 active:scale-95"
                    >
                        <Plus className="h-4 w-4" /> Drink a Glass
                    </button>
                    {waterIntake >= waterGoal && <p className="text-[10px] text-emerald-500 font-bold text-center mt-2 uppercase">Goal Reached! 💧</p>}
                </div>

                {/* Mood Tracker */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-700">Mood Tracker</h3>
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold font-heading text-slate-900">{moods[selectedMood].label}</p>
                    <p className="text-sm text-slate-500 mt-1">How are you feeling?</p>
                    <div className="mt-4 flex gap-2">
                        {moods.map((m, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedMood(i)}
                                className={`flex-1 py-1 rounded-lg text-xl transition-all transform hover:scale-110 active:scale-95 ${selectedMood === i
                                    ? 'bg-purple-50 ring-2 ring-purple-200'
                                    : 'bg-slate-50 hover:bg-slate-100 opacity-60 hover:opacity-100'}`}
                            >
                                {m.emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black font-heading text-slate-900">Recommended for you</h2>
                    <Link to="/student/resources" className="text-primary-600 text-sm font-bold hover:underline flex items-center gap-1">
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                {loadingResources ? (
                    <div className="flex items-center justify-center py-10 gap-3 text-slate-400">
                        <Loader2 className="h-5 w-5 animate-spin" /> Loading recommendations...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendedResources.map((res) => (
                            <Link
                                key={res.id}
                                to={`/student/resources/${res.id}`}
                                className="flex group items-center justify-between p-6 rounded-2xl border border-slate-50 hover:border-primary-100 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {getIcon(res.type)}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors">{res.title}</h4>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-600">{res.category}</span>
                                            <span>•</span>
                                            <span>{res.type}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                                    <ArrowRight className="h-5 w-5 text-primary-500" />
                                </div>
                            </Link>
                        ))}
                        {recommendedResources.length === 0 && (
                            <p className="col-span-full text-center py-10 text-slate-400 italic font-medium bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                No resources available yet. Admins are curating your collection!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
