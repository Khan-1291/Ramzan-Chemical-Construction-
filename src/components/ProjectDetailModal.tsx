import React, { useState } from 'react';
import { X, MapPin, Calendar, Maximize2, CheckCircle2, ShieldCheck, Play, ArrowRight, Building } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onInquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  // Aggregate all gallery images
  const allImages = [
    project.imageUrl,
    ...(project.beforeAfterImages || [])
  ].filter(Boolean);

  // Video embed helper
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Section: Hero / Gallery / Video */}
        <div className="relative bg-slate-950">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <img
              src={allImages[activeImageIndex] || project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500 text-slate-950">
                  {project.category}
                </span>
                {project.secondaryCategory && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {project.secondaryCategory}
                  </span>
                )}
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-500 text-white">
                  {project.status}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="p-3 bg-slate-900/95 flex items-center gap-2 overflow-x-auto border-t border-slate-800">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Embed If Provided */}
        {embedUrl && (
          <div className="p-6 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Site Walkthrough & Application Video
              </h3>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
              <iframe
                src={embedUrl}
                title="Project Video Walkthrough"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Details Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Client</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1 truncate">{project.client}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Location</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1 truncate">{project.location}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Scope Area</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {project.areaSqFt ? `${project.areaSqFt.toLocaleString()} sq.ft.` : 'Engineered Scope'}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Delivery Year</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">{project.year || 2024}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
              Engineering Scope of Work
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {project.description}
            </p>
          </div>

          {/* Construction Chemicals Deployed */}
          {project.chemicalsUsed && project.chemicalsUsed.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Construction Chemicals & Materials Deployed
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.chemicalsUsed.map((chem, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-lg"
                  >
                    {chem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Key Quality Deliverables & Performance Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {project.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Covered by Ramzan Chemical Construction written quality warranty</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inquire for Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
