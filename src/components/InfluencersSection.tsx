import React from "react";
import { INFLUENCERS, InfluencerProfile } from "../data/eventConfig";
import { Youtube, Instagram, Share2, Quote, Sparkles, Send, TrendingUp } from "lucide-react";

interface InfluencersSectionProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const InfluencersSection: React.FC<InfluencersSectionProps> = ({ onOpenRegisterModal }) => {
  return (
    <section id="influencers" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-2">
              <span>DIGITAL AMPLIFICATION</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">50+ CREATORS</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] text-balance">
              THE POWER OF MOTORSPORT.<br />
              <span className="text-[#E50920]">THE REACH OF DIGITAL CULTURE.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenRegisterModal("media")}
            className="cursor-pointer inline-flex items-center gap-2 font-heading font-bold uppercase text-xs px-5 py-3 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted transition-all shadow-md whitespace-nowrap self-start md:self-auto"
          >
            <Send size={13} />
            <span>MEDIA ACCREDITATION</span>
          </button>
        </div>

        {/* Digital Reach KPI Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-[#0d0d10] border border-zinc-800 mb-10">
          <div className="p-3.5 bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Creator Roster</span>
            <div className="font-heading font-black text-3xl text-white mt-0.5 tabular-nums">50+</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Vloggers & action creators</p>
          </div>
          <div className="p-3.5 bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Combined Audience</span>
            <div className="font-heading font-black text-3xl text-white mt-0.5 tabular-nums">2.5M - 4M+</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Followers on YT, IG & TikTok</p>
          </div>
          <div className="p-3.5 bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Projected Impressions</span>
            <div className="font-heading font-black text-3xl text-[#E50920] mt-0.5 tabular-nums">5M - 10M+</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Total campaign impressions</p>
          </div>
          <div className="p-3.5 bg-zinc-950 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Channels</span>
            <div className="font-heading font-bold text-xl text-white mt-1">
              <span className="text-xs font-semibold text-zinc-300">YT · IG · FB · TT</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Youth audience reach</p>
          </div>
        </div>

        {/* Influencer Profile Grid (Featured in Proposal Brochure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INFLUENCERS.map((creator) => {
            return (
              <div
                key={creator.name}
                className="group relative bg-[#0d0d10] border border-zinc-800 p-6 flex flex-col justify-between transition-all hover:border-[#E50920] hover:bg-zinc-900/90 hover:shadow-xl"
              >
                {/* Hairline red accent top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50920] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Badge & Platforms Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E50920] font-bold">
                      {creator.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      {creator.platforms.map((p) => (
                        <span key={p} className="text-[11px] font-mono text-zinc-400">
                          {p === "YouTube" ? "YT" : p === "Instagram" ? "IG" : p === "TikTok" ? "TT" : "FB"}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Stylized Creator Avatar */}
                    <div className="w-14 h-14 bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center font-heading font-black text-2xl text-white shrink-0 group-hover:border-[#E50920] group-hover:text-[#E50920] transition-colors relative">
                      {creator.photoUrl ? (
                        <img
                          src={creator.photoUrl}
                          alt={creator.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <span className="absolute inset-0 flex items-center justify-center -z-10 font-heading font-black text-xl text-zinc-500">
                        {creator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-black text-2xl uppercase text-white group-hover:text-zinc-100 transition-colors">
                        {creator.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#E50920] uppercase tracking-wide">
                        {creator.role}
                      </p>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        {creator.reach}
                      </p>
                    </div>
                  </div>

                  {/* Focus Area */}
                  <div className="p-3 bg-zinc-950 border border-zinc-800/70 mb-4 text-xs">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
                      Content Focus
                    </span>
                    <p className="text-zinc-300 font-medium leading-relaxed">
                      {creator.focus}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="relative pl-3 border-l-2 border-zinc-700 italic text-xs text-zinc-400 leading-relaxed mb-4">
                    "{creator.quote}"
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Official Creator Roster</span>
                  <button
                    type="button"
                    onClick={() => onOpenRegisterModal("media")}
                    className="cursor-pointer text-[#E50920] hover:text-white font-semibold transition-colors"
                  >
                    Collaborate →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media Credentials Callout */}
        <div className="mt-12 p-6 bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-lg uppercase text-white">
              Are you a photographer, videographer, or moto-journalist?
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Accredited press passes grant exclusive infield track access, media center workstations, high-speed WiFi, and direct rider interview availability.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenRegisterModal("media")}
            className="cursor-pointer font-heading font-bold uppercase text-xs px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 clip-slanted whitespace-nowrap shrink-0 transition-colors"
          >
            Apply for Media Pass
          </button>
        </div>
      </div>
    </section>
  );
};
