import React, { useState, useEffect } from "react";
import {
  Map,
  Eye,
  Flag,
  Info,
  Maximize2,
  X,
  Compass,
  Gauge,
  Layers,
  ChevronRight,
  CheckCircle,
  ZoomIn,
  ShieldAlert
} from "lucide-react";

interface CircuitSection {
  id: string;
  name: string;
  surface: string;
  pace: string;
  difficulty: "Extreme" | "Hard" | "Technical" | "High Speed";
  color: string;
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
    color: "#E50920",
    description: "Launch straight with electronic timing loops and transponder gates into immediate sweeping turn 1.",
    features: ["20-Gate Drop Grid", "Holeshot Line", "Digital Timing Beacon"],
    viewingTip: "Grandstand main straight gives direct view of the chaotic 80-bike drop."
  },
  {
    id: "flat-river",
    name: "Flat [Stones / Water] & River Section",
    surface: "Wet River Stones, Silt & Cold Current",
    pace: "Slow / High Precision",
    difficulty: "Extreme",
    color: "#38bdf8",
    description: "Natural Himalayan riverbed strewn with slippery granite boulders and 2-foot water crossings.",
    features: ["Submerged Granite Boulders", "Current Resistance", "Traction Battles"],
    viewingTip: "Riverbank natural amphitheater offers close-up spray and splash photography."
  },
  {
    id: "bridge",
    name: "Bridge Section [Narrow / Technical]",
    surface: "Timber Planks & Reinforced Span",
    pace: "Single-File Technical",
    difficulty: "Hard",
    color: "#e2e8f0",
    description: "Suspended crossing over river gorge demanding pin-point handlebar precision under zero runoff margin.",
    features: ["Narrow 1.8m Bottleneck", "Approach Ramp", "Gorge Drop Off"],
    viewingTip: "Footpath bridge vantage point captures riders balancing across the span."
  },
  {
    id: "village",
    name: "Village Section [Hardpack]",
    surface: "Compacted Clay & Natural Stone Trails",
    pace: "Medium / Fast Sweepers",
    difficulty: "Hard",
    color: "#ef4444",
    description: "Winding village pathways with hardpack clay offering high traction between terraced walls.",
    features: ["Blind Corners", "Stone Wall Run-Offs", "Rhythm Sweepers"],
    viewingTip: "Village hillside terraces provide elevated, panoramic view of speed transitions."
  },
  {
    id: "enduro-forest",
    name: "Enduro [Forest / Roots] Section",
    surface: "Loam, Pine Needles & Exposed Tree Roots",
    pace: "Technical Endurance",
    difficulty: "Extreme",
    color: "#22c55e",
    description: "Dense forest switchbacks crawling over slick diagonal tree roots and steep Himalayan gradient climbs.",
    features: ["Root Staircases", "Off-Camber Bankings", "Canopy Shadow Shifts"],
    viewingTip: "Forest trail walking paths allow spectators to feel the 2-stroke exhaust roar."
  },
  {
    id: "bamboo",
    name: "Bamboo Section [Sharp Turns]",
    surface: "Organic Humus & Sharp Chicanes",
    pace: "Tight S-Bends",
    difficulty: "Technical",
    color: "#84cc16",
    description: "Intense bamboo grove maze featuring fast left-right flicks with near-zero handlebar clearance.",
    features: ["Natural Slalom", "Hairpin S-Bends", "Low Overhead Canopy"],
    viewingTip: "Corner 38 chicane entrance shows aggressive clutch slipping and pivot turns."
  },
  {
    id: "mx-section",
    name: "MX Section [Jumps / Berms]",
    surface: "Sculpted Motocross Clay & Deep Ruts",
    pace: "Fast but Tiring",
    difficulty: "High Speed",
    color: "#f97316",
    description: "Man-made motocross arena segment loaded with rhythm tabletops, step-downs, and 45-degree berms.",
    features: ["25m Tabletop Air", "Double Jump Line", "High Banked Clay Berms"],
    viewingTip: "Central spectator hill provides 360-degree aerial views of jump whips."
  },
  {
    id: "sand-section",
    name: "Sand Section [Deep Rutting]",
    surface: "Heavy Soft Sand",
    pace: "Physically Exhausting",
    difficulty: "Hard",
    color: "#eab308",
    description: "Deep silt-sand stretch testing arm endurance and throttle control as deep rolling ruts develop.",
    features: ["Unpredictable Rut Traps", "High RPM Sand Blasts", "Heavy Drag Zone"],
    viewingTip: "South bend overlooks riders fighting handlebars through deep sand waves."
  }
];

export const TrackArenaMap: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>("enduro-forest");
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const selectedSection =
    CIRCUIT_SECTIONS.find((s) => s.id === selectedSectionId) || CIRCUIT_SECTIONS[0];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="arena-layout" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background motorsport accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E50920]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E50920]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E50920] animate-pulse" />
              <span>OFFICIAL CIRCUIT BLUEPRINT</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">POKHARA, NEPAL</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] text-balance">
              RACE TRACK & ARENA LAYOUT
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-[#E50920] transition-colors rounded-sm"
            >
              <Maximize2 size={14} className="text-[#E50920]" />
              <span>View Fullscreen Map</span>
            </button>
          </div>
        </div>

        {/* Circuit Telemetry Banner / Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#0d0d10] border border-zinc-800/90 p-4 rounded-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E50920]/10 border border-[#E50920]/30 flex items-center justify-center shrink-0">
              <Gauge size={20} className="text-[#E50920]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Circuit Length
              </div>
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                2.0 KM
              </div>
            </div>
          </div>

          <div className="bg-[#0d0d10] border border-zinc-800/90 p-4 rounded-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E50920]/10 border border-[#E50920]/30 flex items-center justify-center shrink-0">
              <Compass size={20} className="text-[#E50920]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Total Corners
              </div>
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                55 CORNERS
              </div>
            </div>
          </div>

          <div className="bg-[#0d0d10] border border-zinc-800/90 p-4 rounded-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E50920]/10 border border-[#E50920]/30 flex items-center justify-center shrink-0">
              <Flag size={20} className="text-[#E50920]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Bikes Rules
              </div>
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                250 CC CLASS
              </div>
            </div>
          </div>

          <div className="bg-[#0d0d10] border border-zinc-800/90 p-4 rounded-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E50920]/10 border border-[#E50920]/30 flex items-center justify-center shrink-0">
              <Layers size={20} className="text-[#E50920]" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Terrain Mix
              </div>
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                4 SURFACES
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Section: High-Fidelity Circuit Map + Technical Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Authentic Map Image Viewport (7 columns) */}
          <div className="lg:col-span-7 bg-[#0d0d10] border border-zinc-800 p-4 sm:p-5 rounded-sm relative group">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2 h-2 bg-[#E50920] rounded-full inline-block" />
                <span className="font-bold tracking-wider uppercase">SATELLITE TOPOGRAPHIC MASTER MAP</span>
              </div>
              <span className="text-[11px] text-zinc-500 hidden sm:inline">
                Click map to expand
              </span>
            </div>

            {/* Official Map Image Container with Lightbox Trigger */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-[16/10] bg-black rounded overflow-hidden cursor-zoom-in border border-zinc-800/80 group-hover:border-zinc-700 transition-colors shadow-2xl"
            >
              <img
                src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
                alt="Moto Enduro Championship Official 2KM Circuit Blueprint Pokhara"
                className="w-full h-full object-cover sm:object-contain bg-[#09090b] transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between pointer-events-none">
                <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <ZoomIn size={16} className="text-[#E50920]" />
                  <span>Click to inspect high-resolution aerial sectors</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#E50920] text-white px-2 py-0.5 rounded font-bold">
                  2.0 KM · 55 Corners
                </span>
              </div>

              {/* Corner brackets aesthetic */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#E50920] pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#E50920] pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#E50920] pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#E50920] pointer-events-none" />
            </div>

            {/* Quick Section Selector Strip */}
            <div className="mt-4">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Select Track Sector to Inspect:</span>
                <span className="text-zinc-500">{CIRCUIT_SECTIONS.length} Key Segments</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {CIRCUIT_SECTIONS.map((sec) => {
                  const isSelected = sec.id === selectedSectionId;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedSectionId(sec.id)}
                      className={`cursor-pointer text-left px-2.5 py-2 text-[11px] font-medium border rounded-xs transition-all ${
                        isSelected
                          ? "bg-[#E50920] text-white border-[#E50920] shadow-sm font-semibold"
                          : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      <div className="truncate">{sec.name.split("[")[0]}</div>
                      <div className="text-[9px] opacity-75 font-mono truncate">{sec.difficulty}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Surface Mix Breakdown as shown on official brochure */}
            <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800/80 rounded-sm">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
                <span className="font-bold text-[#E50920]">SURFACE MIX ANALYSIS /////</span>
                <span className="text-[10px] text-zinc-500 uppercase">Official Race Spec</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-zinc-300 text-[11px]">River (wet, stones): <strong className="text-white">slow</strong></span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
                  <span className="text-zinc-300 text-[11px]">Village trails: <strong className="text-white">medium</strong></span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-zinc-300 text-[11px]">Forest enduro + bamboo: <strong className="text-white">technical</strong></span>
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-zinc-300 text-[11px]">MX + sand: <strong className="text-white">fast but tiring</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Deep-Dive Inspector Card (5 columns) */}
          <div className="lg:col-span-5 bg-[#0d0d10] border border-zinc-800 p-6 rounded-sm flex flex-col justify-between">
            <div>
              {/* Badge & Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#E50920] font-bold">
                    Sector Inspector
                  </span>
                  <span className="text-zinc-600" aria-hidden="true">·</span>
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    Pokhara 2027
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs uppercase border ${
                  selectedSection.difficulty === "Extreme"
                    ? "bg-red-950/80 text-red-300 border-red-800"
                    : selectedSection.difficulty === "Hard"
                    ? "bg-amber-950/80 text-amber-300 border-amber-800"
                    : "bg-zinc-900 text-zinc-300 border-zinc-700"
                }`}>
                  {selectedSection.difficulty}
                </span>
              </div>

              {/* Title & Short Details */}
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white tracking-wide mb-2 leading-tight">
                {selectedSection.name}
              </h3>

              <div className="space-y-1 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="text-zinc-500">Surface:</span>
                  <span className="text-white font-semibold">{selectedSection.surface}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <span className="text-zinc-500">Pace / Profile:</span>
                  <span className="text-[#E50920] font-semibold">{selectedSection.pace}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {selectedSection.description}
              </p>

              {/* Corner Specification Callout */}
              <div className="mb-5 p-3.5 bg-zinc-950 border border-zinc-800/90 rounded-sm">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Corners Breakdown (55 Total):</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-zinc-900/80 p-2 border border-zinc-800">
                    <div className="font-heading font-bold text-white text-base">~12</div>
                    <div className="text-[10px] text-zinc-400">Sweepers</div>
                  </div>
                  <div className="bg-zinc-900/80 p-2 border border-zinc-800">
                    <div className="font-heading font-bold text-white text-base">~18</div>
                    <div className="text-[10px] text-zinc-400">Medium</div>
                  </div>
                  <div className="bg-zinc-900/80 p-2 border border-zinc-800">
                    <div className="font-heading font-bold text-[#E50920] text-base">~22</div>
                    <div className="text-[10px] text-zinc-400">Hairpins/S</div>
                  </div>
                </div>
              </div>

              {/* Technical Features Checklist */}
              <div className="space-y-3 mb-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Sector Obstacles & Characteristics
                </h4>
                <div className="space-y-2">
                  {selectedSection.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-zinc-200 bg-zinc-900/80 p-2.5 border border-zinc-800/80"
                    >
                      <CheckCircle size={14} className="text-[#E50920] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spectator Vantage Point */}
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 text-xs rounded-sm">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                  <Eye size={14} />
                  <span>Spectator & Media Vantage</span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  {selectedSection.viewingTip}
                </p>
              </div>
            </div>

            {/* Footer action */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                Official FIM-Grade Layout
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="cursor-pointer text-xs font-semibold text-[#E50920] hover:text-white transition-colors flex items-center gap-1"
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between pb-3 mb-2 border-b border-zinc-800 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E50920]" />
              <span className="font-heading font-black text-lg sm:text-xl uppercase tracking-wider">
                Official Pokhara Circuit Topographic Map (2 KM)
              </span>
              <span className="text-xs font-mono text-zinc-400 hidden md:inline">
                55 Corners · 250cc Rules · Pokhara, Nepal
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="cursor-pointer p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded transition-colors"
              aria-label="Close fullscreen map"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Image Display */}
          <div
            className="relative w-full max-w-6xl max-h-[82vh] overflow-auto flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
              alt="Official Extreme Moto Enduro Circuit Map Pokhara Fullscreen"
              className="w-full h-auto max-h-[80vh] object-contain rounded border border-zinc-800 shadow-2xl"
            />
          </div>

          {/* Modal Footer Controls */}
          <div
            className="w-full max-w-6xl pt-3 mt-2 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <span>RIVER: Slow (Wet, Stones)</span>
              <span className="text-zinc-600">·</span>
              <span>VILLAGE: Medium</span>
              <span className="text-zinc-600">·</span>
              <span>FOREST + BAMBOO: Technical</span>
              <span className="text-zinc-600">·</span>
              <span>MX + SAND: Fast but tiring</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="cursor-pointer text-[#E50920] hover:underline"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
