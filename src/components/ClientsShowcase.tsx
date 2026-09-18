import React from 'react';
import { ShieldCheck, Award, Building, CheckCircle2, ChevronRight } from 'lucide-react';
import { CLIENT_PARTNERS } from '../data/companyData';

export const ClientsShowcase: React.FC = () => {
  return (
    <section id="clients" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Institutional Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
              Major Clients & Landmark Projects
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              We have successfully supplied and executed critical chemical construction projects for prominent national logistics entities, multinational automotive giants, and industrial leaders.
            </p>
          </div>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 group cursor-pointer"
          >
            <span>View Full Portfolio Gallery</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Clients Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLIENT_PARTNERS.map((client) => (
            <div
              key={client.name}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-slate-900 text-amber-400">
                    {client.logoText}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {client.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-amber-600 transition-colors">
                  {client.name}
                </h3>
                
                <span className="text-xs text-slate-500 block mt-0.5 font-medium">
                  {client.sector}
                </span>

                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                    Delivered Scope:
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-snug">
                    {client.projectsDelivered}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Quality Completion</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading text-white">
                Committed to Quality Workmanship & Competitive Rates
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Modern application machines, digital chemical ratio batching, and adherence to ASTM / DIN construction standards.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
            >
              Partner With Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
