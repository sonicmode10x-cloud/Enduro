import React from "react";
import { VENDOR_OPPORTUNITIES, VendorOpportunity } from "../data/eventConfig";
import { Bike, Utensils, ShoppingBag, Zap, CheckCircle2, Store, Users, ArrowRight } from "lucide-react";
import { MotorsportGraphic } from "./MotorsportGraphic";

interface VendorSectionProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const VendorSection: React.FC<VendorSectionProps> = ({ onOpenRegisterModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Bike":
        return Bike;
      case "Utensils":
        return Utensils;
      case "ShoppingBag":
        return ShoppingBag;
      case "Zap":
        return Zap;
      default:
        return Store;
    }
  };

  const getGraphicType = (id: string) => {
    switch (id) {
      case "ev-auto-gear":
        return "paddock" as const;
      case "food-beverage":
        return "crowd" as const;
      case "retail-lifestyle":
        return "stunt-whip" as const;
      case "tech-mobility":
        return "rock-matrix" as const;
      default:
        return "paddock" as const;
    }
  };

  return (
    <section id="vendors" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-2">
              <span>EXPO MARKETPLACE</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">10,000+ VISITORS</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] text-balance">
              SHOWCASE YOUR BRAND.<br />
              <span className="text-[#E50920]">CONNECT WITH THOUSANDS.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenRegisterModal("vendor")}
            className="cursor-pointer inline-flex items-center gap-2 font-heading font-black uppercase text-xs px-5 py-3 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted shadow-md transition-all whitespace-nowrap self-start md:self-auto"
          >
            <Store size={14} />
            <span>BOOK STALL</span>
          </button>
        </div>

        {/* 4 Vendor Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VENDOR_OPPORTUNITIES.map((vendor) => {
            const Icon = getIcon(vendor.iconName);
            const graphicType = getGraphicType(vendor.id);

            return (
              <div
                key={vendor.id}
                className="group bg-[#0d0d10] border border-zinc-800 overflow-hidden flex flex-col justify-between transition-all hover:border-[#E50920] hover:shadow-xl"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/8] overflow-hidden bg-zinc-950 border-b border-zinc-800">
                  <MotorsportGraphic
                    type={graphicType}
                    className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-black/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-sm px-2.5 py-1 border border-zinc-700">
                      {vendor.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-zinc-300">
                    <Users size={13} className="text-[#E50920]" />
                    <span className="font-semibold">{vendor.footfallTarget}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-red-950/60 border border-red-900/40 flex items-center justify-center text-[#E50920] group-hover:bg-[#E50920] group-hover:text-white transition-colors">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-heading font-black text-2xl uppercase text-white tracking-wide">
                        {vendor.title}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {vendor.description}
                    </p>

                    {/* Stall Specs */}
                    <div className="p-3 bg-zinc-950 border border-zinc-800/80 mb-4 flex flex-wrap items-center justify-between text-xs gap-2">
                      <span className="text-zinc-500 font-mono uppercase">Available Sizes:</span>
                      <span className="text-zinc-200 font-semibold">{vendor.stallSizes}</span>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block">
                        Commercial Benefits:
                      </span>
                      {vendor.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 size={13} className="text-[#E50920] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                      {vendor.suitableFor}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenRegisterModal("vendor")}
                      className="cursor-pointer inline-flex items-center gap-1.5 font-heading font-bold uppercase text-xs px-4 py-2 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted transition-colors"
                    >
                      <span>ENQUIRE NOW</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
