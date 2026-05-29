export default function Footer() {
  return (
    <footer className="border-t border-muted/30 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-2xl text-accent tracking-widest">nEKs</span>
        <p className="font-mono text-xs text-ghost text-center">
          Designed & built with ❤️ — {new Date().getFullYear()}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs text-ghost hover:text-accent transition-colors uppercase tracking-widest"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
