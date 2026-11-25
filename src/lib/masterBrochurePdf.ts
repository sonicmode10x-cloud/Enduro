import { jsPDF } from "jspdf";
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
  COMMERCIAL_ECOSYSTEM_ITEMS,
  ENTRY_PORTALS,
  GALLERY_SHOWCASE_PHOTOS,
  GENERAL_DIGITAL_DELIVERABLES,
  STRICT_TRACK_RULE,
  SURFACE_MIX_SUMMARY,
  XTREME_DIGITAL_DELIVERABLES,
  XTREME_TITLE_PILLARS
} from "../data/brochureData";
import {
  cropImageCover,
  drawWrappedText,
  fitImageContain,
  loadImageAsDataUrl
} from "./pdfHelpers";

export type MasterPdfEdition = "xtreme" | "general";

function drawPageChrome(
  doc: jsPDF,
  eyebrow: string,
  title: string,
  pageNum: number,
  totalPages: number,
  edition: MasterPdfEdition
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(248, 247, 244);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(214, 10, 25);
  doc.text(eyebrow, 15, 15.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17.5);
  doc.setTextColor(20, 20, 22);
  doc.text(title, 15, 23.5);

  doc.setDrawColor(225, 222, 215);
  doc.setLineWidth(0.3);
  doc.line(15, 28, pageWidth - 15, 28);

  doc.setDrawColor(214, 211, 204);
  doc.line(15, pageHeight - 13.5, pageWidth - 15, pageHeight - 13.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(115, 115, 120);
  const footerText =
    edition === "xtreme"
      ? "Himalayan Moto Enduro 2027 · Xtreme Energy Drink Title Proposal · www.sporthubnepal.com"
      : "Himalayan Moto Enduro 2027 · Official General Event & Sponsorship Proposal · www.sporthubnepal.com";
  doc.text(footerText, 15, pageHeight - 8.2);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 15, pageHeight - 8.2, {
    align: "right"
  });
}

export async function generateMasterBrochurePdf(edition: MasterPdfEdition): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const totalPages = 10;
  const isXtreme = edition === "xtreme";
  const { championship, previousAchievements } = EVENT_CONFIG;

  // Load core + archive + gallery images in parallel
  const [
    logoImg,
    rawHeroImg,
    partnerStripImg,
    mapImg,
    rawArchive26,
    rawArchive24,
    rawGallery
  ] = await Promise.all([
    loadImageAsDataUrl("/assets/aistudio/MOTO_175fdec7.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Master_Proposal_b6a698c1.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"),
    Promise.all(ARCHIVE_2026_PHOTOS.map((p) => loadImageAsDataUrl(p.src))),
    Promise.all(ARCHIVE_2024_PHOTOS.map((p) => loadImageAsDataUrl(p.src))),
    Promise.all(GALLERY_SHOWCASE_PHOTOS.map((p) => loadImageAsDataUrl(p.src)))
  ]);

  // Aspect-preserving cover crops for every photo frame
  const [heroImg, archive26Imgs, archive24Imgs, galleryImgs] = await Promise.all([
    cropImageCover(rawHeroImg, 180, 80, 0.32),
    Promise.all(
      rawArchive26.map((img, i) =>
        cropImageCover(img, 39.5, 32, ARCHIVE_2026_PHOTOS[i]?.focalY ?? 0.25)
      )
    ),
    Promise.all(
      rawArchive24.map((img, i) =>
        cropImageCover(img, 39.5, 32, ARCHIVE_2024_PHOTOS[i]?.focalY ?? 0.25)
      )
    ),
    Promise.all(
      rawGallery.map((img, i) =>
        cropImageCover(img, 86, 46, GALLERY_SHOWCASE_PHOTOS[i]?.focalY ?? 0.25)
      )
    )
  ]);

  // =========================================================================
  // PAGE 1: EXECUTIVE COVER + OFFICIAL PARTNER STRIP + BENCHMARKS
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
  doc.text(
    isXtreme
      ? "COMPLETE CHAMPIONSHIP & TITLE PROPOSAL"
      : "OFFICIAL EVENT & SPONSORSHIP PROPOSAL",
    pageWidth - 15,
    21,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(185, 185, 195);
  doc.text(
    isXtreme
      ? "PREPARED EXCLUSIVELY FOR XTREME ENERGY DRINK · 2027"
      : "10-PAGE MASTER EDITION · POKHARA & EVEREST, NEPAL",
    pageWidth - 15,
    26.5,
    { align: "right" }
  );

  if (heroImg) {
    doc.addImage(heroImg.dataUrl, heroImg.format, 15, 47, 180, 80);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  doc.setTextColor(240, 56, 69);
  doc.text("THE HIMALAYAN MOTO SERIES OF ADVENTURES  ·  POKHARA & EVEREST, NEPAL", 15, 138);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("EXTREME MOTO ENDURO CROSS", 15, 149);
  doc.text("CHAMPIONSHIP 2027", 15, 159);

  doc.setFillColor(214, 10, 25);
  doc.roundedRect(15, 165, pageWidth - 30, 14, 2.5, 2.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(
    isXtreme
      ? "POWERED BY XTREME ENERGY DRINK"
      : "OFFICIAL CHAMPIONSHIP & COMMERCIAL PROSPECTUS",
    pageWidth / 2,
    174.2,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(205, 205, 214);
  drawWrappedText(
    doc,
    isXtreme
      ? "Complete 10-page master proposal uniting every detail of Himalayan Moto Enduro 2027 — Pokhara & Everest stages, all 8 motorsport & festival experiences, 2026 & 2024 archives, 2KM circuit map, 8 track sectors, 8 arena zones, official gallery, 50+ creators, FIM safety standards, and exclusive Title Sponsor deliverables for Xtreme Energy Drink."
      : "Complete 10-page master brochure & sponsorship proposal covering every section of Himalayan Moto Enduro 2027 — Pokhara & Everest calendar, all 8 event experiences, 2026 & 2024 archives, 2KM circuit map, 8 track sectors, 8 arena zones, photo gallery, sponsorship & vendor tiers, 50+ creators, and FIM safety standards.",
    15,
    188,
    pageWidth - 30,
    8.8,
    { lineHeightFactor: 1.38 }
  );

  doc.setDrawColor(45, 45, 52);
  doc.setLineWidth(0.4);
  doc.line(15, 216, pageWidth - 15, 216);

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
    doc.text(m.value, x, 228);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(170, 170, 180);
    doc.text(m.label, x, 234);
  });

  if (partnerStripImg) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 243, pageWidth - 30, 23, 2.5, 2.5, "F");
    const fit = fitImageContain(partnerStripImg, 21, 245.5, pageWidth - 42, 18, "center");
    doc.addImage(partnerStripImg.dataUrl, partnerStripImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(185, 185, 195);
  doc.text(
    `Hosted by ${championship.organizer.name}  ·  ${championship.organizer.phoneDisplay}  ·  ${championship.organizer.email}  ·  www.sporthubnepal.com`,
    pageWidth / 2,
    279,
    { align: "center" }
  );

  // =========================================================================
  // PAGE 2: INFORMATION, QUICK FACTS & OFFICIAL 2027 CALENDAR
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "01. CHAMPIONSHIP INFORMATION & 2027 CALENDAR",
    "ABOUT HIMALAYAN MOTO ENDURO",
    2,
    totalPages,
    edition
  );

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 33, pageWidth - 30, 64, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 22);
  doc.text("NEPAL'S ULTIMATE OFF-ROAD MOTORSPORT FESTIVAL", 22, 42.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  const afterAbout = drawWrappedText(
    doc,
    "Welcome to Nepal's premier off-road motorsport festival in Pokhara, hosted by Adventure Sport Hub under FIM-grade safety governance. Combining hard enduro trails, motocross jumps, freestyle stunt shows, live music, and international racing culture beneath the Annapurna and Everest Himalayas, the 2027 season expands into a landmark two-stage championship series.",
    22,
    49.5,
    pageWidth - 44,
    8.7,
    { lineHeightFactor: 1.38 }
  );

  const factsDividerY = Math.max(afterAbout + 2, 72);
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 22);
  doc.text("OFFICIAL 2027 UPCOMING EVENTS CALENDAR", 15, 107);

  // Stage 01: Pokhara
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 112, pageWidth - 30, 58, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text("STAGE 01  ·  APRIL 5 & 6, 2027  ·  REGISTRATION OPEN  ·  POKHARA, NEPAL", 22, 121);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14.5);
  doc.setTextColor(20, 20, 22);
  doc.text("HIMALAYAN ENDURO 2027 POKHARA", 22, 129.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 75, 82);
  const afterPokhara = drawWrappedText(
    doc,
    "Two action-packed days of technical ridge climbs, valley riverbeds, bamboo singletrack, and motocross jumps across Pokhara's Annapurna foothills. Features the official 2KM 55-corner stadium & mountain loop, Brand Expo boulevard, FMX freestyle ramp, Food & Lifestyle hub, and 10,000+ live hillside spectators.",
    22,
    136.5,
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
    Math.max(afterPokhara + 2.5, 158),
    pageWidth - 44,
    7.8,
    { lineHeightFactor: 1.3 }
  );

  // Stage 02: Everest
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 176, pageWidth - 30, 52, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text("STAGE 02  ·  NOVEMBER 2027  ·  REGISTRATION OPEN  ·  EVEREST CORRIDOR, NEPAL", 22, 185);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14.5);
  doc.setTextColor(20, 20, 22);
  doc.text("HIMALAYAN ENDURO 2027 EVEREST", 22, 193.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 75, 82);
  const afterEverest = drawWrappedText(
    doc,
    isXtreme
      ? "An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with GPS track files and stage maps to be confirmed ahead of race week — creating an unmatched international media storyline for Xtreme Energy Drink."
      : "An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with final GPS track files and stage maps to be confirmed ahead of race week.",
    22,
    200.5,
    pageWidth - 44,
    8.7,
    { lineHeightFactor: 1.38 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 36);
  drawWrappedText(
    doc,
    "Format: High-Altitude Hard Enduro Expedition  |  Course Route GPS Track: To Be Confirmed Soon",
    22,
    Math.max(afterEverest + 2.5, 219),
    pageWidth - 44,
    7.8,
    { lineHeightFactor: 1.3 }
  );

  // Bottom Highlight Callout
  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 234, pageWidth - 30, 42, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.6);
  doc.setTextColor(240, 56, 69);
  doc.text(
    isXtreme
      ? "WHY XTREME ENERGY DRINK + HIMALAYAN MOTO ENDURO"
      : "OFFICIAL SANCTIONING, TOURISM & AUDIENCE VALUE",
    22,
    243.5
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(218, 218, 225);
  drawWrappedText(
    doc,
    isXtreme
      ? "Peak youth & adventure audience (18-35), extreme physical endurance creating natural demand for chilled energy drinks, proven 2026 podium brand equity, and year-round viral replay across 20M+ views on YouTube, Instagram, Facebook, and TikTok."
      : "Backed by Adventure Sport Hub, Pokhara Riders Club, local tourism & municipal authorities, and FIM-aligned safety protocols — uniting 80+ national & international racers, 10,000+ live spectators, and 20M+ proven digital views.",
    22,
    251.5,
    pageWidth - 44,
    8.5,
    { lineHeightFactor: 1.38 }
  );

  // =========================================================================
  // PAGE 3: ALL 8 CHAMPIONSHIP SECTIONS & FESTIVAL EXPERIENCES (WITH HIGHLIGHTS)
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "02. COMPLETE CHAMPIONSHIP PROGRAM  ·  8 CORE DISCIPLINES",
    "CHAMPIONSHIP SECTIONS & EXPERIENCES",
    3,
    totalPages,
    edition
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 88);
  const afterExpIntro = drawWrappedText(
    doc,
    "Eight core motorsport disciplines and festival experiences across Pokhara Arena — engaging riders, families, motorsport fans, and digital creators from opening gate drop through the closing afterparty.",
    15,
    36,
    pageWidth - 30,
    8.6,
    { lineHeightFactor: 1.35 }
  );

  const expStartY = Math.max(afterExpIntro + 3.5, 49);
  CHAMPIONSHIP_EXPERIENCES.forEach((exp, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = expStartY + row * 57;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 53.5, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(214, 10, 25);
    doc.text(`${exp.category.toUpperCase()}  ·  ${exp.tagline.toUpperCase()}`, x + 4.5, y + 7.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    doc.setTextColor(20, 20, 22);
    doc.text(exp.title, x + 4.5, y + 13.8);

    doc.setDrawColor(235, 232, 226);
    doc.line(x + 4.5, y + 16.8, x + 83.5, y + 16.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 75, 82);
    const afterDesc = drawWrappedText(doc, exp.desc, x + 4.5, y + 22, 79, 7.8, {
      lineHeightFactor: 1.28,
      maxLines: 3
    });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(95, 95, 102);
    let hy = Math.max(afterDesc + 1.2, y + 34.5);
    exp.highlights.forEach((hl) => {
      hy = drawWrappedText(doc, `• ${hl}`, x + 4.5, hy, 79, 7.1, {
        lineHeightFactor: 1.24,
        maxLines: 1
      }) + 0.8;
    });
  });

  // =========================================================================
  // PAGE 4: PROVEN PAST EDITIONS (MOTO ENDURO 2026 & MOTO ENDURO 2024)
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "03. PROVEN TRACK RECORD  ·  PAST CHAMPIONSHIP ARCHIVES",
    "MOTO ENDURO 2026 & 2024 ARCHIVES",
    4,
    totalPages,
    edition
  );

  // 2026 Edition Block (4 photos row)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 33, pageWidth - 30, 118, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(214, 10, 25);
  doc.text("RECENT EDITION  ·  POKHARA, NEPAL", 21, 41.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.2);
  doc.setTextColor(20, 20, 22);
  doc.text(
    isXtreme
      ? "MOTO ENDURO 2026 — XTREME ENERGY DRINK PODIUM LEGACY"
      : "MOTO ENDURO 2026 — PODIUM CHAMPIONS & FOREST STAGES",
    21,
    49
  );

  ARCHIVE_2026_PHOTOS.forEach((p, idx) => {
    const px = 21 + idx * 42.5;
    const img = archive26Imgs[idx];
    doc.setFillColor(16, 16, 18);
    doc.roundedRect(px, 53.5, 40.5, 33, 2, 2, "F");
    if (img) {
      doc.addImage(img.dataUrl, img.format, px + 0.5, 54, 39.5, 32);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.6);
    doc.setTextColor(80, 80, 88);
    doc.text(p.caption, px, 91);
  });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  const after26Text = drawWrappedText(
    doc,
    "Highlights from the Extreme Moto Enduro Cross Championship 2026 in Pokhara — featuring overall & #444 podium champions lifting custom Xtreme Energy Drink sprocket trophies, Women's Division podium winners, Rider #555 riverbed water crossing wheelies, GasGas wooded singletrack (#151), hillside dirt jumps (#795, #70), and steep forest log & root climbs lined with cheering spectators.",
    21,
    98.5,
    pageWidth - 42,
    8.3,
    { lineHeightFactor: 1.36 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(214, 10, 25);
  drawWrappedText(
    doc,
    "Key Proof: Men's Overall & Women's Divisions  ·  Custom Sprocket Trophies  ·  Packed Riverbed & Forest Corridors",
    21,
    Math.max(after26Text + 2, 141),
    pageWidth - 42,
    7.6
  );

  // 2024 Edition Block (4 photos row)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 158, pageWidth - 30, 118, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.setTextColor(214, 10, 25);
  doc.text("FOUNDATION EDITION  ·  APRIL 5 & 6, 2024  ·  POKHARA, NEPAL", 21, 166.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.2);
  doc.setTextColor(20, 20, 22);
  doc.text("MOTO ENDURO 2024 — PROVEN COMMUNITY & SPECTATOR TURNOVER", 21, 174);

  ARCHIVE_2024_PHOTOS.forEach((p, idx) => {
    const px = 21 + idx * 42.5;
    const img = archive24Imgs[idx];
    doc.setFillColor(16, 16, 18);
    doc.roundedRect(px, 178.5, 40.5, 33, 2, 2, "F");
    if (img) {
      doc.addImage(img.dataUrl, img.format, px + 0.5, 179, 39.5, 32);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.6);
    doc.setTextColor(80, 80, 88);
    doc.text(p.caption, px, 216);
  });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  const after24Text = drawWrappedText(
    doc,
    "Held on April 5 & 6, 2024 in Pokhara alongside Pokhara Riders Club, Moto Enduro 2024 established Nepal's off-road motorsport benchmark — uniting riverbed boulder stages (#16, #555, #911, #01), escorted Pokhara city street rally parades (#07, #333), Team Rad Rides paddock prep, traditional cultural welcome dances, international tourist turnout, trackside emcees, and official dignitary trophy ceremonies.",
    21,
    223.5,
    pageWidth - 42,
    8.3,
    { lineHeightFactor: 1.36 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(214, 10, 25);
  drawWrappedText(
    doc,
    "Key Proof: April 5 & 6 Heritage  ·  Pokhara Street Parade  ·  Cultural Stage & International Spectators",
    21,
    Math.max(after24Text + 2, 266),
    pageWidth - 42,
    7.6
  );

  // =========================================================================
  // PAGE 5: OFFICIAL 2KM POKHARA CIRCUIT MAP, SURFACE MIX & 8 ARENA ZONES
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "04. OFFICIAL POKHARA CIRCUIT BLUEPRINT & VENUE LAYOUT",
    "2KM CIRCUIT MAP & 8 ARENA ZONES",
    5,
    totalPages,
    edition
  );

  doc.setFillColor(14, 14, 16);
  doc.roundedRect(15, 33, pageWidth - 30, 86, 3, 3, "F");
  if (mapImg) {
    const fit = fitImageContain(mapImg, 17, 35, pageWidth - 34, 82, "center");
    doc.addImage(mapImg.dataUrl, mapImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  // Telemetry Strip
  const specs = [
    { label: "Circuit Length", value: "2.0 KM Loop" },
    { label: "Total Corners", value: "55 Corners" },
    { label: "Swp / Med / Tight", value: "12 · 18 · 22" },
    { label: "Bike / Terrains", value: "250cc · 4 Mix" }
  ];
  specs.forEach((s, idx) => {
    const x = 15 + idx * 45.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, 123, 43.5, 17.5, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(115, 115, 122);
    doc.text(s.label, x + 3.5, 129);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 22);
    doc.text(s.value, x + 3.5, 136.5);
  });

  // 4-Terrain Surface Mix Bar
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 144, pageWidth - 30, 17, 2.5, 2.5, "FD");
  SURFACE_MIX_SUMMARY.forEach((sm, idx) => {
    const x = 19 + idx * 43.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(214, 10, 25);
    doc.text(sm.terrain, x, 150.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.9);
    doc.setTextColor(70, 70, 78);
    doc.text(sm.pace, x, 156);
  });

  // 8 Arena Zones Grid
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 22);
  doc.text("OFFICIAL POKHARA ARENA ZONES & HOSPITALITY FOOTPRINT", 15, 169);

  TRACK_ZONES.slice(0, 8).forEach((zone, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 173 + row * 26.5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 24, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.6);
    doc.setTextColor(20, 20, 22);
    doc.text(zone.name, x + 4, y + 6.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.1);
    doc.setTextColor(214, 10, 25);
    doc.text(`${zone.capacityOrLength}  ·  ${zone.difficulty || "Arena"}`, x + 4, y + 10.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 88);
    drawWrappedText(doc, zone.shortDesc, x + 4, y + 15.8, 80, 7.4, {
      lineHeightFactor: 1.26,
      maxLines: 2
    });
  });

  // =========================================================================
  // PAGE 6: COMPLETE 8-SECTOR TECHNICAL TRACK BREAKDOWN (FROM TRACKARENAMAP)
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "05. SECTOR-BY-SECTOR TRACK TELEMETRY  ·  8 KEY SEGMENTS",
    "TECHNICAL TRACK SECTORS & OBSTACLES",
    6,
    totalPages,
    edition
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 88);
  const afterSecIntro = drawWrappedText(
    doc,
    "Every lap of the 2.0 KM Pokhara Championship Circuit tests riders across eight distinct technical sectors combining wet river rock, narrow gorge bridges, hardpack village sweepers, forest root staircases, bamboo chicanes, 25m MX tabletops, and deep silt sand.",
    15,
    35.5,
    pageWidth - 30,
    8.5,
    { lineHeightFactor: 1.34 }
  );

  const secStartY = Math.max(afterSecIntro + 3, 49);
  CIRCUIT_SECTORS.forEach((sec, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = secStartY + row * 57;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 53.5, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(214, 10, 25);
    doc.text(`${sec.difficulty.toUpperCase()}  ·  ${sec.pace.toUpperCase()}`, x + 4.5, y + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 22);
    doc.text(sec.name, x + 4.5, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.1);
    doc.setTextColor(105, 105, 112);
    doc.text(`Surface: ${sec.surface}`, x + 4.5, y + 17.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 78);
    const afterSecDesc = drawWrappedText(doc, sec.description, x + 4.5, y + 23, 79, 7.6, {
      lineHeightFactor: 1.25,
      maxLines: 3
    });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 36);
    const afterObs = drawWrappedText(
      doc,
      `Obstacles: ${sec.features.join(" · ")}`,
      x + 4.5,
      Math.max(afterSecDesc + 1, y + 35.5),
      79,
      7,
      { lineHeightFactor: 1.22, maxLines: 2 }
    );

    doc.setFont("helvetica", "italic");
    doc.setTextColor(110, 110, 118);
    drawWrappedText(
      doc,
      `Vantage: ${sec.viewingTip}`,
      x + 4.5,
      Math.max(afterObs + 0.8, y + 43.5),
      79,
      6.9,
      { lineHeightFactor: 1.2, maxLines: 2 }
    );
  });

  // =========================================================================
  // PAGE 7: OFFICIAL CHAMPIONSHIP PHOTO GALLERY (ALL 8 HOMEPAGE PHOTOS)
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "06. OFFICIAL EVENT MOMENTS  ·  POKHARA, NEPAL",
    "CHAMPIONSHIP PHOTO GALLERY",
    7,
    totalPages,
    edition
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 88);
  drawWrappedText(
    doc,
    "Authentic race-day photography from Pokhara showcasing podium celebrations, riverbed wheelies, forest root climbs, packed trackside crowds, paddock teams, and the Himalayan riders crew.",
    15,
    35.5,
    pageWidth - 30,
    8.6,
    { lineHeightFactor: 1.35 }
  );

  GALLERY_SHOWCASE_PHOTOS.forEach((photo, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 49 + row * 57.5;
    const img = galleryImgs[idx];

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 54, 3, 3, "FD");

    doc.setFillColor(16, 16, 18);
    doc.roundedRect(x + 1, y + 1, 86, 45, 2, 2, "F");
    if (img) {
      doc.addImage(img.dataUrl, img.format, x + 1, y + 1, 86, 45);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(35, 35, 40);
    doc.text(photo.caption, x + 4, y + 51.2);
  });

  // =========================================================================
  // PAGE 8: COMMERCIAL SPONSORSHIP & VENDOR OPPORTUNITIES (ZERO PRICES!)
  // =========================================================================
  doc.addPage();
  if (isXtreme) {
    drawPageChrome(
      doc,
      "07. EXCLUSIVE TITLE SPONSORSHIP OWNERSHIP  ·  1 SLOT ONLY",
      "XTREME ENERGY DRINK TITLE DELIVERABLES",
      8,
      totalPages,
      edition
    );

    // Title Lockup Banner
    doc.setFillColor(18, 18, 20);
    doc.roundedRect(15, 33, pageWidth - 30, 36, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(240, 56, 69);
    doc.text('OFFICIAL "POWERED BY" NAMING RIGHTS & 100% CATEGORY EXCLUSIVITY', 22, 41.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    const afterLockup = drawWrappedText(
      doc,
      '"Pokhara Motocross Enduro Championship 2027 — Powered by Xtreme Energy Drink"',
      22,
      48.5,
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
      Math.max(afterLockup + 1.5, 62),
      pageWidth - 44,
      8,
      { lineHeightFactor: 1.25 }
    );

    // 4 Title Deliverable Pillars
    XTREME_TITLE_PILLARS.forEach((pillar, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 15 + col * 92;
      const y = 74 + row * 65;

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

    // Commercial Ecosystem Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(15, 207, pageWidth - 30, 69, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 22);
    doc.text("CHAMPIONSHIP COMMERCIAL ECOSYSTEM (XTREME AT THE PINNACLE)", 21, 216.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 78);
    let ecoY = 224.5;
    COMMERCIAL_ECOSYSTEM_ITEMS.forEach((l) => {
      ecoY =
        drawWrappedText(doc, `•  ${l}`, 21, ecoY, pageWidth - 42, 8.1, {
          lineHeightFactor: 1.32
        }) + 2.4;
    });
  } else {
    drawPageChrome(
      doc,
      "07. COMMERCIAL PARTNERSHIPS & VENDOR MARKETPLACE",
      "SPONSORSHIP TIERS & VENDOR ZONES",
      8,
      totalPages,
      edition
    );

    // 4 Sponsorship Tiers Grid (Price-Free)
    SPONSOR_PACKAGES.forEach((pkg, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 15 + col * 92;
      const y = 33 + row * 68;

      const isTitle = idx === 0;
      doc.setFillColor(isTitle ? 18 : 255, isTitle ? 18 : 255, isTitle ? 20 : 255);
      doc.setDrawColor(isTitle ? 18 : 225, isTitle ? 18 : 222, isTitle ? 20 : 215);
      doc.roundedRect(x, y, 88, 64, 3.5, 3.5, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.2);
      doc.setTextColor(isTitle ? 240 : 214, isTitle ? 56 : 10, isTitle ? 69 : 25);
      doc.text(`${pkg.badge.toUpperCase()}  ·  PROPOSAL UPON REQUEST`, x + 4.5, y + 7.5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(isTitle ? 255 : 20, isTitle ? 255 : 20, isTitle ? 255 : 22);
      doc.text(pkg.tier, x + 4.5, y + 14);

      doc.setDrawColor(isTitle ? 55 : 235, isTitle ? 55 : 232, isTitle ? 62 : 226);
      doc.line(x + 4.5, y + 17, x + 83.5, y + 17);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(isTitle ? 215 : 65, isTitle ? 215 : 65, isTitle ? 222 : 72);
      let cy = y + 22;
      pkg.keyHighlights.slice(0, 4).forEach((hl) => {
        cy =
          drawWrappedText(doc, `•  ${hl}`, x + 4.5, cy, 79, 7.4, {
            lineHeightFactor: 1.24,
            maxLines: 2
          }) + 1.5;
      });
    });

    // Vendor & Product Showcase Marketplace (4 Opportunities)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.8);
    doc.setTextColor(20, 20, 22);
    doc.text("VENDOR & PRODUCT SHOWCASE MARKETPLACE ZONES", 15, 173);

    VENDOR_OPPORTUNITIES.forEach((v, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 15 + col * 92;
      const y = 178 + row * 50;

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(225, 222, 215);
      doc.roundedRect(x, y, 88, 46, 3, 3, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(214, 10, 25);
      doc.text(`${v.category.toUpperCase()}  ·  ${v.footfallTarget.toUpperCase()}`, x + 4.5, y + 7);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(20, 20, 22);
      doc.text(v.title, x + 4.5, y + 13);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 75, 82);
      const afterVDesc = drawWrappedText(doc, v.description, x + 4.5, y + 18.5, 79, 7.5, {
        lineHeightFactor: 1.25,
        maxLines: 2
      });

      doc.setFont("helvetica", "bold");
      doc.setTextColor(95, 95, 102);
      drawWrappedText(
        doc,
        `Spaces: ${v.stallSizes}  ·  Ideal for: ${v.suitableFor}`,
        x + 4.5,
        Math.max(afterVDesc + 1.5, y + 31.5),
        79,
        7,
        { lineHeightFactor: 1.24, maxLines: 2 }
      );
    });
  }

  // =========================================================================
  // PAGE 9: DIGITAL CREATOR ECOSYSTEM (50+ INFLUENCERS) & MEDIA REACH
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "08. DIGITAL MEDIA & CREATOR AMPLIFICATION",
    "50+ INFLUENCERS & 20M+ PROVEN VIEWS",
    9,
    totalPages,
    edition
  );

  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 33, pageWidth - 30, 38, 4, 4, "F");

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
    doc.text(ms.val, x, 48);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(185, 185, 195);
    drawWrappedText(doc, ms.lbl, x, 55, 39, 7.6, { lineHeightFactor: 1.3 });
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 22);
  doc.text("FEATURED CHAMPIONSHIP CREATORS & AMBASSADORS", 15, 81.5);

  INFLUENCERS.forEach((inf, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 86.5 + row * 42.5;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 39, 3.5, 3.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.8);
    doc.setTextColor(20, 20, 22);
    doc.text(inf.name, x + 5, y + 7.6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(214, 10, 25);
    doc.text(`${inf.role}  ·  ${inf.badge}`, x + 5, y + 12.8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.4);
    doc.setTextColor(110, 110, 118);
    doc.text(`Channels: ${inf.platforms.join(" · ")}`, x + 5, y + 18);
    doc.text(`Focus: ${inf.focus}`, x + 5, y + 22.5);

    doc.setFont("helvetica", "italic");
    doc.setTextColor(60, 60, 68);
    drawWrappedText(doc, `"${inf.quote}"`, x + 5, y + 28.2, 78, 7.7, {
      lineHeightFactor: 1.26,
      maxLines: 2
    });
  });

  // Digital Integration Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 217, pageWidth - 30, 61, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(214, 10, 25);
  doc.text(
    isXtreme
      ? "XTREME ENERGY DRINK DIGITAL & CONTENT INTEGRATION"
      : "CHAMPIONSHIP DIGITAL COVERAGE & CREATOR DELIVERABLES",
    22,
    226
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(65, 65, 72);
  let digY = 233.5;
  const digitalItems = isXtreme ? XTREME_DIGITAL_DELIVERABLES : GENERAL_DIGITAL_DELIVERABLES;
  digitalItems.forEach((d) => {
    digY =
      drawWrappedText(doc, `•  ${d}`, 22, digY, pageWidth - 44, 8, {
        lineHeightFactor: 1.3
      }) + 1.8;
  });

  // =========================================================================
  // PAGE 10: FIM SAFETY PROTOCOLS, ENTRY PORTALS & SECRETARIAT CONTACT
  // =========================================================================
  doc.addPage();
  drawPageChrome(
    doc,
    "09. SAFETY GOVERNANCE, ENTRY PORTALS & SECRETARIAT",
    "FIM SAFETY STANDARDS & CONTACT",
    10,
    totalPages,
    edition
  );

  // All 6 FIM Safety Protocols
  SAFETY_PROTOCOLS.forEach((proto, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 32.5 + row * 38;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 35, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.9);
    doc.setTextColor(214, 10, 25);
    doc.text(proto.badge.toUpperCase(), x + 4.5, y + 6.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(20, 20, 22);
    doc.text(proto.title, x + 4.5, y + 12);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 75, 82);
    const afterDesc = drawWrappedText(doc, proto.description, x + 4.5, y + 16.8, 79, 7.3, {
      lineHeightFactor: 1.24,
      maxLines: 2
    });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(105, 105, 112);
    drawWrappedText(
      doc,
      proto.details.join(" · "),
      x + 4.5,
      Math.max(afterDesc + 1, y + 25.5),
      79,
      6.8,
      { lineHeightFactor: 1.22, maxLines: 2 }
    );
  });

  // Strict Track Rule Notice
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(214, 10, 25);
  doc.roundedRect(15, 148, pageWidth - 30, 15, 2.5, 2.5, "FD");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 46);
  drawWrappedText(doc, STRICT_TRACK_RULE, 20, 154, pageWidth - 40, 7.4, {
    lineHeightFactor: 1.28
  });

  // Official Entry & Partnership Portals (4 boxes)
  ENTRY_PORTALS.forEach((portal, idx) => {
    const x = 15 + idx * 45.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, 167, 43.5, 29, 2.5, 2.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.6);
    doc.setTextColor(214, 10, 25);
    doc.text(portal.tag.toUpperCase(), x + 3, 173);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(20, 20, 22);
    doc.text(portal.title, x + 3, 178.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 88);
    drawWrappedText(doc, portal.desc, x + 3, 183.5, 37.5, 6.8, {
      lineHeightFactor: 1.22,
      maxLines: 3
    });
  });

  // Executive Secretariat Contact Box
  doc.setFillColor(18, 18, 20);
  doc.roundedRect(15, 200, pageWidth - 30, 78, 4, 4, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(15, 200, pageWidth - 30, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(240, 56, 69);
  doc.text(
    isXtreme
      ? "OFFICIAL ORGANIZING SECRETARIAT  ·  EXECUTIVE PARTNERSHIP DESK"
      : "OFFICIAL ORGANIZING SECRETARIAT  ·  POKHARA, NEPAL",
    22,
    212
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    isXtreme ? "PARTNER AS 2027 TITLE SPONSOR" : "CONNECT WITH ADVENTURE SPORT HUB",
    22,
    221.5
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(208, 208, 218);
  const afterCloseNote = drawWrappedText(
    doc,
    isXtreme
      ? "Commercial partnership terms, custom Xtreme Energy Drink arena branding blueprints, chilled distribution logistics, and multi-event Pokhara + Everest bundle options are finalized directly with our organizing committee."
      : "Inquire directly for 2027 rider entries, sponsorship packages, vendor showcase spaces, or official press & creator passes across Pokhara and Everest.",
    22,
    228.5,
    pageWidth - 44,
    8.3,
    { lineHeightFactor: 1.32 }
  );

  const divY = Math.max(afterCloseNote + 2.5, 242);
  doc.setDrawColor(50, 50, 58);
  doc.line(22, divY, pageWidth - 22, divY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `${championship.organizer.contactPerson} — Race Director & Lead Organizer`,
    22,
    divY + 7.5
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(210, 210, 218);
  let cy = divY + 13.5;
  cy =
    drawWrappedText(
      doc,
      `${championship.organizer.name}  ·  ${championship.organizer.address}`,
      22,
      cy,
      pageWidth - 44,
      8.3
    ) + 1.4;
  cy =
    drawWrappedText(
      doc,
      `Direct Hotline / WhatsApp: ${championship.organizer.phoneDisplay}  |  Email: ${championship.organizer.email}`,
      22,
      cy,
      pageWidth - 44,
      8.3
    ) + 1.4;
  drawWrappedText(
    doc,
    "Official Website: www.sporthubnepal.com  |  Social: @sportshubnepal (Instagram · YouTube · Facebook · TikTok)",
    22,
    cy,
    pageWidth - 44,
    8.1
  );

  doc.save(
    isXtreme
      ? "Xtreme-Energy-Drink-Himalayan-Moto-Enduro-2027-Proposal.pdf"
      : "Himalayan-Moto-Enduro-2027-Complete-Proposal.pdf"
  );
}
