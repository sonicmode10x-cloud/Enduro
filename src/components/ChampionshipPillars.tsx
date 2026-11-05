import React from "react";
import { Trophy, Compass, Activity, Globe2, ArrowRight } from "lucide-react";

interface ChampionshipPillarsProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const ChampionshipPillars: React.FC<ChampionshipPillarsProps> = ({ onOpenRegisterModal }) => {
  const pillars = [
    {
      icon: Trophy,
      title: "Champions Pedigree",
      desc: "Proven track record hosting 80+ elite riders across national and international circuits."
    },
    {
      icon: Compass,
      title: "Technical Natural Arena",
      desc: "Seti riverbed granite boulder matrix, steep Annapurna hillside gradients, and clay tabletops."
    },
    {
      icon: Activity,
      title: "Professional Standards",
      desc: "FIM-certified flag marshals, transponder timing telemetry, and 4x4 trauma rescue teams."
    },
    {
      icon: Globe2,
      title: "Global Motorsport Stage",
      desc: "20M+ digital views, 50+ creators, and international athlete invitations putting Nepal on the world map."
    }
  ];

  return (
    <section className="py-20 bg-[#050507] border-t border-zinc-800/80 relative overflow-hidden">
      {/* Red Digital Wave Mesh Background (Direct Match to Reference) */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-2/3 h-96 pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle at 70% 50%, rgba(225, 6, 0, 0.35) 0%, transparent 60%)"
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#E10600 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Dramatic Helmeted Rider Portrait (Direct Match to Reference) */}
          <div className="lg:col-span-4">
            <div className="relative rounded-[2px] overflow-hidden border border-zinc-800 bg-[#09090c] aspect-[4/5] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=85"
                alt="Motocross champion with helmet"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E10600] font-bold">
                  Powered by Adventure Sport Hub
                </span>
                <div className="font-heading font-black text-xl text-white uppercase mt-0.5">
                  Pokhara, Nepal
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars & Header (Direct Match to Reference) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[2px] bg-[#E10600]" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#E10600]">
                  WHY ADVENTURE SPORT HUB?
                </span>
              </div>

              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white leading-none">
                CREATING CHAMPIONS
              </h2>
            </div>

            {/* 4 Feature Columns (Direct Match to Reference Icons & Typography) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="w-10 h-10 rounded-[2px] flex items-center justify-center text-[#E10600] mb-3">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading font-black text-base uppercase text-white tracking-wide mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
