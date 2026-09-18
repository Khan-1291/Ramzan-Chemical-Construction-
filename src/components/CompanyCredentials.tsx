import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  FileBadge2, 
  CheckCircle, 
  MapPin, 
  FileText, 
  ExternalLink,
  Award,
  Stamp
} from 'lucide-react';
import { COMPANY_INFO, WORK_PROCESS_STEPS } from '../data/companyData';

export const CompanyCredentials: React.FC = () => {
  return (
    <section id="credentials" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300">
            Legal & Corporate Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
            Government Registered & Tax Compliant
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Fully incorporated private limited company delivering quality workmanship, competitive rates, transparent billing, and professional service for residential, commercial, industrial, and infrastructure projects.
          </p>
        </div>

        {/* Official FBR / SECP Verification Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10 mb-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pb-8 border-b border-slate-200">
            
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" />
                  Official Federal Board of Revenue (FBR) Verification
                </span>
                <span className="text-xs font-medium text-slate-500">Online Active</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                {COMPANY_INFO.legalName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Registered under the Companies Ordinance, 1984 / Companies Act, 2017 with the Securities and Exchange Commission of Pakistan (SECP).
              </p>
            </div>

            {/* Verification Stamp Visual */}
            <div className="bg-slate-50 border-2 border-dashed border-emerald-300 rounded-2xl p-4 text-center shrink-0 w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                <Stamp className="w-5 h-5 text-emerald-600" />
                <span>INCOME TAX: ACTIVE</span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                Ref No: {COMPANY_INFO.referenceNo}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Tax Office: {COMPANY_INFO.taxOffice}
              </div>
            </div>

          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Registration / NTN No.
              </span>
              <div className="text-base font-bold font-mono text-slate-900">
                {COMPANY_INFO.fbrRegistrationNo}
              </div>
              <div className="text-xs text-slate-500">
                Ref: {COMPANY_INFO.referenceNo}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                SECP Incorporation No.
              </span>
              <div className="text-base font-bold font-mono text-slate-900">
                {COMPANY_INFO.incorporationNo}
              </div>
              <div className="text-xs text-slate-500">
                Private Limited Status
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Tax Jurisdiction
              </span>
              <div className="text-base font-bold text-slate-900">
                {COMPANY_INFO.taxOffice}
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                Active Taxpayer List (ATL)
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Principal Activity
              </span>
              <div className="text-base font-bold text-slate-900">
                890111 - Construction
              </div>
              <div className="text-xs text-slate-500">
                Chemical Supply & Application
              </div>
            </div>

          </div>

          {/* Registered Address Banner */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong className="text-slate-900">Registered Office Address:</strong> {COMPANY_INFO.address}
              </span>
            </div>
            <a
              href="#contact"
              className="text-amber-600 hover:text-amber-700 font-bold whitespace-nowrap"
            >
              Get Directions / Contact Office &rarr;
            </a>
          </div>

        </div>

        {/* 5-Step Engineering Application Process */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Methodology & Quality Control
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-1">
              Standard 5-Step Engineering Workflow
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              How our teams ensure flawless adhesion, zero moisture trapped in slabs, and decades of guaranteed durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORK_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between relative group hover:border-amber-400 hover:shadow-md transition-all"
              >
                <div>
                  <div className="text-2xl font-extrabold font-heading text-amber-500 mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold font-heading text-slate-900 leading-snug mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="w-full h-1 bg-slate-100 group-hover:bg-amber-400 rounded-full mt-4 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
