import React, { useState, useEffect } from 'react';
import {
  X, Lock, LogOut, Plus, Trash2, Edit2, Upload, Check, AlertCircle,
  FileText, Database, Layers, Eye, RefreshCw, Copy, CheckCircle2, MessageSquare
} from 'lucide-react';
import { Project, Inquiry, MediaFile, CMSFramework } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  onLogin: (token: string) => void;
  onLogout: () => void;
  projects: Project[];
  onRefreshProjects: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  token,
  onLogin,
  onLogout,
  projects,
  onRefreshProjects
}) => {
  // Tabs
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'media' | 'cms' | 'schema'>('projects');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Projects CRUD state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    client: '',
    category: 'Waterproofing',
    secondaryCategory: '',
    location: 'Mardan, KPK',
    year: new Date().getFullYear(),
    areaSqFt: 5000,
    status: 'Completed',
    featured: false,
    imageUrl: '/images/project-12.jpeg',
    videoUrl: '',
    description: '',
    chemicalsUsed: [],
    highlights: []
  });
  const [chemicalsInput, setChemicalsInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [crudError, setCrudError] = useState<string | null>(null);
  const [crudSuccess, setCrudSuccess] = useState<string | null>(null);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Media state
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // CMS Frameworks state
  const [cmsFrameworks, setCmsFrameworks] = useState<CMSFramework[]>([]);
  const [loadingCms, setLoadingCms] = useState(false);

  // Copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.token) {
        onLogin(data.token);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Verify your admin credentials in .env');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Fetch Inquiries
  const fetchInquiries = async () => {
    if (!token) return;
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  // Fetch Media
  const fetchMedia = async () => {
    if (!token) return;
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/uploads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMediaFiles(data.files || []);
      }
    } catch (err) {
      console.error('Failed to load uploads:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Fetch CMS Frameworks
  const fetchCMS = async () => {
    setLoadingCms(true);
    try {
      const res = await fetch('/api/cms-frameworks');
      if (res.ok) {
        const data = await res.json();
        setCmsFrameworks(data.frameworks || []);
      }
    } catch (err) {
      console.error('Failed to load CMS research data:', err);
    } finally {
      setLoadingCms(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (activeTab === 'inquiries') fetchInquiries();
      if (activeTab === 'media') fetchMedia();
      if (activeTab === 'cms') fetchCMS();
    }
  }, [token, activeTab]);

  // Start Create Project
  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingProject(null);
    setProjectForm({
      title: '',
      client: '',
      category: 'Waterproofing',
      secondaryCategory: '',
      location: 'Mardan, KPK',
      year: new Date().getFullYear(),
      areaSqFt: 5000,
      status: 'Completed',
      featured: false,
      imageUrl: '/images/project-12.jpeg',
      videoUrl: '',
      description: '',
      chemicalsUsed: [],
      highlights: []
    });
    setChemicalsInput('');
    setHighlightsInput('');
    setCrudError(null);
    setCrudSuccess(null);
  };

  // Start Edit Project
  const startEdit = (p: Project) => {
    setIsCreatingNew(false);
    setEditingProject(p);
    setProjectForm({ ...p });
    setChemicalsInput((p.chemicalsUsed || []).join(', '));
    setHighlightsInput((p.highlights || []).join('\n'));
    setCrudError(null);
    setCrudSuccess(null);
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsSavingProject(true);
    setCrudError(null);
    setCrudSuccess(null);

    const chemicals = chemicalsInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const highlights = highlightsInput
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const payload = {
      ...projectForm,
      chemicalsUsed: chemicals,
      highlights: highlights,
      areaSqFt: Number(projectForm.areaSqFt) || 0,
      year: Number(projectForm.year) || 2024
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      setCrudSuccess(`Project successfully ${editingProject ? 'updated' : 'created'}!`);
      setEditingProject(null);
      setIsCreatingNew(false);
      onRefreshProjects();
    } catch (err: any) {
      setCrudError(err.message || 'Error saving project');
    } finally {
      setIsSavingProject(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete project');
      }

      setCrudSuccess('Project deleted successfully.');
      onRefreshProjects();
    } catch (err: any) {
      setCrudError(err.message || 'Error deleting project');
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploadingMedia(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ fileName: file.name, dataUrl })
        });
        if (res.ok) {
          fetchMedia();
        }
      } catch (err) {
        console.error('Upload failed:', err);
      } finally {
        setUploadingMedia(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-white">
                RCC Production Content & System Administration
              </h2>
              <p className="text-xs text-slate-400">
                Ramzan Chemical Construction (Pvt.) Ltd. Enterprise Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!token ? (
            /* Unauthenticated Login Form */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Admin Sign In
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Authenticate using the configured server environment credentials.
                </p>
              </div>

              {loginError && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Username / Admin Email
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="e.g. admin or info@ramzanchemical.com"
                    className="w-full text-xs bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password / Admin Secret Key
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? 'Verifying Credentials...' : 'Access Admin Dashboard'}
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Default credentials configured in <code>.env</code> / <code>ADMIN_PASSWORD</code>.
                </p>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Tabs */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'projects'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Projects Management ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'inquiries'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Client Inquiries ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'media'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Media Uploads ({mediaFiles.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('cms')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'cms'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>CMS Frameworks Research</span>
                </button>

                <button
                  onClick={() => setActiveTab('schema')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'schema'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>SQL / PostgreSQL Schema</span>
                </button>
              </div>

              {/* Status Messages */}
              {crudSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{crudSuccess}</span>
                  </span>
                  <button onClick={() => setCrudSuccess(null)} className="text-emerald-600 hover:text-emerald-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {crudError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>{crudError}</span>
                  </span>
                  <button onClick={() => setCrudError(null)} className="text-rose-600 hover:text-rose-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TAB 1: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Action Bar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        All Construction Projects
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add, edit, or remove chemical projects published to the live website.
                      </p>
                    </div>

                    {!isCreatingNew && !editingProject && (
                      <button
                        onClick={startCreate}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project</span>
                      </button>
                    )}
                  </div>

                  {/* Edit or Create Form */}
                  {(isCreatingNew || editingProject) && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                        <h4 className="text-sm font-bold text-slate-900">
                          {editingProject ? `Edit Project: ${editingProject.title}` : 'Create New Project'}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingNew(false);
                            setEditingProject(null);
                          }}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                      </div>

                      <form onSubmit={handleSaveProject} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Project Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={projectForm.title || ''}
                              onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200 focus:ring-1 focus:ring-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Client Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={projectForm.client || ''}
                              onChange={e => setProjectForm({ ...projectForm, client: e.target.value })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200 focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Primary Category *
                            </label>
                            <select
                              value={projectForm.category || 'Waterproofing'}
                              onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            >
                              <option value="Waterproofing">Waterproofing</option>
                              <option value="Epoxy Flooring">Epoxy Flooring</option>
                              <option value="Paint & Coating Systems">Paint & Coating Systems</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Secondary Category (Optional)
                            </label>
                            <input
                              type="text"
                              value={projectForm.secondaryCategory || ''}
                              onChange={e => setProjectForm({ ...projectForm, secondaryCategory: e.target.value })}
                              placeholder="e.g. Epoxy Flooring"
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Project Location
                            </label>
                            <input
                              type="text"
                              value={projectForm.location || ''}
                              onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Area (sq.ft)
                            </label>
                            <input
                              type="number"
                              value={projectForm.areaSqFt || 0}
                              onChange={e => setProjectForm({ ...projectForm, areaSqFt: Number(e.target.value) })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Delivery Year
                            </label>
                            <input
                              type="number"
                              value={projectForm.year || 2024}
                              onChange={e => setProjectForm({ ...projectForm, year: Number(e.target.value) })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Status
                            </label>
                            <select
                              value={projectForm.status || 'Completed'}
                              onChange={e => setProjectForm({ ...projectForm, status: e.target.value as any })}
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            >
                              <option value="Completed">Completed</option>
                              <option value="In Progress">In Progress</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2 pt-6">
                            <input
                              type="checkbox"
                              id="featuredCheckbox"
                              checked={!!projectForm.featured}
                              onChange={e => setProjectForm({ ...projectForm, featured: e.target.checked })}
                              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                            />
                            <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-slate-700">
                              Featured Benchmark
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Main Image URL (or select from Media tab)
                            </label>
                            <input
                              type="text"
                              value={projectForm.imageUrl || ''}
                              onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                              placeholder="/images/project-12.jpeg"
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Video Walkthrough URL (YouTube or MP4)
                            </label>
                            <input
                              type="text"
                              value={projectForm.videoUrl || ''}
                              onChange={e => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                              placeholder="https://www.youtube.com/watch?v=..."
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Engineering Scope Description
                          </label>
                          <textarea
                            rows={3}
                            value={projectForm.description || ''}
                            onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                          ></textarea>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Chemicals Used (comma-separated)
                            </label>
                            <textarea
                              rows={2}
                              value={chemicalsInput}
                              onChange={e => setChemicalsInput(e.target.value)}
                              placeholder="100% Solids Epoxy, APP Membrane 4mm, Crystalline Slurry"
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Key Highlights (one per line)
                            </label>
                            <textarea
                              rows={2}
                              value={highlightsInput}
                              onChange={e => setHighlightsInput(e.target.value)}
                              placeholder="Tested to 10 tons forklift traffic&#10;Zero seepage recorded"
                              className="w-full text-xs bg-white rounded-xl px-3 py-2 border border-slate-200"
                            ></textarea>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingNew(false);
                              setEditingProject(null);
                            }}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingProject}
                            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
                          >
                            {isSavingProject ? 'Saving...' : 'Save Project'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Projects List Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Project</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Client</th>
                          <th className="py-3 px-4">Location</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {projects.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900">{p.title}</div>
                              <div className="text-slate-400 text-[10px]">ID: {p.id}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                                {p.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-800">{p.client}</td>
                            <td className="py-3 px-4 text-slate-600">{p.location}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  p.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => startEdit(p)}
                                className="p-1.5 text-slate-600 hover:text-amber-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(p.id)}
                                className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        Received Client Inquiries & Site Survey Requests
                      </h3>
                      <p className="text-xs text-slate-500">
                        Review customer submissions and update contact / survey statuses.
                      </p>
                    </div>
                    <button
                      onClick={fetchInquiries}
                      className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {loadingInquiries ? (
                    <div className="py-12 text-center text-slate-400 text-xs">Loading inquiries...</div>
                  ) : inquiries.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      No customer inquiries received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map(inq => (
                        <div
                          key={inq.id}
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{inq.name}</span>
                              {inq.organization && (
                                <span className="text-xs text-slate-500">({inq.organization})</span>
                              )}
                              <span className="text-[10px] text-slate-400 font-mono">{inq.id}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                              <span>📞 {inq.phone}</span>
                              {inq.email && <span>✉️ {inq.email}</span>}
                              <span>📍 {inq.location}</span>
                              <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-medium">
                                {inq.serviceRequested}
                              </span>
                              {inq.estimatedArea && <span>Area: {inq.estimatedArea}</span>}
                            </div>

                            {inq.notes && (
                              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-1">
                                {inq.notes}
                              </p>
                            )}

                            <div className="text-[10px] text-slate-400">
                              Received: {new Date(inq.createdAt).toLocaleString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <label className="text-[10px] uppercase font-bold text-slate-400">Status:</label>
                            <select
                              value={inq.status}
                              onChange={e => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Survey Scheduled">Survey Scheduled</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: MEDIA UPLOADS */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        Project Media & Uploads Manager
                      </h3>
                      <p className="text-xs text-slate-500">
                        Upload real on-site photos and copy URLs to link with projects.
                      </p>
                    </div>

                    <label className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingMedia ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploadingMedia}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Real Assets Available */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                      Local Project Library Images (in /public/images/)
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const path = `/images/project-${i + 1}.jpeg`;
                        return (
                          <div key={i} className="group relative rounded-lg overflow-hidden border border-slate-200 bg-white">
                            <img src={path} alt={`Project ${i + 1}`} className="w-full h-16 object-cover" referrerPolicy="no-referrer" />
                            <button
                              onClick={() => copyToClipboard(path)}
                              className="absolute inset-0 bg-slate-900/80 text-white text-[10px] opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold transition-opacity cursor-pointer"
                            >
                              {copiedUrl === path ? 'Copied!' : 'Copy Path'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Uploaded Files */}
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                      Custom Uploaded Files
                    </h4>
                    {mediaFiles.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        No custom uploads yet. Upload photos above.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {mediaFiles.map((m, idx) => (
                          <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs space-y-2">
                            <div className="h-24 rounded-lg overflow-hidden bg-slate-100">
                              <img src={m.url} alt={m.fileName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="text-[11px] truncate font-medium text-slate-800">{m.fileName}</div>
                            <button
                              onClick={() => copyToClipboard(m.url)}
                              className="w-full py-1 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-700 flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedUrl === m.url ? 'Copied URL' : 'Copy URL'}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: CMS FRAMEWORKS RESEARCH */}
              {activeTab === 'cms' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      Technical CMS Frameworks Evaluation & Migration Strategy
                    </h3>
                    <p className="text-xs text-slate-500">
                      Research comparison of enterprise headless CMS platforms for Ramzan Chemical Construction.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cmsFrameworks.map((cms, idx) => (
                      <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{cms.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            {cms.suitabilityRating}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 space-y-1">
                          <div><strong>Type:</strong> {cms.type}</div>
                          <div><strong>Database:</strong> {cms.database}</div>
                          <div><strong>Best For:</strong> {cms.bestFor}</div>
                        </div>

                        <div className="text-xs">
                          <div className="font-bold text-emerald-700 mb-1">Pros:</div>
                          <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                            {cms.pros.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SCHEMA & SQL */}
              {activeTab === 'schema' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-heading">
                        Relational Database DDL (PostgreSQL / Cloud SQL)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Production DDL schema for construction chemicals, BOQs, and project logs.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(`-- Ramzan Chemical Construction Production DDL
CREATE TABLE projects (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  secondary_category VARCHAR(64),
  location VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  area_sq_ft INTEGER,
  status VARCHAR(32) NOT NULL DEFAULT 'Completed',
  featured BOOLEAN DEFAULT FALSE,
  image_url TEXT NOT NULL,
  video_url TEXT,
  description TEXT NOT NULL,
  chemicals_used TEXT[],
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE inquiries (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  email VARCHAR(255),
  organization VARCHAR(255),
  service_requested VARCHAR(64) NOT NULL,
  estimated_area VARCHAR(64),
  location VARCHAR(255),
  notes TEXT,
  status VARCHAR(32) DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`)
                      }
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL DDL</span>
                    </button>
                  </div>

                  <pre className="bg-slate-950 text-slate-300 p-4 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`-- Ramzan Chemical Construction (Pvt.) Ltd. PostgreSQL Schema

CREATE TABLE projects (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  secondary_category VARCHAR(64),
  location VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  area_sq_ft INTEGER,
  status VARCHAR(32) NOT NULL DEFAULT 'Completed',
  featured BOOLEAN DEFAULT FALSE,
  image_url TEXT NOT NULL,
  video_url TEXT,
  description TEXT NOT NULL,
  chemicals_used TEXT[],
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE inquiries (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  email VARCHAR(255),
  organization VARCHAR(255),
  service_requested VARCHAR(64) NOT NULL,
  estimated_area VARCHAR(64),
  location VARCHAR(255),
  notes TEXT,
  status VARCHAR(32) DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
