import React, { useState } from 'react';
import { 
  Droplets, 
  Layers, 
  Paintbrush, 
  CheckCircle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  BadgeCheck, 
  FlaskConical,
  Hammer
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/companyData';
import { ServiceDetail } from '../types';

export const ServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_CATALOG[0].id);

  const activeService = SERVICES_CATALOG.find(s => s.id === selectedServiceId) || SERVICES_CATALOG[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-500" />;
      case 'Paintbrush':
        return <Paintbrush className="w-5 h-5 text-emerald-500" />;
      default:
        return <Layers className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Engineered Specializations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
            Supply & Specialized Application Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            We provide quality supply and application services for residential, commercial, industrial, and infrastructure projects using quality construction chemicals and modern application techniques.
          </p>
        </div>

        {/* 3 Main Service Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {SERVICES_CATALOG.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`text-left p-5 rounded-2xl transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {service.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Service Detailed Architecture Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Full Description & Systems Included (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                    Comprehensive Chemical System Breakdown
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-950 tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Systems & Formulations Applied */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-600" />
                  Standard Systems & Chemical Formulations
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeService.systemsIncluded.map((sys, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-medium leading-tight">{sys}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Technical Benefits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  Engineering Advantages & Durability Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Applications, Sample Project & CTA (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Visual Preview */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative h-56 group">
                <img
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Benchmark Project</span>
                  <div className="text-xs font-medium text-slate-200">{activeService.sampleProject}</div>
                </div>
              </div>

              {/* Recommended Scope & Sectors */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-amber-600" />
                  Target Project Environments
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Booking Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Need this service?</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                    Site Visit Available
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Contact our chemical technical team for an on-site moisture test, substrate evaluation, and customized BOQ.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="#contact"
                    className="flex-1 text-center py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#estimator"
                    className="py-2.5 px-3 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                  >
                    Estimate Area
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
