import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, Search, ExternalLink, PlayCircle, FileText, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyResources = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [resources, setResources] = useState(() => {
        const saved = localStorage.getItem(`wellnest_student_resources_${user.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ title: '', category: 'Mental Health', type: 'Article', description: '', url: '' });

    useEffect(() => {
        localStorage.setItem(`wellnest_student_resources_${user.id}`, JSON.stringify(resources));
    }, [resources, user.id]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            setResources(resources.filter(r => r.id !== id));
        }
    };

    const handleEdit = (resource) => {
        setEditingResource(resource);
        setFormData({ 
            title: resource.title, 
            category: resource.category, 
            type: resource.type, 
            description: resource.description,
            url: resource.url || '' 
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingResource(null);
        setFormData({ title: '', category: 'Mental Health', type: 'Article', description: '', url: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingResource) {
            setResources(resources.map(r => r.id === editingResource.id ? { ...r, ...formData } : r));
        } else {
            const newResource = {
                id: 'sr' + Date.now(),
                ...formData,
                createdAt: new Date().toISOString(),
                studentId: user.id
            };
            setResources([newResource, ...resources]);
        }
        setIsModalOpen(false);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Video': return <PlayCircle className="h-5 w-5 text-indigo-500" />;
            case 'Article': return <FileText className="h-5 w-5 text-emerald-500" />;
            case 'Blog': return <BookOpen className="h-5 w-5 text-orange-500" />;
            case 'Post': return <FileText className="h-5 w-5 text-blue-500" />;
            default: return <BookOpen className="h-5 w-5 text-indigo-400" />;
        }
    };

    const filteredResources = resources.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">My Resources</h1>
                    <p className="text-slate-600 mt-2">Save and manage your personal health bookmarks and links.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                >
                    <Plus className="h-5 w-5" />
                    Add Personal Resource
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search your resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {filteredResources.map(resource => (
                        <div key={resource.id} className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex flex-col h-full hover:border-primary-200 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    {getIcon(resource.type)}
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => handleEdit(resource)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(resource.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{resource.title}</h3>
                            <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                                <span className="font-semibold uppercase">{resource.type}</span>
                                <span>•</span>
                                <span>{resource.category}</span>
                            </p>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{resource.description}</p>
                            <button 
                                onClick={() => navigate('/student/resources/' + resource.id)}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-white hover:bg-primary-50 text-primary-700 font-semibold rounded-xl border border-slate-200 hover:border-primary-200 transition-all"
                            >
                                <ExternalLink className="h-4 w-4" />
                                View Details
                            </button>
                        </div>
                    ))}
                    {filteredResources.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">
                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400">
                                <Plus className="h-6 w-6" />
                            </div>
                            <p className="text-slate-500 font-medium">You haven't saved any personal resources yet.</p>
                            <button onClick={handleAddNew} className="mt-4 text-primary-600 font-semibold hover:underline">Add one now</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 font-sans overflow-hidden relative">
                         <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>
                        <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6 mt-2">
                            {editingResource ? 'Edit Personal Resource' : 'Add New Resource'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. My Favorite Yoga Routine"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Mental Health">Mental Health</option>
                                        <option value="Fitness">Fitness</option>
                                        <option value="Nutrition">Nutrition</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Article">Article</option>
                                        <option value="Video">Video</option>
                                        <option value="Blog">Blog</option>
                                        <option value="Post">Post</option>
                                        <option value="Guide">Guide</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Resource URL</label>
                                <input
                                    required
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Notes / Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    placeholder="Brief summary or why you saved this..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 justify-end mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-primary-600 text-white font-bold hover:bg-primary-700 rounded-xl transition-all shadow-md active:scale-95"
                                >
                                    {editingResource ? 'Update' : 'Save Resource'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyResources;
