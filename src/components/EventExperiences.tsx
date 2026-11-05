import React, { useState } from "react";
import { Flag, Mountain, Flame, Bike, Music, Utensils, ShoppingBag, PartyPopper, CheckCircle2, ChevronRight } from "lucide-react";
import { MotocrossPhoto } from "./MotocrossPhoto";

interface ExperienceItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  graphicType: "hero-jump" | "rock-matrix" | "pokhara-himalayas" | "stunt-whip" | "paddock" | "crowd";
  photoUrl: string;
}

export const EventExperiences: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  const experiences: ExperienceItem[] = [
    {
      id: "motocross-racing",
      title: "Motocross Racing",
      tagline: "High-speed wheel-to-wheel battles on clay",
      category: "Speed & Agility",
      icon: Flag,
      description: "National and international riders battling across 20-gate starts, rhythm sections, and 25m tabletop leaps.",
      highlights: [
        "20-Gate synchronized start",
        "Pro Open, Expert & Novice heats",
        "25m tabletop jumps and rhythm lines"
      ],
      graphicType: "hero-jump",
      photoUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "enduro-challenge",
      title: "Enduro Mountain Challenge",
      tagline: "Man and machine against technical nature",
      category: "Hard Enduro",
      icon: Mountain,
      description: "Endurance racing demanding stamina over riverbed boulders, tractor tires, and steep mud step-ups.",
      highlights: [
        "Granite riverbed boulder matrix",
        "Staggered timber matrix logs",
        "Elimination format racing"
      ],
      graphicType: "rock-matrix",
      photoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "freestyle-stunts",
      title: "Freestyle Stunt Shows",
      tagline: "Gravity-defying aerial acrobatics",
      category: "Action Sports",
      icon: Flame,
      description: "Spectacular motorcycle stunts by veteran FMX riders launching 60-foot gap backflips, whips, and cliffhangers.",
      highlights: [
        "Backflip combos & seat-grabs",
        "Tandem jumps & pyrotechnics",
        "Street burnout and wheelie shows"
      ],
      graphicType: "stunt-whip",
      photoUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "biker-parade",
      title: "Pokhara Biker Parade",
      tagline: "Hundreds of motorcycles along Phewa Lake",
      category: "Community Ride",
      icon: Bike,
      description: "Ceremonial motorcycle parade rolling through Lakeside Pokhara, uniting touring clubs, custom builders, and racers.",
      highlights: [
        "Escorted ride through Lakeside",
        "Open to all registered riders",
        "Promoting helmet safety"
      ],
      graphicType: "pokhara-himalayas",
      photoUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "music-entertainment",
      title: "Music & Live Entertainment",
      tagline: "Live bands, powerhouse DJs, and festival sound",
      category: "Festival Audio",
      icon: Music,
      description: "High-energy beats keeping crowds hyped throughout heats, featuring top Nepali DJ acts and rock bands.",
      highlights: [
        "Live DJ sound system & race commentary",
        "Live rock sets between main heats",
        "Evening acoustic sunset lounge"
      ],
      graphicType: "crowd",
      photoUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "food-lifestyle",
      title: "Food & Lifestyle Zone",
      tagline: "Himalayan BBQ, specialty coffee & chill hub",
      category: "Catering & Culture",
      icon: Utensils,
      description: "Festival marketplace offering smoky Nepali sekuwa BBQ, woodfired pizzas, and artisanal espresso.",
      highlights: [
        "Curated local & global food stalls",
        "Shaded dining with arena screen views",
        "Artisanal coffee and juice bars"
      ],
      graphicType: "paddock",
      photoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "brand-expo",
      title: "Brand Expo & Tech Showcase",
      tagline: "Latest motorcycles, gear & automotive unveilings",
      category: "Commercial Showcase",
      icon: ShoppingBag,
      description: "Automotive brands and gear manufacturers showcase new 2027 machines, EV prototypes, and safety armor.",
      highlights: [
        "Vehicle unveils & dealership deals",
        "Designated consumer test-ride lane",
        "Discounts on helmets and jackets"
      ],
      graphicType: "paddock",
      photoUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "afterparty-meetup",
      title: "Afterparty & Rider Meet-Up",
      tagline: "Celebrate with champions, creators & fans",
      category: "Social Nightlife",
      icon: PartyPopper,
      description: "High-energy social celebration connecting riders, vloggers, and mechanics under the Pokhara night sky.",
      highlights: [
        "Champion trophy toast & podium meet",
        "VIP meet-and-greet with pro riders",
        "Signature closing DJ party"
      ],
      graphicType: "crowd",
      photoUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section id="experiences" className="py-24 bg-[#050507] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Anchor Header + Right Cards (Direct Match to Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Anchor Column (matching reference "ПУТЬ К ЧЕМПИОНСТВУ...") */}
          <div className="lg:col-span-3 flex flex-col justify-between p-6 sm:p-8 bg-[#09090c] border border-zinc-800/80 rounded-[2px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-[2px] bg-[#E10600]" />
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#E10600]">
                  RACE DISCIPLINES
                </span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-white leading-[0.92] mb-4">
                THE ROAD TO<br />
                CHAMPIONSHIP<br />
                <span className="text-[#E10600]">STARTS HERE</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-6">
                Unique competitive racing formats, brutal boulder matrices, and freestyle stunt performances set against the Annapurna mountains.
              </p>
            </div>

            <a
              href="#arena-layout"
              className="cursor-pointer inline-flex items-center justify-between gap-3 bg-transparent hover:bg-white/5 border border-zinc-700 hover:border-white text-white text-xs font-heading font-extrabold uppercase tracking-wider px-4 py-3 rounded-[2px] transition-all"
            >
              <span>EXPLORE ALL ARENAS</span>
              <span className="text-sm">→</span>
            </a>
          </div>

          {/* Right Cards: 3 Primary Race Cards (Matching reference card style) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
            {experiences.slice(0, 3).map((exp, idx) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp)}
                className="group relative cursor-pointer bg-[#09090c] border border-zinc-800/80 hover:border-[#E10600] p-5 flex flex-col justify-between rounded-[2px] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <h3 className="font-heading font-black text-xl uppercase tracking-wide text-white group-hover:text-[#E10600] transition-colors">
                    {exp.title}
                  </h3>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5 mb-3">
                    {exp.category}
                  </div>

                  {/* Framed Photo (matching reference) */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-black border border-zinc-800/80 mb-4 rounded-[2px]">
                    <MotocrossPhoto
                      src={exp.photoUrl}
                      alt={exp.title}
                      fallbackType={exp.graphicType}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>

                {/* Bottom Bar: Action link on left, Red Index Number on right (matching reference) */}
                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                    View Details →
                  </span>
                  <span className="font-mono font-bold text-sm text-[#E10600]">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining 5 Festival Dynamics (Expandable / Secondary Row) */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/80">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
              Additional Festival Experiences ({experiences.length - 3})
            </span>
            <span className="text-[11px] font-mono text-[#E10600]">Pokhara 2027</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {experiences.slice(3).map((exp, idx) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp)}
                className="group cursor-pointer bg-[#09090c] border border-zinc-800/80 hover:border-[#E10600] p-3.5 flex flex-col justify-between rounded-[2px] transition-all hover:-translate-y-0.5"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black mb-2.5 rounded-[2px] border border-zinc-800/60">
                    <MotocrossPhoto
                      src={exp.photoUrl}
                      alt={exp.title}
                      fallbackType={exp.graphicType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-heading font-black text-sm uppercase text-white group-hover:text-[#E10600] transition-colors leading-tight">
                    {exp.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {exp.tagline}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-zinc-800/60 text-[10px] font-mono">
                  <span className="text-zinc-500">Details</span>
                  <span className="text-[#E10600] font-bold">0{idx + 4}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Deep Dive Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="bg-[#0f0f12] border border-zinc-700 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono uppercase text-[#E50920] font-semibold">
                  {selectedExperience.category} · Event Experience
                </span>
                <h3 className="font-heading font-black text-3xl uppercase text-white mt-1">
                  {selectedExperience.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  {selectedExperience.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="my-6 aspect-[16/9] rounded overflow-hidden border border-zinc-800 bg-zinc-950">
              <MotocrossPhoto
                src={selectedExperience.photoUrl}
                alt={selectedExperience.title}
                fallbackType={selectedExperience.graphicType}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {selectedExperience.description}
            </p>

            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Key Experience Elements & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedExperience.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-200 bg-zinc-900/80 p-2.5 border border-zinc-800">
                    <CheckCircle2 size={14} className="text-[#E50920] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="cursor-pointer px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
              <a
                href="#arena-layout"
                onClick={() => setSelectedExperience(null)}
                className="cursor-pointer font-heading font-bold uppercase text-xs px-6 py-2.5 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted transition-colors"
              >
                View on Arena Map
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
