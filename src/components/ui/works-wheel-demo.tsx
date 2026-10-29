"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Curated high quality web & creative imagery
const WORKS: WorksWheelItem[] = [
  {
    title: "Cookbot AI",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    href: "https://cookbot-ai.vercel.app/",
  },
  {
    title: "E-Jeepney System",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80",
    href: "https://e-jeepney-system.vercel.app",
  },
  {
    title: "Soundscape IoT",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "https://soundscape-iotsystem.vercel.app/",
  },
  {
    title: "Stock Logger",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    href: "https://stock-logger.vercel.app/",
  },
  {
    title: "Prismatic Rift",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    href: "#prismatic-rift",
  },
  {
    title: "Ember Clouds",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    href: "#ember-clouds",
  },
  {
    title: "Neon Portal",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    href: "#neon-portal",
  },
  {
    title: "Launch Window",
    image: "https://images.unsplash.com/photo-1517976487502-54070a7b489c?auto=format&fit=crop&w=1200&q=80",
    href: "#launch-window",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Works '26" action="View" />
    </div>
  );
}
