import { useState, useEffect } from "react";
import { ArrowLeft, Award, ExternalLink, Calendar, X, Eye, Search, Filter, Box, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
  {
    id: 1,
    title: "BASIC NETWORKING",
    issuer: "Networks / Cisco",
    date: "May 2026",
    image: "/images2/networking_certificate.jpg", 
    link: "https://coursera.org",
    category: "Networking",
    desc: "Comprehensive understanding of OSI models, TCP/IP protocols, subnetting, and enterprise router configurations."
  },
  {
    id: 2,
    title: "Cybersecurity Hygiene",
    issuer: "Cybercrime Prevention",
    date: "April 2025",
    image: "/images2/cyber_hygiene_certificate.jpg",
    link: "#",
    category: "Security",
    desc: "Mastering digital footprint management, zero-trust hygiene, and active cyber threat mitigation strategies."
  },
  {
    id: 3,
    title: "CodeChum MySQL",
    issuer: "CodeChum",
    date: "Jun 2025",
    image: "/images2/codechum.png",
    link: "#",
    category: "SQL Management",
    desc: "Advanced query optimization, normalized database architecture, and transactional schema design."
  }
];

const cubeFaces = [
  { transform: "rotateY(0deg) translateZ(140px)" },    // Front
  { transform: "rotateY(180deg) translateZ(140px)" },  // Back
  { transform: "rotateY(90deg) translateZ(140px)" },   // Right
  { transform: "rotateY(-90deg) translateZ(140px)" },  // Left
  { transform: "rotateX(90deg) translateZ(140px)" },   // Top
  { transform: "rotateX(-90deg) translateZ(140px)" },  // Bottom
];

export default function CertificatesPage({ onBack }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("cube"); // "cube" or "grid"

  const categories = ["All", ...new Set(certificates.map(c => c.category))];

  const filteredCerts = certificates.filter(cert => {
    const matchesCategory = activeCategory === "All" || cert.category === activeCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedCert) {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d9ff3f] selection:text-neutral-950 overflow-x-hidden">
      <style>{`
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-cube { animation: rotateCube 18s infinite linear; }
        .animate-cube:hover { animation-play-state: paused; }
      `}</style>

      {/* Grid background */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(#eeeee7 1px, transparent 1px), linear-gradient(90deg, #eeeee7 1px, transparent 1px)", 
          backgroundSize: "48px 48px" 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack} 
          className="group inline-flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors duration-200 mb-8 md:mb-12 font-mono text-[11px] md:text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
          <span>Back to Portfolio</span>
        </motion.button>

        {/* Header */}
        <header className="mb-10 md:mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#d9ff3f] uppercase tracking-[0.25em]">ACCREDITATION // REPO</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight"
            >
              Credentials &<br /><span className="text-[#d9ff3f]">Certifications</span>
            </motion.h1>

            {/* View Switcher */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start md:self-auto"
            >
              <button
                type="button"
                onClick={() => setViewMode("cube")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  viewMode === "cube" ? "bg-[#d9ff3f] text-black font-bold shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Box size={14} /> 3D Cube
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  viewMode === "grid" ? "bg-[#d9ff3f] text-black font-bold shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={14} /> Grid
              </button>
            </motion.div>
          </div>
        </header>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#d9ff3f] transition-colors" size={17} />
            <input 
              type="text" 
              placeholder="Search by topic, provider, keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-xs font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#d9ff3f]/60 transition-all text-white"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            <Filter size={15} className="text-zinc-500 mr-1 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-[#d9ff3f] text-black font-bold" 
                  : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section: 3D Cube or Card Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "cube" ? (
            <motion.section 
              key="cube-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[380px] md:min-h-[460px] py-6 md:py-12 mb-10 overflow-hidden"
            >
              {filteredCerts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-mono text-zinc-500 text-sm">NO MATCHING CREDENTIALS FOUND</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 text-xs font-mono text-[#d9ff3f] hover:underline">
                    RESET FILTERS
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ perspective: "1100px" }} className="w-[260px] h-[260px] md:w-[280px] md:h-[280px] relative">
                    <div 
                      className="w-full h-full absolute animate-cube transform-style-3d transition-transform duration-500" 
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {cubeFaces.map((face, index) => {
                        const cert = filteredCerts[index % filteredCerts.length];
                        return (
                          <div
                            key={index}
                            className="absolute w-full h-full border border-zinc-700/80 bg-[#141416]/95 backdrop-blur-md overflow-hidden group cursor-pointer shadow-2xl"
                            style={{ transform: face.transform, backfaceVisibility: "visible" }}
                            onClick={() => cert && setSelectedCert(cert)}
                            title={cert ? `Click to view ${cert.title}` : ""}
                          >
                            {cert ? (
                              <>
                                <img 
                                  src={cert.image} 
                                  alt={cert.title} 
                                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/75">
                                  <div className="p-2.5 bg-[#d9ff3f] text-black rounded-full mb-2.5 shadow-lg">
                                    <Eye size={18} />
                                  </div>
                                  <h4 className="text-xs font-mono font-bold uppercase tracking-tight text-white mb-1">{cert.title}</h4>
                                  <span className="text-[10px] font-mono text-zinc-400">{cert.issuer}</span>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-800">
                                <Award size={40} className="text-zinc-700" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center space-y-1">
                    <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.25em]">
                      Interactive 3D Stage — Hover to pause, click to inspect
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setViewMode("grid")}
                      className="text-xs font-mono text-[#d9ff3f] hover:underline"
                    >
                      Prefer a list? Switch to Grid View →
                    </button>
                  </div>
                </>
              )}
            </motion.section>
          ) : (
            <motion.section 
              key="grid-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {filteredCerts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="font-mono text-zinc-500 text-sm">NO MATCHING CREDENTIALS FOUND</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 text-xs font-mono text-[#d9ff3f] hover:underline">
                    RESET FILTERS
                  </button>
                </div>
              ) : (
                filteredCerts.map((cert) => (
                  <article 
                    key={cert.id}
                    className="group border border-zinc-800 bg-[#111113] rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-zinc-900">
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md font-mono text-[10px] text-[#d9ff3f] border border-zinc-700">
                        {cert.category}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xl">
                          <Eye size={14} /> Inspect
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-zinc-500 font-mono text-[11px] mb-2">
                          <span>{cert.issuer}</span>
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> {cert.date}</span>
                        </div>
                        <h3 className="font-mono font-bold text-lg text-white mb-2 group-hover:text-[#d9ff3f] transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                          {cert.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-400">
                        <span>SYS.VERIFIED</span>
                        <span className="text-[#d9ff3f] flex items-center gap-1">VIEW FULL <ArrowLeft size={12} className="rotate-180" /></span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md" 
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }} 
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full bg-[#111113] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)} 
                className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-[#d9ff3f] hover:text-black text-white rounded-full transition-all border border-zinc-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto no-scrollbar">
                <div className="bg-zinc-950 p-4 flex items-center justify-center">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="w-full h-auto object-contain max-h-[55vh] rounded-lg" 
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-[#d9ff3f] uppercase tracking-widest">{selectedCert.issuer}</span>
                    <h2 className="font-mono font-bold text-xl md:text-2xl text-white">{selectedCert.title}</h2>
                    <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">{selectedCert.desc}</p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={13} /> {selectedCert.date}
                    </span>
                    {selectedCert.link && selectedCert.link !== "#" && (
                      <a 
                        href={selectedCert.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 text-zinc-300 hover:text-[#d9ff3f] font-mono text-xs transition-colors uppercase tracking-wider"
                      >
                        Verify Credential <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
