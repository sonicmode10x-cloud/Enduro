import { jsPDF } from "jspdf";
import {
  EVENT_CONFIG,
  INFLUENCERS,
  SAFETY_PROTOCOLS,
  TRACK_ZONES
} from "../data/eventConfig";
import {
  cropImageCover,
  drawWrappedText,
  fitImageContain,
  loadImageAsDataUrl
} from "./pdfHelpers";

export const CHAMPIONSHIP_EXPERIENCES = [
  {
    title: "01. Motocross Racing",
    category: "Speed & Agility",
    desc: "20-gate synchronized starts, sculpted clay berms, and 25m tabletop leaps across Pro Open, Expert & Novice heats."
  },
  {
    title: "02. Hard Enduro Challenge",
    category: "Hard Enduro",
    desc: "Elimination-format endurance battle over Seti riverbed granite boulders, staggered timber logs, forest roots, and water."
  },
  {
    title: "03. Freestyle Stunts (FMX)",
    category: "Action Sports",
    desc: "Veteran FMX riders executing 60-65 ft gap backflips, seat-grabs, tandem leaps, pyrotechnics, and street wheelie shows."
  },
  {
    title: "04. Pokhara Street Parade",
    category: "Community Ride",
    desc: "Escorted ceremonial motorcycle rally uniting hundreds of touring clubs and championship racers along Phewa Lake."
  },
  {
    title: "05. Live Music Stage",
    category: "Festival Audio",
    desc: "High-energy Nepali DJ acts, live rock sets between heats, live race commentary, and evening acoustic sunset lounge."
  },
  {
    title: "06. Food & Lifestyle Village",
    category: "Catering & Culture",
    desc: "Curated Nepali BBQ & sekuwa, woodfired pizzas, specialty espresso bars, and shaded dining with live arena screens."
  },
  {
    title: "07. Brand Expo Zone",
    category: "Automotive & Gear",
    desc: "40+ brand booths featuring 2027 motorcycles, EV prototypes, safety gear discounts, and a consumer test-ride corridor."
  },
  {
    title: "08. Rider Afterparty",
    category: "Nightlife & Podium",
    desc: "Official champion trophy toast, VIP pro rider meet-and-greet, and signature closing DJ party under Pokhara night skies."
  }
];

export const XTREME_TITLE_PILLARS = [
  {
    heading: "A. Dominant Naming & Trackside Visibility",
    items: [
      "Largest logo across all digital & physical championship assets",
      "Primary Start Gate, Finish Truss Arch & Main Podium backdrop",
      "Co-branded official T-shirts, rider bibs, trophies & medals",
      "Perimeter hoardings on MX jumps, river crossing & bridge"
    ]
  },
  {
    heading: "B. Press, Broadcast & Creator Ownership",
    items: [
      "Title mention in every press release & national media report",
      "Co-branded Creator Zone interview wall for 50+ vloggers",
      "Dedicated interviews with Nepal's top moto & travel creators",
      "Title mic shout-outs across heats, stunts & trophy finals"
    ]
  },
  {
    heading: "C. Flagship Brand Expo & Chilled Sampling",
    items: [
      "Prime flagship Xtreme Energy Drink pavilion in Brand Expo",
      "Exclusive chilled can sampling, giveaways & merchandise",
      "Branded rider hydration & recovery zone in Rider Paddock",
      "Fan challenges integrated with Live Music & DJ stage"
    ]
  },
  {
    heading: "D. Category Lock & VIP Leadership Access",
    items: [
      "100% energy drink & beverage exclusivity across the arena",
      "VIP Sky Lounge hospitality passes for brand executives",
      "Main stage champion trophy presentation at closing ceremony",
      "First right to extend Title Rights to Everest stage (Nov 2027)"
    ]
  }
];

export const COMMERCIAL_ECOSYSTEM_ITEMS = [
  "Title Sponsor (1 Slot — Reserved for Xtreme Energy Drink): Face of the Championship, naming rights & 100% category lock.",
  "Gold Sponsors (2 Slots): High-visibility race zone branding & Brand Expo pavilion (non-competing categories only).",
  "Silver Sponsors (3 Slots) & Supporting Partners (10 Slots): Event banners, lifestyle zone visibility & community sampling.",
  "Vendor Marketplace: EV Cars, Motorbikes & Gear Display Arena, Food Court Stalls & Retail Lifestyle Shops."
];

export const XTREME_DIGITAL_DELIVERABLES = [
  "Official title credit & visual lockup on pre-event hype trailers, daily race recaps, and 4K drone aftermovies.",
  "Creator Zone media backdrop wall co-branded with Xtreme Energy Drink for all post-heat rider & vlogger interviews.",
  "Coordinated reels, stories, and TikTok walkthroughs featuring the Xtreme sampling pavilion and chilled drink drops.",
  "Full press release inclusion across national Nepali sports desks, automotive portals, and tourism publications."
];

function drawPageChrome(
  doc: jsPDF,
  eyebrow: string,
  title: string,
  pageNum: number,
  totalPages: number
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(248, 247, 244);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top crimson bar
  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 3, "F");

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text(eyebrow, 15, 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18.5);
  doc.setTextColor(20, 20, 22);
  doc.text(title, 15, 24.5);

  doc.setDrawColor(225, 222, 215);
  doc.setLineWidth(0.3);
  doc.line(15, 29, pageWidth - 15, 29);

  // Footer
  doc.setDrawColor(214, 211, 204);
  doc.line(15, pageHeight - 13.5, pageWidth - 15, pageHeight - 13.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.6);
  doc.setTextColor(115, 115, 120);
  doc.text(
    "Himalayan Moto Enduro 2027 · Xtreme Energy Drink Title Sponsor Brochure · www.sporthubnepal.com",
    15,
    pageHeight - 8.2
  );
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 15, pageHeight - 8.2, {
    align: "right"
  });
}

export async function downloadXtremeTitleSponsorBrochurePdf(): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const totalPages = 8;
  const { championship, previousAchievements } = EVENT_CONFIG;

  const [
    logoImg,
    rawHeroImg,
    partnerStripImg,
    rawPodium2026Img,
    rawAction2026Img,
    rawArch2024Img,
    rawParade2024Img,
    mapImg
  ] = await Promise.all([
    loadImageAsDataUrl("/assets/aistudio/MOTO_175fdec7.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Master_Proposal_b6a698c1.png"),
    loadImageAsDataUrl(
      "/assets/aistudio/670957943_17869316799664194_1306959075209737257_n_b64c1da3.jpg"
    ),
    loadImageAsDataUrl(
      "/assets/aistudio/672352852_17870149437664194_5890226800590230447_n__1__50dae4cc.jpg"
    ),
    loadImageAsDataUrl(
      "/assets/aistudio/602450155_122097115155183336_3931125237093247231_n_22a08ed1.jpg"
    ),
    loadImageAsDataUrl(
      "/assets/aistudio/605090937_122097125283183336_1382602027749110508_n_ac9a713f.jpg"
    ),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png")
  ]);

  // Pre-crop photographs with exact object-fit: cover so zero stretching occurs
  const [heroImg, podium2026Img, action2026Img, arch2024Img, parade2024Img] = await Promise.all([
    cropImageCover(rawHeroImg, 180, 82, 0.35),
    cropImageCover(rawPodium2026Img, 79, 52, 0.22),
    cropImageCover(rawAction2026Img, 79, 52, 0.38),
    cropImageCover(rawArch2024Img, 79, 52, 0.38),
    cropImageCover(rawParade2024Img, 79, 52, 0.38)
  ]);

  // =========================================================================
  // PAGE 1: CO-BRANDED EXECUTIVE COVER (XTREME ENERGY DRINK)
  // =========================================================================
  doc.setFillColor(8, 8, 10);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 4.5, "F");

  if (logoImg) {
    const fit = fitImageContain(logoImg, 15, 9, 64, 34, "left");
    doc.addImage(logoImg.dataUrl, logoImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(240, 56, 69);
  doc.text("COMPLETE CHAMPIONSHIP & TITLE BROCHURE", pageWidth - 15, 22, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(185, 185, 195);
  doc.text("PREPARED EXCLUSIVELY FOR XTREME ENERGY DRINK · 2027", pageWidth - 15, 27.5, {
    align: "right"
  });

  if (heroImg) {
    doc.addImage(heroImg.dataUrl, heroImg.format, 15, 48, 180, 82);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(240, 56, 69);
  doc.text("THE HIMALAYAN MOTO SERIES OF ADVENTURES  ·  POKHARA & EVEREST, NEPAL", 15, 141);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("EXTREME MOTO ENDURO CROSS", 15, 152);
  doc.text("CHAMPIONSHIP 2027", 15, 162);

  doc.setFillColor(214, 10, 25);
  doc.roundedRect(15, 168, pageWidth - 30, 14, 2.5, 2.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(255, 255, 255);
  doc.text("POWERED BY XTREME ENERGY DRINK", pageWidth / 2, 177.2, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(205, 205, 214);
  drawWrappedText(
    doc,
    "Complete 8-page official dossier uniting the full Himalayan Moto Enduro 2027 championship profile — upcoming Pokhara & Everest stages, all 8 motorsport & festival experiences, 2026 & 2024 archives, 2KM circuit map & 8 arena zones, 50+ creator ecosystem, FIM safety governance, and exclusive Title Sponsorship deliverables for Xtreme Energy Drink.",
    15,
    191,
    pageWidth - 30,
    9,
    { lineHeightFactor: 1.38 }
  );

  // Benchmarks strip
  doc.setDrawColor(45, 45, 52);
  doc.setLineWidth(0.4);
  doc.line(15, 217, pageWidth - 15, 217);

  const metrics = [
    { value: `${previousAchievements.riders}${previousAchievements.ridersSuffix}`, label: "Competing Riders" },
    { value: `${previousAchievements.spectators.toLocaleString()}${previousAchievements.spectatorsSuffix}`, label: "Live Spectators" },
    { value: previousAchievements.onlineViews, label: "Online Video Views" },
    { value: `${previousAchievements.influencers}${previousAchievements.influencersSuffix}`, label: "Creators & Media" }
  ];

  const colW = (pageWidth - 30) / 4;
  metrics.forEach((m, idx) => {
    const x = 15 + idx * colW;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17.5);
    doc.setTextColor(idx === 2 ? 240 : 255, idx === 2 ? 56 : 255, idx === 2 ? 69 : 255);
    doc.text(m.value, x, 229);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(170, 170, 180);
    doc.text(m.label, x, 235);
  });

  // Official Organizers & Sanctioning Partner Strip
  if (partnerStripImg) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 244, pageWidth - 30, 23, 2.5, 2.5, "F");
    const fit = fitImageContain(partnerStripImg, 21, 246.5, pageWidth - 42, 18, "center");
    doc.addImage(partnerStripImg.dataUrl, partnerStripImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.6);
  doc.setTextColor(185, 185, 195);
  doc.text(
    `Hosted by ${championship.organizer.name}  ·  ${championship.organizer.phoneDisplay}  ·  ${championship.organizer.email}  ·  www.sporthubnepal.com`,
    pageWidth / 2,
    279,
    { align: "center" }
  );

  // =========================================================================
  // PAGE 2: ABOUT HIMALAYAN MOTO ENDURO & 2027 SERIES CALENDAR
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "01. CHAMPIONSHIP PROFILE & 2027 SERIES CALENDAR",
    "ABOUT HIMALAYAN MOTO ENDURO",
    2,
    totalPages
  );

  // About Summary Card
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 34, pageWidth - 30, 64, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 22);
  doc.text("NEPAL'S ULTIMATE OFF-ROAD MOTORSPORT CHAMPIONSHIP", 22, 43.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  const afterAbout = drawWrappedText(
    doc,
    "Organized by Adventure Sport Hub, Pokhara under FIM-aligned safety standards, Himalayan Moto Enduro unites hard enduro river boulder battles, high-speed motocross heats, FMX aerial stunt showcases, live music, and motorcycle culture beneath the Annapurna and Everest Himalayas. Following milestone editions in 2024 and 2026, the 2027 season expands into a landmark two-stage Himalayan championship series.",
    22,
    50.5,
    pageWidth - 44,
    8.7,
    { lineHeightFactor: 1.38 }
  );

  const factsDividerY = Math.max(afterAbout + 2, 73);
  doc.setDrawColor(232, 229, 222);
  doc.line(22, factsDividerY, pageWidth - 22, factsDividerY);

  const quickFacts = [
    { k: "Host Regions", v: "Pokhara & Everest, Nepal" },
    { k: "Elevation Range", v: championship.elevation },
    { k: "Bike Spec", v: "250cc Enduro / MX Rules" },
    { k: "Rider Classes", v: "Pro, Expert, Novice, Vet, Women" }
  ];
  quickFacts.forEach((f, idx) => {
    const x = 22 + idx * 41.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(120, 120, 128);
    doc.text(f.k, x, factsDividerY + 6);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 20, 22);
    drawWrappedText(doc, f.v, x, factsDividerY + 11.2, 38.5, 7.8, { lineHeightFactor: 1.28 });
  });

  // 2027 Calendar Heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 22);
  doc.text("OFFICIAL 2027 UPCOMING EVENTS CALENDAR", 15, 108);

  // Event 1: Pokhara 2027
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 113, pageWidth - 30, 58, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text("STAGE 01  ·  APRIL 5 & 6, 2027  ·  REGISTRATION OPEN  ·  POKHARA, NEPAL", 22, 122);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14.5);
  doc.setTextColor(20, 20, 22);
  doc.text("HIMALAYAN ENDURO 2027 POKHARA", 22, 130.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 75, 82);
  const afterPokhara = drawWrappedText(
    doc,
    "Two action-packed days of technical ridge climbs, valley riverbeds, bamboo singletrack, and motocross jumps across Pokhara's Annapurna foothills. Features the official 2KM 55-corner stadium & mountain loop, Brand Expo boulevard, FMX freestyle ramp, Food & Lifestyle hub, and 10,000+ live hillside spectators.",
    22,
    137.5,
    pageWidth - 44,
    8.7,
    { lineHeightFactor: 1.38 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 36);
  drawWrappedText(
    doc,
    "Format: 2-Day Championship  |  Venue: Pokhara Championship Arena & Mountain Trail  |  Limited Rider Entry Slots",
    22,
    Math.max(afterPokhara + 2.5, 159),
    pageWidth - 44,
    7.8,
    { lineHeightFactor: 1.3 }
  );

  // Event 2: Everest 2027
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 177, pageWidth - 30, 52, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text("STAGE 02  ·  NOVEMBER 2027  ·  REGISTRATION OPEN  ·  EVEREST CORRIDOR, NEPAL", 22, 186);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14.5);
  doc.setTextColor(20, 20, 22);
  doc.text("HIMALAYAN ENDURO 2027 EVEREST", 22, 194.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 75, 82);
  const afterEverest = drawWrappedText(
    doc,
    "An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with GPS track files and stage maps to be confirmed ahead of race week — creating an unmatched international media storyline for Xtreme Energy Drink.",
    22,
    201.5,
    pageWidth - 44,
    8.7,
    { lineHeightFactor: 1.38 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 36);
  drawWrappedText(
    doc,
    "Format: High-Altitude Hard Enduro Expedition  |  Route GPS Track: To Be Confirmed Soon",
    22,
    Math.max(afterEverest + 2.5, 220),
    pageWidth - 44,
    7.8,
    { lineHeightFactor: 1.3 }
  );

  // Strategic Brand Fit Callout
  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 235, pageWidth - 30, 41, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  doc.setTextColor(240, 56, 69);
  doc.text("WHY XTREME ENERGY DRINK + HIMALAYAN MOTO ENDURO", 22, 244.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(218, 218, 225);
  drawWrappedText(
    doc,
    "Peak youth & adventure audience (18-35), extreme physical endurance creating natural demand for chilled energy drinks, proven 2026 podium brand equity, and year-round viral replay across 20M+ views on YouTube, Instagram, Facebook, and TikTok.",
    22,
    252.5,
    pageWidth - 44,
    8.6,
    { lineHeightFactor: 1.38 }
  );

  // =========================================================================
  // PAGE 3: ALL 8 CHAMPIONSHIP SECTIONS & FESTIVAL EXPERIENCES
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "02. COMPLETE CHAMPIONSHIP PROGRAM  ·  8 CORE EXPERIENCES",
    "EVENT SECTIONS & FESTIVAL EXPERIENCES",
    3,
    totalPages
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 88);
  const afterExpIntro = drawWrappedText(
    doc,
    "Himalayan Moto Enduro is engineered as a full-scale motorsport and youth lifestyle festival — combining eight distinct on-track and off-track arenas that keep spectators, riders, families, and digital creators engaged from opening gate drop through the closing afterparty.",
    15,
    37.5,
    pageWidth - 30,
    8.9,
    { lineHeightFactor: 1.38 }
  );

  const expStartY = Math.max(afterExpIntro + 4, 54);
  CHAMPIONSHIP_EXPERIENCES.forEach((exp, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = expStartY + row * 54;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 49, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.4);
    doc.setTextColor(214, 10, 25);
    doc.text(exp.category.toUpperCase(), x + 5, y + 8.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 22);
    doc.text(exp.title, x + 5, y + 15.5);

    doc.setDrawColor(235, 232, 226);
    doc.line(x + 5, y + 19, x + 83, y + 19);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 75, 82);
    drawWrappedText(doc, exp.desc, x + 5, y + 25.5, 78, 8.4, { lineHeightFactor: 1.36 });
  });

  // =========================================================================
  // PAGE 4: PROVEN PAST EDITIONS (MOTO ENDURO 2026 & MOTO ENDURO 2024)
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "03. PROVEN TRACK RECORD  ·  PAST CHAMPIONSHIP ARCHIVES",
    "MOTO ENDURO 2026 & 2024 HIGHLIGHTS",
    4,
    totalPages
  );

  // 2026 Edition Block
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 34, pageWidth - 30, 117, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(214, 10, 25);
  doc.text("RECENT EDITION  ·  POKHARA, NEPAL", 22, 43);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(20, 20, 22);
  doc.text("MOTO ENDURO 2026 — XTREME ENERGY DRINK PODIUM LEGACY", 22, 50.5);

  if (podium2026Img) {
    doc.setFillColor(16, 16, 18);
    doc.roundedRect(22, 55, 81, 54, 2.5, 2.5, "F");
    doc.addImage(podium2026Img.dataUrl, podium2026Img.format, 23, 56, 79, 52);
  }
  if (action2026Img) {
    doc.setFillColor(16, 16, 18);
    doc.roundedRect(107, 55, 81, 54, 2.5, 2.5, "F");
    doc.addImage(action2026Img.dataUrl, action2026Img.format, 108, 56, 79, 52);
  }

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  const after2026 = drawWrappedText(
    doc,
    "The 2026 Xtreme Moto Enduro Cross Championship in Pokhara delivered packed hillsides, overall & women's division podium champions lifting custom Xtreme Energy Drink sprocket trophies, thrilling riverbed water crossings, and technical forest root & log climbs.",
    22,
    116,
    pageWidth - 44,
    8.5,
    { lineHeightFactor: 1.36 }
  );

  doc.setFont("helvetica", "italic");
  doc.setTextColor(115, 115, 122);
  drawWrappedText(
    doc,
    "Above: 2026 Champion lifting the Xtreme Energy Drink Winner Trophy (left) and Rider #555 riverbed wheelie (right).",
    22,
    Math.max(after2026 + 2.5, 137),
    pageWidth - 44,
    7.6,
    { lineHeightFactor: 1.3 }
  );

  // 2024 Edition Block
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 158, pageWidth - 30, 117, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(214, 10, 25);
  doc.text("FOUNDATION EDITION  ·  APRIL 5 & 6, 2024  ·  POKHARA, NEPAL", 22, 167);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(20, 20, 22);
  doc.text("MOTO ENDURO 2024 — PROVEN COMMUNITY & SPECTATOR TURNOVER", 22, 174.5);

  if (arch2024Img) {
    doc.setFillColor(16, 16, 18);
    doc.roundedRect(22, 179, 81, 54, 2.5, 2.5, "F");
    doc.addImage(arch2024Img.dataUrl, arch2024Img.format, 23, 180, 79, 52);
  }
  if (parade2024Img) {
    doc.setFillColor(16, 16, 18);
    doc.roundedRect(107, 179, 81, 54, 2.5, 2.5, "F");
    doc.addImage(parade2024Img.dataUrl, parade2024Img.format, 108, 180, 79, 52);
  }

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  const after2024 = drawWrappedText(
    doc,
    "Held on April 5 & 6, 2024 in Pokhara alongside Pokhara Riders Club, Moto Enduro 2024 established Nepal's premier off-road benchmark — uniting riverbed boulder stages, escorted Pokhara city parades, international tourists, cultural stage welcomes, and dignitaries.",
    22,
    240,
    pageWidth - 44,
    8.5,
    { lineHeightFactor: 1.36 }
  );

  doc.setFont("helvetica", "italic");
  doc.setTextColor(115, 115, 122);
  drawWrappedText(
    doc,
    "Above: 2024 Championship Start/Finish Arch (left) and Pokhara City Street Rally Parade (right).",
    22,
    Math.max(after2024 + 2.5, 261),
    pageWidth - 44,
    7.6,
    { lineHeightFactor: 1.3 }
  );

  // =========================================================================
  // PAGE 5: OFFICIAL 2KM POKHARA CIRCUIT MAP & ALL 8 ARENA ZONES
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "04. OFFICIAL POKHARA CIRCUIT TELEMETRY & VENUE LAYOUT",
    "2KM CIRCUIT MAP & 8 ARENA ZONES",
    5,
    totalPages
  );

  // Bounded aspect-preserved map box
  doc.setFillColor(14, 14, 16);
  doc.roundedRect(15, 34, pageWidth - 30, 96, 3, 3, "F");
  if (mapImg) {
    const fit = fitImageContain(mapImg, 17, 36, pageWidth - 34, 92, "center");
    doc.addImage(mapImg.dataUrl, mapImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  // Telemetry Strip (compact, zero overflow)
  const specs = [
    { label: "Circuit Length", value: "2 KM Loop" },
    { label: "Total Corners", value: "55 Turns" },
    { label: "Swp / Med / Tight", value: "12 · 18 · 22" },
    { label: "Bike Rules", value: "250cc Class" }
  ];
  specs.forEach((s, idx) => {
    const x = 15 + idx * 45.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, 135, 43.5, 18.5, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.1);
    doc.setTextColor(115, 115, 122);
    doc.text(s.label, x + 3.5, 141.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 22);
    doc.text(s.value, x + 3.5, 149);
  });

  // 8 Arena Zones Grid (capacity on its own line -> ZERO overlap with zone name!)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 22);
  doc.text("OFFICIAL POKHARA ARENA ZONES & SURFACE MIX", 15, 162.5);

  TRACK_ZONES.slice(0, 8).forEach((zone, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 167 + row * 27.5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 25, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(20, 20, 22);
    doc.text(zone.name, x + 4, y + 6.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.3);
    doc.setTextColor(214, 10, 25);
    doc.text(zone.capacityOrLength, x + 4, y + 11.4);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 88);
    drawWrappedText(doc, zone.shortDesc, x + 4, y + 16.5, 80, 7.6, {
      lineHeightFactor: 1.28,
      maxLines: 2
    });
  });

  // =========================================================================
  // PAGE 6: XTREME ENERGY DRINK TITLE SPONSOR RIGHTS & ACTIVATION MAP
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "05. EXCLUSIVE TITLE SPONSORSHIP OWNERSHIP  ·  1 SLOT ONLY",
    "XTREME ENERGY DRINK TITLE DELIVERABLES",
    6,
    totalPages
  );

  // Title Lockup Banner (wrapped headline -> ZERO overflow!)
  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 34, pageWidth - 30, 36, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(240, 56, 69);
  doc.text('OFFICIAL "POWERED BY" NAMING RIGHTS & 100% CATEGORY EXCLUSIVITY', 22, 42.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  const afterLockup = drawWrappedText(
    doc,
    '"Pokhara Motocross Enduro Championship 2027 — Powered by Xtreme Energy Drink"',
    22,
    49.5,
    pageWidth - 44,
    11,
    { lineHeightFactor: 1.28 }
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(195, 195, 205);
  drawWrappedText(
    doc,
    "Exclusive energy drink & functional beverage lock — zero competing brands permitted across track, expo, or media.",
    22,
    Math.max(afterLockup + 1.5, 63),
    pageWidth - 44,
    8,
    { lineHeightFactor: 1.25 }
  );

  // 4 Title Deliverable Pillars (dynamic cursorY inside each card -> ZERO overflow!)
  XTREME_TITLE_PILLARS.forEach((pillar, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 75 + row * 65;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 61, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(214, 10, 25);
    doc.text(pillar.heading, x + 4.5, y + 8.5);

    doc.setDrawColor(235, 232, 226);
    doc.line(x + 4.5, y + 11.8, x + 83.5, y + 11.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(58, 58, 66);
    let cy = y + 17.5;
    pillar.items.forEach((item) => {
      cy =
        drawWrappedText(doc, `•  ${item}`, x + 4.5, cy, 79, 7.9, {
          lineHeightFactor: 1.28
        }) + 1.9;
    });
  });

  // Sponsorship Ecosystem Tier Context (Dynamic cursorY -> ZERO overlap!)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 208, pageWidth - 30, 68, 3.5, 3.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.2);
  doc.setTextColor(20, 20, 22);
  doc.text("CHAMPIONSHIP COMMERCIAL ECOSYSTEM (XTREME AT THE PINNACLE)", 21, 217.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  let ecoY = 225.5;
  COMMERCIAL_ECOSYSTEM_ITEMS.forEach((l) => {
    ecoY =
      drawWrappedText(doc, `•  ${l}`, 21, ecoY, pageWidth - 42, 8.1, {
        lineHeightFactor: 1.32
      }) + 2.4;
  });

  // =========================================================================
  // PAGE 7: DIGITAL CREATOR ECOSYSTEM (50+ INFLUENCERS) & MEDIA REACH
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "06. DIGITAL MEDIA & CREATOR AMPLIFICATION",
    "50+ INFLUENCERS & 20M+ PROVEN VIEWS",
    7,
    totalPages
  );

  // Reach Summary Card
  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 34, pageWidth - 30, 38, 4, 4, "F");

  const mediaStats = [
    { val: "50+", lbl: "Partner Vloggers & Creators" },
    { val: "2.5M–4M+", lbl: "Combined Creator Followers" },
    { val: "5M–10M+", lbl: "Projected 2027 Impressions" },
    { val: "20M+", lbl: "Proven Historical Views" }
  ];
  mediaStats.forEach((ms, idx) => {
    const x = 21 + idx * 42.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14.5);
    doc.setTextColor(idx === 3 ? 240 : 255, idx === 3 ? 56 : 255, idx === 3 ? 69 : 255);
    doc.text(ms.val, x, 49);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(185, 185, 195);
    drawWrappedText(doc, ms.lbl, x, 56, 39, 7.6, { lineHeightFactor: 1.3 });
  });

  // Featured Creator Roster (All 6 — separate lines for platforms & focus -> ZERO overflow!)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 22);
  doc.text("FEATURED CHAMPIONSHIP CREATORS & AMBASSADORS", 15, 82.5);

  INFLUENCERS.forEach((inf, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 87.5 + row * 43;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 39.5, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.8);
    doc.setTextColor(20, 20, 22);
    doc.text(inf.name, x + 5, y + 7.8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(214, 10, 25);
    doc.text(`${inf.role}  ·  ${inf.badge}`, x + 5, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.4);
    doc.setTextColor(110, 110, 118);
    doc.text(`Channels: ${inf.platforms.join(" · ")}`, x + 5, y + 18.2);
    doc.text(`Focus: ${inf.focus}`, x + 5, y + 22.8);

    doc.setFont("helvetica", "italic");
    doc.setTextColor(60, 60, 68);
    drawWrappedText(doc, `"${inf.quote}"`, x + 5, y + 28.5, 78, 7.8, {
      lineHeightFactor: 1.28,
      maxLines: 2
    });
  });

  // Xtreme Digital Integration Box (Dynamic cursorY -> ZERO overlap!)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 217, pageWidth - 30, 61, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(214, 10, 25);
  doc.text("XTREME ENERGY DRINK DIGITAL & CONTENT INTEGRATION", 22, 226);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(65, 65, 72);
  let digY = 233.5;
  XTREME_DIGITAL_DELIVERABLES.forEach((d) => {
    digY =
      drawWrappedText(doc, `•  ${d}`, 22, digY, pageWidth - 44, 8, {
        lineHeightFactor: 1.3
      }) + 1.8;
  });

  // =========================================================================
  // PAGE 8: FIM SAFETY GOVERNANCE & EXECUTIVE SECRETARIAT CONTACT
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "07. SAFETY GOVERNANCE & EXECUTIVE CONTACT SECRETARIAT",
    "FIM SAFETY STANDARDS & NEXT STEPS",
    8,
    totalPages
  );

  // All 6 FIM Safety Protocols (wrapped details + dynamic Y -> ZERO overflow!)
  SAFETY_PROTOCOLS.forEach((proto, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 34 + row * 46.5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 43, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.2);
    doc.setTextColor(214, 10, 25);
    doc.text(proto.badge.toUpperCase(), x + 5, y + 7.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.3);
    doc.setTextColor(20, 20, 22);
    doc.text(proto.title, x + 5, y + 13.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 75, 82);
    const afterDesc = drawWrappedText(doc, proto.description, x + 5, y + 19, 78, 7.8, {
      lineHeightFactor: 1.28,
      maxLines: 3
    });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(105, 105, 112);
    drawWrappedText(
      doc,
      proto.details.join(" · "),
      x + 5,
      Math.max(afterDesc + 1.5, y + 31.5),
      78,
      7.1,
      { lineHeightFactor: 1.26, maxLines: 2 }
    );
  });

  // Executive Commercial Closing Box (Zero prices, clean wrapped contact lines)
  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 178, pageWidth - 30, 99, 4, 4, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(15, 178, pageWidth - 30, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(240, 56, 69);
  doc.text("OFFICIAL ORGANIZING SECRETARIAT  ·  EXECUTIVE PARTNERSHIP DESK", 22, 191);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("PARTNER AS 2027 TITLE SPONSOR", 22, 201.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(208, 208, 218);
  const afterFinalNote = drawWrappedText(
    doc,
    "Commercial partnership terms, custom Xtreme Energy Drink arena branding blueprints, chilled distribution logistics, and multi-event Pokhara + Everest bundle options are finalized directly in an executive briefing with our organizing committee.",
    22,
    209.5,
    pageWidth - 44,
    8.8,
    { lineHeightFactor: 1.38 }
  );

  const contactDivY = Math.max(afterFinalNote + 3, 229);
  doc.setDrawColor(50, 50, 58);
  doc.line(22, contactDivY, pageWidth - 22, contactDivY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `${championship.organizer.contactPerson} — Race Director & Lead Organizer`,
    22,
    contactDivY + 8.5
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(210, 210, 218);
  let cy = contactDivY + 15.5;
  cy =
    drawWrappedText(
      doc,
      `${championship.organizer.name}  ·  ${championship.organizer.address}`,
      22,
      cy,
      pageWidth - 44,
      8.7
    ) + 1.8;
  cy =
    drawWrappedText(
      doc,
      `Direct Hotline / WhatsApp: ${championship.organizer.phoneDisplay}  |  Email: ${championship.organizer.email}`,
      22,
      cy,
      pageWidth - 44,
      8.7
    ) + 1.8;
  drawWrappedText(
    doc,
    "Official Website: www.sporthubnepal.com  |  Social: @sportshubnepal (Instagram · YouTube · Facebook · TikTok)",
    22,
    cy,
    pageWidth - 44,
    8.5
  );

  doc.save("Xtreme-Energy-Drink-Himalayan-Moto-Enduro-2027-Brochure.pdf");
}
