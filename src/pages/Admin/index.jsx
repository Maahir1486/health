import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import ManageResources from './ManageResources';
import { LayoutDashboard, FileEdit, Settings } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/admin', name: 'Overview', icon: LayoutDashboard },
        { path: '/admin/resources', name: 'Manage Resources', icon: FileEdit },
        { path: '#', name: 'Settings', icon: Settings, isExternal: true },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <nav className="space-y-2 sticky top-24 bg-slate-900 rounded-2xl p-4 text-slate-300 shadow-xl">
                    <div className="mb-6 px-2 pt-2">
                        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Portal</h2>
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        if (item.isExternal) {
                            return (
                                <button
                                    key={item.name}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors hover:bg-slate-800 hover:text-white"
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.name}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-200' : 'text-slate-500'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/resources" element={<ManageResources />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminLayout;
