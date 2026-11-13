import React from "react";
import { SAFETY_PROTOCOLS } from "../data/eventConfig";
import { AlertTriangle } from "lucide-react";

export const SafetySection: React.FC = () => {
  return (
    <section id="safety" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Clean Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-medium text-[#D60A19] mb-1">
            Operational Rigor <span aria-hidden="true">·</span> Safety Commitment
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none mb-3 text-balance">
            PROFESSIONAL STANDARDS
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Strict adherence to FIM marshaling, rapid medical evacuation, and crowd governance.
          </p>
        </div>

        {/* Clean 3-Column White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_PROTOCOLS.map((protocol, index) => (
            <div
              key={protocol.title}
              className="bg-white rounded-2xl border border-stone-200/80 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4 text-xs">
                  <span className="font-semibold text-[#D60A19]">
                    {protocol.badge}
                  </span>
                  <span className="font-mono text-zinc-500 tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl uppercase text-zinc-900 mb-2 leading-tight">
                  {protocol.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {protocol.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-zinc-700">
                {protocol.details.map((d, i) => (
                  <div key={i}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Track Rule Notice */}
        <div className="mt-8 p-5 bg-white rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-zinc-600">
          <AlertTriangle size={20} className="text-[#D60A19] shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-zinc-900">Strict Track Rule:</strong> Extreme motorcycle racing occurs strictly within designated, marshaled, and barricaded track arenas. All racers must hold valid competition insurance and approved safety gear.
          </p>
        </div>
      </div>
    </section>
  );
};
