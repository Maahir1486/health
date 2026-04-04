import React, { useState, useEffect } from 'react';
import { 
    Watch, Activity, Heart, Flame, Moon, Zap, 
    Wind, RefreshCw, Layers, CheckCircle2, 
    Smartphone, Bluetooth, AlertCircle, Info,
    TrendingUp, ArrowRight
} from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, unit, color, trend, trendValue }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${color}-500/5 rounded-full group-hover:scale-125 transition-transform`} />
        
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600`}>
                <Icon className="h-6 w-6" />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
                    {trendValue}
                </div>
            )}
        </div>
        
        <div className="space-y-1">
            <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{value}</span>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{unit}</span>
            </div>
        </div>
    </div>
);

const SmartWatch = () => {
    const [isConnected, setIsConnected] = useState(() => {
        return localStorage.getItem('wellnest_watch_connected') === 'true';
    });
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState(() => {
        return localStorage.getItem('wellnest_watch_last_sync') || 'Never';
    });

    const [metrics, setMetrics] = useState(() => {
        const connected = localStorage.getItem('wellnest_watch_connected') === 'true';
        if (!connected) {
            return {
                steps: 0, calories: 0, distance: 0, heartRate: 0, spO2: 0, sleep: '0h 0m', stress: 0, ecg: 'No Data', bp: '0/0'
            };
        }
        return {
            steps: 8432, calories: 1840, distance: 6.2, heartRate: 72, spO2: 98, sleep: '7h 20m', stress: 15, ecg: 'Normal', bp: '120/80'
        };
    });

    const handleConnect = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsConnected(true);
            setIsSyncing(false);
            const now = new Date().toLocaleString();
            setLastSynced(now);
            setMetrics({
                steps: 8432, calories: 1840, distance: 6.2, heartRate: 72, spO2: 98, sleep: '7h 20m', stress: 15, ecg: 'Normal', bp: '120/80'
            });
            localStorage.setItem('wellnest_watch_connected', 'true');
            localStorage.setItem('wellnest_watch_last_sync', now);
        }, 2000);
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setMetrics(prev => ({
                ...prev,
                steps: prev.steps + Math.floor(Math.random() * 100),
                heartRate: 68 + Math.floor(Math.random() * 15),
                stress: 10 + Math.floor(Math.random() * 20)
            }));
            setIsSyncing(false);
            const now = new Date().toLocaleString();
            setLastSynced(now);
            localStorage.setItem('wellnest_watch_last_sync', now);
        }, 1500);
    };

    if (!isConnected) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-indigo-500 to-primary-600" />
                    
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-50 text-primary-600 mb-4 animate-bounce-slow">
                        <Watch className="h-12 w-12" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
                            Connect Your Smart Watch
                        </h1>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            Sync your health data automatically to track steps, sleep, heart rate, and more. 
                            Compatible with Apple Watch, Garmin, Fitbit, and Samsung Gear.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
                        {['Steps', 'Heart Rate', 'Sleep', 'Workout'].map(feat => (
                            <div key={feat} className="flex items-center gap-2 justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-semibold">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                {feat}
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={handleConnect}
                            disabled={isSyncing}
                            className="w-full sm:w-auto px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
                        >
                            {isSyncing ? (
                                <RefreshCw className="h-6 w-6 animate-spin" />
                            ) : (
                                <Bluetooth className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            )}
                            {isSyncing ? 'Searching Devices...' : 'Pair My Device'}
                        </button>
                        <button className="w-full sm:w-auto px-8 py-5 text-slate-500 font-bold hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
                            <Info className="h-5 w-5" />
                            How it works
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-8 pt-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-8" title="Apple Health" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Fitbit_logo.svg" className="h-6" title="Fitbit" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Garmin_logo.svg" className="h-4" title="Garmin" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-heading text-slate-900 flex items-center gap-3">
                        <Watch className="h-8 w-8 text-primary-600" />
                        My Smart Device
                    </h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Connected • Last synced: <span className="font-bold text-slate-700">{lastSynced}</span>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                    >
                        <RefreshCw className={`h-5 w-5 ${isSyncing ? 'animate-spin text-primary-600' : ''}`} />
                        {isSyncing ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <button 
                         onClick={() => {
                             if(window.confirm('Disconnect your smart watch?')) {
                                 setIsConnected(false);
                                 localStorage.setItem('wellnest_watch_connected', 'false');
                             }
                         }}
                         className="flex items-center justify-center p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                    >
                        <AlertCircle className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={Activity} label="Step Count" value={metrics.steps.toLocaleString()} unit="Steps" color="primary" trend="up" trendValue="12%" />
                <MetricCard icon={Zap} label="Distance" value={metrics.distance} unit="KM" color="indigo" />
                <MetricCard icon={Flame} label="Calories Burned" value={metrics.calories} unit="Kcal" color="rose" trend="up" trendValue="8%" />
                <MetricCard icon={Moon} label="Sleep Tracking" value={metrics.sleep} unit="Duration" color="violet" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vitals */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <Heart className="h-6 w-6 text-rose-500" /> Live Vitals
                            </h2>
                            <div className="flex gap-2">
                                <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-500">Real-time</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <p className="text-slate-400 text-xs font-bold uppercase">Heart Rate</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900">{metrics.heartRate}</span>
                                    <span className="text-slate-500 text-sm font-bold uppercase">BPM</span>
                                </div>
                                <div className="h-10 flex items-end gap-1 overflow-hidden">
                                    {[40,60,45,70,55,80,65,75,60,95,70,85].map((h, i) => (
                                        <div key={i} className="bg-rose-500/20 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-400 text-xs font-bold uppercase">Blood Oxygen</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900">{metrics.spO2}</span>
                                    <span className="text-slate-500 text-sm font-bold uppercase">%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
                                    <div className="bg-indigo-500 h-full w-[98%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-400 text-xs font-bold uppercase">Blood Pressure</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900">{metrics.bp}</span>
                                    <span className="text-slate-500 text-sm font-bold uppercase">mmHg</span>
                                </div>
                                <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Healthy Range
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ECG & Stress */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative group">
                            <Layers className="absolute top-6 right-6 h-10 w-10 text-white/10 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">ECG Heart Check</h3>
                            <div className="text-2xl font-black mb-4">{metrics.ecg} Result</div>
                            <div className="h-16 flex items-center gap-[2px]">
                                {[0,10,0,0,40,-20,80,0,0,10,0].map((v, i) => (
                                    <div key={i} className="flex-1 bg-primary-400/30 rounded-full" style={{ height: `${20 + Math.abs(v)}%` }}></div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-4 italic">Recent scan: 2 hours ago</p>
                        </div>
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <Wind className="h-8 w-8 text-indigo-500 mb-4" />
                            <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Stress Level</h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-black text-slate-900">{metrics.stress}</span>
                                <span className="text-slate-500 text-sm font-bold">/ 100</span>
                            </div>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase">Very Relaxed</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white shadow-xl shadow-primary-200">
                        <Watch className="h-8 w-8 mb-4 opacity-50" />
                        <h3 className="text-2xl font-black font-heading mb-4 leading-tight">Workout Tracking</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white/10 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-primary-200" />
                                    <div className="text-sm">Running</div>
                                </div>
                                <ArrowRight className="h-4 w-4" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/10 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-primary-200" />
                                    <div className="text-sm">Cycling</div>
                                </div>
                                <ArrowRight className="h-4 w-4" />
                            </div>
                            <button className="w-full py-4 mt-2 bg-white text-primary-600 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-transform">
                                New Workout
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                            <Smartphone className="h-5 w-5" /> Phone Integration
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Notifications Enabled
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> GPS Auto-sync
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartWatch;
