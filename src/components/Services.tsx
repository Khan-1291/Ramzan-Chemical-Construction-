import React, { useState } from 'react';
import { Droplets, ShieldCheck, Paintbrush, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/initialData';
import { Service } from '../types';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Core Specialized Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
            Specialized Chemical Engineering Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Providing high-grade chemical material supply and certified applicator engineering across three foundational disciplines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {SERVICES.map(service => {
            const isSelected = service.id === activeServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-5 rounded-2xl text-left transition-all border cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/10'
                    : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {getIcon(service.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-heading text-slate-950">{service.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{service.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Detailed Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Text, Specs & Benefits */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {activeService.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-950 mt-3">
                {activeService.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                {activeService.fullDesc}
              </p>
            </div>

            {/* Applications List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Primary Applications & Field Use
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {activeService.applications.map((app, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chemical Formulations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Chemical Formulations & Recommended Systems
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeService.recommendedChemicals.map((chem, idx) => (
                  <span key={idx} className="text-xs font-medium bg-amber-50/70 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-md">
                    {chem}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onSelectServiceForInquiry(activeService.title)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>Request Quotation for {activeService.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              >
                <span>Browse Related Projects</span>
              </a>
            </div>
          </div>

          {/* Right: Cover & Key Benefits */}
          <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between">
            <div>
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 border border-slate-700/80 shadow-md">
                <img
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs font-medium text-amber-300">
                  {activeService.sampleProject}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Performance & Quality Advantages
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  {activeService.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              Compliant with ASTM D-41, BS 8204-6 and manufacturer application protocols.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
