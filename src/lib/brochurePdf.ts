import { jsPDF } from "jspdf";
import { EVENT_CONFIG, SAFETY_PROTOCOLS } from "../data/eventConfig";
import {
  cropImageCover,
  drawWrappedText,
  fitImageContain,
  loadImageAsDataUrl
} from "./pdfHelpers";

export const GENERAL_DISCIPLINES = [
  {
    title: "Hard Enduro Boulder Matrix",
    desc: "Seti riverbed stones, wet creek crossings, forest root climbs, and tight bamboo switchbacks."
  },
  {
    title: "Motocross Cross Sprint Arena",
    desc: "High-speed banked berms, sand sections, rhythm tabletops, and mass-start gate drops."
  },
  {
    title: "Freestyle Stunt & Creator Zone",
    desc: "FMX aerial stunt showcases, live DJ festival hub, and 50+ moto vloggers capturing action."
  },
  {
    title: "Rider Competition Divisions",
    desc: "Pro Open, Expert, Novice, Veteran, and Women's Enduro classes with full scrutineering."
  }
];

export const GENERAL_TRACK_SECTORS = [
  "Flat & River Sections (Stones / Water): Low-speed trials balance across wet river rock.",
  "Bridge Section (Narrow / Technical): Precision line choice connecting north and south banks.",
  "Village Section (Hardpack): Medium-speed dirt corridor past primary spectator viewing zones.",
  "Enduro & Bamboo Sections (Forest / Roots / Sharp Turns): Technical singletrack climbs & hairpins.",
  "MX & Sand Sections (Jumps / Berms): Fast, physically demanding rhythm straight and banked turns.",
  "Corner Distribution: ~12 Long Sweepers · ~18 Medium Corners · ~22 Tight Hairpins / S-Bends."
];

export const GENERAL_PARTNER_SUMMARY = [
  "Title Sponsor (1 Slot): Exclusive 'Powered By' naming rights, category lock, largest logo & Brand Expo pavilion.",
  "Gold Sponsor (2 Slots): High-visibility on-track branding, race shout-outs, Creator Zone content & expo booth.",
  "Silver Sponsor (3 Slots): Event banners & standees, Food & Lifestyle Zone visibility, product display & press meet.",
  "Supporting Partner (10 Slots): Selected banner presence, social acknowledgment, sampling rights & passes.",
  "Vendor & Showcase Zones: EV Cars, Motorbikes & Gear Display Arena, Food Court & Retail Lifestyle Market."
];

function drawFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setDrawColor(214, 211, 204);
  doc.setLineWidth(0.3);
  doc.line(15, pageHeight - 13.5, pageWidth - 15, pageHeight - 13.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(115, 115, 120);
  doc.text(
    "Himalayan Moto Enduro 2027 · Adventure Sport Hub, Pokhara · www.sporthubnepal.com",
    15,
    pageHeight - 8.2
  );
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 15, pageHeight - 8.2, {
    align: "right"
  });
}

export async function downloadHimalayanBrochurePdf(): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const totalPages = 4;
  const { championship, previousAchievements } = EVENT_CONFIG;

  const [logoImg, rawHeroImg, mapImg] = await Promise.all([
    loadImageAsDataUrl("/assets/aistudio/MOTO_175fdec7.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png"),
    loadImageAsDataUrl("/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png")
  ]);

  const heroImg = await cropImageCover(rawHeroImg, 180, 96, 0.35);

  // =========================================================================
  // PAGE 1: COVER
  // =========================================================================
  doc.setFillColor(10, 10, 12);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 4.5, "F");

  if (logoImg) {
    const fit = fitImageContain(logoImg, 15, 9, 68, 36, "left");
    doc.addImage(logoImg.dataUrl, logoImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(240, 56, 69);
  doc.text("OFFICIAL EVENT BROCHURE · 2027 EDITION", pageWidth - 15, 22, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.2);
  doc.setTextColor(180, 180, 188);
  doc.text("POKHARA & EVEREST CORRIDOR, NEPAL", pageWidth - 15, 27.5, { align: "right" });

  if (heroImg) {
    doc.addImage(heroImg.dataUrl, heroImg.format, 15, 51, 180, 96);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(240, 56, 69);
  doc.text("POKHARA, NEPAL  ·  ADVENTURE SPORT HUB", 15, 160);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text("THE HIMALAYAN MOTO", 15, 173);
  doc.text("SERIES OF ADVENTURES", 15, 185);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(205, 205, 212);
  drawWrappedText(
    doc,
    "Nepal's premier off-road motorsport championship uniting hard enduro river boulders, high-speed motocross circuits, freestyle stunt shows, and Himalayan mountain singletrack across Pokhara and the Everest corridor.",
    15,
    196,
    pageWidth - 30,
    10,
    { lineHeightFactor: 1.4 }
  );

  doc.setDrawColor(45, 45, 52);
  doc.setLineWidth(0.4);
  doc.line(15, 228, pageWidth - 15, 228);

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
    doc.setFontSize(19);
    doc.setTextColor(idx === 2 ? 240 : 255, idx === 2 ? 56 : 255, idx === 2 ? 69 : 255);
    doc.text(m.value, x, 243);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(165, 165, 175);
    doc.text(m.label, x, 249.5);
  });

  doc.setDrawColor(45, 45, 52);
  doc.line(15, 268, pageWidth - 15, 268);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(185, 185, 192);
  doc.text(
    `${championship.organizer.name}  ·  ${championship.organizer.phoneDisplay}  ·  ${championship.organizer.email}  ·  www.sporthubnepal.com`,
    pageWidth / 2,
    279,
    { align: "center" }
  );

  // =========================================================================
  // PAGE 2: 2027 UPCOMING EVENTS & COMPETITION OVERVIEW
  // =========================================================================
  doc.addPage();
  doc.setFillColor(248, 247, 244);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(214, 10, 25);
  doc.text("01. 2027 CHAMPIONSHIP CALENDAR", 15, 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 22);
  doc.text("UPCOMING 2027 EVENTS", 15, 27);

  // Event 1 Card
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 34, pageWidth - 30, 58, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text("APRIL 5 & 6, 2027  ·  REGISTRATION OPEN  ·  POKHARA, NEPAL", 22, 43.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(20, 20, 22);
  doc.text("HIMALAYAN ENDURO 2027 POKHARA", 22, 52.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 88);
  const afterPokhara = drawWrappedText(
    doc,
    "Two action-packed days of technical ridge climbs, valley riverbeds, bamboo singletrack, and motocross jumps across Pokhara's Annapurna foothills. Built for national and international enduro riders with limited entry slots.",
    22,
    60,
    pageWidth - 44,
    9.1,
    { lineHeightFactor: 1.38 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(35, 35, 40);
  drawWrappedText(
    doc,
    "Format: 2-Day Championship  |  Elevation: 822m - 1,400m  |  Bike Spec: 250cc Class Rules",
    22,
    Math.max(afterPokhara + 3, 81),
    pageWidth - 44,
    8.2
  );

  // Event 2 Card
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 99, pageWidth - 30, 54, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(214, 10, 25);
  doc.text("NOVEMBER 2027  ·  REGISTRATION OPEN  ·  EVEREST CORRIDOR, NEPAL", 22, 108.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(20, 20, 22);
  doc.text("HIMALAYAN ENDURO 2027 EVEREST", 22, 117.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 88);
  const afterEverest = drawWrappedText(
    doc,
    "An all-new hard enduro expedition and championship stage heading into the Everest Himalayan corridor. Early rider entries are open now, with final GPS stage routes to be confirmed ahead of race week.",
    22,
    125,
    pageWidth - 44,
    9.1,
    { lineHeightFactor: 1.38 }
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(35, 35, 40);
  drawWrappedText(
    doc,
    "Format: High-Altitude Hard Enduro Expedition  |  Course Route: To Be Confirmed Soon",
    22,
    Math.max(afterEverest + 3, 143),
    pageWidth - 44,
    8.2
  );

  // Disciplines
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(214, 10, 25);
  doc.text("02. DISCIPLINES & RACE CLASSES", 15, 168);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17.5);
  doc.setTextColor(20, 20, 22);
  doc.text("EVENT EXPERIENCES & CATEGORIES", 15, 177);

  GENERAL_DISCIPLINES.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 185 + row * 43;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 38, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 22);
    doc.text(item.title, x + 5, y + 10);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 92);
    drawWrappedText(doc, item.desc, x + 5, y + 17.5, 78, 8.6, { lineHeightFactor: 1.36 });
  });

  drawFooter(doc, 2, totalPages);

  // =========================================================================
  // PAGE 3: OFFICIAL POKHARA 2KM CIRCUIT MAP
  // =========================================================================
  doc.addPage();
  doc.setFillColor(248, 247, 244);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(214, 10, 25);
  doc.text("03. OFFICIAL POKHARA CIRCUIT TELEMETRY", 15, 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 22);
  doc.text("POKHARA 2KM CIRCUIT MAP", 15, 27);

  // Bounded aspect-preserved map box
  doc.setFillColor(14, 14, 16);
  doc.roundedRect(15, 34, pageWidth - 30, 114, 3, 3, "F");
  if (mapImg) {
    const fit = fitImageContain(mapImg, 17, 36, pageWidth - 34, 110, "center");
    doc.addImage(mapImg.dataUrl, mapImg.format, fit.x, fit.y, fit.w, fit.h);
  }

  // Telemetry Spec Boxes
  const specY = 154;
  const specs = [
    { label: "Circuit Length", value: "2 KM Loop" },
    { label: "Total Corners", value: "55 Turns" },
    { label: "Bike Rules", value: "250cc Class" },
    { label: "Location", value: "Pokhara, Nepal" }
  ];

  specs.forEach((s, idx) => {
    const x = 15 + idx * 45.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, specY, 43.5, 22, 3, 3, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(115, 115, 122);
    doc.text(s.label, x + 4, specY + 7.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 22);
    doc.text(s.value, x + 4, specY + 16);
  });

  // Surface Mix Breakdown (dynamic cursorY -> ZERO overlap!)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 183, pageWidth - 30, 92, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 22);
  doc.text("TRACK SECTOR & SURFACE MIX BREAKDOWN", 22, 194);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 78);
  let secY = 203;
  GENERAL_TRACK_SECTORS.forEach((line) => {
    secY =
      drawWrappedText(doc, `•  ${line}`, 22, secY, pageWidth - 44, 8.7, {
        lineHeightFactor: 1.35
      }) + 2.5;
  });

  drawFooter(doc, 3, totalPages);

  // =========================================================================
  // PAGE 4: SAFETY STANDARDS, PARTNERSHIPS & OFFICIAL CONTACT
  // =========================================================================
  doc.addPage();
  doc.setFillColor(248, 247, 244);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(214, 10, 25);
  doc.rect(0, 0, pageWidth, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(214, 10, 25);
  doc.text("04. SAFETY PROTOCOLS & COMMERCIAL PARTNERSHIPS", 15, 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 22);
  doc.text("FIM STANDARDS & PARTNERSHIPS", 15, 27);

  // Safety Grid (6 items, generous card height -> ZERO clip!)
  SAFETY_PROTOCOLS.forEach((proto, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 15 + col * 92;
    const y = 33 + row * 32;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(x, y, 88, 29, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.2);
    doc.setTextColor(20, 20, 22);
    doc.text(proto.title, x + 4.5, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 92);
    drawWrappedText(doc, proto.description, x + 4.5, y + 14, 79, 7.9, {
      lineHeightFactor: 1.28,
      maxLines: 3
    });
  });

  // Sponsorship & Vendor Summary (Dynamic cursorY -> ZERO overlap!)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(225, 222, 215);
  doc.roundedRect(15, 132, pageWidth - 30, 77, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(214, 10, 25);
  doc.text("2027 SPONSORSHIP & VENDOR OPPORTUNITIES (PROPOSAL UPON REQUEST)", 22, 142);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(65, 65, 72);
  let pY = 150;
  GENERAL_PARTNER_SUMMARY.forEach((line) => {
    pY =
      drawWrappedText(doc, `•  ${line}`, 22, pY, pageWidth - 44, 8.2, {
        lineHeightFactor: 1.32
      }) + 2.2;
  });

  // Contact Secretariat Box
  doc.setFillColor(20, 20, 22);
  doc.roundedRect(15, 215, pageWidth - 30, 62, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(240, 56, 69);
  doc.text("OFFICIAL ORGANIZING SECRETARIAT", 22, 226);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text(championship.organizer.name.toUpperCase(), 22, 235.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(210, 210, 218);
  let cy = 244;
  cy = drawWrappedText(doc, `Race Director: ${championship.organizer.contactPerson}`, 22, cy, pageWidth - 44, 9) + 1.8;
  cy = drawWrappedText(doc, `Headquarters: ${championship.organizer.address}`, 22, cy, pageWidth - 44, 9) + 1.8;
  cy = drawWrappedText(doc, `Direct Hotline / WhatsApp: ${championship.organizer.phoneDisplay}`, 22, cy, pageWidth - 44, 9) + 1.8;
  drawWrappedText(
    doc,
    `Email: ${championship.organizer.email}  |  Website: www.sporthubnepal.com`,
    22,
    cy,
    pageWidth - 44,
    9
  );

  drawFooter(doc, 4, totalPages);

  doc.save("Himalayan-Moto-Enduro-2027-Brochure.pdf");
}
