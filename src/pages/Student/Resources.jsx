import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialResources } from '../../mock/data';
import { Search, Filter, PlayCircle, FileText, BookOpen } from 'lucide-react';

const Resources = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [resources, setResources] = useState(() => {
        // Get from local storage if admin added new ones
        const saved = localStorage.getItem('wellnest_resources');
        return saved ? JSON.parse(saved) : initialResources;
    });

    const categories = ['All', 'Mental Health', 'Fitness', 'Nutrition'];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'Video': return <PlayCircle className="h-6 w-6 text-indigo-500" />;
            case 'Article': return <FileText className="h-6 w-6 text-emerald-500" />;
            case 'Blog': return <BookOpen className="h-6 w-6 text-orange-500" />;
            case 'Post': return <FileText className="h-6 w-6 text-blue-500" />;
            default: return <BookOpen className="h-6 w-6 text-indigo-400" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading text-slate-900">Health Resources</h1>
                <p className="text-slate-600 mt-2">Explore our curated collection of guides, videos, and articles for your well-being.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                    <Filter className="h-5 w-5 text-slate-400 hidden sm:block" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.length > 0 ? (
                    filteredResources.map(resource => (
                        <div key={resource.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-slate-50 p-2 rounded-lg border border-slate-100 group-hover:scale-110 transition-transform">
                                        {getIcon(resource.type)}
                                    </span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        {resource.type}
                                    </span>
                                </div>
                                <span className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                                    {resource.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold font-heading text-slate-800 mb-2 line-clamp-2">
                                {resource.title}
                            </h3>

                            <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                                {resource.description}
                            </p>

                            <button 
                                onClick={() => navigate('/student/resources/' + resource.id)}
                                className="w-full mt-auto py-2.5 bg-slate-50 hover:bg-primary-50 text-primary-700 font-medium rounded-xl border border-slate-200 hover:border-primary-200 transition-colors"
                            >
                                View Resource
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        No resources found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resources;
