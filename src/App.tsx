/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ClientsShowcase } from './components/ClientsShowcase';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CostEstimator } from './components/CostEstimator';
import { CompanyCredentials } from './components/CompanyCredentials';
import { ContactSection } from './components/ContactSection';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { Project } from './types';
import { COMPANY_INFO } from './data/companyData';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Admin modal state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('rcc_admin_token'));
  });

  // Contact form pre-fill props
  const [inquiryService, setInquiryService] = useState<string>('Waterproofing');
  const [inquiryArea, setInquiryArea] = useState<string>('');

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (err) {
      console.error('Error fetching projects from API, checking fallback:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    const checkAdminRoute = () => {
      if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        setIsAdminOpen(true);
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    const handleStorageChange = () => {
      setIsAdminLoggedIn(Boolean(localStorage.getItem('rcc_admin_token')));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSelectForInquiry = (projectName: string, service: string) => {
    setInquiryService(service || 'Waterproofing');
    setInquiryArea(`Inquiry for similar solution as "${projectName}"`);
    
    // Scroll smoothly to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteRequestedFromEstimator = (serviceName: string, areaText: string) => {
    setInquiryService(serviceName);
    setInquiryArea(areaText);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection="hero"
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero with FBR/SECP Badging & Reputable Clients */}
        <Hero />

        {/* 3 Core Services: Waterproofing, Epoxy Flooring, Paint & Coating Systems */}
        <ServicesSection />

        {/* Clients & Landmarks: NLC, Berger, Toyota, Suzuki */}
        <ClientsShowcase />

        {/* Dynamic Project Portfolio Gallery with category filters & search */}
        <PortfolioSection
          projects={projects}
          loading={loadingProjects}
          onSelectProject={(p) => setSelectedProject(p)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
        />

        {/* Interactive Construction Chemical & Cost Estimator */}
        <CostEstimator 
          onQuoteRequested={handleQuoteRequestedFromEstimator}
        />

        {/* Official FBR / SECP Company Registration Card & 5-Step Quality Methodology */}
        <CompanyCredentials />

        {/* Free Site Inspection & Consultation Booking Form + FAQs */}
        <ContactSection
          initialService={inquiryService}
          initialArea={inquiryArea}
          onInquirySubmitted={() => {
            // Optional callback
          }}
        />
      </main>

      {/* Corporate Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForInquiry={handleSelectForInquiry}
      />

      {/* Admin CMS & Portfolio Management Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProjectsUpdated={() => {
          fetchProjects();
          setIsAdminLoggedIn(Boolean(localStorage.getItem('rcc_admin_token')));
        }}
      />

      {/* Mobile Floating Quick Action Bar */}
      <aside aria-label="Quick contact actions" className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group"
          title="Chat with Chemical Engineer on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>

        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 sm:hidden"
          title="Emergency Call"
        >
          <Phone className="w-5 h-5" />
          <span className="sr-only">Call Office</span>
        </a>
      </aside>

    </div>
  );
}
