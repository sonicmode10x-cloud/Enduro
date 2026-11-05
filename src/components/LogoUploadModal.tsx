import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { X, Upload, RotateCcw, Check, Sparkles, Sliders, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { useBrandLogo, PlateStyle } from "../context/LogoContext";

export const LogoUploadModal: React.FC = () => {
  const {
    logoConfig,
    uploadLogo,
    setPlateStyle,
    setZoom,
    resetLogo,
    isUploadModalOpen,
    closeUploadModal
  } = useBrandLogo();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [tempUrl, setTempUrl] = useState<string | null>(null);
  const [selectedPlateStyle, setSelectedPlateStyle] = useState<PlateStyle>(logoConfig.plateStyle);
  const [tempZoom, setTempZoom] = useState<number>(logoConfig.zoom);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isUploadModalOpen) {
      setTempUrl(null);
      setSelectedPlateStyle(logoConfig.plateStyle);
      setTempZoom(logoConfig.zoom);
      setErrorMessage(null);
      setSuccessNotice(false);
    }
  }, [isUploadModalOpen, logoConfig]);

  if (!isUploadModalOpen) return null;

  const handleFile = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, SVG, JPG, WEBP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage("File is too large. Please select an image under 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setTempUrl(result);
      setFileName(file.name);
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read the image file. Please try another image.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (tempUrl) {
      uploadLogo(tempUrl, selectedPlateStyle);
    } else {
      setPlateStyle(selectedPlateStyle);
    }
    setZoom(tempZoom);
    setSuccessNotice(true);
    setTimeout(() => {
      closeUploadModal();
    }, 700);
  };

  const handleResetToDefault = () => {
    resetLogo();
    setTempUrl(null);
    setFileName(null);
    setSelectedPlateStyle("white");
    setTempZoom(100);
    setSuccessNotice(true);
    setTimeout(() => {
      closeUploadModal();
    }, 700);
  };

  const currentPreviewUrl = tempUrl || logoConfig.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeUploadModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#09090c] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden z-10 text-zinc-100 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-5 bg-[#E10600] -skew-x-12 inline-block" />
            <h3 className="font-heading font-black text-lg tracking-wider text-white uppercase">
              Upload Championship Logo
            </h3>
          </div>
          <button
            type="button"
            onClick={closeUploadModal}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Live Preview on Motorsport Navigation Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#E10600]" />
                Live Navigation Bar Preview
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Real-time simulation</span>
            </div>

            <div className="bg-[#050507] border border-zinc-800 rounded p-4 relative shadow-inner">
              <div className="flex items-center justify-between">
                {/* Logo Badge Preview */}
                <div
                  className={`px-3 py-1.5 rounded-[2px] transition-all flex items-center justify-center ${
                    selectedPlateStyle === "white"
                      ? "bg-white border-l-4 border-l-[#E10600] shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                      : selectedPlateStyle === "dark"
                      ? "bg-zinc-900 border border-zinc-700/80 border-l-4 border-l-[#E10600]"
                      : "bg-transparent"
                  }`}
                >
                  <div className="h-[36px] px-1 flex items-center justify-center relative">
                    <img
                      src={currentPreviewUrl}
                      alt="Logo preview"
                      style={{
                        transform: `scale(${tempZoom / 100})`,
                        transition: "transform 0.15s ease-out"
                      }}
                      className="h-full w-auto max-w-[170px] object-contain select-none pointer-events-none"
                    />
                  </div>
                </div>

                {/* Dummy nav buttons in preview */}
                <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  <span>HOME</span>
                  <span>RACE MAP</span>
                  <span>GALLERY</span>
                  <div className="bg-[#E10600] text-white text-[9px] font-bold px-2.5 py-1 rounded-[2px]">
                    REGISTER →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag & Drop File Upload Area */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              Select or Drop Image File
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-[#E10600] bg-red-950/20"
                  : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 hover:bg-zinc-900/40"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/svg+xml,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileInputChange}
              />

              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white">
                  <Upload size={22} className="text-[#E10600]" />
                </div>
                <div className="text-sm font-semibold text-zinc-200">
                  {fileName ? (
                    <span className="text-emerald-400 font-mono">Selected: {fileName}</span>
                  ) : (
                    <span>Drag and drop your logo file here, or browse</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-1 inline-flex items-center gap-1.5 bg-[#E10600] hover:bg-[#b80500] text-white text-xs font-heading font-extrabold uppercase px-4 py-2 rounded-[2px] shadow-md transition-all cursor-pointer"
                >
                  <Upload size={13} />
                  <span>Choose Image File</span>
                </button>
                <p className="text-xs text-zinc-500 mt-1">
                  Supports PNG, SVG, JPG, WebP (Transparent PNG recommended)
                </p>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-400 font-mono mt-2">{errorMessage}</p>
            )}
          </div>

          {/* Badge Background Style Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              Logo Plate Background Style
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedPlateStyle("white")}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  selectedPlateStyle === "white"
                    ? "border-[#E10600] bg-zinc-900 ring-1 ring-[#E10600]"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                }`}
              >
                <div className="w-full h-4 bg-white rounded-xs mb-2 border border-zinc-300" />
                <div className="text-xs font-bold text-white uppercase">White Plate</div>
                <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                  Best for black & dark text logos
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlateStyle("dark")}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  selectedPlateStyle === "dark"
                    ? "border-[#E10600] bg-zinc-900 ring-1 ring-[#E10600]"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                }`}
              >
                <div className="w-full h-4 bg-zinc-800 rounded-xs mb-2 border border-zinc-700" />
                <div className="text-xs font-bold text-white uppercase">Carbon Plate</div>
                <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                  Subtle frame for light logos
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlateStyle("transparent")}
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  selectedPlateStyle === "transparent"
                    ? "border-[#E10600] bg-zinc-900 ring-1 ring-[#E10600]"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                }`}
              >
                <div className="w-full h-4 bg-transparent border border-dashed border-zinc-700 rounded-xs mb-2" />
                <div className="text-xs font-bold text-white uppercase">Transparent</div>
                <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                  No plate / frameless
                </div>
              </button>
            </div>
          </div>

          {/* Size / Zoom Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Sliders size={13} className="text-zinc-400" />
                Logo Size / Scaling
              </label>
              <span className="text-xs font-mono text-zinc-400">{tempZoom}%</span>
            </div>
            <input
              type="range"
              min={70}
              max={220}
              step={5}
              value={tempZoom}
              onChange={(e) => setTempZoom(Number(e.target.value))}
              className="w-full accent-[#E10600] bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
              <span>Compact (70%)</span>
              <span>Normal (100%)</span>
              <span>Large (220%)</span>
            </div>
          </div>

          {successNotice && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-600/60 rounded flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <Check size={16} />
              <span>Championship logo updated successfully!</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset to Official 2026/2027 Logo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeUploadModal}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-[#E10600] hover:bg-[#b80500] text-white font-heading font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-[2px] transition-all shadow-lg shadow-red-950/40 active:translate-y-0.5 cursor-pointer"
            >
              <Check size={14} />
              <span>Apply & Save Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
