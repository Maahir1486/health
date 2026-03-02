import React, { useState, useEffect } from 'react';
import { initialResources } from '../../mock/data';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const ManageResources = () => {
    const [resources, setResources] = useState(() => {
        const saved = localStorage.getItem('wellnest_resources');
        return saved ? JSON.parse(saved) : initialResources;
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ title: '', category: 'Mental Health', type: 'Article', description: '' });

    useEffect(() => {
        localStorage.setItem('wellnest_resources', JSON.stringify(resources));
    }, [resources]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            setResources(resources.filter(r => r.id !== id));
        }
    };

    const handleEdit = (resource) => {
        setEditingResource(resource);
        setFormData({ title: resource.title, category: resource.category, type: resource.type, description: resource.description });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingResource(null);
        setFormData({ title: '', category: 'Mental Health', type: 'Article', description: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingResource) {
            setResources(resources.map(r => r.id === editingResource.id ? { ...r, ...formData } : r));
        } else {
            const newResource = {
                id: 'r' + Date.now(),
                ...formData,
                url: '#'
            };
            setResources([newResource, ...resources]);
        }
        setIsModalOpen(false);
    };

    const filteredResources = resources.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Manage Resources</h1>
                    <p className="text-slate-600 mt-2">Add, edit, or remove health resources for students.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                >
                    <Plus className="h-5 w-5" />
                    Add Resource
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm tracking-wide border-b border-slate-100">
                                <th className="px-6 py-4 font-medium">Title</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredResources.map(resource => (
                                <tr key={resource.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-800">{resource.title}</p>
                                        <p className="text-sm text-slate-500 truncate max-w-xs">{resource.description}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                            {resource.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium text-sm">
                                        {resource.type}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(resource)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(resource.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredResources.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        No resources found. Try adjusting your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Basic Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 font-sans">
                        <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">
                            {editingResource ? 'Edit Resource' : 'Add New Resource'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
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
                                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                                    >
                                        <option value="Article">Article</option>
                                        <option value="Video">Video</option>
                                        <option value="Guide">Guide</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 justify-end mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-primary-600 text-white font-medium hover:bg-primary-700 rounded-xl transition-colors shadow-sm"
                                >
                                    Save Resource
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageResources;
