import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Grid & Lighting Accents */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Verification Pill */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 shadow-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Award className="w-4 h-4" />
            Active Registered Taxpayer
          </span>
          <span className="text-slate-500">•</span>
          <span>FBR Ref: {COMPANY_PROFILE.referenceNo}</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-medium">Govt. of Pakistan Verified</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
              Advanced Chemical Solutions for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Waterproofing, Epoxy & Coatings
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              <strong className="text-white font-semibold">{COMPANY_PROFILE.legalName}</strong> is a specialized chemical construction solutions contractor providing premium material supply and precision application services for industrial facilities, infrastructure, commercial complexes, and modern residences.
            </p>

            {/* Core Capability Checklist */}
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-xl shadow-md transition-all group cursor-pointer"
              >
                <span>Request Site Inspection & Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all cursor-pointer"
              >
                <span>View Completed Projects</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(COMPANY_PROFILE.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-xl transition-all border border-emerald-800/60"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            {/* Stat Counters */}
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

          {/* Featured Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800/60 backdrop-blur-sm p-3">
              <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden group">
                <img
                  src="/images/project-1.jpeg"
                  alt="Industrial Epoxy Floor Application by Ramzan Chemical Construction"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                <div className="absolute top-3 left-3 bg-amber-500/95 text-slate-950 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                  Major Project Client: NLC
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">Industrial Epoxy Flooring</span>
                  <p className="text-sm font-medium text-white line-clamp-2 mt-0.5">
                    Quality supply and application of durable industrial epoxy flooring using modern techniques.
                  </p>
                </div>
              </div>

              {/* Quality Standards Triad */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg">
                  <div className="text-xs font-bold text-amber-400">Quality Supply</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Construction Chemicals</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg">
                  <div className="text-xs font-bold text-emerald-400">Modern Tech</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Application Services</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-lg">
                  <div className="text-xs font-bold text-white">Reliable & Durable</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Cost-Effective</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
