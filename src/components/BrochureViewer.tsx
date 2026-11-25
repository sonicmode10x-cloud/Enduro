import React from "react";
import {
  EVENT_CONFIG,
  INFLUENCERS,
  SAFETY_PROTOCOLS,
  TRACK_ZONES
} from "../data/eventConfig";
import {
  CHAMPIONSHIP_EXPERIENCES,
  COMMERCIAL_ECOSYSTEM_ITEMS,
  XTREME_DIGITAL_DELIVERABLES,
  XTREME_TITLE_PILLARS
} from "../lib/xtremeBrochurePdf";
import {
  GENERAL_DISCIPLINES,
  GENERAL_PARTNER_SUMMARY,
  GENERAL_TRACK_SECTORS
} from "../lib/brochurePdf";

export type BrochureEdition = "xtreme" | "general";

export const XTREME_PAGE_LABELS = [
  { page: 1, short: "01. Cover" },
  { page: 2, short: "02. 2027 Calendar" },
  { page: 3, short: "03. Experiences" },
  { page: 4, short: "04. 2026 & 2024" },
  { page: 5, short: "05. Circuit Map" },
  { page: 6, short: "06. Title Rights" },
  { page: 7, short: "07. 50+ Creators" },
  { page: 8, short: "08. Safety & Desk" }
];

export const GENERAL_PAGE_LABELS = [
  { page: 1, short: "01. Cover" },
  { page: 2, short: "02. 2027 Events" },
  { page: 3, short: "03. Circuit Map" },
  { page: 4, short: "04. Safety & Contact" }
];

interface SheetChromeProps {
  eyebrow: string;
  title: string;
  pageNum: number;
  totalPages: number;
  footerLabel: string;
  children: React.ReactNode;
}

const SheetChrome: React.FC<SheetChromeProps> = ({
  eyebrow,
  title,
  pageNum,
  totalPages,
  footerLabel,
  children
}) => (
  <article className="bg-[#F8F7F4] text-zinc-900 rounded-2xl border border-stone-300/80 shadow-sm overflow-hidden flex flex-col">
    <div className="h-1.5 bg-[#D60A19] w-full shrink-0" />
    <div className="p-5 sm:p-8 flex-1 flex flex-col gap-5">
      <header className="pb-4 border-b border-stone-200">
        <p className="text-[11px] font-bold tracking-wide text-[#D60A19] uppercase">
          {eyebrow}
        </p>
        <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-zinc-900 leading-none mt-1">
          {title}
        </h3>
      </header>

      <div className="flex-1 flex flex-col gap-4">{children}</div>

      <footer className="pt-3 mt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
        <span>{footerLabel}</span>
        <span className="font-semibold text-zinc-700 tabular-nums">
          Page {pageNum} of {totalPages}
        </span>
      </footer>
    </div>
  </article>
);

interface BrochurePageRendererProps {
  edition: BrochureEdition;
  pageNumber: number;
}

export const BrochurePageSheet: React.FC<BrochurePageRendererProps> = ({
  edition,
  pageNumber
}) => {
  const { championship, previousAchievements } = EVENT_CONFIG;
  const metrics = [
    {
      value: `${previousAchievements.riders}${previousAchievements.ridersSuffix}`,
      label: "Competing Riders"
    },
    {
      value: `${previousAchievements.spectators.toLocaleString()}${previousAchievements.spectatorsSuffix}`,
      label: "Live Spectators"
    },
    { value: previousAchievements.onlineViews, label: "Online Video Views", accent: true },
    {
      value: `${previousAchievements.influencers}${previousAchievements.influencersSuffix}`,
      label: "Creators & Media"
    }
  ];

  // =========================================================================
  // XTREME ENERGY DRINK TITLE SPONSOR BROCHURE (8 PAGES)
  // =========================================================================
  if (edition === "xtreme") {
    const footerLabel =
      "Himalayan Moto Enduro 2027 · Xtreme Energy Drink Title Sponsor Brochure · www.sporthubnepal.com";

    switch (pageNumber) {
      case 1:
        return (
          <article className="bg-[#08080A] text-white rounded-2xl border border-zinc-800 shadow-sm overflow-hidden flex flex-col">
            <div className="h-2 bg-[#D60A19] w-full shrink-0" />
            <div className="p-5 sm:p-8 flex flex-col gap-5">
              {/* Top Brand Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <img
                  src="/assets/aistudio/MOTO_175fdec7.png"
                  alt="Himalayan Moto Enduro 2027"
                  referrerPolicy="no-referrer"
                  className="h-14 sm:h-16 w-auto object-contain object-left select-none"
                />
                <div className="sm:text-right">
                  <p className="text-[11px] font-bold tracking-wide text-[#F03845] uppercase">
                    Complete Championship &amp; Title Brochure
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Prepared Exclusively for Xtreme Energy Drink · 2027
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="rounded-xl overflow-hidden bg-zinc-900 aspect-[16/7.5] w-full">
                <img
                  src="/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"
                  alt="Himalayan Moto Enduro Championship Action"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_35%]"
                />
              </div>

              {/* Headline & Co-Brand Lockup */}
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-wide text-[#F03845] uppercase">
                  The Himalayan Moto Series of Adventures · Pokhara &amp; Everest, Nepal
                </p>
                <h3 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
                  EXTREME MOTO ENDURO CROSS CHAMPIONSHIP 2027
                </h3>
                <div className="bg-[#D60A19] rounded-lg px-4 py-3 text-center">
                  <span className="font-heading font-black text-lg sm:text-2xl tracking-wide uppercase text-white">
                    POWERED BY XTREME ENERGY DRINK
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Complete 8-page official dossier uniting the full Himalayan Moto Enduro 2027 championship profile — upcoming Pokhara &amp; Everest stages, all 8 motorsport &amp; festival experiences, 2026 &amp; 2024 archives, 2KM circuit map &amp; 8 arena zones, 50+ creator ecosystem, FIM safety governance, and exclusive Title Sponsorship deliverables for Xtreme Energy Drink.
                </p>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      className={`font-heading font-black text-2xl sm:text-3xl leading-none tabular-nums ${
                        m.accent ? "text-[#F03845]" : "text-white"
                      }`}
                    >
                      {m.value}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Official Organizers & Sanctioning Partner Strip */}
              <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center">
                <img
                  src="/assets/aistudio/Moto_Enduro_Master_Proposal_b6a698c1.png"
                  alt="Official Organizers and Sanctioning Partners"
                  referrerPolicy="no-referrer"
                  className="max-h-14 sm:max-h-16 w-auto object-contain"
                />
              </div>

              <footer className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
                <span>
                  Hosted by {championship.organizer.name} · {championship.organizer.phoneDisplay} ·{" "}
                  {championship.organizer.email} · www.sporthubnepal.com
                </span>
                <span className="font-semibold text-zinc-200 tabular-nums">Page 1 of 8</span>
              </footer>
            </div>
          </article>
        );

      case 2:
        return (
          <SheetChrome
            eyebrow="01. Championship Profile & 2027 Series Calendar"
            title="ABOUT HIMALAYAN MOTO ENDURO"
            pageNum={2}
            totalPages={8}
            footerLabel={footerLabel}
          >
            {/* About Summary */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
                  Nepal&apos;s Ultimate Off-Road Motorsport Championship
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-2">
                  Organized by Adventure Sport Hub, Pokhara under FIM-aligned safety standards, Himalayan Moto Enduro unites hard enduro river boulder battles, high-speed motocross heats, FMX aerial stunt showcases, live music, and motorcycle culture beneath the Annapurna and Everest Himalayas. Following milestone editions in 2024 and 2026, the 2027 season expands into a landmark two-stage Himalayan championship series.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-200">
                <div>
                  <div className="text-[11px] text-zinc-500">Host Regions</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">
                    Pokhara &amp; Everest, Nepal
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500">Elevation Range</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5 tabular-nums">
                    {championship.elevation}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500">Bike Spec</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">
                    250cc Enduro / MX Rules
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500">Rider Classes</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">
                    Pro, Expert, Novice, Vet, Women
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 pt-1">
              Official 2027 Upcoming Events Calendar
            </div>

            {/* Stage 01 */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2">
              <p className="text-[11px] font-bold text-[#D60A19] uppercase">
                Stage 01 · April 5 &amp; 6, 2027 · Registration Open · Pokhara, Nepal
              </p>
              <h4 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-900">
                HIMALAYAN ENDURO 2027 POKHARA
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Two action-packed days of technical ridge climbs, valley riverbeds, bamboo singletrack, and motocross jumps across Pokhara&apos;s Annapurna foothills. Features the official 2KM 55-corner stadium &amp; mountain loop, Brand Expo boulevard, FMX freestyle ramp, Food &amp; Lifestyle hub, and 10,000+ live hillside spectators.
              </p>
              <p className="text-xs font-semibold text-zinc-800 pt-1">
                Format: 2-Day Championship · Venue: Pokhara Championship Arena &amp; Mountain Trail · Limited Rider Entry Slots
              </p>
            </div>

            {/* Stage 02 */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2">
              <p className="text-[11px] font-bold text-[#D60A19] uppercase">
                Stage 02 · November 2027 · Registration Open · Everest Corridor, Nepal
              </p>
              <h4 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-900">
                HIMALAYAN ENDURO 2027 EVEREST
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with GPS track files and stage maps to be confirmed ahead of race week — creating an unmatched international media storyline for Xtreme Energy Drink.
              </p>
              <p className="text-xs font-semibold text-zinc-800 pt-1">
                Format: High-Altitude Hard Enduro Expedition · Route GPS Track: To Be Confirmed Soon
              </p>
            </div>

            {/* Brand Fit */}
            <div className="bg-[#121214] text-white rounded-xl p-5 space-y-1.5">
              <p className="text-[11px] font-bold text-[#F03845] uppercase">
                Why Xtreme Energy Drink + Himalayan Moto Enduro
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Peak youth &amp; adventure audience (18–35), extreme physical endurance creating natural demand for chilled energy drinks, proven 2026 podium brand equity, and year-round viral replay across 20M+ views on YouTube, Instagram, Facebook, and TikTok.
              </p>
            </div>
          </SheetChrome>
        );

      case 3:
        return (
          <SheetChrome
            eyebrow="02. Complete Championship Program · 8 Core Experiences"
            title="EVENT SECTIONS & FESTIVAL EXPERIENCES"
            pageNum={3}
            totalPages={8}
            footerLabel={footerLabel}
          >
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Himalayan Moto Enduro is engineered as a full-scale motorsport and youth lifestyle festival — combining eight distinct on-track and off-track arenas that keep spectators, riders, families, and digital creators engaged from opening gate drop through the closing afterparty.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CHAMPIONSHIP_EXPERIENCES.map((exp) => (
                <div
                  key={exp.title}
                  className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col gap-2"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#D60A19]">
                    {exp.category}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-zinc-900 leading-tight pb-2 border-b border-stone-200">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </SheetChrome>
        );

      case 4:
        return (
          <SheetChrome
            eyebrow="03. Proven Track Record · Past Championship Archives"
            title="MOTO ENDURO 2026 & 2024 HIGHLIGHTS"
            pageNum={4}
            totalPages={8}
            footerLabel={footerLabel}
          >
            {/* 2026 Block */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
              <div>
                <p className="text-[11px] font-bold text-[#D60A19] uppercase">
                  Recent Edition · Pokhara, Nepal
                </p>
                <h4 className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight text-zinc-900 mt-0.5">
                  MOTO ENDURO 2026 — XTREME ENERGY DRINK PODIUM LEGACY
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden bg-zinc-900 aspect-[16/10]">
                  <img
                    src="/assets/aistudio/670957943_17869316799664194_1306959075209737257_n_b64c1da3.jpg"
                    alt="2026 Champion lifting the Xtreme Energy Drink Winner Trophy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div className="rounded-lg overflow-hidden bg-zinc-900 aspect-[16/10]">
                  <img
                    src="/assets/aistudio/672352852_17870149437664194_5890226800590230447_n__1__50dae4cc.jpg"
                    alt="2026 Moto Enduro Rider 555 riverbed wheelie"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                The 2026 Xtreme Moto Enduro Cross Championship in Pokhara delivered packed hillsides, overall &amp; women&apos;s division podium champions lifting custom Xtreme Energy Drink sprocket trophies, thrilling riverbed water crossings, and technical forest root &amp; log climbs.
              </p>
              <p className="text-[11px] italic text-zinc-500">
                Above: 2026 Champion lifting the Xtreme Energy Drink Winner Trophy (left) and Rider #555 riverbed wheelie (right).
              </p>
            </div>

            {/* 2024 Block */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
              <div>
                <p className="text-[11px] font-bold text-[#D60A19] uppercase">
                  Foundation Edition · April 5 &amp; 6, 2024 · Pokhara, Nepal
                </p>
                <h4 className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight text-zinc-900 mt-0.5">
                  MOTO ENDURO 2024 — PROVEN COMMUNITY &amp; SPECTATOR TURNOVER
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden bg-zinc-900 aspect-[16/10]">
                  <img
                    src="/assets/aistudio/602450155_122097115155183336_3931125237093247231_n_22a08ed1.jpg"
                    alt="2024 Championship Start and Finish Arch"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="rounded-lg overflow-hidden bg-zinc-900 aspect-[16/10]">
                  <img
                    src="/assets/aistudio/605090937_122097125283183336_1382602027749110508_n_ac9a713f.jpg"
                    alt="2024 Pokhara City Street Rally Parade"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Held on April 5 &amp; 6, 2024 in Pokhara alongside Pokhara Riders Club, Moto Enduro 2024 established Nepal&apos;s premier off-road benchmark — uniting riverbed boulder stages, escorted Pokhara city parades, international tourists, cultural stage welcomes, and dignitaries.
              </p>
              <p className="text-[11px] italic text-zinc-500">
                Above: 2024 Championship Start/Finish Arch (left) and Pokhara City Street Rally Parade (right).
              </p>
            </div>
          </SheetChrome>
        );

      case 5:
        return (
          <SheetChrome
            eyebrow="04. Official Pokhara Circuit Telemetry & Venue Layout"
            title="2KM CIRCUIT MAP & 8 ARENA ZONES"
            pageNum={5}
            totalPages={8}
            footerLabel={footerLabel}
          >
            {/* Circuit Map */}
            <div className="bg-[#0E0E10] rounded-xl p-2 sm:p-3 flex items-center justify-center">
              <img
                src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
                alt="Official 2KM Pokhara Circuit Map"
                referrerPolicy="no-referrer"
                className="w-full max-h-[340px] object-contain rounded-lg"
              />
            </div>

            {/* Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Circuit Length", value: "2 KM Loop" },
                { label: "Total Corners", value: "55 Turns" },
                { label: "Swp / Med / Tight", value: "12 · 18 · 22" },
                { label: "Bike Rules", value: "250cc Class" }
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-xl border border-stone-200 px-3.5 py-3"
                >
                  <div className="text-[11px] text-zinc-500">{s.label}</div>
                  <div className="text-sm font-bold text-zinc-900 mt-0.5 tabular-nums">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 pt-1">
              Official Pokhara Arena Zones &amp; Surface Mix
            </div>

            {/* 8 Arena Zones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRACK_ZONES.slice(0, 8).map((zone) => (
                <div
                  key={zone.id}
                  className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-1"
                >
                  <div className="text-xs sm:text-sm font-bold text-zinc-900">{zone.name}</div>
                  <div className="text-[11px] font-semibold text-[#D60A19]">
                    {zone.capacityOrLength}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">{zone.shortDesc}</p>
                </div>
              ))}
            </div>
          </SheetChrome>
        );

      case 6:
        return (
          <SheetChrome
            eyebrow="05. Exclusive Title Sponsorship Ownership · 1 Slot Only"
            title="XTREME ENERGY DRINK TITLE DELIVERABLES"
            pageNum={6}
            totalPages={8}
            footerLabel={footerLabel}
          >
            {/* Title Lockup Banner */}
            <div className="bg-[#121214] text-white rounded-xl p-5 space-y-1.5">
              <p className="text-[11px] font-bold text-[#F03845] uppercase">
                Official &ldquo;Powered By&rdquo; Naming Rights &amp; 100% Category Exclusivity
              </p>
              <h4 className="font-heading font-black text-lg sm:text-2xl leading-tight text-white">
                &ldquo;Pokhara Motocross Enduro Championship 2027 — Powered by Xtreme Energy Drink&rdquo;
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Exclusive energy drink &amp; functional beverage lock — zero competing brands permitted across track, expo, or media.
              </p>
            </div>

            {/* 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {XTREME_TITLE_PILLARS.map((pillar) => (
                <div
                  key={pillar.heading}
                  className="bg-white rounded-xl border border-stone-200 p-4 space-y-2.5"
                >
                  <h4 className="text-xs sm:text-sm font-bold text-[#D60A19] pb-2 border-b border-stone-200">
                    {pillar.heading}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#D60A19] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Commercial Ecosystem */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2.5">
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
                Championship Commercial Ecosystem (Xtreme at the Pinnacle)
              </h4>
              <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
                {COMMERCIAL_ECOSYSTEM_ITEMS.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="text-[#D60A19] font-bold">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SheetChrome>
        );

      case 7:
        return (
          <SheetChrome
            eyebrow="06. Digital Media & Creator Amplification"
            title="50+ INFLUENCERS & 20M+ PROVEN VIEWS"
            pageNum={7}
            totalPages={8}
            footerLabel={footerLabel}
          >
            {/* Reach Summary */}
            <div className="bg-[#121214] text-white rounded-xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { val: "50+", lbl: "Partner Vloggers & Creators" },
                { val: "2.5M–4M+", lbl: "Combined Creator Followers" },
                { val: "5M–10M+", lbl: "Projected 2027 Impressions" },
                { val: "20M+", lbl: "Proven Historical Views", accent: true }
              ].map((ms) => (
                <div key={ms.lbl}>
                  <div
                    className={`font-heading font-black text-2xl sm:text-3xl leading-none tabular-nums ${
                      ms.accent ? "text-[#F03845]" : "text-white"
                    }`}
                  >
                    {ms.val}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">{ms.lbl}</div>
                </div>
              ))}
            </div>

            <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 pt-1">
              Featured Championship Creators &amp; Ambassadors
            </div>

            {/* 6 Creators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INFLUENCERS.map((inf) => (
                <div
                  key={inf.name}
                  className="bg-white rounded-xl border border-stone-200 p-4 space-y-1.5"
                >
                  <div className="text-sm font-bold text-zinc-900">{inf.name}</div>
                  <div className="text-[11px] font-semibold text-[#D60A19]">
                    {inf.role} · {inf.badge}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Channels: {inf.platforms.join(" · ")}
                  </div>
                  <div className="text-[11px] text-zinc-500">Focus: {inf.focus}</div>
                  <p className="text-xs italic text-zinc-700 leading-relaxed pt-1">
                    &ldquo;{inf.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Digital Integration */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#D60A19] uppercase">
                Xtreme Energy Drink Digital &amp; Content Integration
              </h4>
              <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
                {XTREME_DIGITAL_DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="text-[#D60A19] font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SheetChrome>
        );

      case 8:
      default:
        return (
          <SheetChrome
            eyebrow="07. Safety Governance & Executive Contact Secretariat"
            title="FIM SAFETY STANDARDS & NEXT STEPS"
            pageNum={8}
            totalPages={8}
            footerLabel={footerLabel}
          >
            {/* 6 Safety Protocols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SAFETY_PROTOCOLS.map((proto) => (
                <div
                  key={proto.title}
                  className="bg-white rounded-xl border border-stone-200 p-4 space-y-1.5"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wide text-[#D60A19]">
                    {proto.badge}
                  </div>
                  <div className="text-sm font-bold text-zinc-900">{proto.title}</div>
                  <p className="text-xs text-zinc-600 leading-relaxed">{proto.description}</p>
                  <div className="text-[11px] font-semibold text-zinc-500 pt-1">
                    {proto.details.join(" · ")}
                  </div>
                </div>
              ))}
            </div>

            {/* Executive Closing Box */}
            <div className="bg-[#121214] text-white rounded-xl overflow-hidden">
              <div className="h-1.5 bg-[#D60A19]" />
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <p className="text-[11px] font-bold text-[#F03845] uppercase">
                    Official Organizing Secretariat · Executive Partnership Desk
                  </p>
                  <h4 className="font-heading font-black text-2xl uppercase tracking-tight text-white mt-1">
                    PARTNER AS 2027 TITLE SPONSOR
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2">
                    Commercial partnership terms, custom Xtreme Energy Drink arena branding blueprints, chilled distribution logistics, and multi-event Pokhara + Everest bundle options are finalized directly in an executive briefing with our organizing committee.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/15 space-y-1.5 text-xs sm:text-sm text-zinc-200">
                  <div className="font-bold text-white">
                    {championship.organizer.contactPerson} — Race Director &amp; Lead Organizer
                  </div>
                  <div>
                    {championship.organizer.name} · {championship.organizer.address}
                  </div>
                  <div className="tabular-nums">
                    Direct Hotline / WhatsApp: {championship.organizer.phoneDisplay} · Email:{" "}
                    {championship.organizer.email}
                  </div>
                  <div>
                    Official Website: www.sporthubnepal.com · Social: @sportshubnepal (Instagram · YouTube · Facebook · TikTok)
                  </div>
                </div>
              </div>
            </div>
          </SheetChrome>
        );
    }
  }

  // =========================================================================
  // GENERAL EVENT BROCHURE (4 PAGES)
  // =========================================================================
  const generalFooter =
    "Himalayan Moto Enduro 2027 · Adventure Sport Hub, Pokhara · www.sporthubnepal.com";

  switch (pageNumber) {
    case 1:
      return (
        <article className="bg-[#0A0A0C] text-white rounded-2xl border border-zinc-800 shadow-sm overflow-hidden flex flex-col">
          <div className="h-2 bg-[#D60A19] w-full shrink-0" />
          <div className="p-5 sm:p-8 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <img
                src="/assets/aistudio/MOTO_175fdec7.png"
                alt="Himalayan Moto Enduro 2027"
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 w-auto object-contain object-left select-none"
              />
              <div className="sm:text-right">
                <p className="text-[11px] font-bold tracking-wide text-[#F03845] uppercase">
                  Official Event Brochure · 2027 Edition
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">Pokhara &amp; Everest Corridor, Nepal</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-zinc-900 aspect-[16/8.5] w-full">
              <img
                src="/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"
                alt="Himalayan Moto Enduro 2027 Cover Action"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold tracking-wide text-[#F03845] uppercase">
                Pokhara, Nepal · Adventure Sport Hub
              </p>
              <h3 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
                THE HIMALAYAN MOTO SERIES OF ADVENTURES
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Nepal&apos;s premier off-road motorsport championship uniting hard enduro river boulders, high-speed motocross circuits, freestyle stunt shows, and Himalayan mountain singletrack across Pokhara and the Everest corridor.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div
                    className={`font-heading font-black text-2xl sm:text-3xl leading-none tabular-nums ${
                      m.accent ? "text-[#F03845]" : "text-white"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <footer className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span>
                {championship.organizer.name} · {championship.organizer.phoneDisplay} ·{" "}
                {championship.organizer.email} · www.sporthubnepal.com
              </span>
              <span className="font-semibold text-zinc-200 tabular-nums">Page 1 of 4</span>
            </footer>
          </div>
        </article>
      );

    case 2:
      return (
        <SheetChrome
          eyebrow="01. 2027 Championship Calendar"
          title="UPCOMING 2027 EVENTS & CATEGORIES"
          pageNum={2}
          totalPages={4}
          footerLabel={generalFooter}
        >
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2">
            <p className="text-[11px] font-bold text-[#D60A19] uppercase">
              April 5 &amp; 6, 2027 · Registration Open · Pokhara, Nepal
            </p>
            <h4 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-900">
              HIMALAYAN ENDURO 2027 POKHARA
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Two action-packed days of technical ridge climbs, valley riverbeds, bamboo singletrack, and motocross jumps across Pokhara&apos;s Annapurna foothills. Built for national and international enduro riders with limited entry slots.
            </p>
            <p className="text-xs font-semibold text-zinc-800 pt-1">
              Format: 2-Day Championship · Elevation: 822m - 1,400m · Bike Spec: 250cc Class Rules
            </p>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2">
            <p className="text-[11px] font-bold text-[#D60A19] uppercase">
              November 2027 · Registration Open · Everest Corridor, Nepal
            </p>
            <h4 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-900">
              HIMALAYAN ENDURO 2027 EVEREST
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              An all-new hard enduro expedition and championship stage heading into the Everest Himalayan corridor. Early rider entries are open now, with final GPS stage routes to be confirmed ahead of race week.
            </p>
            <p className="text-xs font-semibold text-zinc-800 pt-1">
              Format: High-Altitude Hard Enduro Expedition · Course Route: To Be Confirmed Soon
            </p>
          </div>

          <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 pt-1">
            02. Disciplines &amp; Race Classes
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {GENERAL_DISCIPLINES.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-stone-200 p-4 space-y-1.5"
              >
                <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </SheetChrome>
      );

    case 3:
      return (
        <SheetChrome
          eyebrow="03. Official Pokhara Circuit Telemetry"
          title="POKHARA 2KM CIRCUIT MAP"
          pageNum={3}
          totalPages={4}
          footerLabel={generalFooter}
        >
          <div className="bg-[#0E0E10] rounded-xl p-2 sm:p-3 flex items-center justify-center">
            <img
              src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
              alt="Official 2KM Pokhara Circuit Map"
              referrerPolicy="no-referrer"
              className="w-full max-h-[380px] object-contain rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Circuit Length", value: "2 KM Loop" },
              { label: "Total Corners", value: "55 Turns" },
              { label: "Bike Rules", value: "250cc Class" },
              { label: "Location", value: "Pokhara, Nepal" }
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-stone-200 px-3.5 py-3"
              >
                <div className="text-[11px] text-zinc-500">{s.label}</div>
                <div className="text-sm font-bold text-zinc-900 mt-0.5 tabular-nums">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
              Track Sector &amp; Surface Mix Breakdown
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {GENERAL_TRACK_SECTORS.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="text-[#D60A19] font-bold">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </SheetChrome>
      );

    case 4:
    default:
      return (
        <SheetChrome
          eyebrow="04. Safety Protocols & Commercial Partnerships"
          title="FIM STANDARDS & PARTNERSHIPS"
          pageNum={4}
          totalPages={4}
          footerLabel={generalFooter}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SAFETY_PROTOCOLS.map((proto) => (
              <div
                key={proto.title}
                className="bg-white rounded-xl border border-stone-200 p-4 space-y-1"
              >
                <div className="text-sm font-bold text-zinc-900">{proto.title}</div>
                <p className="text-xs text-zinc-600 leading-relaxed">{proto.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-[#D60A19] uppercase">
              2027 Sponsorship &amp; Vendor Opportunities (Proposal Upon Request)
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
              {GENERAL_PARTNER_SUMMARY.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="text-[#D60A19] font-bold">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#141416] text-white rounded-xl p-5 space-y-2">
            <p className="text-[11px] font-bold text-[#F03845] uppercase">
              Official Organizing Secretariat
            </p>
            <h4 className="font-heading font-black text-xl uppercase text-white">
              {championship.organizer.name}
            </h4>
            <div className="text-xs sm:text-sm text-zinc-300 space-y-1 pt-1">
              <div>Race Director: {championship.organizer.contactPerson}</div>
              <div>Headquarters: {championship.organizer.address}</div>
              <div className="tabular-nums">
                Direct Hotline / WhatsApp: {championship.organizer.phoneDisplay}
              </div>
              <div>
                Email: {championship.organizer.email} · Website: www.sporthubnepal.com
              </div>
            </div>
          </div>
        </SheetChrome>
      );
  }
};
