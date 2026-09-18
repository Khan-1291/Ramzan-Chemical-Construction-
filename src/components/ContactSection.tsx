import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { COMPANY_INFO, FAQS } from '../data/companyData';

interface ContactSectionProps {
  initialService?: string;
  initialArea?: string;
  onInquirySubmitted?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'Waterproofing',
  initialArea = '',
  onInquirySubmitted
}) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    service: initialService,
    estimatedArea: initialArea,
    location: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Synchronize initial values if changed by outside props
  React.useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
    if (initialArea) {
      setFormData(prev => ({ ...prev, estimatedArea: initialArea }));
    }
  }, [initialService, initialArea]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmittedSuccess(true);
      if (onInquirySubmitted) onInquirySubmitted();
      
      // Reset form
      setFormData({
        name: '',
        organization: '',
        phone: '',
        email: '',
        service: 'Waterproofing',
        estimatedArea: '',
        location: '',
        message: ''
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please call directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Consult With Our Engineers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950 mt-3 tracking-tight">
            Schedule a Free Site Inspection & Quote
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Connect directly with Ramzan Chemical Construction technical consultants for on-site slab moisture tests, problem diagnosis, and competitive BOQ estimates.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Contact Information & Map Card (Col 5) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Corporate Headquarters
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
                Ramzan Chemical Construction (Pvt.) Ltd.
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Registered under SECP Inc # 0350813 • FBR Reference # {COMPANY_INFO.referenceNo}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Head Office Address:</strong>
                  <span className="text-slate-300">{COMPANY_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Direct Engineering Line:</strong>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-amber-300 hover:underline">
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Emergency Seepage: {COMPANY_INFO.phoneEmergency}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Email Technical Inquiries:</strong>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-white">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Operational Hours:</strong>
                  <span className="text-slate-300">{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="pt-4 border-t border-slate-800">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Technical Consultation</span>
              </a>
            </div>

            {/* Coverage Regions */}
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 text-xs">
              <span className="text-amber-400 font-bold block mb-1">Service Coverage:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Mardan, Peshawar, Swat, Abbottabad, Haripur/Hattar Industrial Estate, Islamabad/Rawalpindi, Lahore & Nationwide project mobilization.
              </p>
            </div>

          </div>

          {/* Form Card (Col 7) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            
            <div className="mb-6">
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Submit Project Details for Technical Evaluation
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below. Our chemical engineers will review your substrate parameters and get back to you within 24 hours.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold font-heading text-emerald-950">
                  Thank You! Inquiry Received
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Your project details have been safely logged into our database. An engineer from our Mardan/Peshawar technical team will contact your provided phone number shortly.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-2 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Submit Another Project Inquiry &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Engr. Ahmad Khan"
                      className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Frontier Logistics / Private Residence"
                      className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0300-1234567"
                      className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ahmad@company.com"
                      className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Required Chemical Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="Waterproofing">Waterproofing (Roof, Basement, Tank)</option>
                      <option value="Epoxy Flooring">Epoxy Flooring (Industrial, Self-Leveling, ESD)</option>
                      <option value="Paint & Coating Systems">Paint & Coating Systems (Weather-Shield, Anti-Carbonation)</option>
                      <option value="Supply of Construction Chemicals">Bulk Supply of Construction Chemicals Only</option>
                      <option value="Full Turnkey Package">Full Turnkey Supply & Application Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Estimated Area (Sq. Ft.)
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      placeholder="e.g. 10,000 sq. ft."
                      className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Site Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Mardan Bypass / Industrial Zone / Islamabad"
                    className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Details / Problem Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the current condition: e.g. severe roof leakage during monsoon, forklift oil damage on concrete floor, or new construction specifications required..."
                    className="w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Transmitting Inquiry to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request for Free Site Inspection</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

        {/* Construction Chemicals FAQ Accordion */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Technical Clarity
            </span>
            <h3 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                
                {activeFaq === idx && (
                  <div className="px-4.5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
