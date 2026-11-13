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

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${aspectRatio} ${className}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      ) : (
        <MotorsportGraphic type={fallbackType} className="w-full h-full" />
      )}

      {badge && (
        <span className="absolute top-3 left-3 text-[10px] font-medium text-white bg-black/75 px-2.5 py-0.5 rounded-full select-none z-10">
          {badge}
        </span>
      )}

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
