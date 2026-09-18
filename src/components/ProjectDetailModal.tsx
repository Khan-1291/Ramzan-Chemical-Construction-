import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Building, 
  CheckCircle2, 
  FlaskConical, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Layers,
  Video,
  Play
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectForInquiry: (projectName: string, service: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectForInquiry
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">
              {project.category}
            </span>
            {project.secondaryCategory && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-200 text-slate-700">
                + {project.secondaryCategory}
              </span>
            )}
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
              project.status === 'Completed' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {project.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Title & Client */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold font-heading text-slate-950 tracking-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Building className="w-4 h-4 text-amber-600" />
                Client: {project.client}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-slate-400" />
                {project.areaSqFt ? `${project.areaSqFt.toLocaleString()} Sq. Ft.` : 'Custom Scope'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                Completed: {project.year}
              </span>
            </div>
          </div>

          {/* Project Hero Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 sm:h-80 relative bg-slate-100">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            {project.featured && (
              <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-md shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Benchmark Case Study
              </div>
            )}
          </div>

          {/* Project Site Video / Walkthrough */}
          {project.videoUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md">
              <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Project Site Video Walkthrough & Inspection</span>
                </div>
                <span className="text-[11px] text-slate-400">Site Record</span>
              </div>
              
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={
                      project.videoUrl.includes('watch?v=')
                        ? project.videoUrl.replace('watch?v=', 'embed/')
                        : project.videoUrl.includes('youtu.be/')
                        ? `https://www.youtube.com/embed/${project.videoUrl.split('youtu.be/')[1]}`
                        : project.videoUrl
                    }
                    title={`${project.title} Video`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : project.videoUrl.includes('vimeo.com') ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${project.videoUrl.split('vimeo.com/')[1]}`}
                    title={`${project.title} Video`}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={project.videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                )}
              </div>
            </div>
          )}

          {/* Additional Site Gallery Photos */}
          {project.beforeAfterImages && project.beforeAfterImages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Project Site Photo Gallery ({project.beforeAfterImages.length} images)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.beforeAfterImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-100 group">
                    <img
                      src={imgUrl}
                      alt={`${project.title} - photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-slate-950/80 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      Site Record #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description / Scope */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Engineering Scope of Work
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {project.description}
            </p>
          </div>

          {/* Chemicals and Formulations Used */}
          {project.chemicalsUsed && project.chemicalsUsed.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-amber-600" />
                Construction Chemicals & Materials Deployed
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.chemicalsUsed.map((chem, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/80 px-3 py-1 rounded-lg"
                  >
                    {chem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Highlights / Performance */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Key Quality Deliverables & Performance Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 bg-white border border-slate-200 p-2.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Ramzan Chemical Construction (Pvt.) Ltd. • Quality Workmanship & Professional Service
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300"
            >
              Close Details
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectForInquiry(project.title, project.category);
              }}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Inquire for Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
