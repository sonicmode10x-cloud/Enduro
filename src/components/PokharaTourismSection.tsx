import React from "react";
import { Mountain, Compass, Hotel, Briefcase, HeartHandshake, ShieldCheck } from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { MotorsportGraphic } from "./MotorsportGraphic";

export const PokharaTourismSection: React.FC = () => {
  const tourismImpacts = [
    {
      title: "Hospitality Economy",
      description: "Driving hotel bookings, lakeside dining, and retail sales across Pokhara.",
      icon: Hotel
    },
    {
      title: "Local Employment",
      description: "Hiring local construction crews, marshals, and event logistics staff.",
      icon: Briefcase
    },
    {
      title: "Youth Sporting Culture",
      description: "Inspiring young Nepali athletes to pursue structured off-road athletics.",
      icon: HeartHandshake
    },
    {
      title: "Adventure Branding",
      description: "Reinforcing Pokhara's reputation as a global hard enduro capital.",
      icon: Mountain
    },
    {
      title: "Safe Riding Practices",
      description: "Promoting helmet discipline and steering youth away from street racing.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="pokhara" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-2">
            <span>DESTINATION</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-zinc-400">POKHARA, NEPAL</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] mb-4 text-balance">
            WHERE ADVENTURE MEETS<br />
            <span className="text-[#E50920]">THE HIMALAYAS.</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Pokhara provides a spectacular natural arena beneath the Annapurna range and Phewa Lake.
          </p>
        </div>

        {/* 2-Column Split: Scenic Visual & Economic Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Visual Showcase (6 columns) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden border border-zinc-800 bg-zinc-950 rounded-sm">
              <MotorsportGraphic
                type="pokhara-himalayas"
                className="w-full h-full"
                overlayText="Pokhara Valley with Phewa Lake and the iconic Annapurna mountain range"
              />
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-sm px-3 py-1 text-[11px] font-heading font-bold text-white uppercase tracking-wider border border-zinc-700">
                HOST CITY · POKHARA, NEPAL
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#0d0d10] border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Elevation</span>
                <span className="font-heading font-black text-base text-white">822m - 1,400m</span>
              </div>
              <div className="p-3 bg-[#0d0d10] border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Distance to Lake</span>
                <span className="font-heading font-black text-base text-white">Lakeside Hub</span>
              </div>
              <div className="p-3 bg-[#0d0d10] border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Airport</span>
                <span className="font-heading font-black text-base text-white">PIA Connected</span>
              </div>
            </div>
          </div>

          {/* Destination Highlights & Impact (6 columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="font-heading font-black text-2xl uppercase text-white mb-2">
                Catalyzing Nepal's Adventure Economy
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                The championship is not an isolated race—it is a community-first sports tourism engine powered by Adventure Sport Hub. By attracting thousands of international travelers, regional racing teams, and digital media crews, the event creates a high-yield economic footprint across the Gandaki region.
              </p>
            </div>

            <div className="space-y-3">
              {tourismImpacts.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-3.5 bg-zinc-900/50 border border-zinc-800/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-none bg-red-950/60 border border-red-900/40 flex items-center justify-center text-[#E50920] shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm uppercase text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>
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
