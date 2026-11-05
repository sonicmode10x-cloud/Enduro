import React, { useEffect, useState, useRef } from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { Trophy, Users, Eye, Sparkles } from "lucide-react";

export const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ridersCount, setRidersCount] = useState(0);
  const [spectatorsCount, setSpectatorsCount] = useState(0);
  const [influencersCount, setInfluencersCount] = useState(0);

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

    // Animate riders counter to 80
    const duration = 1600;
    const steps = 40;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setRidersCount(Math.floor(80 * progress));
      setSpectatorsCount(Math.floor(10000 * progress));
      setInfluencersCount(Math.floor(50 * progress));

      if (step >= steps) {
        setRidersCount(80);
        setSpectatorsCount(10000);
        setInfluencersCount(50);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      value: `${ridersCount}+`,
      label: EVENT_CONFIG.previousAchievements.ridersLabel,
      sublabel: "National & international racers across Pro, Expert & Novice",
      icon: Trophy
    },
    {
      value: `${spectatorsCount.toLocaleString()}+`,
      label: EVENT_CONFIG.previousAchievements.spectatorsLabel,
      sublabel: "Spectators and motorsport fans filling Pokhara hills",
      icon: Users
    },
    {
      value: EVENT_CONFIG.previousAchievements.onlineViews,
      label: EVENT_CONFIG.previousAchievements.onlineViewsLabel,
      sublabel: "Viral race clips and high-energy creator reels",
      icon: Eye
    },
    {
      value: `${influencersCount}+`,
      label: EVENT_CONFIG.previousAchievements.influencersLabel,
      sublabel: "2.5M - 4M+ cumulative social audience reach",
      icon: Sparkles
    }
  ];

  return (
    <section id="achievements" ref={containerRef} className="relative red-racing-ribbon py-12 sm:py-16 overflow-hidden">
      {/* Background speed glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-red-950/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Kicker (matching reference) */}
        <div className="text-center sm:text-left mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[2px] bg-white/70" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/90 font-bold">
              PROVEN HISTORIC BENCHMARKS · PREVIOUS EDITION
            </span>
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-zinc-400">
            Official Pokhara Records
          </span>
        </div>

        {/* 4-Stat Row with Fine Vertical Dividers (Direct Match to Reference) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10 py-4">
          <div className="p-4 sm:p-6 text-center sm:text-left">
            <div className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter tabular-nums leading-none">
              {ridersCount}+
            </div>
            <div className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-300 mt-2">
              COMPETING RIDERS
            </div>
          </div>

          <div className="p-4 sm:p-6 text-center sm:text-left">
            <div className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter tabular-nums leading-none">
              {spectatorsCount.toLocaleString()}+
            </div>
            <div className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-300 mt-2">
              LIVE SPECTATORS
            </div>
          </div>

          <div className="p-4 sm:p-6 text-center sm:text-left">
            <div className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter tabular-nums leading-none">
              20M+
            </div>
            <div className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-300 mt-2">
              DIGITAL VIEWS
            </div>
          </div>

          <div className="p-4 sm:p-6 text-center sm:text-left">
            <div className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter tabular-nums leading-none">
              {influencersCount}+
            </div>
            <div className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-300 mt-2">
              CREATORS & INFLUENCERS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
