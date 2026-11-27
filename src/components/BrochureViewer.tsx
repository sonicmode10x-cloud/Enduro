import React from "react";
import {
  EVENT_CONFIG,
  INFLUENCERS,
  SAFETY_PROTOCOLS,
  SPONSOR_PACKAGES,
  TRACK_ZONES,
  VENDOR_OPPORTUNITIES
} from "../data/eventConfig";
import {
  ARCHIVE_2024_PHOTOS,
  ARCHIVE_2026_PHOTOS,
  CHAMPIONSHIP_EXPERIENCES,
  CIRCUIT_SECTORS,
  ENTRY_PORTALS,
  GALLERY_SHOWCASE_PHOTOS,
  GENERAL_DIGITAL_DELIVERABLES,
  SURFACE_MIX_SUMMARY
} from "../data/brochureData";
import { PrivateRateCard, XtremeProposalContent } from "../types/xtremeProposal";

export type BrochureEdition = "xtreme" | "general";

export const XTREME_PAGE_LABELS = [
  { page: 1, short: "01. Cover" },
  { page: 2, short: "02. Info & 2027" },
  { page: 3, short: "03. Experiences" },
  { page: 4, short: "04. 2026 & 2024" },
  { page: 5, short: "05. Circuit Map" },
  { page: 6, short: "06. 8 Sectors" },
  { page: 7, short: "07. Gallery" },
  { page: 8, short: "08. Title Rights" },
  { page: 9, short: "09. 50+ Creators" },
  { page: 10, short: "10. Safety & Desk" }
];

export const GENERAL_PAGE_LABELS = [
  { page: 1, short: "01. Cover" },
  { page: 2, short: "02. Info & 2027" },
  { page: 3, short: "03. Experiences" },
  { page: 4, short: "04. 2026 & 2024" },
  { page: 5, short: "05. Circuit Map" },
  { page: 6, short: "06. 8 Sectors" },
  { page: 7, short: "07. Gallery" },
  { page: 8, short: "08. Tiers & Expo" },
  { page: 9, short: "09. 50+ Creators" },
  { page: 10, short: "10. Safety & Desk" }
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
  xtremeContent?: XtremeProposalContent | null;
  privateRateCard?: PrivateRateCard | null;
}

export const BrochurePageSheet: React.FC<BrochurePageRendererProps> = ({
  edition,
  pageNumber,
  xtremeContent,
  privateRateCard
}) => {
  const isXtreme = edition === "xtreme" && Boolean(xtremeContent);
  const totalPages = 10;
  const { championship, previousAchievements } = EVENT_CONFIG;
  const footerLabel =
    isXtreme && xtremeContent
      ? xtremeContent.footerLabel
      : "Himalayan Moto Enduro 2027 · Official General Event & Sponsorship Proposal · www.sporthubnepal.com";

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

  switch (pageNumber) {
    // =========================================================================
    // PAGE 1: COVER + PARTNER STRIP + BENCHMARKS
    // =========================================================================
    case 1:
      return (
        <article className="bg-[#08080A] text-white rounded-2xl border border-zinc-800 shadow-sm overflow-hidden flex flex-col">
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
                  {isXtreme && xtremeContent
                    ? xtremeContent.coverEyebrow
                    : "Official Event & Sponsorship Proposal"}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isXtreme && xtremeContent
                    ? xtremeContent.coverSubtitle
                    : "10-Page Master Edition · Pokhara & Everest, Nepal"}
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-zinc-900 aspect-[16/7.5] w-full">
              <img
                src="/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"
                alt="Himalayan Moto Enduro Championship Action"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_32%]"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold tracking-wide text-[#F03845] uppercase">
                The Himalayan Series of Moto Adventures · Pokhara &amp; Everest, Nepal
              </p>
              <h3 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
                EXTREME MOTO ENDURO CROSS CHAMPIONSHIP 2027
              </h3>
              <div className="bg-[#D60A19] rounded-lg px-4 py-3 text-center">
                <span className="font-heading font-black text-lg sm:text-2xl tracking-wide uppercase text-white">
                  {isXtreme && xtremeContent
                    ? xtremeContent.coverBanner
                    : "OFFICIAL CHAMPIONSHIP & COMMERCIAL PROSPECTUS"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isXtreme && xtremeContent
                  ? xtremeContent.coverDescription
                  : "Complete 10-page master brochure & sponsorship proposal covering every section of Himalayan Moto Enduro 2027 — Pokhara & Everest calendar, all 8 event experiences, 2026 & 2024 archives, 2KM circuit map, 8 track sectors, 8 arena zones, official gallery, sponsorship & vendor tiers, 50+ creators, and FIM safety governance."}
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
              <span className="font-semibold text-zinc-200 tabular-nums">
                Page 1 of {totalPages}
              </span>
            </footer>
          </div>
        </article>
      );

    // =========================================================================
    // PAGE 2: INFORMATION, QUICK FACTS & 2027 SERIES CALENDAR
    // =========================================================================
    case 2:
      return (
        <SheetChrome
          eyebrow="01. Championship Information & 2027 Calendar"
          title="ABOUT HIMALAYAN MOTO ENDURO"
          pageNum={2}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
                Nepal&apos;s Ultimate Off-Road Motorsport Festival
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-2">
                Welcome to Nepal&apos;s premier off-road motorsport festival in Pokhara, hosted by Adventure Sport Hub under FIM-grade safety governance. Combining hard enduro trails, motocross jumps, freestyle stunt shows, live music, and international racing culture beneath the Annapurna and Everest Himalayas, the 2027 season expands into a landmark two-stage championship series.
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

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2">
            <p className="text-[11px] font-bold text-[#D60A19] uppercase">
              Stage 02 · November 2027 · Registration Open · Everest Corridor, Nepal
            </p>
            <h4 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-900">
              HIMALAYAN ENDURO 2027 EVEREST
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {isXtreme && xtremeContent
                ? xtremeContent.everestDescription
                : "An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with final GPS track files and stage maps to be confirmed ahead of race week."}
            </p>
            <p className="text-xs font-semibold text-zinc-800 pt-1">
              Format: High-Altitude Hard Enduro Expedition · Route GPS Track: To Be Confirmed Soon
            </p>
          </div>

          <div className="bg-[#121214] text-white rounded-xl p-5 space-y-1.5">
            <p className="text-[11px] font-bold text-[#F03845] uppercase">
              {isXtreme && xtremeContent
                ? xtremeContent.whyHeading
                : "Official Sanctioning, Tourism & Audience Value"}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {isXtreme && xtremeContent
                ? xtremeContent.whyDescription
                : "Backed by Adventure Sport Hub, Pokhara Riders Club, local tourism & municipal authorities, and FIM-aligned safety protocols — uniting 80+ national & international racers, 10,000+ live spectators, and 20M+ proven digital views."}
            </p>
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 3: ALL 8 CHAMPIONSHIP SECTIONS & EXPERIENCES (WITH HIGHLIGHTS)
    // =========================================================================
    case 3:
      return (
        <SheetChrome
          eyebrow="02. Complete Championship Program · 8 Core Disciplines"
          title="CHAMPIONSHIP SECTIONS & EXPERIENCES"
          pageNum={3}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Eight core motorsport disciplines and festival experiences across Pokhara Arena — engaging riders, families, motorsport fans, and digital creators from opening gate drop through the closing afterparty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHAMPIONSHIP_EXPERIENCES.map((exp) => (
              <div
                key={exp.title}
                className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col gap-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#D60A19]">
                  {exp.category} · {exp.tagline}
                </span>
                <h4 className="font-heading font-bold text-lg text-zinc-900 leading-tight pb-2 border-b border-stone-200">
                  {exp.title}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{exp.desc}</p>
                <ul className="space-y-1 pt-1 text-[11px] font-medium text-zinc-700">
                  {exp.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-1.5">
                      <span className="text-[#D60A19] font-bold">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 4: PAST EDITIONS ARCHIVE (MOTO ENDURO 2026 & 2024)
    // =========================================================================
    case 4:
      return (
        <SheetChrome
          eyebrow="03. Proven Track Record · Past Championship Archives"
          title="MOTO ENDURO 2026 & 2024 ARCHIVES"
          pageNum={4}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          {/* 2026 Block */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
            <div>
              <p className="text-[11px] font-bold text-[#D60A19] uppercase">
                Recent Edition · Pokhara, Nepal
              </p>
              <h4 className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight text-zinc-900 mt-0.5">
                {isXtreme && xtremeContent
                  ? xtremeContent.archive2026Title
                  : "MOTO ENDURO 2026 — PODIUM CHAMPIONS & FOREST STAGES"}
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ARCHIVE_2026_PHOTOS.map((photo) => (
                <figure key={photo.id} className="space-y-1">
                  <div className="rounded-lg overflow-hidden bg-zinc-900 aspect-[4/3]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full ${photo.focalClass || "object-cover"}`}
                    />
                  </div>
                  <figcaption className="text-[10px] font-semibold text-zinc-600 truncate">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Highlights from the Extreme Moto Enduro Cross Championship 2026 in Pokhara — featuring overall &amp; #444 podium champions lifting custom Xtreme Energy Drink sprocket trophies, Women&apos;s Division podium winners, Rider #555 riverbed water crossing wheelies, GasGas wooded singletrack (#151), hillside dirt jumps (#795, #70), and steep forest log &amp; root climbs lined with cheering spectators.
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ARCHIVE_2024_PHOTOS.map((photo) => (
                <figure key={photo.id} className="space-y-1">
                  <div className="rounded-lg overflow-hidden bg-zinc-900 aspect-[4/3]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full ${photo.focalClass || "object-cover"}`}
                    />
                  </div>
                  <figcaption className="text-[10px] font-semibold text-zinc-600 truncate">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Held on April 5 &amp; 6, 2024 in Pokhara alongside Pokhara Riders Club, Moto Enduro 2024 established Nepal&apos;s off-road motorsport benchmark — uniting riverbed boulder stages (#16, #555, #911, #01), escorted Pokhara city street rally parades (#07, #333), Team Rad Rides paddock prep, traditional cultural welcome dances, international tourist turnout, trackside emcees, and official dignitary trophy ceremonies.
            </p>
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 5: 2KM POKHARA CIRCUIT MAP, SURFACE MIX & 8 ARENA ZONES
    // =========================================================================
    case 5:
      return (
        <SheetChrome
          eyebrow="04. Official Pokhara Circuit Blueprint & Venue Layout"
          title="2KM CIRCUIT MAP & 8 ARENA ZONES"
          pageNum={5}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <div className="bg-[#0E0E10] rounded-xl p-2 sm:p-3 flex items-center justify-center">
            <img
              src="/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
              alt="Official 2KM Pokhara Circuit Map"
              referrerPolicy="no-referrer"
              className="w-full max-h-[340px] object-contain rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Circuit Length", value: "2.0 KM Loop" },
              { label: "Total Corners", value: "55 Corners" },
              { label: "Swp / Med / Tight", value: "12 · 18 · 22" },
              { label: "Bike / Terrains", value: "250cc · 4 Mix" }
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

          {/* 4-Terrain Surface Mix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-white rounded-xl border border-stone-200 p-3.5">
            {SURFACE_MIX_SUMMARY.map((sm) => (
              <div key={sm.terrain}>
                <div className="text-[11px] font-bold text-[#D60A19]">{sm.terrain}</div>
                <div className="text-[11px] text-zinc-600 mt-0.5">{sm.pace}</div>
              </div>
            ))}
          </div>

          <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 pt-1">
            Official Pokhara Arena Zones &amp; Hospitality Footprint
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRACK_ZONES.slice(0, 8).map((zone) => (
              <div
                key={zone.id}
                className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-1"
              >
                <div className="text-xs sm:text-sm font-bold text-zinc-900">{zone.name}</div>
                <div className="text-[11px] font-semibold text-[#D60A19]">
                  {zone.capacityOrLength} · {zone.difficulty || "Arena"}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{zone.shortDesc}</p>
              </div>
            ))}
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 6: COMPLETE 8-SECTOR TECHNICAL TRACK BREAKDOWN
    // =========================================================================
    case 6:
      return (
        <SheetChrome
          eyebrow="05. Sector-by-Sector Track Telemetry · 8 Key Segments"
          title="TECHNICAL TRACK SECTORS & OBSTACLES"
          pageNum={6}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Every lap of the 2.0 KM Pokhara Championship Circuit tests riders across eight distinct technical sectors combining wet river rock, narrow gorge bridges, hardpack village sweepers, forest root staircases, bamboo chicanes, 25m MX tabletops, and deep silt sand.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CIRCUIT_SECTORS.map((sec) => (
              <div
                key={sec.id}
                className="bg-white rounded-xl border border-stone-200 p-4 space-y-1.5"
              >
                <div className="text-[10px] font-bold uppercase tracking-wide text-[#D60A19]">
                  {sec.difficulty} · {sec.pace}
                </div>
                <h4 className="font-heading font-bold text-base text-zinc-900 leading-tight">
                  {sec.name}
                </h4>
                <div className="text-[11px] text-zinc-500">
                  <strong className="text-zinc-700">Surface:</strong> {sec.surface}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{sec.description}</p>
                <div className="text-[11px] font-semibold text-zinc-800 pt-1">
                  Obstacles: {sec.features.join(" · ")}
                </div>
                <div className="text-[11px] italic text-zinc-500">
                  Spectator Vantage: {sec.viewingTip}
                </div>
              </div>
            ))}
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 7: OFFICIAL CHAMPIONSHIP PHOTO GALLERY (8 PHOTOS)
    // =========================================================================
    case 7:
      return (
        <SheetChrome
          eyebrow="06. Official Event Moments · Pokhara, Nepal"
          title="CHAMPIONSHIP PHOTO GALLERY"
          pageNum={7}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Authentic race-day photography from Pokhara showcasing podium celebrations, riverbed wheelies, forest root climbs, packed trackside crowds, paddock teams, and the Himalayan riders crew.
          </p>
          <div className="grid grid-cols-2 gap-3.5">
            {GALLERY_SHOWCASE_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden"
              >
                <div className="aspect-[16/9.5] bg-zinc-900 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full ${photo.focalClass || "object-cover"}`}
                  />
                </div>
                <figcaption className="px-3 py-2 text-xs font-semibold text-zinc-800 border-t border-stone-100">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 8: XTREME TITLE DELIVERABLES OR GENERAL SPONSORSHIP + VENDOR ZONES
    // =========================================================================
    case 8:
      return isXtreme && xtremeContent ? (
        <SheetChrome
          eyebrow={
            xtremeContent.page8Eyebrow ||
            "07. Exclusive Title Sponsorship Ownership · 1 Slot Only"
          }
          title={xtremeContent.page8Title || "TITLE SPONSORSHIP DELIVERABLES"}
          pageNum={8}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <div className="bg-[#121214] text-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <p className="text-[11px] font-bold text-[#F03845] uppercase">
                {xtremeContent.titleLockupEyebrow}
              </p>
              <h4 className="font-heading font-black text-lg sm:text-2xl leading-tight text-white">
                {xtremeContent.titleLockupHeadline}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {xtremeContent.titleLockupSubtext}
              </p>
            </div>
            {xtremeContent.investmentAmount && (
              <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 sm:text-right shrink-0">
                <div className="text-[10px] font-bold uppercase tracking-wide text-[#F03845]">
                  {xtremeContent.investmentLabel || "Package Investment"}
                </div>
                <div className="font-heading font-black text-xl sm:text-2xl text-white tabular-nums leading-none mt-1 whitespace-nowrap">
                  {xtremeContent.investmentAmount}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {xtremeContent.titlePillars.map((pillar) => (
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

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase">
              {xtremeContent.commercialEcosystemHeading}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
              {xtremeContent.commercialEcosystemItems.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="text-[#D60A19] font-bold">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </SheetChrome>
      ) : (
        <SheetChrome
          eyebrow={
            privateRateCard
              ? "07. Commercial Partnerships & Official 2027 Rate Card"
              : "07. Commercial Partnerships & Vendor Marketplace"
          }
          title="SPONSORSHIP TIERS & VENDOR ZONES"
          pageNum={8}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SPONSOR_PACKAGES.map((pkg, idx) => {
              const isTitle = idx === 0;
              const privatePrice = privateRateCard?.sponsorPrices[pkg.id];
              return (
                <div
                  key={pkg.id}
                  className={`rounded-xl p-4 space-y-2.5 border ${
                    isTitle
                      ? "bg-[#121214] text-white border-zinc-800"
                      : "bg-white text-zinc-900 border-stone-200"
                  }`}
                >
                  <div className="pb-2 border-b border-current/15 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-[#D60A19]">
                        {privatePrice
                          ? `${pkg.badge} · ${privatePrice.period}`
                          : `${pkg.badge} · Proposal Upon Request`}
                      </div>
                      <h4 className="font-heading font-black text-lg uppercase mt-0.5 leading-none">
                        {pkg.tier}
                      </h4>
                    </div>
                    {privatePrice && (
                      <div
                        className={`font-heading font-black text-lg tabular-nums leading-none whitespace-nowrap ${
                          isTitle ? "text-[#F03845]" : "text-zinc-900"
                        }`}
                      >
                        {privatePrice.price}
                      </div>
                    )}
                  </div>
                  <ul
                    className={`space-y-1.5 text-xs leading-relaxed ${
                      isTitle ? "text-zinc-200" : "text-zinc-700"
                    }`}
                  >
                    {pkg.keyHighlights.map((hl) => (
                      <li key={hl} className="flex items-start gap-2">
                        <span className="text-[#D60A19] font-bold">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 pt-1">
            {privateRateCard
              ? "Vendor & Product Showcase Marketplace Zones (2-Day Rates)"
              : "Vendor & Product Showcase Marketplace Zones"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {VENDOR_OPPORTUNITIES.map((v) => {
              const privateVendorPrice = privateRateCard?.vendorPrices[v.id];
              return (
                <div
                  key={v.id}
                  className="bg-white rounded-xl border border-stone-200 p-4 space-y-1.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-[#D60A19]">
                      {v.category} · {v.footfallTarget}
                    </div>
                    {privateVendorPrice && (
                      <div className="font-heading font-black text-sm text-zinc-900 tabular-nums whitespace-nowrap">
                        {privateVendorPrice.price}
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900">{v.title}</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">{v.description}</p>
                  <div className="text-[11px] font-semibold text-zinc-700 pt-1">
                    Spaces: {v.stallSizes} · Ideal for: {v.suitableFor}
                  </div>
                </div>
              );
            })}
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 9: 50+ CREATORS & DIGITAL MEDIA ECOSYSTEM
    // =========================================================================
    case 9:
      return (
        <SheetChrome
          eyebrow="08. Digital Media & Creator Amplification"
          title="50+ INFLUENCERS & 20M+ PROVEN VIEWS"
          pageNum={9}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
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

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2.5">
            <h4 className="text-xs sm:text-sm font-bold text-[#D60A19] uppercase">
              {isXtreme && xtremeContent
                ? xtremeContent.digitalHeading
                : "Championship Digital Coverage & Creator Deliverables"}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed">
              {(isXtreme && xtremeContent
                ? xtremeContent.digitalDeliverables
                : GENERAL_DIGITAL_DELIVERABLES
              ).map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="text-[#D60A19] font-bold">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </SheetChrome>
      );

    // =========================================================================
    // PAGE 10: FIM SAFETY PROTOCOLS, ENTRY PORTALS & SECRETARIAT CONTACT
    // =========================================================================
    case 10:
    default:
      return (
        <SheetChrome
          eyebrow="09. Safety Governance, Entry Portals & Secretariat"
          title="FIM SAFETY STANDARDS & CONTACT"
          pageNum={10}
          totalPages={totalPages}
          footerLabel={footerLabel}
        >
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

          {/* Strict Track Rule Notice */}
          <div className="bg-white rounded-xl border border-[#D60A19]/40 p-3.5 text-xs text-zinc-700 leading-relaxed">
            <strong className="text-zinc-900">Strict Track Rule:</strong> Extreme motorcycle racing occurs strictly within designated, marshaled, and barricaded track arenas. All racers must hold valid competition insurance and approved DOT/ECE safety gear.
          </div>

          {/* 4 Official Entry & Partnership Portals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ENTRY_PORTALS.map((portal) => (
              <div
                key={portal.title}
                className="bg-white rounded-xl border border-stone-200 p-3.5 space-y-1"
              >
                <div className="text-[10px] font-bold uppercase text-[#D60A19]">{portal.tag}</div>
                <div className="text-xs font-bold text-zinc-900">{portal.title}</div>
                <p className="text-[11px] text-zinc-600 leading-relaxed">{portal.desc}</p>
              </div>
            ))}
          </div>

          {/* Secretariat Contact Box */}
          <div className="bg-[#121214] text-white rounded-xl overflow-hidden">
            <div className="h-1.5 bg-[#D60A19]" />
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <p className="text-[11px] font-bold text-[#F03845] uppercase">
                  {isXtreme && xtremeContent
                    ? xtremeContent.secretariatEyebrow
                    : "Official Organizing Secretariat · Pokhara, Nepal"}
                </p>
                <h4 className="font-heading font-black text-2xl uppercase tracking-tight text-white mt-1">
                  {isXtreme && xtremeContent
                    ? xtremeContent.secretariatTitle
                    : "CONNECT WITH ADVENTURE SPORT HUB"}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2">
                  {isXtreme && xtremeContent
                    ? xtremeContent.secretariatDescription
                    : "Inquire directly for 2027 rider entries, sponsorship packages, vendor showcase spaces, or official press & creator passes across Pokhara and Everest."}
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
};
