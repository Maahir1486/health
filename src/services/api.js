import axios from 'axios';

// All /api/* calls are proxied to http://localhost:8080 via vite.config.js
const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('wellnest_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auto-logout on 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('wellnest_token');
            localStorage.removeItem('wellnest_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    adminLogin: (data) => api.post('/auth/admin-login', data),
};

// ── Resources ─────────────────────────────────────────────────
export const resourcesAPI = {
    getAll: (q) => api.get('/resources', { params: q ? { q } : {} }),
    getById: (id) => api.get(`/resources/${id}`),
    create: (data) => api.post('/resources', data),
    update: (id, data) => api.put(`/resources/${id}`, data),
    delete: (id) => api.delete(`/resources/${id}`),
};

// ── Health Logs ───────────────────────────────────────────────
export const healthAPI = {
    saveLog: (data) => api.post('/health/log', data),
    getLatest: () => api.get('/health/latest'),
    getHistory: () => api.get('/health/history'),
};

// ── Admin ─────────────────────────────────────────────────────
export const adminAPI = {
    getStudents: () => api.get('/admin/students'),
    getStats: () => api.get('/admin/stats'),
};

export default api;
