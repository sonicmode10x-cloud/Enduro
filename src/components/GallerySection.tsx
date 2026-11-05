import React, { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../data/eventConfig";
import { Play, Maximize2, Plus, Film, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { MotorsportGraphic } from "./MotorsportGraphic";
import { MotocrossPhoto } from "./MotocrossPhoto";

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [showAdminAddModal, setShowAdminAddModal] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

  // New media form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryItem["category"]>("Racing Action");
  const [newCaption, setNewCaption] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const categories = [
    "All",
    "Racing Action",
    "Championship Highlights",
    "Riders",
    "Spectators",
    "Awards & Winners",
    "Influencers & Creators",
    "Behind the Scenes"
  ];

  const filteredItems = selectedCategory === "All"
    ? galleryList
    : galleryList.filter((item) => item.category === selectedCategory);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  const handleAddCustomMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: GalleryItem = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      aspect: "landscape",
      caption: newCaption || "Championship visual archive entry.",
      tag: "Community Archive",
      gradientColors: "from-red-950 via-zinc-900 to-black",
      customUrl: newUrl.trim() || undefined
    };

    setGalleryList([newItem, ...galleryList]);
    setShowAdminAddModal(false);
    setNewTitle("");
    setNewCaption("");
    setNewUrl("");
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const getFallbackType = (category: string): "hero-jump" | "rock-matrix" | "pokhara-himalayas" | "stunt-whip" | "paddock" | "crowd" => {
    switch (category) {
      case "Racing Action":
        return "hero-jump";
      case "Spectators":
        return "crowd";
      case "Behind the Scenes":
        return "paddock";
      case "Championship Highlights":
        return "stunt-whip";
      case "Awards & Winners":
        return "hero-jump";
      default:
        return "rock-matrix";
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0d0d10] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-3">
              <span>VISUAL ARCHIVE</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">CHAMPIONSHIP HIGHLIGHTS</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] text-balance">
              PREVIOUS CHAMPIONSHIP GALLERY
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 font-heading font-bold uppercase text-xs px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 clip-slanted transition-colors"
            >
              <Film size={14} className="text-[#E50920]" />
              <span>WATCH AFTERMOVIE REEL</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdminAddModal(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 font-heading font-bold uppercase text-xs px-3 py-2.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-zinc-700"
              title="Add media photograph or YouTube link"
            >
              <Plus size={14} />
              <span>Add Media</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`cursor-pointer whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none transition-colors border ${
                selectedCategory === cat
                  ? "bg-[#E50920] text-white border-[#E50920]"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => {
            const fallback = getFallbackType(item.category);
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative cursor-pointer overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] flex flex-col justify-end transition-all hover:border-[#E50920] hover:shadow-xl hover:shadow-red-950/20"
              >
                {/* Background visual with resilient loading & SVG fallback */}
                <MotocrossPhoto
                  src={item.customUrl || ""}
                  alt={item.title}
                  fallbackType={fallback}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Card Content */}
                <div className="relative z-10 p-4">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    <span className="text-[#E50920] font-bold">{item.category}</span>
                    <span>{item.tag}</span>
                  </div>
                  <h3 className="font-heading font-black text-lg text-white uppercase leading-snug group-hover:text-zinc-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-zinc-300 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.caption}
                  </p>
                </div>

                {/* Expand / View Icon */}
                <div className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-sm border border-zinc-700/80 text-zinc-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#09090b] border border-zinc-700 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0d0d10]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase text-[#E50920]">
                  {currentLightboxItem.category}
                </span>
                <span className="text-zinc-600" aria-hidden="true">·</span>
                <span className="text-xs text-zinc-400 font-mono">
                  {currentLightboxItem.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Area */}
            <div className="relative aspect-[16/9] w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
              <MotocrossPhoto
                src={currentLightboxItem.customUrl || ""}
                alt={currentLightboxItem.title}
                fallbackType={getFallbackType(currentLightboxItem.category)}
                className="w-full h-full object-contain"
              />

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-[#E50920] text-white border border-zinc-700 transition-colors"
                aria-label="Previous photograph"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-[#E50920] text-white border border-zinc-700 transition-colors"
                aria-label="Next photograph"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption & Metadata */}
            <div className="p-6 bg-[#0d0d10] border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-white uppercase">
                  {currentLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                  {currentLightboxItem.caption}
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Aftermovie Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0d0d10] border border-zinc-700 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#E50920] font-bold">
                  Official Highlight Reel
                </span>
                <h3 className="font-heading font-black text-2xl uppercase text-white">
                  Extreme Moto Enduro Cross Championship
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Interactive Video Player Simulator */}
            <div className="relative aspect-[16/9] w-full bg-black border border-zinc-800 rounded overflow-hidden flex flex-col justify-between p-6">
              <MotorsportGraphic type="hero-jump" className="absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white bg-red-600 px-2 py-0.5">
                  LIVE TELEMETRY REEL
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  Pokhara Arena · 4K 60FPS
                </span>
              </div>

              {/* Play Button Simulation */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E50920] text-white flex items-center justify-center shadow-2xl shadow-red-950 hover:scale-110 transition-transform cursor-pointer">
                  <Play size={28} className="translate-x-0.5" />
                </div>
                <p className="font-heading font-black text-xl uppercase text-white mt-4 tracking-wide">
                  Championship Cinematic Aftermovie
                </p>
                <p className="text-xs text-zinc-300 max-w-md mt-1">
                  High-speed drone footage, helmet cameras, and audio recordings from the roaring 80+ bike starting grid.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-700/60">
                <span>Organized by Adventure Sport Hub</span>
                <span>sportshubnepal.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Administrative Modal */}
      {showAdminAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setShowAdminAddModal(false)}
        >
          <div
            className="bg-[#0f0f12] border border-zinc-700 max-w-lg w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
              <div>
                <span className="text-xs font-mono text-[#E50920] uppercase font-bold">
                  Organizer Dashboard Tool
                </span>
                <h3 className="font-heading font-black text-2xl uppercase text-white">
                  Add Championship Photograph / Media
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminAddModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCustomMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Podium Champagne Celebration"
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GalleryItem["category"])}
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                >
                  <option value="Racing Action">Racing Action</option>
                  <option value="Championship Highlights">Championship Highlights</option>
                  <option value="Riders">Riders</option>
                  <option value="Spectators">Spectators</option>
                  <option value="Awards & Winners">Awards & Winners</option>
                  <option value="Influencers & Creators">Influencers & Creators</option>
                  <option value="Behind the Scenes">Behind the Scenes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Image or Thumbnail URL (Optional)
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Leave blank to use the championship high-contrast motorsport graphic engine.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Describe the moment and location on track..."
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAdminAddModal(false)}
                  className="cursor-pointer px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer font-heading font-bold uppercase text-xs px-5 py-2.5 bg-[#E50920] hover:bg-red-700 text-white clip-slanted"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
