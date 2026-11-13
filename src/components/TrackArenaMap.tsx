import React, { useState, useEffect } from "react";
import {
  Eye,
  Maximize2,
  X,
  ChevronRight,
  CheckCircle,
  ZoomIn
} from "lucide-react";

interface CircuitSection {
  id: string;
  name: string;
  surface: string;
  pace: string;
  difficulty: "Extreme" | "Hard" | "Technical" | "High Speed";
  description: string;
  features: string[];
  viewingTip: string;
}

const CIRCUIT_SECTIONS: CircuitSection[] = [
  {
    id: "start-finish",
    name: "Start / Finish Straight",
    surface: "Compacted Clay / Timing Gate",
    pace: "Max Acceleration",
    difficulty: "High Speed",
    description: "Launch straight with electronic timing loops and transponder gates into sweeping turn 1.",
    features: ["20-Gate Drop Grid", "Holeshot Line", "Digital Timing Beacon"],
    viewingTip: "Grandstand main straight gives direct view of the 80-bike drop."
  },
  {
    id: "flat-river",
    name: "Flat [Stones / Water] & River Section",
    surface: "Wet River Stones, Silt & Cold Current",
    pace: "Slow / High Precision",
    difficulty: "Extreme",
    description: "Natural Himalayan riverbed strewn with slippery granite boulders and 2-foot water crossings.",
    features: ["Submerged Granite Boulders", "Current Resistance", "Traction Battles"],
    viewingTip: "Riverbank natural amphitheater offers close-up spray and splash views."
  },
  {
    id: "bridge",
    name: "Bridge Section [Narrow / Technical]",
    surface: "Timber Planks & Reinforced Span",
    pace: "Single-File Technical",
    difficulty: "Hard",
    description: "Suspended crossing over river gorge demanding pin-point handlebar precision.",
    features: ["Narrow 1.8m Bottleneck", "Approach Ramp", "Gorge Crossing"],
    viewingTip: "Footpath bridge vantage captures riders balancing across the span."
  },
  {
    id: "village",
    name: "Village Section [Hardpack]",
    surface: "Compacted Clay & Natural Stone Trails",
    pace: "Medium / Fast Sweepers",
    difficulty: "Hard",
    description: "Winding village pathways with hardpack clay offering high traction between terraced walls.",
    features: ["Blind Corners", "Stone Wall Run-Offs", "Rhythm Sweepers"],
    viewingTip: "Village hillside terraces provide elevated view of speed transitions."
  },
  {
    id: "enduro-forest",
    name: "Enduro [Forest / Roots] Section",
    surface: "Loam, Pine Needles & Exposed Tree Roots",
    pace: "Technical Endurance",
    difficulty: "Extreme",
    description: "Dense forest switchbacks crawling over slick diagonal tree roots and steep gradient climbs.",
    features: ["Root Staircases", "Off-Camber Bankings", "Canopy Shadow Shifts"],
    viewingTip: "Forest trail walking paths place spectators right beside the climb."
  },
  {
    id: "bamboo",
    name: "Bamboo Section [Sharp Turns]",
    surface: "Organic Humus & Sharp Chicanes",
    pace: "Tight S-Bends",
    difficulty: "Technical",
    description: "Intense bamboo grove maze featuring fast left-right flicks with tight handlebar clearance.",
    features: ["Natural Slalom", "Hairpin S-Bends", "Low Overhead Canopy"],
    viewingTip: "Corner 38 chicane entrance shows clutch slipping and pivot turns."
  },
  {
    id: "mx-section",
    name: "MX Section [Jumps / Berms]",
    surface: "Sculpted Motocross Clay & Deep Ruts",
    pace: "Fast but Tiring",
    difficulty: "High Speed",
    description: "Motocross arena segment loaded with rhythm tabletops, step-downs, and 45-degree berms.",
    features: ["25m Tabletop Air", "Double Jump Line", "High Banked Clay Berms"],
    viewingTip: "Central spectator hill provides 360-degree aerial jump views."
  },
  {
    id: "sand-section",
    name: "Sand Section [Deep Rutting]",
    surface: "Heavy Soft Sand",
    pace: "Physically Exhausting",
    difficulty: "Hard",
    description: "Deep silt-sand stretch testing endurance and throttle control as deep rolling ruts develop.",
    features: ["Unpredictable Rut Traps", "High RPM Sand Blasts", "Heavy Drag Zone"],
    viewingTip: "South bend overlooks riders charging through deep sand waves."
  }
];

export const TrackArenaMap: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>("enduro-forest");
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const selectedSection =
    CIRCUIT_SECTIONS.find((s) => s.id === selectedSectionId) || CIRCUIT_SECTIONS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="arena-layout" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Clean Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#D60A19] mb-1">
              Official Circuit Blueprint <span aria-hidden="true">·</span> Pokhara, Nepal
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none">
              RACE TRACK & ARENA LAYOUT
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#242426] hover:bg-zinc-900 text-white rounded-full transition-colors shadow-sm self-start sm:self-auto whitespace-nowrap"
          >
            <Maximize2 size={13} />
            <span>View Fullscreen Map</span>
          </button>
        </div>

        {/* Clean White Telemetry Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500 font-medium">Circuit Length</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-zinc-900 tabular-nums mt-0.5">
              2.0 KM
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500 font-medium">Total Corners</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-zinc-900 tabular-nums mt-0.5">
              55 CORNERS
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500 font-medium">Bike Class Rule</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#D60A19] tabular-nums mt-0.5">
              250 CC
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500 font-medium">Surface Mix</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-zinc-900 tabular-nums mt-0.5">
              4 TERRAINS
            </div>
          </div>
        </div>

        {/* 2-Column Clean White Map Container + Sector Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Topographic Map Card (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-stone-200 text-xs">
              <span className="font-semibold text-zinc-900">
                Satellite Topographic Master Map
              </span>
              <span className="text-zinc-500 hidden sm:inline">
                Click map to zoom
              </span>
            </div>

            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-[16/10] bg-zinc-950 rounded-2xl overflow-hidden cursor-zoom-in group"
            >
              <img
                src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
                alt="Moto Enduro Championship Official 2KM Circuit Blueprint Pokhara"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between pointer-events-none">
                <span className="text-xs text-white font-medium flex items-center gap-1.5">
                  <ZoomIn size={15} />
                  <span>Inspect high-resolution aerial route</span>
                </span>
                <span className="text-xs font-mono text-white/90">
                  2.0 KM <span aria-hidden="true">·</span> 55 Corners
                </span>
              </div>
            </div>

            {/* Sector Selector Buttons */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2.5">
                <span className="font-medium text-zinc-700">Select Track Sector</span>
                <span className="tabular-nums">{CIRCUIT_SECTIONS.length} key segments</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {CIRCUIT_SECTIONS.map((sec) => {
                  const isSelected = sec.id === selectedSectionId;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedSectionId(sec.id)}
                      className={`cursor-pointer text-left px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                        isSelected
                          ? "bg-[#242426] text-white shadow-sm"
                          : "bg-[#F5F4F0] text-zinc-700 hover:bg-stone-200/80 hover:text-zinc-900"
                      }`}
                    >
                      <div className="truncate font-semibold">{sec.name.split("[")[0]}</div>
                      <div className={`text-[10px] truncate ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                        {sec.difficulty}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean Surface Mix Breakdown */}
            <div className="mt-5 pt-4 border-t border-stone-200">
              <div className="text-xs font-semibold text-zinc-900 mb-2.5">
                Surface Mix Breakdown
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600">
                <div className="p-2.5 bg-[#F5F4F0] rounded-xl">
                  River (wet, stones): <strong className="text-zinc-900">Slow</strong>
                </div>
                <div className="p-2.5 bg-[#F5F4F0] rounded-xl">
                  Village trails: <strong className="text-zinc-900">Medium</strong>
                </div>
                <div className="p-2.5 bg-[#F5F4F0] rounded-xl">
                  Forest enduro + bamboo: <strong className="text-zinc-900">Technical</strong>
                </div>
                <div className="p-2.5 bg-[#F5F4F0] rounded-xl">
                  MX + sand: <strong className="text-zinc-900">Fast but tiring</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Sector Deep-Dive Inspector Card (5 columns) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5 text-xs">
                <div className="text-zinc-500">
                  <span className="font-semibold text-[#D60A19]">Sector Inspector</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Pokhara 2027</span>
                </div>
                <span className="font-semibold text-zinc-900">
                  {selectedSection.difficulty}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-zinc-900 tracking-tight mb-3 leading-tight">
                {selectedSection.name}
              </h3>

              <div className="space-y-1 mb-4 text-xs">
                <div className="flex items-center gap-2 text-zinc-600">
                  <span>Surface:</span>
                  <span className="text-zinc-900 font-semibold">{selectedSection.surface}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <span>Pace Profile:</span>
                  <span className="text-[#D60A19] font-semibold">{selectedSection.pace}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                {selectedSection.description}
              </p>

              {/* Corner Specification Breakdown */}
              <div className="mb-5 p-4 bg-[#F5F4F0] rounded-2xl">
                <div className="text-xs font-medium text-zinc-600 mb-2.5">
                  Corners Breakdown (55 Total)
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200/60">
                    <div className="font-heading font-bold text-zinc-900 text-lg tabular-nums">~12</div>
                    <div className="text-[11px] text-zinc-500">Sweepers</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200/60">
                    <div className="font-heading font-bold text-zinc-900 text-lg tabular-nums">~18</div>
                    <div className="text-[11px] text-zinc-500">Medium</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200/60">
                    <div className="font-heading font-bold text-[#D60A19] text-lg tabular-nums">~22</div>
                    <div className="text-[11px] text-zinc-500">Hairpins / S</div>
                  </div>
                </div>
              </div>

              {/* Technical Features */}
              <div className="space-y-2 mb-5">
                <h4 className="text-xs font-semibold text-zinc-900 mb-2">
                  Sector Obstacles
                </h4>
                {selectedSection.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-zinc-700 bg-[#F5F4F0] px-3 py-2.5 rounded-xl"
                  >
                    <CheckCircle size={14} className="text-[#D60A19] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Spectator Vantage */}
              <div className="p-4 bg-[#242426] text-white rounded-2xl text-xs">
                <div className="flex items-center gap-1.5 font-semibold mb-1">
                  <Eye size={14} className="text-zinc-300" />
                  <span>Spectator & Media Vantage</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {selectedSection.viewingTip}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Official FIM-Grade Layout</span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="cursor-pointer text-xs font-semibold text-[#D60A19] hover:text-zinc-900 transition-colors inline-flex items-center gap-1"
              >
                <span>Enlarge Aerial Map</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Map Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="w-full max-w-6xl flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-heading font-black text-lg sm:text-xl uppercase tracking-wide">
                Official Pokhara Circuit Topographic Map (2 KM)
              </span>
              <span className="text-xs font-mono text-zinc-400 hidden md:inline">
                55 Corners <span aria-hidden="true">·</span> 250cc Rules <span aria-hidden="true">·</span> Pokhara, Nepal
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="cursor-pointer p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              aria-label="Close fullscreen map"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="relative w-full max-w-6xl max-h-[82vh] overflow-auto flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
              alt="Official Extreme Moto Enduro Circuit Map Pokhara Fullscreen"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div
            className="w-full max-w-6xl pt-3 mt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span>River: Slow (Wet, Stones)</span>
              <span aria-hidden="true">·</span>
              <span>Village: Medium</span>
              <span aria-hidden="true">·</span>
              <span>Forest + Bamboo: Technical</span>
              <span aria-hidden="true">·</span>
              <span>MX + Sand: Fast but tiring</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="cursor-pointer text-white hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
