import React from 'react';
import { CLIENTS } from '../data/initialData';
import { Building2 } from 'lucide-react';

export const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Trusted By Major Industrial & Enterprise Clients
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-950 mt-1">
            Corporate & Federal Track Record
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-black tracking-wider px-2.5 py-1 rounded-lg border ${client.color}`}>
                    {client.logoText}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-200/70 px-2 py-0.5 rounded">
                    {client.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {client.name}
                </h3>
                <span className="text-xs text-slate-500 block mt-0.5">{client.sector}</span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-600">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Delivered:</span>
                <p className="line-clamp-2 leading-snug">{client.projectsDelivered}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
