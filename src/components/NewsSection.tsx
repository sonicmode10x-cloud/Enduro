import React, { useState } from "react";
import { NEWS_ARTICLES, NewsArticle } from "../data/eventConfig";
import { Newspaper, ArrowRight, Calendar, User, Clock, CheckCircle } from "lucide-react";
import { MotocrossPhoto } from "./MotocrossPhoto";

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <section id="news" className="py-24 bg-[#0d0d10] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-3">
              <span>PRESS & DISPATCHES</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">OFFICIAL BULLETINS</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] text-balance">
              MEDIA, NEWS & UPDATES
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Stay informed with official press releases, rider category guidelines, venue announcements, and commercial updates.
          </p>
        </div>

        {/* 4-Card Article Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_ARTICLES.map((article) => {
            return (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-[#09090b] border border-zinc-800 p-6 flex flex-col justify-between transition-all hover:border-[#E50920] hover:bg-zinc-900/80 shadow-md overflow-hidden"
              >
                <div>
                  {/* Article Motocross Photo Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 -mx-6 -mt-6 mb-4 border-b border-zinc-800">
                    <MotocrossPhoto
                      src={article.photoUrl}
                      alt={article.title}
                      fallbackType="hero-jump"
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 mb-3">
                    <span className="text-[#E50920] font-bold">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl uppercase text-white leading-tight mb-3 group-hover:text-[#E50920] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">{article.date}</span>
                  <span className="text-[#E50920] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-[#0f0f12] border border-zinc-700 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#E50920] font-bold">
                  {selectedArticle.category} · {selectedArticle.date}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white mt-1 leading-tight">
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
                  <span className="flex items-center gap-1">
                    <User size={13} />
                    <span>{selectedArticle.author}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    <span>{selectedArticle.readTime}</span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Featured Photo */}
            {selectedArticle.photoUrl && (
              <div className="relative aspect-[16/9] w-full rounded overflow-hidden border border-zinc-800 mb-6 bg-zinc-950">
                <MotocrossPhoto
                  src={selectedArticle.photoUrl}
                  alt={selectedArticle.title}
                  fallbackType="hero-jump"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4 mb-8">
              <p className="text-base text-zinc-200 font-medium">
                {selectedArticle.summary}
              </p>
              <p>
                The organizing committee from Adventure Sport Hub Pokhara continues to finalize track geometries, logistics agreements, and regional government approvals for the upcoming Extreme Moto Enduro Cross Championship 2027.
              </p>
              <p>
                As Nepal’s premier off-road motorsport festival, this edition introduces advanced transponder tracking, expanded grandstands, and increased international athlete invitations alongside Nepal’s most formidable hill climbers and motocross experts.
              </p>
              <div className="p-4 bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <strong className="text-white block mb-1">Official Organizing Contact:</strong>
                For direct press inquiries, interview requests with Race Director Jagat Dhauli, or high-resolution photo releases, contact <span className="text-[#E50920] font-mono">motoenduronp@gmail.com</span> or call <span className="text-white font-mono">+977 9867695261</span>.
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="cursor-pointer px-5 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Close Bulletin
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
