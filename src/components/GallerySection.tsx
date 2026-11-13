import React, { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../data/eventConfig";
import { Play, Maximize2, Plus, Film, ChevronLeft, ChevronRight, X } from "lucide-react";
import { MotorsportGraphic } from "./MotorsportGraphic";
import { MotocrossPhoto } from "./MotocrossPhoto";

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [showAdminAddModal, setShowAdminAddModal] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);

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
    <section id="gallery" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Clean Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#D60A19] mb-1">
              Visual Archive <span aria-hidden="true">·</span> Championship Highlights
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none">
              CHAMPIONSHIP GALLERY
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 font-semibold text-xs px-5 py-2.5 bg-[#242426] hover:bg-zinc-900 text-white rounded-full transition-colors whitespace-nowrap"
            >
              <Film size={14} />
              <span>Watch Aftermovie</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdminAddModal(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 font-semibold text-xs px-4 py-2.5 bg-white hover:bg-stone-100 text-zinc-800 border border-stone-200 rounded-full transition-colors whitespace-nowrap"
              title="Add media photograph or YouTube link"
            >
              <Plus size={14} />
              <span>Add Media</span>
            </button>
          </div>
        </div>

        {/* Clean Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`cursor-pointer whitespace-nowrap shrink-0 px-4 py-2 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === cat
                  ? "bg-[#242426] text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-zinc-900 border border-stone-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean 4-Column Rounded Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => {
            const fallback = getFallbackType(item.category);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group text-left cursor-pointer focus-visible:outline-none flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 shadow-sm mb-2.5">
                  <MotocrossPhoto
                    src={item.customUrl || ""}
                    alt={item.title}
                    fallbackType={fallback}
                    aspectRatio="aspect-[4/3]"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 size={13} />
                  </div>
                </div>

                <div className="text-[11px] font-medium text-zinc-500">
                  {item.category} <span aria-hidden="true">·</span> {item.tag}
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 group-hover:text-[#D60A19] transition-colors mt-0.5 leading-snug">
                  {item.title}
                </h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-stone-200">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#D60A19]">
                  {currentLightboxItem.category}
                </span>
                <span className="text-stone-400" aria-hidden="true">·</span>
                <span className="text-zinc-500">
                  {currentLightboxItem.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="cursor-pointer p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
              <MotocrossPhoto
                src={currentLightboxItem.customUrl || ""}
                alt={currentLightboxItem.title}
                fallbackType={getFallbackType(currentLightboxItem.category)}
                className="w-full h-full object-contain"
              />

              <button
                type="button"
                onClick={handlePrev}
                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg transition-colors"
                aria-label="Previous photograph"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg transition-colors"
                aria-label="Next photograph"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-zinc-900 uppercase">
                  {currentLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                  {currentLightboxItem.caption}
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-500 whitespace-nowrap tabular-nums">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Aftermovie Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl p-6 shadow-2xl text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div>
                <span className="text-xs font-semibold text-[#D60A19]">
                  Official Highlight Reel
                </span>
                <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                  Extreme Moto Enduro Cross Championship
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="cursor-pointer p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-zinc-950 rounded-2xl overflow-hidden flex flex-col justify-between p-6 text-white">
              <MotorsportGraphic type="hero-jump" className="absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-semibold text-white bg-[#D60A19] px-3 py-1 rounded-full">
                  Aftermovie Reel
                </span>
                <span className="text-zinc-300">
                  Pokhara Arena <span aria-hidden="true">·</span> 4K 60FPS
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <Play size={26} className="translate-x-0.5" />
                </div>
                <p className="font-heading font-black text-xl uppercase text-white mt-4 tracking-wide">
                  Championship Cinematic Aftermovie
                </p>
                <p className="text-xs text-zinc-300 max-w-md mt-1">
                  High-speed drone footage, helmet cameras, and audio recordings from the 80+ bike starting grid.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-zinc-300 pt-3 border-t border-white/15">
                <span>Organized by Adventure Sport Hub</span>
                <span>sportshubnepal.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {showAdminAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setShowAdminAddModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
              <div>
                <span className="text-xs font-semibold text-[#D60A19]">
                  Organizer Media Archive
                </span>
                <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                  Add Championship Photograph
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminAddModal(false)}
                className="cursor-pointer p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCustomMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Podium Champagne Celebration"
                  className="w-full bg-[#F5F4F0] border border-stone-200 rounded-xl p-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#D60A19]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GalleryItem["category"])}
                  className="w-full bg-[#F5F4F0] border border-stone-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#D60A19]"
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
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-[#F5F4F0] border border-stone-200 rounded-xl p-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#D60A19]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Describe the moment and location on track..."
                  className="w-full bg-[#F5F4F0] border border-stone-200 rounded-xl p-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#D60A19]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAdminAddModal(false)}
                  className="cursor-pointer px-4 py-2 text-xs text-zinc-600 hover:text-zinc-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer font-semibold text-xs px-5 py-2.5 bg-[#242426] hover:bg-zinc-900 text-white rounded-full"
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
