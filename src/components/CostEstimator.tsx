import React, { useState } from 'react';
import { Calculator, Clock, ShieldCheck, MessageSquare, ArrowRight, Layers } from 'lucide-react';
import { ESTIMATOR_SYSTEMS, COMPANY_PROFILE } from '../data/initialData';

interface CostEstimatorProps {
  onApplyEstimateToInquiry: (service: string, area: string, notes: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimateToInquiry }) => {
  const [selectedSystemId, setSelectedSystemId] = useState<string>(ESTIMATOR_SYSTEMS[0].id);
  const [areaSqFt, setAreaSqFt] = useState<number>(5000);
  const [substrateCondition, setSubstrateCondition] = useState<'standard' | 'moderate' | 'heavy'>('standard');

  const selectedSystem = ESTIMATOR_SYSTEMS.find(s => s.id === selectedSystemId) || ESTIMATOR_SYSTEMS[0];

  // Multiplier for substrate prep
  const conditionMultiplier = {
    standard: 1.0,
    moderate: 1.15,
    heavy: 1.35
  }[substrateCondition];

  const effectiveRate = Math.round(selectedSystem.baseRatePerSqFt * conditionMultiplier);
  const minTotal = Math.round(effectiveRate * areaSqFt * 0.95);
  const maxTotal = Math.round(effectiveRate * areaSqFt * 1.08);

  const turnaroundDays = Math.max(2, Math.ceil((areaSqFt / 1000) * selectedSystem.turnaroundPer1000SqFtDays));

  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello Ramzan Chemical Construction, I used your online Cost Estimator:\n\n` +
      `• System: ${selectedSystem.name}\n` +
      `• Estimated Area: ${areaSqFt.toLocaleString()} sq.ft.\n` +
      `• Substrate Condition: ${substrateCondition}\n` +
      `• Estimated Budget: ${formatPKR(minTotal)} - ${formatPKR(maxTotal)}\n` +
      `• Estimated Turnaround: ~${turnaroundDays} working days\n\n` +
      `Please schedule a physical site survey to confirm final BOQ.`;
    return encodeURIComponent(text);
  };

  const handleSendToInquiry = () => {
    const notes = `System: ${selectedSystem.name} | Substrate: ${substrateCondition} | Estimated Budget: ${formatPKR(minTotal)} - ${formatPKR(maxTotal)} | Est. Turnaround: ~${turnaroundDays} days`;
    onApplyEstimateToInquiry(selectedSystem.category, `${areaSqFt.toLocaleString()} sq.ft`, notes);
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Transparent Budget Planning
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-3 tracking-tight">
            Interactive Construction Chemical Cost Estimator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Calculate instant budgetary projections for your industrial flooring, roof waterproofing, or protective coating project based on current Pakistan market material rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
            {/* System Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Select Chemical Application System
              </label>
              <select
                value={selectedSystemId}
                onChange={e => setSelectedSystemId(e.target.value)}
                className="w-full bg-slate-900 text-white text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {ESTIMATOR_SYSTEMS.map(sys => (
                  <option key={sys.id} value={sys.id}>
                    [{sys.category}] {sys.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-amber-400/90 mt-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{selectedSystem.recommendedSystem}</span>
              </p>
            </div>

            {/* Area Slider & Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Project Area (Square Feet)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="500"
                    max="200000"
                    step="500"
                    value={areaSqFt}
                    onChange={e => setAreaSqFt(Math.max(100, Number(e.target.value) || 0))}
                    className="w-28 bg-slate-900 text-white text-sm font-bold text-right px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-400">sq.ft.</span>
                </div>
              </div>

              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={areaSqFt}
                onChange={e => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>500 sq.ft</span>
                <span>10,000 sq.ft</span>
                <span>25,000 sq.ft</span>
                <span>50,000+ sq.ft</span>
              </div>
            </div>

            {/* Substrate Condition */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Substrate Condition & Surface Preparation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSubstrateCondition('standard')}
                  className={`p-3 rounded-xl text-left border cursor-pointer transition-all ${
                    substrateCondition === 'standard'
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold">Standard Prep</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Sound concrete, CSP 2 grind</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSubstrateCondition('moderate')}
                  className={`p-3 rounded-xl text-left border cursor-pointer transition-all ${
                    substrateCondition === 'moderate'
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold">Minor Cracks (+15%)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">V-cut epoxy patching required</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSubstrateCondition('heavy')}
                  className={`p-3 rounded-xl text-left border cursor-pointer transition-all ${
                    substrateCondition === 'heavy'
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold">Active Seepage (+35%)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">High-pressure chemical injection</div>
                </button>
              </div>
            </div>

            {/* Technical Specification Summary */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/80 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Coats / Layering:</span>
                <span className="font-medium text-white">{selectedSystem.coats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Project Turnaround:</span>
                <span className="font-medium text-amber-400">~{turnaroundDays} Working Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Quality Assurance:</span>
                <span className="font-medium text-emerald-400">Quality Supply & Application</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Budget Estimation Result
              </span>
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>

            <div>
              <span className="text-xs text-slate-400 block">Unit Cost Estimate:</span>
              <div className="text-xl font-bold font-heading text-white">
                PKR {effectiveRate} <span className="text-xs font-normal text-slate-400">/ sq.ft (approx.)</span>
              </div>
            </div>

            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Estimated Project Budget:</span>
              <div className="text-2xl sm:text-3xl font-black font-heading text-amber-400">
                {formatPKR(minTotal)} <span className="text-lg text-slate-400 font-normal">to</span> {formatPKR(maxTotal)}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Estimated curing & completion time: ~{turnaroundDays} days</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendToInquiry}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Official Site Survey with this Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_PROFILE.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Estimate to WhatsApp Engineer</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              *Estimates are for preliminary budgeting only. Final commercial quotation is issued post physical inspection by certified Ramzan Chemical Construction engineers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
