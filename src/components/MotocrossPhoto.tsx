import React, { useState } from "react";
import { MotorsportGraphic } from "./MotorsportGraphic";

export interface MotocrossPhotoProps {
  src: string;
  alt: string;
  fallbackType?: "hero-jump" | "rock-matrix" | "pokhara-himalayas" | "stunt-whip" | "paddock" | "crowd";
  className?: string;
  overlayText?: string;
  badge?: string;
  aspectRatio?: string;
}

export const MotocrossPhoto: React.FC<MotocrossPhotoProps> = ({
  src,
  alt,
  fallbackType = "hero-jump",
  className = "",
  overlayText,
  badge,
  aspectRatio = "aspect-[16/10]"
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-neutral-950 ${aspectRatio} ${className}`}>
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
          {/* Subtle pre-load gradient while image loads */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
              <MotorsportGraphic type={fallbackType} className="w-full h-full opacity-40" />
            </div>
          )}
        </>
      ) : (
        /* Zero-Broken-Image Resilient SVG Fallback */
        <MotorsportGraphic type={fallbackType} className="w-full h-full" />
      )}

      {/* Dark gradient scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Optional Badge */}
      {badge && (
        <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur-sm px-2.5 py-0.5 border border-zinc-700 select-none z-10">
          {badge}
        </span>
      )}

      {/* Optional Overlay Text */}
      {overlayText && (
        <div className="absolute bottom-3 left-3 right-3 z-10 select-none">
          <p className="text-white text-xs font-medium drop-shadow-md leading-tight line-clamp-2">
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
};
