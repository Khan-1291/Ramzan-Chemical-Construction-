import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Menu, 
  X, 
  Calculator, 
  Briefcase, 
  Droplets, 
  Layers, 
  Paintbrush, 
  ArrowUpRight 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenAdmin?: () => void;
  activeSection?: string;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Clients", href: "#clients" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Cost Estimator", href: "#estimator" },
    { label: "Credentials", href: "#credentials" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top utility alert bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              FBR Registered (J664738-7)
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              SECP Inc. No: {COMPANY_INFO.incorporationNo}
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300 truncate max-w-md">
              📍 {COMPANY_INFO.address.split(',')[0]}, Mardan, KPK
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Corporate Identity */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-600 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent"></div>
                <div className="flex flex-col items-center justify-center font-bold text-white tracking-tighter">
                  <span className="text-base font-extrabold text-amber-400 leading-none">RCC</span>
                  <span className="text-[8px] text-slate-300 tracking-widest font-mono uppercase">LTD</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold font-heading text-slate-900 tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                  RAMZAN CHEMICAL
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 tracking-tight">
                CONSTRUCTION (PVT.) LTD.
              </span>
              <span className="text-[10px] text-amber-700 font-semibold tracking-wide uppercase">
                Waterproofing • Epoxy Flooring • Coatings
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-600 transition-colors py-2 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#estimator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all border border-slate-200"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>Cost Estimator</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>Get Free Survey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 hover:text-amber-600 hover:bg-amber-50/60 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs"
            >
              Request Site Survey & Quote
            </a>
            <div className="flex gap-2">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full text-center py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                Call Office: {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
