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
      className="relative bg-[#08080A] text-white pt-28 pb-32 sm:pt-32 sm:pb-40 overflow-hidden"
    >
      {/* Centered Backlit Motocross Hero Portrait */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_motocross_rider_1794590872372.jpg"
          alt="Extreme Moto Enduro Cross Championship Rider"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-85"
        />
        {/* Clean Crimson & Charcoal Contrast Scrims */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(214, 10, 25, 0.25) 0%, rgba(8, 8, 10, 0.65) 55%, #08080A 92%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-[#08080A]" />
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
                href="#gallery"
                className="cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-colors px-3 py-2"
              >
                <span>Watch Highlights</span>
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
