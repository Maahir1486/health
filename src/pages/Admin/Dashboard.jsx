import React, { useState, useEffect } from 'react';
import { initialResources } from '../../mock/data';
import { Users, FileText, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ resources: 0, students: 1240 });

    useEffect(() => {
        const savedResources = localStorage.getItem('wellnest_resources');
        const resCount = savedResources ? JSON.parse(savedResources).length : initialResources.length;

        setStats(prev => ({ ...prev, resources: resCount }));
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading text-slate-900">Platform Overview</h1>
                <p className="text-slate-600 mt-2">Monitor platform usage and manage well-being resources.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Active Students</p>
                        <h3 className="text-3xl font-bold font-heading text-slate-900">{stats.students}</h3>
                        <p className="text-emerald-500 text-xs mt-2 flex items-center font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
                        </p>
                    </div>
                    <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <Users className="h-7 w-7" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Active Resources</p>
                        <h3 className="text-3xl font-bold font-heading text-slate-900">{stats.resources}</h3>
                    </div>
                    <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <FileText className="h-7 w-7" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
                    </div>
                    <div className="space-y-4">
                        <Link to="/admin/resources" className="block p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                            <h3 className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">Add New Resource</h3>
                            <p className="text-sm text-slate-500 mt-1">Publish a new article or video for students.</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 shadow-md text-white">
                    <h2 className="text-lg font-bold mb-2">System Status</h2>
                    <p className="text-slate-400 text-sm mb-6">All systems operational.</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                            <span className="text-slate-300">Database Connection</span>
                            <span className="flex items-center text-emerald-400 text-sm"><span className="h-2 w-2 rounded-full bg-emerald-400 mr-2"></span>Online</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                            <span className="text-slate-300">Authentication Service</span>
                            <span className="flex items-center text-emerald-400 text-sm"><span className="h-2 w-2 rounded-full bg-emerald-400 mr-2"></span>Online</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Last Backup</span>
                            <span className="text-slate-400 text-sm">Today, 03:00 AM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
