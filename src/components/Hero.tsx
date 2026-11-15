import React from "react";
import { EVENT_CONFIG } from "../data/eventConfig";

interface HeroProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
  onOpenProposalModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProposalModal }) => {
  const { championship } = EVENT_CONFIG;

  return (
    <section
      id="hero"
      className="relative bg-[#08080A] text-white pt-28 pb-16 sm:pt-32 sm:pb-24 overflow-hidden"
    >
      {/* Pokhara Motocross Action Hero Photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"
          alt="Extreme Moto Enduro Cross Championship Rider and Spectators in Pokhara"
          className="w-full h-full object-cover object-[center_28%] scale-[1.03] opacity-90"
        />
        {/* Measured Dark & Crimson Scrims for High Text Contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 60% 35%, rgba(200, 8, 21, 0.22) 0%, rgba(8, 8, 10, 0.65) 55%, rgba(8, 8, 10, 0.92) 95%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/85 via-[#08080A]/45 to-[#08080A]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#08080A] pointer-events-none" />
      </div>

      {/* Balanced Editorial Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Left Headline Block */}
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wider uppercase text-zinc-300 mb-3">
              Pokhara, Nepal <span aria-hidden="true">·</span> {championship.year} Championship
            </p>

            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.92] mb-4 text-balance">
              WELCOME TO EXTREME MOTO ENDURO CROSS
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md mb-7">
              80+ competing riders, natural boulder trails, and 10,000+ spectators in the heart of Pokhara.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#experiences"
                className="cursor-pointer inline-flex items-center justify-center bg-white hover:bg-stone-100 text-zinc-900 font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-colors shadow-lg whitespace-nowrap"
              >
                Explore Race
              </a>

              <a
                href="#arena-layout"
                className="cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-colors px-3 py-2"
              >
                <span>View Race Map</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Quiet Editorial Metadata */}
          <div className="flex flex-col md:items-end text-left md:text-right gap-1.5 text-xs text-zinc-300">
            <span className="font-heading font-bold text-lg sm:text-xl uppercase tracking-wide text-white">
              Adventure Sport Hub
            </span>
            <span className="text-zinc-400">
              Official Off-Road Championship <span aria-hidden="true">·</span> FIM Standards
            </span>
            <button
              type="button"
              onClick={onOpenProposalModal}
              className="cursor-pointer text-xs text-zinc-300 hover:text-white underline decoration-zinc-500 underline-offset-4 md:self-end mt-1"
            >
              View Sponsorship Prospectus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
