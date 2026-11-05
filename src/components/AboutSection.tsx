import React from "react";
import { Mountain, Compass, Shield, Award, Users2, ArrowUpRight } from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { MotocrossPhoto } from "./MotocrossPhoto";

interface AboutSectionProps {
  onOpenProposalModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenProposalModal }) => {
  return (
    <section id="about" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-3">
            <span>CHAMPIONSHIP VISION</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-zinc-400">ORGANIZED BY ADVENTURE SPORT HUB</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] mb-6 text-balance">
            MORE THAN A RACE.<br />
            <span className="text-[#E50920]">A MOVEMENT.</span>
          </h2>
          <p className="text-base text-zinc-300 font-normal leading-relaxed">
            The Extreme Moto Enduro Cross Championship combines motocross, hard enduro obstacles, freestyle stunts, and youth culture in Pokhara.
          </p>
        </div>

        {/* 2-Column Split: Visual Narrative & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          {/* Visual Showcase (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative rounded-sm overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] group">
              <MotocrossPhoto
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                alt="Technical hard enduro motorcycle on rocky mountain terrain"
                fallbackType="rock-matrix"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-wider text-white border border-zinc-700">
                TECHNICAL ENDURO
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
                Tackling the granite riverbed boulder matrix
              </div>
            </div>

            <div className="p-5 bg-[#0d0d10] border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#E50920] uppercase font-semibold">
                  Destination
                </span>
                <h3 className="font-heading font-bold text-lg text-white uppercase mt-1 mb-1.5">
                  Pokhara: South Asia's Adventure Hub
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Steep natural gradients meet world-class hospitality, driving sports tourism and youth athletics in Nepal.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Elevation: {EVENT_CONFIG.championship.elevation}</span>
                <a
                  href="#arena-layout"
                  className="inline-flex items-center gap-1 text-[#E50920] hover:text-white font-semibold transition-colors"
                >
                  <span>Explore Track</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Core Strategic Pillars (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Set against the Annapurnas, our mission unites riders, sponsors, creators, and fans onto one high-octane stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 bg-zinc-900/40 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 bg-red-950/60 border border-red-900/40 flex items-center justify-center text-[#E50920] mb-2.5">
                  <Mountain size={16} />
                </div>
                <h4 className="font-heading font-bold text-sm uppercase text-white mb-1">
                  Natural Terrain
                </h4>
                <p className="text-xs text-zinc-400 leading-snug">
                  Steep mountain gradients, river rock beds, and elevation drops.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 bg-red-950/60 border border-red-900/40 flex items-center justify-center text-[#E50920] mb-2.5">
                  <Award size={16} />
                </div>
                <h4 className="font-heading font-bold text-sm uppercase text-white mb-1">
                  International Racing
                </h4>
                <p className="text-xs text-zinc-400 leading-snug">
                  Global competition pathway for national and international riders.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 bg-red-950/60 border border-red-900/40 flex items-center justify-center text-[#E50920] mb-2.5">
                  <Users2 size={16} />
                </div>
                <h4 className="font-heading font-bold text-sm uppercase text-white mb-1">
                  Creator Amplification
                </h4>
                <p className="text-xs text-zinc-400 leading-snug">
                  50+ vloggers generating millions of views across digital channels.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 bg-red-950/60 border border-red-900/40 flex items-center justify-center text-[#E50920] mb-2.5">
                  <Shield size={16} />
                </div>
                <h4 className="font-heading font-bold text-sm uppercase text-white mb-1">
                  Responsible Motorsport
                </h4>
                <p className="text-xs text-zinc-400 leading-snug">
                  FIM safety standards, certified helmets, and safe riding advocacy.
                </p>
              </div>
            </div>

            {/* Proposal Download Banner */}
            <div className="p-4 bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-900 border border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E50920] font-semibold">
                  Official Dossier
                </span>
                <h4 className="font-heading font-bold text-base uppercase text-white">
                  Event Proposal & Prospectus
                </h4>
                <p className="text-xs text-zinc-400">
                  Commercial tiers and track blueprints.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenProposalModal}
                className="cursor-pointer font-heading font-bold uppercase text-xs px-4 py-2.5 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted whitespace-nowrap shrink-0 transition-colors"
              >
                VIEW PROPOSAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
