import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  User, 
  Key, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  FolderKanban, 
  Inbox, 
  Cpu, 
  Database, 
  FileCode, 
  Copy, 
  ExternalLink, 
  X, 
  Save, 
  Sparkles,
  Phone,
  Mail,
  Building,
  ShieldAlert,
  ArrowRight,
  Eye,
  Upload,
  Video,
  Play,
  Image as ImageIcon,
  Film,
  RefreshCw,
  FileUp,
  Check
} from 'lucide-react';
import { Project, Inquiry, AdminUser, CMSFrameworkComparison } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onProjectsUpdated
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('rcc_admin_token'));
  const [user, setUser] = useState<AdminUser | null>(null);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // File upload state for projects
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'media-uploader' | 'cms-research' | 'schema'>('projects');

  // Media Library state
  interface UploadedFile {
    fileName: string;
    url: string;
    size: number;
    mtime: string;
    isVideo: boolean;
  }
  const [mediaFiles, setMediaFiles] = useState<UploadedFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [batchUploading, setBatchUploading] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; filename?: string } | null>(null);
  const [selectedTargetProject, setSelectedTargetProject] = useState<string>('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [mediaProjectAssignments, setMediaProjectAssignments] = useState<Record<string, string>>({});

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [cmsFrameworks, setCmsFrameworks] = useState<any>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Project Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editorLoading, setEditorLoading] = useState(false);
  const [editorError, setEditorError] = useState('');

  // Form input helper strings for tags
  const [chemicalsInput, setChemicalsInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  // Search in Admin
  const [adminSearch, setAdminSearch] = useState('');

  // Status feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleClose = () => {
    setIsEditorOpen(false);
    setEditingProject(null);
    setEditorError('');
    setUploadError('');
    onClose();
  };

  const closeProjectEditor = () => {
    setIsEditorOpen(false);
    setEditingProject(null);
    setEditorError('');
    setUploadError('');
  };

  // Check existing session
  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Session expired');
          return res.json();
        })
        .then(data => {
          setUser(data.user);
          loadAdminData(token);
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  const loadAdminData = async (authToken: string) => {
    setLoadingProjects(true);
    setLoadingInquiries(true);

    try {
      const [projRes, inqRes, cmsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/inquiries', { headers: { Authorization: `Bearer ${authToken}` } }),
        fetch('/api/cms-frameworks')
      ]);

      if (projRes.ok) {
        const p = await projRes.json();
        setProjects(Array.isArray(p) ? p : []);
      }

      if (inqRes.ok) {
        const i = await inqRes.json();
        setInquiries(Array.isArray(i) ? i : []);
      }

      if (cmsRes.ok) {
        const c = await cmsRes.json();
        setCmsFrameworks(c);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingProjects(false);
      setLoadingInquiries(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('rcc_admin_token', data.token);
      setToken(data.token);
      setUser(data.user);
      loadAdminData(data.token);
      showToast('Welcome back, Admin!');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        // ignore
      }
    }
    localStorage.removeItem('rcc_admin_token');
    setToken(null);
    setUser(null);
    showToast('Logged out successfully');
  };

  const openNewProjectModal = () => {
    setEditingProject({
      title: '',
      client: '',
      category: 'Waterproofing',
      secondaryCategory: '',
      location: 'Mardan, KPK',
      areaSqFt: 10000,
      year: new Date().getFullYear(),
      status: 'Completed',
      featured: true,
      description: '',
      imageUrl: '/images/project%20(1).jpeg'
    });
    setChemicalsInput('High-Build Epoxy Resin, Crystalline Waterproofing Slurry');
    setHighlightsInput('Tested under hydrostatic pressure\nHigh chemical & traffic durability\nExecuted within strict timeframe');
    setEditorError('');
    setIsEditorOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject({ ...project });
    setChemicalsInput((project.chemicalsUsed || []).join(', '));
    setHighlightsInput((project.highlights || []).join('\n'));
    setEditorError('');
    setIsEditorOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProject) return;

    setEditorLoading(true);
    setEditorError('');

    const payload = {
      ...editingProject,
      chemicalsUsed: chemicalsInput.split(',').map(s => s.trim()).filter(Boolean),
      highlights: highlightsInput.split('\n').map(s => s.trim()).filter(Boolean)
    };

    try {
      const isNew = !editingProject.id || editingProject.id.startsWith('temp-');
      const url = isNew ? '/api/projects' : `/api/projects/${editingProject.id}`;
      const method = isNew ? 'POST' : 'PUT';

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

      closeProjectEditor();
      showToast(isNew ? 'Project created and saved to database!' : 'Project updated successfully!');
      loadAdminData(token);
      onProjectsUpdated();
    } catch (err: any) {
      setEditorError(err.message || 'Error saving project');
    } finally {
      setEditorLoading(false);
    }
  };

  const handleImageUpload = async (file: File, isGallery: boolean = false) => {
    if (!token) return;
    setUploadingImage(true);
    setUploadError('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              fileName: file.name,
              dataUrl: base64Data
            })
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || 'Upload failed');
          }

          if (isGallery) {
            setEditingProject(prev => prev ? {
              ...prev,
              beforeAfterImages: [...(prev.beforeAfterImages || []), data.url]
            } : null);
          } else {
            setEditingProject(prev => prev ? {
              ...prev,
              imageUrl: data.url
            } : null);
          }
          showToast(`Uploaded ${file.name} successfully`);
        } catch (err: any) {
          setUploadError(err.message || 'Failed to upload image file');
        } finally {
          setUploadingImage(false);
        }
      };
      reader.onerror = () => {
        setUploadError('Failed to read image file');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError('Failed to read file');
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    if (!token) return;
    setUploadingVideo(true);
    setUploadError('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              fileName: file.name,
              dataUrl: base64Data
            })
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || 'Video upload failed');
          }

          setEditingProject(prev => prev ? {
            ...prev,
            videoUrl: data.url
          } : null);
          showToast(`Uploaded video ${file.name} successfully!`);
        } catch (err: any) {
          setUploadError(err.message || 'Failed to upload video file');
        } finally {
          setUploadingVideo(false);
        }
      };
      reader.onerror = () => {
        setUploadError('Failed to read video file');
        setUploadingVideo(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError('Failed to read video file');
      setUploadingVideo(false);
    }
  };

  const handleMultipleGalleryUpload = async (fileList: FileList | File[]) => {
    if (!token) return;
    const files = Array.from(fileList);
    if (files.length === 0) return;
    setUploadingImage(true);
    setUploadError('');

    try {
      const newUrls: string[] = [];
      for (const file of files) {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            fileName: file.name,
            dataUrl: base64Data
          })
        });

        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || `Failed to upload ${file.name}`);
        }
        newUrls.push(data.url);
      }

      if (newUrls.length > 0) {
        setEditingProject(prev => prev ? {
          ...prev,
          beforeAfterImages: [...(prev.beforeAfterImages || []), ...newUrls]
        } : null);
        showToast(`Uploaded ${newUrls.length} photos to project gallery!`);
      } else {
        throw new Error('No gallery photos were uploaded');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload gallery images');
    } finally {
      setUploadingImage(false);
    }
  };

  const fetchMediaFiles = async () => {
    if (!token) return;
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/uploads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setMediaFiles(data.files || []);
      }
    } catch (err) {
      console.error('Failed to load media files', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleBatchUpload = async (fileList: FileList | File[]) => {
    if (!token) return;
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setBatchUploading(true);
    setBatchProgress({ current: 0, total: files.length });

    let successCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setBatchProgress({ current: i + 1, total: files.length, filename: file.name });
      try {
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const base64Data = reader.result as string;
              const res = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  fileName: file.name,
                  dataUrl: base64Data
                })
              });
              if (res.ok) {
                successCount++;
                resolve();
              } else {
                const errData = await res.json();
                reject(new Error(errData.error || 'Upload error'));
              }
            } catch (e) {
              reject(e);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      } catch (err: any) {
        console.error(`Error uploading ${file.name}:`, err);
      }
    }

    setBatchUploading(false);
    setBatchProgress(null);
    showToast(`Successfully uploaded ${successCount} of ${files.length} media files to server!`);
    fetchMediaFiles();
  };

  const assignMediaToProject = async (fileUrl: string, projectId: string, actionType: 'cover' | 'gallery' | 'video') => {
    if (!token || !projectId) return;
    const targetProj = projects.find(p => p.id === projectId);
    if (!targetProj) return;

    try {
      let updatedPayload: Partial<Project> = {};
      if (actionType === 'cover') {
        updatedPayload = { imageUrl: fileUrl };
      } else if (actionType === 'video') {
        updatedPayload = { videoUrl: fileUrl };
      } else if (actionType === 'gallery') {
        const existing = targetProj.beforeAfterImages || [];
        if (!existing.includes(fileUrl)) {
          updatedPayload = { beforeAfterImages: [...existing, fileUrl] };
        } else {
          showToast('Image is already in this project gallery');
          return;
        }
      }

      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok) {
        const actionLabel = actionType === 'cover' ? 'cover image' : actionType === 'video' ? 'site video' : 'gallery image';
        showToast(`Linked as ${actionLabel} to "${targetProj.title}"!`);
        loadAdminData(token);
        onProjectsUpdated();
      } else {
        const errData = await res.json();
        showToast(`Failed: ${errData.error || 'Could not link media'}`);
      }
    } catch (err) {
      showToast('Failed to assign media to project');
    }
  };

  const deleteMediaFile = async (fileName: string) => {
    if (!token) return;
    if (!window.confirm(`Delete "${fileName}" from server?`)) return;

    try {
      const res = await fetch(`/api/uploads/${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast(`Deleted ${fileName}`);
        fetchMediaFiles();
      }
    } catch (err) {
      showToast('Failed to delete file');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to delete "${title}" from the portfolio?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }

      showToast(`Deleted "${title}"`);
      loadAdminData(token);
      onProjectsUpdated();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    if (!token) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        showToast('Inquiry status updated');
        loadAdminData(token);
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-between shrink-0 shadow-md">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
              &times;
            </button>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading text-white">
                  Ramzan Chemical Construction CMS & Portfolio Portal
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  SECURE ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Management for projects, inquiries, and technical database tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4 text-amber-400" />
                <span>Logout ({user?.username?.split('@')[0] || 'Admin'})</span>
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In View */}
        {!token ? (
          <div className="p-8 sm:p-12 overflow-y-auto max-w-md mx-auto w-full my-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Administrative Authentication
              </h3>
              <p className="text-xs text-slate-500">
                Authorized access for Ramzan Chemical Construction project engineers and managers.
              </p>
            </div>

            {/* Administrative Access Note */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-900 block mb-1">
                Authorized Personnel Access
              </span>
              <p className="text-[11px] text-slate-500">
                Log in with your administrator credentials to manage portfolio projects, upload real project photos, and review client inquiries.
              </p>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 text-xs text-slate-900 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 text-xs text-slate-900 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Secure Sign In to CMS</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          // Logged In Administration View
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between px-6 bg-slate-100 border-b border-slate-200 overflow-x-auto shrink-0 scrollbar-none">
              <div className="flex items-center gap-1 py-2">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <FolderKanban className="w-4 h-4 text-amber-600" />
                  <span>Portfolio Projects ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'inquiries'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Inbox className="w-4 h-4 text-blue-600" />
                  <span>Inquiries & Leads ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('media-uploader');
                    fetchMediaFiles();
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'media-uploader'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Media Uploader & Fast Batch ({mediaFiles.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('cms-research')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'cms-research'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span>CMS Frameworks Research</span>
                </button>

                <button
                  onClick={() => setActiveTab('schema')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'schema'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Database Schema & Export</span>
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active Database: SQLite / Persistent JSON Engine</span>
              </div>
            </div>

            {/* TAB 1: PROJECTS CMS */}
            {activeTab === 'projects' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Filter projects by title, client, or chemical..."
                      className="w-full pl-9 pr-3.5 py-2 bg-slate-50 text-xs text-slate-900 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <button
                    onClick={openNewProjectModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 text-slate-800 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Project & Client</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Area & Location</th>
                          <th className="py-3 px-4">Year / Status</th>
                          <th className="py-3 px-4 text-center">Featured</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {projects
                          .filter(p => 
                            !adminSearch ||
                            p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
                            p.client.toLowerCase().includes(adminSearch.toLowerCase()) ||
                            p.category.toLowerCase().includes(adminSearch.toLowerCase())
                          )
                          .map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-900 line-clamp-1 flex items-center gap-1.5">
                                  <span>{project.title}</span>
                                  {project.videoUrl && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded">
                                      <Video className="w-2.5 h-2.5" />
                                      Video
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-amber-700 font-medium">{project.client}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium">
                                  {project.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div>{project.areaSqFt ? `${project.areaSqFt.toLocaleString()} sq.ft.` : 'N/A'}</div>
                                <div className="text-[11px] text-slate-400">{project.location}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div>{project.year}</div>
                                <span className={`inline-block text-[10px] font-semibold px-2 py-0.2 rounded ${
                                  project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {project.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                {project.featured ? (
                                  <span className="text-amber-600 font-bold">★ Yes</span>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => openEditProjectModal(project)}
                                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Edit project"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(project.id, project.title)}
                                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete project"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INQUIRIES & LEADS INBOX */}
            {activeTab === 'inquiries' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">
                    Incoming Client Quotation Requests & Site Survey Leads
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inquiries captured from the website consultation form and interactive chemical cost calculator.
                  </p>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-slate-500 text-xs">No client inquiries received yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                            <span className="text-xs text-slate-500">({inq.organization})</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              inq.status === 'New' 
                                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                                : inq.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}>
                              {inq.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                            <span className="font-semibold text-slate-900">Service: {inq.service}</span>
                            <span>Area: {inq.estimatedArea}</span>
                            <span>Location: {inq.location}</span>
                          </div>

                          <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            "{inq.message}"
                          </p>

                          <div className="flex items-center gap-3 text-xs pt-1">
                            <a 
                              href={`tel:${inq.phone}`} 
                              className="text-amber-600 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{inq.phone}</span>
                            </a>
                            {inq.email && inq.email !== 'N/A' && (
                              <a 
                                href={`mailto:${inq.email}`} 
                                className="text-slate-600 hover:underline flex items-center gap-1"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{inq.email}</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Status Updater */}
                        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
                          <label className="text-[10px] font-semibold text-slate-400 uppercase">
                            Update Status:
                          </label>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Site Survey Scheduled">Site Survey Scheduled</option>
                            <option value="Completed">Completed / Closed</option>
                          </select>

                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}, this is Ramzan Chemical Construction regarding your inquiry for ${inq.service}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg transition-colors"
                          >
                            Open WhatsApp Chat
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: MEDIA UPLOADER & FAST BATCH */}
            {activeTab === 'media-uploader' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-2xl p-5 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-base text-amber-400">
                      <ImageIcon className="w-5 h-5" />
                      <span>Site Media & Fast Batch Uploader</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      Upload your real site photos and video walkthroughs directly. Drag and drop all WhatsApp photos and videos at once, then assign them as project covers, gallery photos, or walkthrough videos.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={fetchMediaFiles}
                      disabled={loadingMedia}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingMedia ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                    <label className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs">
                      <FileUp className="w-4 h-4" />
                      <span>Browse Files</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            handleBatchUpload(e.target.files);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Batch Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingOver(true);
                  }}
                  onDragLeave={() => setIsDraggingOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingOver(false);
                    if (e.dataTransfer.files?.length) {
                      handleBatchUpload(e.dataTransfer.files);
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    isDraggingOver
                      ? 'border-amber-500 bg-amber-50/70 scale-[1.01]'
                      : 'border-slate-300 bg-slate-50/70 hover:bg-slate-50 hover:border-amber-400'
                  }`}
                >
                  {batchUploading ? (
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      </div>
                      <div className="font-bold text-sm text-slate-800">
                        Uploading Media ({batchProgress?.current} of {batchProgress?.total})...
                      </div>
                      <p className="text-xs text-slate-500 truncate font-mono">
                        {batchProgress?.filename}
                      </p>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-200"
                          style={{
                            width: `${batchProgress ? Math.round((batchProgress.current / batchProgress.total) * 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100/80 flex items-center justify-center text-amber-700">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Drag & drop all WhatsApp photos and video walkthrough here
                      </h4>
                      <p className="text-xs text-slate-500">
                        Supports batch uploads of multiple JPEGs, PNGs, WebP images, and MP4/WebM videos simultaneously.
                      </p>
                      <div className="pt-2">
                        <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 hover:border-slate-400 cursor-pointer shadow-2xs">
                          <Plus className="w-3.5 h-3.5 text-amber-600" />
                          <span>Select Multiple Files to Upload</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.length) {
                                handleBatchUpload(e.target.files);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Target Project Filter */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Target Project for Fast One-Click Linking:
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Selecting a target here auto-fills the project selector for all media below.
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedTargetProject(p.id)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-semibold border transition-all cursor-pointer ${
                          selectedTargetProject === p.id
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.title.length > 35 ? p.title.slice(0, 35) + '...' : p.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Media Filter Tabs and Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMediaTypeFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        mediaTypeFilter === 'all'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All Files ({mediaFiles.length})
                    </button>
                    <button
                      onClick={() => setMediaTypeFilter('image')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        mediaTypeFilter === 'image'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Photos ({mediaFiles.filter(f => !f.isVideo).length})
                    </button>
                    <button
                      onClick={() => setMediaTypeFilter('video')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        mediaTypeFilter === 'video'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Videos ({mediaFiles.filter(f => f.isVideo).length})
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">
                    Stored in <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">/public/uploads/</code>
                  </span>
                </div>

                {/* Media Files Grid */}
                {mediaFiles.length === 0 ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-slate-700">No media uploaded to server yet</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      Drag and drop your 16 project images and site video into the box above to immediately add them to your live portfolio!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {mediaFiles
                      .filter(f => {
                        if (mediaTypeFilter === 'image') return !f.isVideo;
                        if (mediaTypeFilter === 'video') return f.isVideo;
                        return true;
                      })
                      .map((file) => {
                        const targetProjId = mediaProjectAssignments[file.fileName] || selectedTargetProject || (projects[0]?.id || '');

                        return (
                          <div
                            key={file.fileName}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between group hover:border-amber-300 transition-all"
                          >
                            {/* Preview */}
                            <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                              {file.isVideo ? (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2">
                                  <Video className="w-8 h-8 text-amber-400 mb-1" />
                                  <span className="text-[11px] font-mono truncate max-w-full text-slate-300">
                                    {file.fileName}
                                  </span>
                                  <span className="mt-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                                    Video File ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                                  </span>
                                </div>
                              ) : (
                                <img
                                  src={file.url}
                                  alt={file.fileName}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              )}

                              <button
                                onClick={() => deleteMediaFile(file.fileName)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-red-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                title="Delete file from server"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Details & Actions */}
                            <div className="p-3 space-y-2.5">
                              <div className="flex items-start justify-between gap-1">
                                <div className="truncate flex-1">
                                  <p className="text-xs font-semibold text-slate-900 truncate" title={file.fileName}>
                                    {file.fileName}
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-mono">
                                    {(file.size / 1024).toFixed(0)} KB • {new Date(file.mtime).toLocaleDateString()}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(window.location.origin + file.url);
                                    showToast('Copied media URL to clipboard!');
                                  }}
                                  className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                                  title="Copy URL"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Target Project Selector */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                  Assign to Project:
                                </label>
                                <select
                                  value={targetProjId}
                                  onChange={(e) => {
                                    setMediaProjectAssignments({
                                      ...mediaProjectAssignments,
                                      [file.fileName]: e.target.value
                                    });
                                  }}
                                  className="w-full text-xs py-1 px-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 truncate"
                                >
                                  {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                      {p.title}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Action Buttons */}
                              <div className="grid grid-cols-3 gap-1 pt-1">
                                <button
                                  onClick={() => assignMediaToProject(file.url, targetProjId, 'cover')}
                                  className="px-1.5 py-1 text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-center cursor-pointer transition-colors"
                                  title="Set as Main Cover Image"
                                >
                                  ★ Cover
                                </button>

                                <button
                                  onClick={() => assignMediaToProject(file.url, targetProjId, 'gallery')}
                                  className="px-1.5 py-1 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg text-center cursor-pointer transition-colors"
                                  title="Add to Project Gallery"
                                >
                                  + Gallery
                                </button>

                                <button
                                  onClick={() => assignMediaToProject(file.url, targetProjId, 'video')}
                                  className="px-1.5 py-1 text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-center cursor-pointer transition-colors"
                                  title="Set as Walkthrough Video"
                                >
                                  ▶ Video
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

              </div>
            )}

            {/* TAB 3: CMS FRAMEWORKS RESEARCH (Specifically addresses user prompt) */}
            {activeTab === 'cms-research' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Evaluation of Content Management Systems for Portfolio Tracking</span>
                  </div>
                  <p className="text-xs text-amber-950/80 mt-1 leading-relaxed">
                    Based on your request, we evaluated the leading modern content management frameworks (headless & database engines) specifically for engineering construction & chemical portfolio tracking.
                  </p>
                </div>

                {cmsFrameworks && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cmsFrameworks.frameworks?.map((fw: any) => (
                        <div
                          key={fw.name}
                          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-base font-bold font-heading text-slate-900">
                                {fw.name}
                              </h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {fw.suitabilityRating.split('(')[0]}
                              </span>
                            </div>

                            <span className="text-[11px] font-medium text-slate-500 block mb-2">
                              {fw.type} • DB: {fw.database}
                            </span>

                            <div className="text-[11px] text-slate-600 font-medium mb-3">
                              <strong>Best For:</strong> {fw.bestFor}
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pros:</span>
                              {fw.pros.map((pro: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                                  <span className="text-emerald-600">✓</span>
                                  <span>{pro}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                            <strong>Note:</strong> {fw.cons[0]}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final Architectural Recommendation */}
                    <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3">
                      <h4 className="text-sm font-bold font-heading text-amber-400">
                        Architectural Verdict for Ramzan Chemical Construction:
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        1. <strong>Phase 1 (Current Production):</strong> The current <em>Integrated Native SQLite / Express Engine</em> is optimal: zero monthly cloud subscription, instant sub-millisecond portfolio delivery, custom fields tailored to construction chemicals (APP membranes, epoxy thickness, substrate CSP profile), and zero operational complexity.<br />
                        2. <strong>Phase 2 (When expanding to 10+ field engineers across KPK/Punjab):</strong> Upgrade to <strong>Payload CMS 3.0</strong> or <strong>Directus</strong> on a managed PostgreSQL instance for role-based field reporting with offline photos.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: DATABASE SCHEMA & EXPORT */}
            {activeTab === 'schema' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">
                    Recommended Database Schema & Data Export
                  </h3>
                  <p className="text-xs text-slate-500">
                    Production SQL Schema tailored for construction chemicals projects, testing reports, and clients.
                  </p>
                </div>

                <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 font-mono text-xs overflow-x-auto relative">
                  <div className="text-slate-400 mb-2">// PostgreSQL / Cloud SQL DDL Specification</div>
                  <pre className="text-[11px] leading-relaxed">
{`-- Projects Table Definition
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'Waterproofing', 'Epoxy Flooring', 'Paint & Coating Systems'
    secondary_category VARCHAR(64),
    location VARCHAR(255) NOT NULL,
    area_sqft NUMERIC(12,2) DEFAULT 0,
    completion_year SMALLINT NOT NULL,
    status VARCHAR(32) DEFAULT 'Completed', -- 'Completed', 'Ongoing', 'Under Tender'
    is_featured BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    chemicals_used JSONB DEFAULT '[]'::jsonb, -- Array of chemical brands and specs
    performance_highlights JSONB DEFAULT '[]'::jsonb,
    hero_image_url VARCHAR(1024) NOT NULL,
    gallery_image_urls JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries & Leads Table Definition
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    service_requested VARCHAR(64) NOT NULL,
    estimated_area VARCHAR(64),
    project_location VARCHAR(255),
    notes TEXT,
    status VARCHAR(32) DEFAULT 'New', -- 'New', 'Contacted', 'Survey_Scheduled', 'Closed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);`}
                  </pre>
                </div>

                {/* Export Current Data Button */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Backup & Export Portfolio Data</div>
                    <div className="text-[11px] text-slate-500">Download current projects and inquiries as JSON</div>
                  </div>
                  <button
                    onClick={() => {
                      const jsonStr = JSON.stringify({ projects, inquiries }, null, 2);
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `ramzan-chemical-data-backup-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast('Database exported as JSON file');
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Export JSON Backup
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* PROJECT ADD/EDIT MODAL */}
      {isEditorOpen && editingProject && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
              <h3 className="text-base font-bold font-heading text-slate-900">
                {editingProject.id ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={closeProjectEditor}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {editorError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {editorError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. Heavy-Duty Workshop Epoxy Screed"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Name / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    placeholder="e.g. NLC / Toyota / Berger / Private Client"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Category *</label>
                  <select
                    value={editingProject.category || 'Waterproofing'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <option value="Waterproofing">Waterproofing</option>
                    <option value="Epoxy Flooring">Epoxy Flooring</option>
                    <option value="Paint & Coating Systems">Paint & Coating Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Secondary Category</label>
                  <input
                    type="text"
                    value={editingProject.secondaryCategory || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, secondaryCategory: e.target.value })}
                    placeholder="Optional: e.g. Waterproofing"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Area (Sq. Ft.)</label>
                  <input
                    type="number"
                    value={editingProject.areaSqFt || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, areaSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Year Completed</label>
                  <input
                    type="number"
                    value={editingProject.year || new Date().getFullYear()}
                    onChange={(e) => setEditingProject({ ...editingProject, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingProject.status || 'Completed'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Under Tender">Under Tender</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Site Location</label>
                <input
                  type="text"
                  value={editingProject.location || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  placeholder="e.g. Yousafzai Market, Mardan / Motorway Logistics Corridor"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              {/* Main Project Image (File Upload or URL) */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-slate-800">
                    Project Cover Photo *
                  </label>
                  {uploadingImage && (
                    <span className="text-[11px] text-amber-600 animate-pulse font-medium">
                      Uploading image to server...
                    </span>
                  )}
                </div>

                {uploadError && (
                  <p className="text-[11px] text-red-600">{uploadError}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {editingProject.imageUrl ? (
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                      <img
                        src={editingProject.imageUrl}
                        alt="Project Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-20 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 text-slate-400 text-[10px] text-center p-1">
                      No Photo Selected
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    {/* File Picker */}
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-amber-600" />
                        <span>Upload from Computer / Phone</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, false);
                          }}
                        />
                      </label>
                      <span className="text-[10px] text-slate-500">or enter direct URL</span>
                    </div>

                    <input
                      type="text"
                      value={editingProject.imageUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                      placeholder="e.g. /uploads/my_project.jpg or https://..."
                      className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Proof-of-Work Gallery Photos */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-slate-800">
                    Additional Site Gallery Photos ({editingProject.beforeAfterImages?.length || 0})
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-2.5 py-1 rounded-lg cursor-pointer shadow-2xs transition-colors">
                      <Plus className="w-3 h-3" />
                      <span>Upload Photos (Batch)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            handleMultipleGalleryUpload(e.target.files);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {editingProject.beforeAfterImages && editingProject.beforeAfterImages.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {editingProject.beforeAfterImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative group w-16 h-14 rounded-lg overflow-hidden border border-slate-300">
                        <img src={imgUrl} alt="Gallery item" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject({
                              ...editingProject,
                              beforeAfterImages: (editingProject.beforeAfterImages || []).filter((_, i) => i !== idx)
                            });
                          }}
                          className="absolute inset-0 bg-red-950/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold"
                          title="Remove photo"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    Add before/after photos or application stages for this site.
                  </p>
                )}
              </div>

              {/* Project Site Video (File Upload or Video URL) */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-slate-800 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-amber-600" />
                    <span>Project Site Video Walkthrough (Optional)</span>
                  </label>
                  {uploadingVideo && (
                    <span className="text-[11px] text-amber-600 animate-pulse font-medium">
                      Uploading video to server...
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg cursor-pointer transition-colors shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      <span>Upload Video File (.mp4, .webm, .mov)</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleVideoUpload(file);
                        }}
                      />
                    </label>
                    <span className="text-[10px] text-slate-500">or enter direct URL / YouTube link</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingProject.videoUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                      placeholder="e.g. /uploads/site_video.mp4 or https://youtu.be/... or https://..."
                      className="w-full px-3 py-1.5 bg-white text-xs text-slate-900 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    {editingProject.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, videoUrl: '' })}
                        className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg border border-red-200 whitespace-nowrap cursor-pointer"
                        title="Remove video"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>

                  {editingProject.videoUrl && (
                    <div className="p-2 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-xs">
                      <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate flex-1 font-mono text-[11px] text-slate-300">
                        {editingProject.videoUrl}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Attached
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technical Scope Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Describe substrate analysis, chemical application, and final handoff..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Chemicals Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={chemicalsInput}
                  onChange={(e) => setChemicalsInput(e.target.value)}
                  placeholder="e.g. Bituminous Primer, APP 4mm Membrane, Epoxy Novolac Topcoat"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Project Highlights (one per line)
                </label>
                <textarea
                  rows={2}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="e.g. Zero leakages verified by 72-hr ponding test&#10;Forklift rolling load certified"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="featured-check" className="font-semibold text-slate-800">
                  Feature this project prominently on homepage & portfolio benchmarks
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeProjectEditor}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editorLoading}
                  className="px-5 py-2 text-slate-950 font-bold bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{editorLoading ? 'Saving...' : 'Save to Database'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
