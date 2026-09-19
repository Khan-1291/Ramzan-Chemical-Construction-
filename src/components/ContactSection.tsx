import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

interface ContactSectionProps {
  initialService?: string;
  initialArea?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialArea,
  initialNotes
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    organization: '',
    email: '',
    serviceRequested: initialService || 'Waterproofing',
    estimatedArea: initialArea || '',
    location: 'Mardan, KPK',
    notes: initialNotes || ''
  });

  useEffect(() => {
    if (initialService) setFormData(prev => ({ ...prev, serviceRequested: initialService }));
    if (initialArea) setFormData(prev => ({ ...prev, estimatedArea: initialArea }));
    if (initialNotes) setFormData(prev => ({ ...prev, notes: initialNotes }));
  }, [initialService, initialArea, initialNotes]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please provide your name and valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`Submission failed (HTTP ${res.status})`);
      }

      const data = await res.json();
      setSubmittedId(data.inquiry?.id || 'INQ-SUCCESS');
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error submitting your inquiry. Please contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Office Details & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Direct Engineering Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-3 tracking-tight">
                Schedule a Site Survey or Request Quotation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                Connect directly with our chemical engineering team. We provide rapid site inspections, moisture testing, and technical BOQ proposals across Khyber Pakhtunkhwa, Islamabad, and nationwide.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">Head Office Location</div>
                  <div className="text-white font-medium mt-0.5 leading-snug">{COMPANY_PROFILE.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">Direct Phone / Hotlines</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <a href={`tel:${COMPANY_PROFILE.phone}`} className="text-white hover:text-amber-400 font-bold transition-colors">
                      {COMPANY_PROFILE.phoneDisplay}
                    </a>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 text-xs">Emergency Seepage Line: 24/7</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">Operating Hours</div>
                  <div className="text-white font-medium mt-0.5">{COMPANY_PROFILE.workingHours}</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(COMPANY_PROFILE.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Instant WhatsApp Consultation (0345-9191020)</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
            {submittedId ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Technical Inquiry Received!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your project inquiry has been registered under reference <span className="font-mono text-amber-400 font-bold">{submittedId}</span>. A Ramzan Chemical Construction technical specialist will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    setFormData({
                      name: '',
                      phone: '',
                      organization: '',
                      email: '',
                      serviceRequested: 'Waterproofing',
                      estimatedArea: '',
                      location: 'Mardan, KPK',
                      notes: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-700 pb-3 mb-4">
                  <h3 className="text-lg font-bold font-heading text-white">
                    Submit Project Specifications
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill in your requirement to receive a certified technical evaluation and itemized BOQ.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Engr. Asad Khan"
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0345-9191020"
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Organization / Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Frontier Logistics / Private Residence"
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Required
                    </label>
                    <select
                      value={formData.serviceRequested}
                      onChange={e => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Waterproofing">Waterproofing Systems</option>
                      <option value="Epoxy Flooring">Epoxy Flooring Systems</option>
                      <option value="Paint & Coating Systems">Paint & Coating Systems</option>
                      <option value="Turnkey Chemical Solution">Turnkey Chemical Solution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Estimated Area (sq.ft)
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedArea}
                      onChange={e => setFormData({ ...formData, estimatedArea: e.target.value })}
                      placeholder="e.g. 15,000 sq.ft"
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Location / City
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Mardan, Peshawar, Swat"
                      className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Details, Specific Symptoms or Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Describe any existing leakage, forklift loading, concrete age, or preferred timelines..."
                    className="w-full bg-slate-900 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Technical Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry for Certified Assessment</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
