import React, { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { MotocrossPhoto } from "./MotocrossPhoto";
import { LOCAL_IMAGES } from "../lib/localImages";

interface ExperienceItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  graphicType: "hero-jump" | "rock-matrix" | "pokhara-himalayas" | "stunt-whip" | "paddock" | "crowd";
  photoUrl: string;
}

export const EventExperiences: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [showAll, setShowAll] = useState(false);

  const experiences: ExperienceItem[] = [
    {
      id: "motocross-racing",
      title: "Motocross Racing",
      tagline: "High-speed wheel-to-wheel battles",
      category: "Speed & Agility",
      description: "20-gate starts, sculpted clay berms, and 25m tabletop leaps.",
      highlights: [
        "20-Gate synchronized start",
        "Pro Open, Expert & Novice heats",
        "25m tabletop jumps and rhythm lines"
      ],
      graphicType: "hero-jump",
      photoUrl: LOCAL_IMAGES.motocrossMxJump
    },
    {
      id: "enduro-challenge",
      title: "Enduro Challenge",
      tagline: "Technical river boulders & mud",
      category: "Hard Enduro",
      description: "Stamina test over riverbed granite boulders, forest roots, and water.",
      highlights: [
        "Granite riverbed boulder matrix",
        "Staggered timber matrix logs",
        "Elimination format racing"
      ],
      graphicType: "rock-matrix",
      photoUrl: LOCAL_IMAGES.hardEnduroRiverBoulders
    },
    {
      id: "freestyle-stunts",
      title: "Freestyle Stunts",
      tagline: "Gravity-defying FMX shows",
      category: "Action Sports",
      description: "Veteran FMX riders executing 60-foot gap backflips and whips.",
      highlights: [
        "Backflip combos & seat-grabs",
        "Tandem jumps & pyrotechnics",
        "Street burnout and wheelie shows"
      ],
      graphicType: "stunt-whip",
      photoUrl: LOCAL_IMAGES.freestyleStuntFmx
    },
    {
      id: "biker-parade",
      title: "Pokhara Parade",
      tagline: "Hundreds of bikes along Phewa Lake",
      category: "Community Ride",
      description: "Ceremonial motorcycle ride uniting touring clubs and racers.",
      highlights: [
        "Escorted ride through Lakeside",
        "Open to all registered riders",
        "Promoting helmet safety"
      ],
      graphicType: "pokhara-himalayas",
      photoUrl: LOCAL_IMAGES.heroMotocrossRider
    },
    {
      id: "music-entertainment",
      title: "Live Music Stage",
      tagline: "Bands, DJs & festival audio",
      category: "Festival Audio",
      description: "High-energy Nepali DJ acts and rock sets between main heats.",
      highlights: [
        "Live DJ sound system & race commentary",
        "Live rock sets between main heats",
        "Evening acoustic sunset lounge"
      ],
      graphicType: "crowd",
      photoUrl: LOCAL_IMAGES.freestyleStuntFmx
    },
    {
      id: "food-lifestyle",
      title: "Food & Lifestyle",
      tagline: "Himalayan BBQ & specialty coffee",
      category: "Catering & Culture",
      description: "Festival eats with smoky Nepali sekuwa, woodfired pizzas, and espresso.",
      highlights: [
        "Curated local & global food stalls",
        "Shaded dining with arena screen views",
        "Artisanal coffee and juice bars"
      ],
      graphicType: "paddock",
      photoUrl: LOCAL_IMAGES.motocrossMxJump
    },
    {
      id: "brand-expo",
      title: "Brand Expo Zone",
      tagline: "2027 motorcycles & safety gear",
      category: "Showcase",
      description: "Automotive unveilings, EV prototypes, and rider gear discounts.",
      highlights: [
        "Vehicle unveils & dealership deals",
        "Designated consumer test-ride lane",
        "Discounts on helmets and jackets"
      ],
      graphicType: "paddock",
      photoUrl: LOCAL_IMAGES.enduroHelmetStudio
    },
    {
      id: "afterparty-meetup",
      title: "Rider Afterparty",
      tagline: "Celebrate with champions & fans",
      category: "Nightlife",
      description: "Trophy toast and closing gathering under the Pokhara night sky.",
      highlights: [
        "Champion trophy toast & podium meet",
        "VIP meet-and-greet with pro riders",
        "Signature closing DJ party"
      ],
      graphicType: "crowd",
      photoUrl: LOCAL_IMAGES.heroMotocrossRider
    }
  ];

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section id="experiences" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Clean Editorial Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none">
              CHAMPIONSHIP SECTIONS
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Eight core disciplines and festival experiences across Pokhara Arena.
            </p>
          </div>
          <span className="text-xs font-medium text-zinc-500">
            Click any card for race details
          </span>
        </div>

        {/* Clean 4-Card Vertical Portrait Photo Grid (Direct Match to Reference) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleExperiences.map((exp) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => setSelectedExperience(exp)}
              className="group text-left cursor-pointer focus-visible:outline-none flex flex-col"
            >
              {/* Clean Rounded Image Frame without Overlay Clutter */}
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 shadow-sm mb-3">
                <MotocrossPhoto
                  src={exp.photoUrl}
                  alt={exp.title}
                  fallbackType={exp.graphicType}
                  aspectRatio="aspect-[4/5]"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Clean Typography Below Photo */}
              <h3 className="font-semibold text-base text-zinc-900 group-hover:text-[#D60A19] transition-colors">
                {exp.title}
              </h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed line-clamp-2">
                {exp.description}
              </p>
            </button>
          ))}
        </div>

        {/* Centered Dark Charcoal Pill Action Button (Direct Match to Reference "Click") */}
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer bg-[#242426] hover:bg-zinc-900 text-white font-medium text-xs sm:text-sm px-8 py-2.5 rounded-full transition-colors shadow-sm"
          >
            {showAll ? "Show Featured 4" : "Explore All 8 Sections"}
          </button>
        </div>
      </div>

      {/* Clean Light Experience Detail Modal */}
      {selectedExperience && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-200">
              <div>
                <span className="text-xs font-medium text-[#D60A19]">
                  {selectedExperience.category} <span aria-hidden="true">·</span> Event Experience
                </span>
                <h3 className="font-heading font-black text-3xl uppercase text-zinc-900 mt-1">
                  {selectedExperience.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                  {selectedExperience.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="cursor-pointer p-2 text-zinc-500 hover:text-zinc-900 hover:bg-stone-100 rounded-full transition-colors"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="my-5 aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100">
              <MotocrossPhoto
                src={selectedExperience.photoUrl}
                alt={selectedExperience.title}
                fallbackType={selectedExperience.graphicType}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed mb-6">
              {selectedExperience.description}
            </p>

            <div className="space-y-3 mb-7">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Key Experience Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedExperience.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-zinc-700 bg-[#F7F6F3] p-3 rounded-xl border border-stone-200/70"
                  >
                    <CheckCircle2 size={15} className="text-[#D60A19] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="cursor-pointer px-5 py-2.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
              >
                Close
              </button>
              <a
                href="#arena-layout"
                onClick={() => setSelectedExperience(null)}
                className="cursor-pointer font-semibold text-xs px-6 py-2.5 bg-[#242426] hover:bg-zinc-900 text-white rounded-full transition-colors"
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
