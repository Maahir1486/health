import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Resources from './Resources';
import ResourceDetail from './ResourceDetail';
import MyResources from './MyResources';
import SmartWatch from './SmartWatch';
import { LayoutDashboard, BookHeart, Heart, Watch } from 'lucide-react';

const StudentLayout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/student', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/student/resources', name: 'Resources', icon: BookHeart },
        { path: '/student/my-resources', name: 'My Resources', icon: Heart },
        { path: '/student/smart-sync', name: 'Smart Sync', icon: Watch },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <nav className="space-y-2 sticky top-24">
                    <div className="mb-6 px-3">
                        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Student Menu</h2>
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = (item.path === '/student/resources' || item.path === '/student/my-resources' || item.path === '/student/smart-sync')
                            ? location.pathname.startsWith(item.path)
                            : location.pathname === item.path;

                        if (item.isExternal) {
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => alert('Support helpline modal would open here!')}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-primary-600 bg-primary-50 font-medium transition-colors hover:bg-primary-100"
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
                                    ? 'bg-white text-primary-600 shadow-sm border border-slate-100'
                                    : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-primary-500' : 'text-slate-400'}`} />
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
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/resources/:id" element={<ResourceDetail />} />
                    <Route path="/my-resources" element={<MyResources />} />
                    <Route path="/smart-sync" element={<SmartWatch />} />
                </Routes>
            </div>
        </div>
    );
};

export default StudentLayout;
