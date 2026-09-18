import React from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Layers, 
  Paintbrush, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  FileCheck, 
  Award, 
  MapPin,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO, CLIENT_PARTNERS } from '../data/companyData';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle architectural grid pattern background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Ambient gradient glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Verification Pill */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 shadow-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Active Registered Taxpayer
          </span>
          <span className="text-slate-500">•</span>
          <span>FBR Ref: {COMPANY_INFO.referenceNo}</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-medium">Govt. of Pakistan Verified</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
              Advanced Chemical Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Waterproofing, Epoxy & Coatings</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              <strong className="text-white font-semibold">Ramzan Chemical Construction (Pvt.) Ltd.</strong> is a specialized chemical construction solutions contractor providing premium material supply and precision application services for industrial facilities, infrastructure, commercial complexes, and modern residences.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Heavy-Duty Industrial Epoxy Flooring</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Waterproofing (Roofs, Basements, Reservoirs)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Paint & Protective Coating Systems</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Quality Construction Chemicals & Modern Techniques</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-xl shadow-md transition-all group"
              >
                <span>Request Site Inspection & Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all"
              >
                <span>View Completed Projects</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-xl transition-all border border-emerald-800/60"
              >
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            {/* Core Capability Highlights Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-amber-400">3 Core Fields</div>
                <div className="text-xs text-slate-400 mt-0.5">Waterproofing, Epoxy & Coatings</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-white">4 Sectors</div>
                <div className="text-xs text-slate-400 mt-0.5">Residential, Commercial, Industrial, Infra</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-heading text-emerald-400">Trusted Name</div>
                <div className="text-xs text-slate-400 mt-0.5">NLC, Toyota, Berger, Suzuki</div>
              </div>
            </div>

          </div>

          {/* Hero Visual Card (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800/60 backdrop-blur-sm p-3">
              
              {/* Main Feature Image */}
              <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden group">
                <img
                  src="/images/project%20(1).jpeg"
                  alt="Industrial Epoxy Floor Application by Ramzan Chemical Construction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-amber-500/95 text-slate-950 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                  Featured Project: NLC Logistics Terminal
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">Heavy-Duty Application</span>
                  <p className="text-sm font-medium text-white line-clamp-2 mt-0.5">
                    3mm Self-Leveling Epoxy Screed with High Chemical & Forklift Impact Resilience
                  </p>
                </div>
              </div>

              {/* 3 Quick Pill Specialties */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg">
                  <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-200 block">Waterproofing</span>
                  <span className="text-[9px] text-slate-400 block">Roofs & Tanks</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg">
                  <Layers className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-200 block">Epoxy Floors</span>
                  <span className="text-[9px] text-slate-400 block">Industrial & ESD</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg">
                  <Paintbrush className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-200 block">Coatings</span>
                  <span className="text-[9px] text-slate-400 block">Protective Paints</span>
                </div>
              </div>

              {/* Legal Credential Tag */}
              <div className="mt-3 bg-slate-900/60 rounded-lg p-2.5 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Incorporated: Reg # 0350813</span>
                </div>
                <span className="text-emerald-400 font-medium">Head Office: Mardan</span>
              </div>

            </div>
          </div>

        </div>

        {/* Reputable Clients Ticker Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center md:text-left shrink-0">
              Trusted by Premier Organizations:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto flex-1 max-w-4xl">
              {CLIENT_PARTNERS.map((client) => (
                <div
                  key={client.name}
                  className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 flex items-center justify-between gap-2 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white tracking-tight">{client.name.split('(')[0].trim()}</span>
                    <span className="text-[10px] text-slate-400 truncate">{client.sector}</span>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {client.logoText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
