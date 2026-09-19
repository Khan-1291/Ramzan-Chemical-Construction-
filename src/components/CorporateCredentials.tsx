import React from 'react';
import { Building2, Award, ShieldCheck, FileCheck, CheckCircle } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

export const CorporateCredentials: React.FC = () => {
  return (
    <section id="credentials" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Corporate Governance & Legal Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
            Registered, Compliant & Certified Corporate Entity
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Fully authorized under the Companies Act 2017 with active tax compliance, enabling seamless contracting for federal projects, multi-national corporations, and public sector tenders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: SECP Corporate Registration */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl border border-amber-500/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    SECP Pakistan
                  </span>
                  <h3 className="text-base font-bold text-slate-950">
                    Corporate Incorporation
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Legal Entity:</span>
                  <span className="font-bold text-slate-900 text-right">Private Limited</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Incorporation No:</span>
                  <span className="font-mono font-bold text-slate-950">{COMPANY_PROFILE.incorporationNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Regulating Authority:</span>
                  <span className="font-medium text-slate-900">Govt. of Pakistan</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Corporate Office:</span>
                  <span className="font-medium text-slate-900 text-right">Mardan, KPK</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Registered under Companies Act 2017</span>
            </div>
          </div>

          {/* Card 2: FBR Tax Profile */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl border border-emerald-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Federal Board of Revenue
                  </span>
                  <h3 className="text-base font-bold text-slate-950">
                    Active Taxpayer Profile
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">FBR Reg. Number:</span>
                  <span className="font-mono font-bold text-slate-950">{COMPANY_PROFILE.fbrRegistrationNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Reference No:</span>
                  <span className="font-mono font-bold text-emerald-700">{COMPANY_PROFILE.referenceNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Tax Jurisdiction:</span>
                  <span className="font-semibold text-slate-900">{COMPANY_PROFILE.taxOffice}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Active Taxpayer Status:</span>
                  <span className="font-bold text-emerald-700">VERIFIED ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Full tax compliance for corporate withholding</span>
            </div>
          </div>

          {/* Card 3: Quality Commitment */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl border border-amber-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Quality Assurance
                  </span>
                  <h3 className="text-base font-bold text-slate-950">
                    Service Commitment
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200/80">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Quality Workmanship:</span>
                  <span className="font-bold text-slate-900">Professional Service</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Pricing Policy:</span>
                  <span className="font-bold text-slate-900">Competitive Rates</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Materials:</span>
                  <span className="font-medium text-slate-900">Quality Construction Chemicals</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Focus:</span>
                  <span className="font-bold text-slate-950">Customer Satisfaction</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-amber-700 font-medium">
              <CheckCircle className="w-4 h-4 text-amber-600" />
              <span>Experienced team delivering durable solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
