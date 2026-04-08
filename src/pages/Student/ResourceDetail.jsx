import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resourcesAPI } from '../../services/api';
import { ArrowLeft, Calendar, ExternalLink, PlayCircle, FileText, BookOpen, Loader2 } from 'lucide-react';

const ResourceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                setLoading(true);
                const { data } = await resourcesAPI.getById(id);
                setResource(data);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Video':   return <PlayCircle className="h-10 w-10 text-indigo-500" />;
            case 'Article': return <FileText className="h-10 w-10 text-emerald-500" />;
            case 'Blog':    return <BookOpen className="h-10 w-10 text-orange-500" />;
            case 'Post':    return <FileText className="h-10 w-10 text-blue-500" />;
            default:        return <BookOpen className="h-10 w-10 text-indigo-400" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
                <Loader2 className="h-7 w-7 animate-spin text-primary-500" />
                Loading resource...
            </div>
        );
    }

    if (notFound || !resource) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-slate-500 mb-4 text-lg">Resource not found.</p>
                <button
                    onClick={() => navigate('/student/resources')}
                    className="flex items-center gap-2 text-primary-600 font-medium hover:underline"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Resources
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => navigate('/student/resources')}
                className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-medium transition-colors group mb-2"
            >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Resources
            </button>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex-shrink-0">
                        {getIcon(resource.type)}
                    </div>

                    <div className="space-y-6 flex-grow">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {resource.category}
                                </span>
                                <span className="text-slate-400 text-sm font-medium">{resource.type}</span>
                            </div>
                            <h1 className="text-4xl font-black font-heading text-slate-900 leading-tight">
                                {resource.title}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
                            <Calendar className="h-5 w-5 text-primary-500" />
                            <span className="text-sm font-semibold">Published on {formatDate(resource.createdAt)}</span>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-primary-200 pl-6 italic">
                            {resource.description}
                        </p>

                        <div className="pt-6">
                            <button
                                onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                                className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary-200 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 group"
                            >
                                <ExternalLink className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                                Visit External Resource
                            </button>
                            <p className="text-slate-400 text-xs mt-4 italic">* This will open in a new browser tab</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;
