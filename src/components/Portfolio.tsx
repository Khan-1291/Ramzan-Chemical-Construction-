import React, { useState, useMemo } from 'react';
import { Search, MapPin, Maximize2, ExternalLink, Play, PlusCircle, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
  isLoading: boolean;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onSelectProject: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  projects,
  isLoading,
  onOpenAdmin,
  isAdminLoggedIn,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Waterproofing', 'Epoxy Flooring', 'Paint & Coating Systems'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory =
        selectedCategory === 'All' ||
        project.category === selectedCategory ||
        project.secondaryCategory === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.chemicalsUsed && project.chemicalsUsed.some(c => c.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title and Admin Management CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Verified Project Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
              Executed Chemical Engineering Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Browse our verified track record of completed waterproofing membranes, high-strength industrial epoxy screeds, and protective architectural coatings.
            </p>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-600" />
              <span>Manage / Add New Project (Admin)</span>
            </button>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by client, chemical, or city..."
              className="w-full pl-9 pr-4 py-2 bg-white text-xs text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center py-16 text-slate-500">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mb-3"></div>
            <p className="text-sm font-medium">Loading verified project database...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-600 text-sm font-medium">
              No projects found matching the selected filter or query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-600 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectProject(project)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div>
                {/* Project Image & Overlay Tags */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-900/90 text-amber-400 border border-slate-700/60 shadow-xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        Benchmark
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {project.videoUrl && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white flex items-center gap-1 shadow-xs animate-pulse">
                        <Play className="w-3 h-3 fill-white" />
                        Video
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs ${
                        project.status === 'Completed'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                      Client
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{project.client}</h4>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Chemicals Tags */}
                  {project.chemicalsUsed && project.chemicalsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.chemicalsUsed.slice(0, 2).map((chem, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate max-w-[170px]"
                        >
                          {chem}
                        </span>
                      ))}
                      {project.chemicalsUsed.length > 2 && (
                        <span className="text-[10px] text-slate-400 font-medium px-1 py-0.5">
                          +{project.chemicalsUsed.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Meta & Details Link */}
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {project.areaSqFt
                      ? `${project.areaSqFt.toLocaleString()} sq.ft.`
                      : 'Custom Scope'}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-amber-600 group-hover:text-amber-700">
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
