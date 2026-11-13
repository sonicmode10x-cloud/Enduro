import React from "react";
import { INFLUENCERS } from "../data/eventConfig";

interface InfluencersSectionProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const InfluencersSection: React.FC<InfluencersSectionProps> = ({ onOpenRegisterModal }) => {
  return (
    <section id="influencers" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Clean Section Header (Matching Reference "MORE") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#D60A19] mb-1">
              Digital Culture <span aria-hidden="true">·</span> 50+ Creators
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none">
              CREATORS & MEDIA
            </h2>
          </div>
        </div>

        {/* Clean 4-Metric Reach Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500">Creator Roster</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-zinc-900 tabular-nums mt-0.5">
              50+
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">Vloggers & creators</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500">Combined Audience</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-zinc-900 tabular-nums mt-0.5">
              2.5M - 4M+
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">YT, IG & TikTok reach</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500">Projected Impressions</div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#D60A19] tabular-nums mt-0.5">
              5M - 10M+
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">Total campaign views</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200/80 p-4">
            <div className="text-xs text-zinc-500">Channels</div>
            <div className="font-heading font-bold text-xl text-zinc-900 mt-1">
              YT · IG · FB · TT
            </div>
            <p className="text-xs text-zinc-500 mt-1">Youth motorsport reach</p>
          </div>
        </div>

        {/* Clean 2-Column Horizontal Editorial Cards (Matching Reference "MORE" section) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INFLUENCERS.map((creator, idx) => (
            <div
              key={creator.name}
              className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-start gap-4">
                {/* Clean Rounded Thumbnail Block */}
                <div className="w-20 h-20 rounded-2xl bg-[#242426] text-white flex flex-col items-center justify-center shrink-0">
                  <span className="font-heading font-black text-2xl tracking-wide">
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase mt-0.5">
                    0{idx + 1}
                  </span>
                </div>

                {/* Clean Text Content */}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-[#D60A19]">
                    {creator.badge} <span aria-hidden="true">·</span>{" "}
                    {creator.platforms.map((p) => (p === "YouTube" ? "YT" : p === "Instagram" ? "IG" : p === "TikTok" ? "TT" : "FB")).join(" / ")}
                  </div>
                  <h3 className="font-heading font-black text-2xl uppercase text-zinc-900 mt-0.5 truncate">
                    {creator.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {creator.role} <span aria-hidden="true">·</span> {creator.focus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Press Callout */}
        <div className="mt-8 p-6 bg-white rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-xl uppercase text-zinc-900">
              Photographer, Videographer, or Moto-Journalist?
            </h4>
            <p className="text-xs text-zinc-600 mt-1">
              Accredited press passes grant infield track access, media center workstations, and rider interviews.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenRegisterModal("media")}
            className="cursor-pointer bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap shrink-0 transition-colors"
          >
            Apply for Media Pass
          </button>
        </div>
      </div>
    </section>
  );
};
