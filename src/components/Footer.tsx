import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  ArrowUp,
  Droplets,
  Layers,
  Paintbrush
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-heading text-white">
              Need Professional Chemical Construction Solutions?
            </h3>
            <p className="text-slate-400 text-xs">
              Call our engineering team directly for on-site moisture tests and prompt quotations across Pakistan.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Company identity (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-amber-400 text-sm">
                  RCC
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold font-heading text-white">
                  {COMPANY_INFO.legalName}
                </h4>
                <p className="text-[11px] text-amber-400 font-medium">
                  SECP Inc. No: {COMPANY_INFO.incorporationNo}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Specializing in Waterproofing, Paint & Coating Systems, and Epoxy Flooring. We provide quality supply and application services for residential, commercial, industrial, and infrastructure projects across Pakistan.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>FBR Active Taxpayer • Ref No: {COMPANY_INFO.referenceNo} (RTO Peshawar)</span>
            </div>
          </div>

          {/* Quick Links (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services</a></li>
              <li><a href="#clients" className="hover:text-amber-400 transition-colors">Major Clients</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Project Gallery</a></li>
              <li><a href="#estimator" className="hover:text-amber-400 transition-colors">Chemical Cost Estimator</a></li>
              <li><a href="#credentials" className="hover:text-amber-400 transition-colors">FBR & SECP Verification</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact & Quote</a></li>
            </ul>
          </div>

          {/* Services (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Core Systems
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">APP Membrane Waterproofing</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Self-Leveling Epoxy Floors</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Anti-Static (ESD) Flooring</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Basement Crystalline Injection</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Anti-Carbonation Coatings</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Potable Water Tank Linings</a></li>
            </ul>
          </div>

          {/* Office Address (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Head Office Contact
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin CMS & Portfolio Management</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Waterproofing • Epoxy Flooring • Coating Systems</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
