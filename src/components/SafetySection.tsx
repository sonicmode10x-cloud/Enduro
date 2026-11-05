import React from "react";
import { SAFETY_PROTOCOLS } from "../data/eventConfig";
import { ShieldAlert, Ambulance, Flame, FileCheck, ShieldCheck, Footprints, AlertTriangle } from "lucide-react";

export const SafetySection: React.FC = () => {
  const icons = [
    ShieldAlert,
    Ambulance,
    Flame,
    FileCheck,
    ShieldCheck,
    Footprints
  ];

  return (
    <section id="safety" className="py-24 bg-[#0d0d10] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-2">
            <span>OPERATIONAL RIGOR</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-zinc-400">SAFETY COMMITMENT</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] mb-4 text-balance">
            PROFESSIONAL STANDARDS.<br />
            <span className="text-[#E50920]">RESPONSIBLE MOTORSPORT.</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Safety is non-negotiable. Strict adherence to FIM marshaling, medical evacuation, and crowd governance.
          </p>
        </div>

        {/* 6 Safety Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAFETY_PROTOCOLS.map((protocol, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={protocol.title}
                className="bg-[#09090b] border border-zinc-800 p-6 flex flex-col justify-between transition-all hover:border-zinc-600"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-4">
                    <span className="text-[10px] font-mono uppercase text-[#E50920] font-bold">
                      {protocol.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Protocol 0{index + 1}
                    </span>
                  </div>

                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
                    <Icon size={20} className="text-[#E50920]" />
                  </div>

                  <h3 className="font-heading font-bold text-xl uppercase text-white mb-2 leading-tight">
                    {protocol.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {protocol.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 space-y-1.5">
                  {protocol.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                      <span className="w-1 h-1 bg-[#E50920] rounded-full shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Riding Notice */}
        <div className="mt-12 p-6 bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-zinc-400">
          <AlertTriangle size={24} className="text-amber-400 shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-zinc-200">Strict Track Rule:</strong> Extreme motorcycle racing occurs only within designated, marshaled, and barricaded track arenas. Street racing or unsanctioned public road stunts are strictly forbidden. All racers must possess valid personal competition insurance and approved safety equipment.
          </p>
        </div>
      </div>
    </section>
  );
};
