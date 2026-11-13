import React from "react";

interface ChampionshipPillarsProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const ChampionshipPillars: React.FC<ChampionshipPillarsProps> = ({ onOpenRegisterModal }) => {
  const pillars = [
    {
      title: "01. Champions Pedigree",
      desc: "Hosting 80+ elite national and international riders."
    },
    {
      title: "02. Technical Arena",
      desc: "Seti riverbed boulders, mud trenches, and clay tabletops."
    },
    {
      title: "03. FIM Standards",
      desc: "Transponder timing, flag marshals, and 4x4 trauma rescue."
    },
    {
      title: "04. Global Reach",
      desc: "20M+ views putting Nepal motorsport on the global stage."
    }
  ];

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Split Red & Charcoal Feature Card (Direct Match to Reference) */}
        <div className="rounded-[28px] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Bold Racing Red Photography */}
          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[360px] bg-[#C80815]">
            <img
              src="/src/assets/images/motocross_mx_jump_1794590871773.jpg"
              alt="Pokhara Motocross Action"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover mix-blend-luminosity opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#99050F]/80 via-[#C80815]/45 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-medium text-white/80">
                Adventure Sport Hub <span aria-hidden="true">·</span> Pokhara
              </span>
              <div className="font-heading font-black text-3xl uppercase tracking-tight mt-0.5">
                2027 Season
              </div>
            </div>
          </div>

          {/* Right Panel: Matte Charcoal Content */}
          <div className="lg:col-span-6 bg-[#2B2B2D] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight mb-3">
                This is Moto Enduro Cross
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Built to forge off-road champions across rugged Himalayan terrain—combining grit, precision engineering, and global digital culture.
              </p>

              {/* Clean 2x2 Pillar Index */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {pillars.map((p) => (
                  <div key={p.title}>
                    <h3 className="text-xs font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-zinc-400">Open for riders & partners</span>
              <button
                type="button"
                onClick={() => onOpenRegisterModal("sponsor")}
                className="cursor-pointer bg-white hover:bg-stone-100 text-zinc-900 font-semibold text-xs px-5 py-2 rounded-full transition-colors"
              >
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
