import React, { useEffect, useState, useRef } from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { LOCAL_IMAGES } from "../lib/localImages";

export const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ridersCount, setRidersCount] = useState(80);
  const [spectatorsCount, setSpectatorsCount] = useState(10000);
  const [influencersCount, setInfluencersCount] = useState(50);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200;
    const steps = 30;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setRidersCount(Math.max(12, Math.floor(80 * progress)));
      setSpectatorsCount(Math.max(1500, Math.floor(10000 * progress)));
      setInfluencersCount(Math.max(10, Math.floor(50 * progress)));

      if (step >= steps) {
        setRidersCount(80);
        setSpectatorsCount(10000);
        setInfluencersCount(50);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative z-20 pt-10 sm:pt-12 px-4 sm:px-6 lg:px-8 pb-12"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-stone-200/70 p-8 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Editorial Information & Benchmark Metrics */}
          <div className="md:col-span-8">
            <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-zinc-900 mb-3 text-center md:text-left">
              INFORMATION
            </h2>
            <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-xl mb-8 text-center md:text-left">
              Welcome to Nepal&apos;s premier off-road motorsport festival in Pokhara. Combining hard enduro trails, motocross jumps, freestyle stunt shows, and international racing culture under FIM-grade safety governance.
            </p>

            {/* Clean 4-Metric Benchmark Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-stone-200">
              <div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-zinc-900 tabular-nums leading-none">
                  {ridersCount}+
                </div>
                <div className="text-xs text-zinc-500 mt-1.5 font-medium">
                  Competing Riders
                </div>
              </div>
              <div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-zinc-900 tabular-nums leading-none">
                  {spectatorsCount.toLocaleString()}+
                </div>
                <div className="text-xs text-zinc-500 mt-1.5 font-medium">
                  Live Spectators
                </div>
              </div>
              <div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-[#D60A19] tabular-nums leading-none">
                  {EVENT_CONFIG.previousAchievements.onlineViews}
                </div>
                <div className="text-xs text-zinc-500 mt-1.5 font-medium">
                  Online Views
                </div>
              </div>
              <div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-zinc-900 tabular-nums leading-none">
                  {influencersCount}+
                </div>
                <div className="text-xs text-zinc-500 mt-1.5 font-medium">
                  Media & Creators
                </div>
              </div>
            </div>
          </div>

          {/* Right Isolated Racing Helmet Visual (Clean Studio Cutout matching reference) */}
          <div className="md:col-span-4 flex items-center justify-center">
            <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              <img
                src={LOCAL_IMAGES.enduroHelmetStudio}
                alt="Official Racing Carbon Motocross Helmet"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
