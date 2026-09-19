import React from 'react';
import { Shield, Phone, Mail, MapPin, Lock, ExternalLink } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

interface FooterProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand & Legal Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="text-sm font-black text-white tracking-tight">
                  RAMZAN CHEMICAL CONSTRUCTION
                </div>
                <div className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                  (PRIVATE) LIMITED
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-md">
              Specialized contractors in high-durability industrial epoxy flooring screeds, advanced bituminous & liquid polyurethane waterproofing, and protective anti-carbonation architectural coatings.
            </p>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Corporate Incorporation:</span>
                <span className="font-mono text-white font-medium">SECP #{COMPANY_PROFILE.incorporationNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">FBR Active Taxpayer:</span>
                <span className="font-mono text-emerald-400 font-medium">Ref #{COMPANY_PROFILE.referenceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jurisdiction:</span>
                <span className="text-slate-200">{COMPANY_PROFILE.taxOffice}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Waterproofing Systems (APP & PU)</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Industrial Epoxy & PU Screeds</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Paint & Anti-Carbonation Coatings</a></li>
              <li><a href="#estimator" className="hover:text-amber-400 transition-colors">Interactive Cost Calculator</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Project Portfolio (NLC, Toyota, Suzuki)</a></li>
              <li><a href="#credentials" className="hover:text-amber-400 transition-colors">Corporate Legal Credentials</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Registered Office & Inquiries
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">{COMPANY_PROFILE.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_PROFILE.phone}`} className="hover:text-amber-400 font-bold">
                  {COMPANY_PROFILE.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.email}`} className="hover:text-amber-400">
                  {COMPANY_PROFILE.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors"
              >
                Request Physical Site Inspection
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright & Admin Management Link */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_PROFILE.legalName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Admin Dashboard (Active)' : 'Admin CMS & Portfolio Management'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
