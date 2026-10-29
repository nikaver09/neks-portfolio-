"use client";

import ActivityHeatmap, {
  type ActivityDay,
} from "@/components/ui/activity-heatmap";
import { useMemo, useState } from "react";

function generateDays(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const end = new Date("2025-01-04T00:00:00Z");
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364);
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let t = start.getTime(); t <= end.getTime(); t += 86_400_000) {
    const roll = rand();
    const count =
      roll > 0.72
        ? Math.floor(roll * 12)
        : roll > 0.4
          ? Math.floor(roll * 4)
          : 0;
    days.push({ date: new Date(t).toISOString().slice(0, 10), count });
  }
  return days;
}

export default function ActivityHeatmapDemo() {
  const days = useMemo(generateDays, []);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl p-8">
      <ActivityHeatmap
        days={days}
        label="Contributions in the last year"
        period="the last year"
        selectedDate={selected}
        onSelectDate={setSelected}
      />
    </div>
  );
}
