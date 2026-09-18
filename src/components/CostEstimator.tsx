import React, { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Droplets, 
  Paintbrush, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface SurfaceOption {
  id: string;
  name: string;
  category: string;
  baseRatePerSqFt: number; // in PKR
  recommendedSystem: string;
  coats: string;
  turnaroundPer1000SqFtDays: number;
}

const SURFACE_OPTIONS: SurfaceOption[] = [
  {
    id: 'roof-app',
    name: 'Flat Concrete Roof (4mm APP Torch-On Bituminous Membrane)',
    category: 'Waterproofing',
    baseRatePerSqFt: 180,
    recommendedSystem: 'Bitumen D-41 Primer + 4mm Polyester-Reinforced Torch Membrane + Solar Reflective Coating',
    coats: '1 Primer + 1 Membrane Layer + 1 Reflective Finish',
    turnaroundPer1000SqFtDays: 1.5
  },
  {
    id: 'roof-pu',
    name: 'Exposed Terrace / Metal Roof (Liquid Polyurethane Elastomeric)',
    category: 'Waterproofing',
    baseRatePerSqFt: 220,
    recommendedSystem: 'High-Penetration Moisture Barrier + 2-Pack Liquid PU Resin + Geotextile Fleece Reinforcement',
    coats: '1 Primer + 2 Liquid PU Body Coats + 1 UV Topcoat',
    turnaroundPer1000SqFtDays: 2
  },
  {
    id: 'epoxy-self-level',
    name: 'Automotive Workshop / Commercial Epoxy Floor (2mm High-Gloss)',
    category: 'Epoxy Flooring',
    baseRatePerSqFt: 260,
    recommendedSystem: 'Diamond Grinding + Moisture Tolerant Epoxy Primer + 2mm 100% Solids Self-Leveling Resin',
    coats: 'Diamond Grind + 1 Primer + 1 Body Screed + 1 Gloss Sealer',
    turnaroundPer1000SqFtDays: 2.5
  },
  {
    id: 'epoxy-heavy-screed',
    name: 'Heavy Industrial Warehouse Floor (4mm - 5mm Epoxy Mortar)',
    category: 'Epoxy Flooring',
    baseRatePerSqFt: 380,
    recommendedSystem: 'Mechanical Shot Blasting + Heavy Epoxy Mortar Screed + High-Abrasion Aliphatic Topcoat',
    coats: 'Substrate Profiling + 1 Tack Coat + Mortar Troweling + 2 Topcoats',
    turnaroundPer1000SqFtDays: 3
  },
  {
    id: 'basement-waterproofing',
    name: 'Basement Retaining Walls (Negative Side Crystalline Slurry)',
    category: 'Waterproofing',
    baseRatePerSqFt: 195,
    recommendedSystem: 'V-Groove Crack Injection + Deep-Penetrating Crystalline Hydrophobic Slurry',
    coats: '2 Slurry Slush Coats + Hydraulic Water Plug on Active Seams',
    turnaroundPer1000SqFtDays: 2
  },
  {
    id: 'facade-coating',
    name: 'Exterior Building Facade (Anti-Carbonation Weather-Shield)',
    category: 'Paint & Coating Systems',
    baseRatePerSqFt: 130,
    recommendedSystem: 'Silane-Siloxane Water Repellent + Flexible Elastomeric Anti-Carbonation Barrier',
    coats: '1 Penetrating Primer + 2 Anti-Carbonation Protective Coats',
    turnaroundPer1000SqFtDays: 1
  },
  {
    id: 'water-tank',
    name: 'Underground / Overhead Potable Water Tank (Food-Grade Epoxy)',
    category: 'Waterproofing',
    baseRatePerSqFt: 240,
    recommendedSystem: 'High-Pressure Hydro Jetting + Solvent-Free Non-Toxic Potable Water Certified Epoxy',
    coats: '1 Moisture Barrier Primer + 2 High-Build Chemical Lining Coats',
    turnaroundPer1000SqFtDays: 2
  }
];

interface CostEstimatorProps {
  onQuoteRequested: (service: string, area: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onQuoteRequested }) => {
  const [selectedSurfaceId, setSelectedSurfaceId] = useState<string>(SURFACE_OPTIONS[0].id);
  const [areaSqFt, setAreaSqFt] = useState<number>(5000);
  const [condition, setCondition] = useState<'new' | 'minor' | 'damaged'>('minor');

  const selectedOption = SURFACE_OPTIONS.find(s => s.id === selectedSurfaceId) || SURFACE_OPTIONS[0];

  // Multiplier for surface repair condition
  const conditionMultiplier = condition === 'new' ? 1.0 : condition === 'minor' ? 1.15 : 1.35;
  const conditionLabel = condition === 'new' ? 'Standard Prep' : condition === 'minor' ? 'Minor Cracks & Patching (+15%)' : 'Heavy Repair & Seepage Fix (+35%)';

  const estimatedMinTotal = Math.round(selectedOption.baseRatePerSqFt * areaSqFt * conditionMultiplier * 0.95);
  const estimatedMaxTotal = Math.round(selectedOption.baseRatePerSqFt * areaSqFt * conditionMultiplier * 1.15);
  const estimatedDays = Math.max(2, Math.ceil((areaSqFt / 1000) * selectedOption.turnaroundPer1000SqFtDays));

  const handleSendWhatsApp = () => {
    const text = `Hello Ramzan Chemical Construction, I used your online Cost Estimator:\n\n` +
      `• System: ${selectedOption.name}\n` +
      `• Estimated Area: ${areaSqFt.toLocaleString()} sq. ft.\n` +
      `• Substrate Condition: ${conditionLabel}\n` +
      `• Estimated Budget Range: PKR ${estimatedMinTotal.toLocaleString()} - PKR ${estimatedMaxTotal.toLocaleString()}\n\n` +
      `Please schedule a physical site visit to inspect and prepare an official company quotation.`;
    
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
            Interactive Cost & Specification Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-3 tracking-tight">
            Estimate Your Construction Chemical Project
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Instant indicative calculation based on surface type, square footage, and chemical layer requirements in Pakistan.
          </p>
        </div>

        {/* Estimator Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Col 7) */}
          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6 shadow-xl">
            
            {/* Step 1: Select Application Surface */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                1. Select Application Surface & Chemical System
              </label>
              <select
                value={selectedSurfaceId}
                onChange={(e) => setSelectedSurfaceId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              >
                {SURFACE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    [{opt.category}] {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Surface Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  2. Project Area (Square Feet)
                </label>
                <span className="text-sm font-extrabold font-heading text-white px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                  {areaSqFt.toLocaleString()} sq. ft.
                </span>
              </div>
              
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              {/* Quick Area Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[1000, 3000, 5000, 10000, 20000, 45000].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setAreaSqFt(size)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      areaSqFt === size
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {size.toLocaleString()} sq.ft
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Current Substrate Condition */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                3. Substrate Condition & Seepage Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'new', label: 'Fresh Slab / Good', desc: 'Standard cleaning & grinding' },
                  { id: 'minor', label: 'Minor Cracks / Seep', desc: 'Crack filling & joint repair' },
                  { id: 'damaged', label: 'Heavy Damage / Wet', desc: 'Extensive patching & deep seal' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCondition(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      condition === item.id
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chemical Specification Details */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Recommended System Formulation</span>
              </div>
              <p className="text-slate-200 font-medium">
                {selectedOption.recommendedSystem}
              </p>
              <div className="text-slate-400 pt-1 text-[11px]">
                Coats & Layers: <span className="text-slate-200">{selectedOption.coats}</span>
              </div>
            </div>

          </div>

          {/* Results Display & Action (Col 5) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-850 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="border-b border-slate-700 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Indicative Project Estimate
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                PKR {estimatedMinTotal.toLocaleString()} – {estimatedMaxTotal.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Approx. PKR {Math.round(selectedOption.baseRatePerSqFt * conditionMultiplier)} / sq. ft. (Material Supply + Professional Application)
              </span>
            </div>

            {/* Breakdown Highlights */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-amber-400">{selectedOption.category}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Calculated Area:</span>
                <span className="font-semibold text-white">{areaSqFt.toLocaleString()} sq. ft.</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Estimated Duration:</span>
                <span className="font-semibold text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  ~{estimatedDays} Working Days
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-700/60">
                <span className="text-slate-400">Quality Standard:</span>
                <span className="font-semibold text-emerald-400">Supply & Precision Application</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Estimate via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onQuoteRequested(selectedOption.name, `${areaSqFt.toLocaleString()} sq. ft.`)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-750 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Request Physical Site Survey & Formal BOQ</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              *Estimates are indicative and include standard surface mechanical preparation, chemical supply, and certified application. Final rates determined post-site moisture inspection.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
