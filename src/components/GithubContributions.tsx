"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitCommit, Sparkles } from "lucide-react";
import ActivityHeatmap, { type ActivityDay } from "@/components/ui/activity-heatmap";
import fallbackData from "@/components/ui/github-contributions-nikaver09.json";

interface GithubContributionsProps {
  className?: string;
}

export default function GithubContributions({ className = "" }: GithubContributionsProps) {
  // Initialize with verified GitHub contributions data for nikaver09
  const [days, setDays] = useState<ActivityDay[]>(() => {
    return (fallbackData.contributions as ActivityDay[]) || [];
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  // Attempt to fetch fresh data if online, with graceful fallback to local data
  useEffect(() => {
    let mounted = true;
    async function loadFreshContributions() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/nikaver09?y=last");
        if (!res.ok) return;
        const json = await res.json();
        if (mounted && json?.contributions?.length) {
          setDays(json.contributions);
          setIsLive(true);
        }
      } catch {
        // Retain fallback data seamlessly
      }
    }
    loadFreshContributions();
    return () => {
      mounted = false;
    };
  }, []);

  const totalContributions = useMemo(() => {
    return days.reduce((sum, d) => sum + (d.count || 0), 0);
  }, [days]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`github-activity-wrapper mt-16 pt-12 border-t border-[var(--line-dark)] ${className}`}
      style={
        {
          "--heatmap-surface": "#EDEDED",
          "--surface": "#EDEDED",
          "--foreground": "#000000",
          "--accent": "#000000",
        } as React.CSSProperties
      }
    >
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-['Michroma',sans-serif] text-[#5e5e59] mb-2">
            <GitCommit className="w-3.5 h-3.5" />
            <span>04.1 · GITHUB ACTIVITY HEATMAP</span>
            {isLive && (
              <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                <Sparkles className="w-2.5 h-2.5" /> LIVE
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-black m-0">
            ENGINEERING <em className="italic font-serif">CADENCE.</em>
          </h3>
          <p className="text-[#5e5e59] text-xs md:text-sm mt-1 max-w-xl">
            Real commit frequency and open-source contribution rhythm tracked on GitHub over the last 365 days.
          </p>
        </div>

        {/* GitHub user badge & link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/nikaver09"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 hover:border-black hover:bg-black/5 text-xs font-['Michroma',sans-serif] tracking-wider transition-all duration-200"
          >
            <span>@nikaver09</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Heatmap Card */}
      <div className="bg-white/70 backdrop-blur-sm border border-black/10 rounded-2xl p-4 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <ActivityHeatmap
          days={days}
          label="Contributions in the last year"
          period="the last year"
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
    </motion.div>
  );
}
