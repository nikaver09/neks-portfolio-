import React, { useState, useEffect } from "react";
import { ArrowLeft, Award, ExternalLink, Calendar, X, Eye, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
  {
    id: 1,
    title: "BASIC NETWORKING",
    issuer: "networks",
    date: "May 2026",
    image: "/images2/networking_certificate.jpg", 
    link: "https://coursera.org",
    category: "Networking",
    desc: "Comprehensive understanding of OSI models, TCP/IP, and router configurations."
  },
  {
    id: 2,
    title: "Cybersecurity Hygiene",
    issuer: "Cybercrime",
    date: "April 2025",
    image: "/images2/cyber_hygiene_certificate.jpg",
    link: "#",
    category: "Security",
    desc: "Mastering digital footprint management and threat mitigation strategies."
  },
  {
    id: 3,
    title: "CodeChum MySQL",
    issuer: "CodeChum",
    date: "Jun 2025",
    image: "/images2/codechum.png",
    link: "#",
    category: "SQL Management",
    desc: "Proficiency in SQL query optimization and database schema design."
  }
];

const cubeFaces = [
  { transform: "rotateY(0deg) translateZ(150px)" },    // Front
  { transform: "rotateY(180deg) translateZ(150px)" },  // Back
  { transform: "rotateY(90deg) translateZ(150px)" },   // Right
  { transform: "rotateY(-90deg) translateZ(150px)" },  // Left
  { transform: "rotateX(90deg) translateZ(150px)" },   // Top
  { transform: "rotateX(-90deg) translateZ(150px)" },  // Bottom
];

export default function CertificatesPage({ onBack }) {
  // Embedded Styles for the 3D Cube
  const cubeStyles = `
    @keyframes rotateCube {
      0% { transform: rotateX(0deg) rotateY(0deg); }
      100% { transform: rotateX(360deg) rotateY(360deg); }
    }
    .animate-cube { animation: rotateCube 18s infinite linear; }
    .animate-cube:hover { animation-play-state: paused; }
  `;

  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...new Set(certificates.map(c => c.category))];

  const filteredCerts = certificates.filter(cert => {
    const matchesCategory = activeCategory === "All" || cert.category === activeCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#A1A1A1] selection:text-neutral-950 overflow-x-hidden">
      <style>{cubeStyles}</style>
      {/* Background elements to match your theme */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: "linear-gradient(#D1D5D0 1px, transparent 1px), linear-gradient(90deg, #D1D5D0 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack} 
          className="group flex items-center gap-2 text-zinc-400 hover:text-[#A1A1A1] transition-colors duration-200 mb-8 md:mb-12 font-mono text-[10px] md:text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </motion.button>

        <header className="mb-12 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-[#A1A1A1] uppercase tracking-[0.3em]">Credentials</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-sans text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight">
            My <span className="text-[#A1A1A1]">Certificates</span>
          </motion.h1>
        </header>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#A1A1A1] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search certificates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113] border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#A1A1A1]/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            <Filter size={16} className="text-zinc-500 mr-2 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-[#A1A1A1] text-zinc-950 font-bold" 
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Cube Scene */}
        <section className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] mb-12 md:mb-20">
          <div style={{ perspective: "1200px" }} className="w-[280px] h-[280px] md:w-[300px] md:h-[300px] relative scale-90 md:scale-100">
            <div className="w-full h-full absolute animate-cube transform-style-3d transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
              {cubeFaces.map((face, index) => {
                // Cycle through certificates if there are fewer than 6
                const cert = filteredCerts[index % filteredCerts.length];
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full border border-zinc-800 bg-[#111113]/95 backdrop-blur-sm overflow-hidden group cursor-pointer"
                    style={{ transform: face.transform, backfaceVisibility: "visible" }}
                    onClick={() => cert && setSelectedCert(cert)}
                  >
                    {cert ? (
                      <>
                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 translate-y-4 group-hover:translate-y-0">
                           <div className="p-3 bg-[#A1A1A1] text-zinc-950 rounded-full mb-3"><Eye size={20} /></div>
                           <h4 className="text-xs font-mono uppercase tracking-tighter text-white">{cert.title}</h4>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-800">
                        <Award size={48} className="text-zinc-800" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 md:mt-16 text-center space-y-2">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Interactive 3D Showcase</p>
          </motion.div>
        </section>
      </div>

      {/* Lightbox Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md" onClick={() => setSelectedCert(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative max-w-2xl w-full bg-[#111113] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCert(null)} className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white hover:bg-[#A1A1A1] hover:text-black rounded-full transition-all"><X size={24} /></button>
              <div className="overflow-auto no-scrollbar">
                <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto object-contain max-h-[60vh] bg-zinc-900" />
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-[#A1A1A1] uppercase tracking-widest">{selectedCert.issuer}</span>
                    <h2 className="font-sans font-bold text-xl md:text-2xl text-white">{selectedCert.title}</h2>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{selectedCert.desc}</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"><Calendar size={12} /> {selectedCert.date}</span>
                  <a href={selectedCert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-[#A1A1A1] font-mono text-xs transition-colors uppercase tracking-widest">
                    Verify <ExternalLink size={14} />
                  </a>
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