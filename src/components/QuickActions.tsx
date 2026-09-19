import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/initialData';

export const QuickActions: React.FC = () => {
  return (
    <aside aria-label="Quick contact options" className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${encodeURIComponent(COMPANY_PROFILE.whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Ramzan Chemical Construction on WhatsApp"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-xl flex items-center justify-center transition-all duration-300 group relative border-2 border-white/20"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="sr-only">WhatsApp Chat</span>
        {/* Hover tooltip */}
        <span className="absolute right-15 bg-slate-950 text-white text-xs font-semibold py-1.5 px-3 rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
          Chat on WhatsApp (0345-9191020)
        </span>
      </a>

      {/* Emergency Call Button */}
      <a
        href={`tel:${COMPANY_PROFILE.phoneEmergency}`}
        aria-label="Call Ramzan Chemical Construction emergency hotline"
        className="w-13 h-13 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 shadow-xl flex items-center justify-center transition-all duration-300 group relative border-2 border-white/20"
      >
        <Phone className="w-6 h-6" />
        <span className="sr-only">Emergency Call</span>
        {/* Hover tooltip */}
        <span className="absolute right-15 bg-slate-950 text-white text-xs font-semibold py-1.5 px-3 rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
          Direct Call: {COMPANY_PROFILE.phoneDisplay}
        </span>
      </a>
    </aside>
  );
};
