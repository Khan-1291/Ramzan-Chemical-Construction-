import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Clients } from './components/Clients';
import { Portfolio } from './components/Portfolio';
import { CostEstimator } from './components/CostEstimator';
import { Process } from './components/Process';
import { CorporateCredentials } from './components/CorporateCredentials';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { QuickActions } from './components/QuickActions';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminModal } from './components/AdminModal';
import { Project } from './types';
import { INITIAL_PROJECTS } from './data/initialData';

export function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Admin state
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('rcc_admin_token');
    } catch {
      return null;
    }
  });

  // Pre-fill state for contact inquiry section
  const [inquiryPreFill, setInquiryPreFill] = useState<{
    service?: string;
    area?: string;
    notes?: string;
  }>({});

  // Fetch Projects from /api/projects
  const fetchProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      const contentType = res.headers.get('content-type') || '';
      
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          return;
        }
      }
      // If endpoint returned non-JSON (e.g. index.html before deployment fix), fallback safely
      console.warn('Projects API returned non-JSON or empty response, retaining verified initial projects.');
    } catch (err) {
      console.warn('Network error fetching /api/projects:', err);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  // Verify Admin Token Session
  const verifyAdminSession = useCallback(async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        // Token expired or invalid
        localStorage.removeItem('rcc_admin_token');
        setAdminToken(null);
      }
    } catch {
      // Offline / network fallback
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    if (adminToken) {
      verifyAdminSession(adminToken);
    }
  }, [fetchProjects, adminToken, verifyAdminSession]);

  const handleLogin = (token: string) => {
    try {
      localStorage.setItem('rcc_admin_token', token);
    } catch {}
    setAdminToken(token);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('rcc_admin_token');
    } catch {}
    setAdminToken(null);
  };

  // Handler for service quote button click
  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setInquiryPreFill({
      service: serviceTitle,
      notes: `Inquiring for specialized application of ${serviceTitle}.`
    });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler for cost estimator quote button click
  const handleApplyEstimateToInquiry = (service: string, area: string, notes: string) => {
    setInquiryPreFill({ service, area, notes });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler for project modal inquiry click
  const handleProjectInquiry = (projectTitle: string) => {
    setInquiryPreFill({
      notes: `Interested in replicating engineering specification and chemical system from project: "${projectTitle}".`
    });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col antialiased">
      {/* Top Corporate Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={!!adminToken}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Specialized Services */}
        <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* Corporate Track Record & Clients */}
        <Clients />

        {/* Portfolio Showcase */}
        <Portfolio
          projects={projects}
          isLoading={isLoadingProjects}
          onOpenAdmin={() => setAdminModalOpen(true)}
          isAdminLoggedIn={!!adminToken}
          onSelectProject={project => setSelectedProject(project)}
        />

        {/* Interactive Cost Estimator */}
        <CostEstimator onApplyEstimateToInquiry={handleApplyEstimateToInquiry} />

        {/* 5-Step Certified Methodology */}
        <Process />

        {/* Legal & Corporate Credentials */}
        <CorporateCredentials />

        {/* Direct Technical Inquiry & Contact */}
        <ContactSection
          initialService={inquiryPreFill.service}
          initialArea={inquiryPreFill.area}
          initialNotes={inquiryPreFill.notes}
        />

        {/* Technical FAQ */}
        <FAQSection />
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={!!adminToken}
      />

      {/* Floating Fast Action Buttons */}
      <QuickActions />

      {/* Detailed Project Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleProjectInquiry}
      />

      {/* Comprehensive Admin Dashboard Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        token={adminToken}
        onLogin={handleLogin}
        onLogout={handleLogout}
        projects={projects}
        onRefreshProjects={fetchProjects}
      />
    </div>
  );
}

export default App;
