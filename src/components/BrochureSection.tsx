import React, { useState } from "react";
import {
  Download,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Map,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers
} from "lucide-react";
import { downloadHimalayanBrochurePdf } from "../lib/brochurePdf";
import { downloadXtremeTitleSponsorBrochurePdf } from "../lib/xtremeBrochurePdf";
import { FormTab } from "./RegistrationModal";
import {
  BrochureEdition,
  BrochurePageSheet,
  GENERAL_PAGE_LABELS,
  XTREME_PAGE_LABELS
} from "./BrochureViewer";

interface BrochureSectionProps {
  onNavigateProposal?: () => void;
  onOpenRegisterModal?: (defaultTab?: FormTab, eventName?: string) => void;
}

export const BrochureSection: React.FC<BrochureSectionProps> = ({
  onNavigateProposal,
  onOpenRegisterModal
}) => {
  const [activeEdition, setActiveEdition] = useState<BrochureEdition>("xtreme");
  const [viewMode, setViewMode] = useState<"single" | "all">("single");
  const [activePage, setActivePage] = useState<number>(1);

  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadedPdf, setDownloadedPdf] = useState(false);
  const [downloadingXtremePdf, setDownloadingXtremePdf] = useState(false);
  const [downloadedXtremePdf, setDownloadedXtremePdf] = useState(false);
  const [downloadingMap, setDownloadingMap] = useState(false);

  const pageLabels =
    activeEdition === "xtreme" ? XTREME_PAGE_LABELS : GENERAL_PAGE_LABELS;
  const totalPages = pageLabels.length;

  const handleSelectEdition = (edition: BrochureEdition) => {
    setActiveEdition(edition);
    setActivePage(1);
  };

  const handleDownloadBrochure = async () => {
    if (downloadingPdf) return;
    setDownloadingPdf(true);
    setDownloadedPdf(false);
    try {
      await downloadHimalayanBrochurePdf();
      setDownloadedPdf(true);
      window.setTimeout(() => setDownloadedPdf(false), 3500);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadXtremeBrochure = async () => {
    if (downloadingXtremePdf) return;
    setDownloadingXtremePdf(true);
    setDownloadedXtremePdf(false);
    try {
      await downloadXtremeTitleSponsorBrochurePdf();
      setDownloadedXtremePdf(true);
      window.setTimeout(() => setDownloadedXtremePdf(false), 3500);
    } finally {
      setDownloadingXtremePdf(false);
    }
  };

  const handleDownloadMap = async () => {
    if (downloadingMap) return;
    setDownloadingMap(true);
    try {
      const response = await fetch(
        "/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Himalayan-Moto-Enduro-Pokhara-2KM-Circuit-Map.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingMap(false);
    }
  };

  const isDownloadingActive =
    activeEdition === "xtreme" ? downloadingXtremePdf : downloadingPdf;
  const isDownloadedActive =
    activeEdition === "xtreme" ? downloadedXtremePdf : downloadedPdf;

  return (
    <section id="brochure" className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-5 sm:p-8 lg:p-10 space-y-6">
          {/* Header & Edition Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#D60A19] mb-1">
                03. Official Brochures <span aria-hidden="true">·</span> Read Online or Download PDF
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
                {activeEdition === "xtreme"
                  ? "XTREME ENERGY DRINK TITLE BROCHURE"
                  : "HIMALAYAN MOTO ENDURO BROCHURE"}
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mt-2.5">
                {activeEdition === "xtreme"
                  ? "Browse every page of the complete 8-page Himalayan Moto Enduro 2027 master dossier prepared exclusively for Xtreme Energy Drink right here, or download the print-ready PDF."
                  : "Browse all 4 pages of the general Himalayan Moto Enduro 2027 event brochure covering Pokhara, Everest, the 2KM circuit map, and FIM safety standards."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={
                  activeEdition === "xtreme"
                    ? handleDownloadXtremeBrochure
                    : handleDownloadBrochure
                }
                disabled={isDownloadingActive}
                className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#D60A19] hover:bg-[#b80815] disabled:opacity-70 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                {isDownloadingActive ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Preparing PDF...</span>
                  </>
                ) : isDownloadedActive ? (
                  <>
                    <CheckCircle2 size={15} />
                    <span>Brochure Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>
                      {activeEdition === "xtreme"
                        ? "Download Xtreme PDF (8 Pages)"
                        : "Download General PDF (4 Pages)"}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadMap}
                disabled={downloadingMap}
                className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-[#F5F4F0] hover:bg-stone-200/80 text-zinc-900 font-semibold text-xs px-4 py-3 rounded-full border border-stone-200 transition-colors whitespace-nowrap shrink-0"
              >
                <Map size={14} className="text-[#D60A19]" />
                <span>{downloadingMap ? "Downloading..." : "2KM Map"}</span>
              </button>
            </div>
          </div>

          {/* Interactive Reader Toolbar: Edition Switcher + View Mode */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Edition Switcher */}
            <div className="inline-flex items-center gap-1 p-1 bg-[#F2F0EB] rounded-xl self-start">
              <button
                type="button"
                onClick={() => handleSelectEdition("xtreme")}
                className={`cursor-pointer px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeEdition === "xtreme"
                    ? "bg-[#121214] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Xtreme Energy Drink (8 Pages)
              </button>
              <button
                type="button"
                onClick={() => handleSelectEdition("general")}
                className={`cursor-pointer px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeEdition === "general"
                    ? "bg-[#121214] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                General Event Brochure (4 Pages)
              </button>
            </div>

            {/* Single Page vs All Pages Toggle */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="inline-flex items-center gap-1 p-1 bg-[#F2F0EB] rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("single")}
                  className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    viewMode === "single"
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <BookOpen size={13} />
                  <span>Single Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("all")}
                  className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    viewMode === "all"
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <Layers size={13} />
                  <span>View All Pages</span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Jump Bar (Single Page Mode) */}
          {viewMode === "single" && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {pageLabels.map((p) => (
                  <button
                    key={p.page}
                    type="button"
                    onClick={() => setActivePage(p.page)}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      activePage === p.page
                        ? "bg-[#D60A19] text-white"
                        : "bg-[#F5F4F0] text-zinc-700 hover:bg-stone-200/80"
                    }`}
                  >
                    {p.short}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                  disabled={activePage === 1}
                  aria-label="Previous brochure page"
                  className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-40 text-zinc-800 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-semibold text-zinc-700 tabular-nums min-w-[74px] text-center">
                  Page {activePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={activePage === totalPages}
                  aria-label="Next brochure page"
                  className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-40 text-zinc-800 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ON-PAGE VISIBLE BROCHURE CANVAS */}
          <div className="bg-[#EAE8E3] rounded-2xl p-3 sm:p-5 lg:p-6 border border-stone-200/90">
            {viewMode === "single" ? (
              <div className="max-w-4xl mx-auto space-y-4">
                <BrochurePageSheet edition={activeEdition} pageNumber={activePage} />

                {/* Bottom Prev / Next Pagination Controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                    disabled={activePage === 1}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 disabled:opacity-40 border border-stone-200 text-xs font-semibold text-zinc-800 transition-colors whitespace-nowrap"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous Page</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("all")}
                    className="cursor-pointer text-xs font-semibold text-zinc-700 hover:text-[#D60A19] transition-colors whitespace-nowrap"
                  >
                    Expand All {totalPages} Pages
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={activePage === totalPages}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 disabled:opacity-40 border border-stone-200 text-xs font-semibold text-zinc-800 transition-colors whitespace-nowrap"
                  >
                    <span>Next Page</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {pageLabels.map((p) => (
                  <BrochurePageSheet
                    key={`${activeEdition}-page-${p.page}`}
                    edition={activeEdition}
                    pageNumber={p.page}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Secondary Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadXtremeBrochure}
                disabled={downloadingXtremePdf}
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-[#D60A19] hover:text-[#a80814] transition-colors whitespace-nowrap"
              >
                <Download size={13} />
                <span>Download Xtreme Energy Drink PDF</span>
              </button>
              <span aria-hidden="true" className="text-stone-300">
                ·
              </span>
              <button
                type="button"
                onClick={handleDownloadBrochure}
                disabled={downloadingPdf}
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors whitespace-nowrap"
              >
                <Download size={13} />
                <span>Download General Brochure PDF</span>
              </button>
            </div>

            {onOpenRegisterModal ? (
              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal("sponsor", "Xtreme Energy Drink — Title Sponsor 2027")
                }
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-[#D60A19] transition-colors whitespace-nowrap"
              >
                <span>Schedule Executive Review</span>
                <ArrowRight size={13} />
              </button>
            ) : onNavigateProposal ? (
              <button
                type="button"
                onClick={onNavigateProposal}
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-[#D60A19] transition-colors whitespace-nowrap"
              >
                <span>Sponsorship Proposals</span>
                <ArrowRight size={13} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
