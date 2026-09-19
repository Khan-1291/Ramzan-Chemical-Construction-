import React, { useState } from 'react';
import { Phone, Shield, Menu, X, ExternalLink } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
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
      {/* Top Corporate Legal Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              FBR Registered ({COMPANY_PROFILE.referenceNo})
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              SECP Inc. No: {COMPANY_PROFILE.incorporationNo}
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300 truncate max-w-md">
              📍 Office No. 38, Near Bypass, Abaseen Adda, Mardan
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="text-amber-400 hover:text-amber-300 text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 cursor-pointer"
              >
                Admin Active
              </button>
            )}
            <a
              href={`tel:${COMPANY_PROFILE.phone}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_PROFILE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-600 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-slate-950 font-heading group-hover:text-amber-600 transition-colors leading-tight">
                RAMZAN CHEMICAL
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                CONSTRUCTION (PVT.) LTD.
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-xs transition-colors"
            >
              Get Free Quotation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 border-b border-slate-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs font-bold text-slate-950 bg-amber-500 rounded-xl"
            >
              Request Site Inspection
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl border border-slate-200"
            >
              Admin CMS Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
