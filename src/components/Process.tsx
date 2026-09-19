import React from 'react';
import { PROCESS_STEPS } from '../data/initialData';
import { ClipboardCheck, FlaskConical, ShieldAlert, Sparkles, Award } from 'lucide-react';

export const Process: React.FC = () => {
  const icons = [ClipboardCheck, FlaskConical, ShieldAlert, Sparkles, Award];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Certified Execution Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
            5-Stage Chemical Engineering Methodology
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every square foot is installed in strict compliance with ASTM standards and manufacturer technical data sheets (TDS).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = icons[idx] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-heading text-amber-500/40 group-hover:text-amber-500 transition-colors">
                      {step.step}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
