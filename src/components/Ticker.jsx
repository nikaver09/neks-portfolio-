const items = ["React", "Node.js", "TypeScript", "Next.js", "Tailwind CSS", "MongoDB", "PostgreSQL", "GraphQL", "Docker", "Figma", "Python"];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="py-6 border-y border-muted/30 overflow-hidden bg-surface/50">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-xl tracking-widest text-ghost uppercase">{item}</span>
            <span className="text-accent text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
