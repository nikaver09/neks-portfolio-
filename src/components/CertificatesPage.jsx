import { useState, useEffect } from "react";
import { ArrowLeft, Award, ExternalLink, Calendar, X, Eye, Search, Filter, Box, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// NOTE: Styles are defined inline via <style> tag below so this
// component matches the main portfolio's index.css design system
// (light #EDEDED bg, black text, Courier New mono, #d9ff3f acid)
// ─────────────────────────────────────────────────────────────

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
  { transform: "rotateY(0deg) translateZ(140px)" },
  { transform: "rotateY(180deg) translateZ(140px)" },
  { transform: "rotateY(90deg) translateZ(140px)" },
  { transform: "rotateY(-90deg) translateZ(140px)" },
  { transform: "rotateX(90deg) translateZ(140px)" },
  { transform: "rotateX(-90deg) translateZ(140px)" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function CertificatesPage({ onBack }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("cube");

  const categories = ["All", ...new Set(certificates.map(c => c.category))];

  const filteredCerts = certificates.filter(cert => {
    const matchesCategory = activeCategory === "All" || cert.category === activeCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedCert) setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "100vh",
        background: "#EDEDED",
        color: "#000",
        fontFamily: '"Geist Sans","Arial Narrow",Arial,sans-serif',
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <style>{`
        /* ── Grid texture matching hero ── */
        .cp-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .cp-inner {
          position: relative; z-index: 1;
          max-width: 1600px; margin: 0 auto;
          padding: 0 5vw 100px;
        }

        /* Back */
        .cp-back {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; border: 0;
          color: rgba(0,0,0,0.4);
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          margin-top: 40px; margin-bottom: 52px;
          cursor: pointer; transition: color 0.2s;
        }
        .cp-back:hover { color: #000; }
        .cp-back svg { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }
        .cp-back:hover svg { transform: translateX(-4px); }

        /* Section marker */
        .cp-marker {
          display: flex; align-items: center; gap: 40px;
          border-top: 1px solid rgba(0,0,0,0.18);
          padding-top: 12px; margin-bottom: 20px;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,0,0,0.5);
        }
        .cp-marker__count { margin-left: auto; }

        /* Heading row */
        .cp-heading {
          display: flex; flex-direction: column; gap: 20px;
          margin-bottom: 44px;
          flex-wrap: wrap;
        }
        @media(min-width:768px){ .cp-heading{ flex-direction:row; align-items:flex-end; justify-content:space-between; } }
        .cp-title {
          font-size: clamp(2rem, 7.4vw, 9rem);
          font-weight: 800; letter-spacing: -0.065em; line-height: 1.05; margin: 0;
          max-width: 100%; overflow-wrap: anywhere;
        }
        .cp-title em { font-style: normal; color: #d9ff3f; }

        /* View switcher */
        .cp-switch {
          display: inline-flex; align-items: center; gap: 4px;
          border: 1px solid rgba(0,0,0,0.14); border-radius: 10px;
          padding: 4px; background: rgba(0,0,0,0.03);
          flex-shrink: 0; align-self: flex-start;
        }
        @media(min-width:768px){ .cp-switch{ align-self: auto; } }
        .cp-switch-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 7px; border: 0;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
          transition: background 0.18s, color 0.18s;
          background: transparent; color: rgba(0,0,0,0.38);
        }
        .cp-switch-btn--on { background: #000; color: #EDEDED; }
        .cp-switch-btn:not(.cp-switch-btn--on):hover { color: #000; }

        /* Controls row */
        .cp-controls {
          display: flex; flex-direction: column; gap: 14px; margin-bottom: 44px;
        }
        @media(min-width:768px){ .cp-controls{ flex-direction:row; align-items:center; justify-content:space-between; } }

        /* Search */
        .cp-search { position: relative; width: 100%; }
        @media(min-width:768px){ .cp-search{ max-width: 380px; } }
        .cp-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(0,0,0,0.28); pointer-events: none; transition: color 0.2s;
        }
        .cp-search:focus-within .cp-search-icon { color: #000; }
        .cp-search input {
          width: 100%; background: #fff; border: 1px solid rgba(0,0,0,0.12);
          border-radius: 10px; padding: 11px 14px 11px 40px;
          font-family: "Courier New",monospace; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; color: #000; outline: none; transition: border-color 0.2s;
        }
        .cp-search input::placeholder { color: rgba(0,0,0,0.28); }
        .cp-search input:focus { border-color: #000; }

        /* Filters */
        .cp-filters {
          display: flex; align-items: center; gap: 8px;
          min-width: 0; max-width: 100%;
          overflow-x: auto; padding-bottom: 4px;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .cp-filters::-webkit-scrollbar { display: none; }
        .cp-filter-icon { color: rgba(0,0,0,0.3); flex-shrink: 0; }
        .cp-filter {
          flex-shrink: 0; padding: 6px 14px; border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.12); background: transparent;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,0,0,0.45); cursor: pointer; white-space: nowrap;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .cp-filter--on { background: #000; color: #d9ff3f; border-color: #000; }
        .cp-filter:not(.cp-filter--on):hover { border-color: #000; color: #000; }

        /* Empty */
        .cp-empty {
          text-align: center; padding: 80px 0;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; color: rgba(0,0,0,0.3); text-transform: uppercase;
        }
        .cp-empty button {
          display: block; margin: 14px auto 0;
          background: transparent; border: 0; font: inherit; font-weight: 700;
          color: #000; cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
        }

        /* Cube section */
        .cp-cube-wrap {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 440px; padding: 48px 0 64px; margin-bottom: 32px;
        }
        @keyframes rotateCube {
          0%   { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .cp-cube-spinner { animation: rotateCube 18s infinite linear; }
        .cp-cube-spinner:hover { animation-play-state: paused; }

        .cp-cube-face {
          position: absolute; width: 100%; height: 100%;
          border: 1px solid rgba(0,0,0,0.14); background: #fff;
          overflow: hidden; cursor: pointer;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .cp-cube-face img {
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0.82; transition: opacity 0.3s, transform 0.4s;
          filter: grayscale(0.3);
        }
        .cp-cube-face:hover img { opacity: 1; transform: scale(1.05); filter: grayscale(0); }
        .cp-cube-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 14px; text-align: center; opacity: 0;
          background: rgba(237,237,237,0.93); transition: opacity 0.25s;
        }
        .cp-cube-face:hover .cp-cube-overlay { opacity: 1; }
        .cp-cube-eye {
          width: 38px; height: 38px; border-radius: 50%;
          background: #000; color: #d9ff3f;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .cp-cube-name {
          font-family: "Courier New",monospace; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; color: #000; margin: 0 0 4px;
        }
        .cp-cube-issuer {
          font-family: "Courier New",monospace; font-size: 10px; color: rgba(0,0,0,0.45);
        }
        .cp-cube-empty {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          border: 2px dashed rgba(0,0,0,0.08); color: rgba(0,0,0,0.12);
        }

        .cp-cube-hint {
          margin-top: 40px; text-align: center;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; color: rgba(0,0,0,0.3); text-transform: uppercase;
        }
        .cp-cube-hint button {
          display: block; margin: 8px auto 0;
          background: transparent; border: 0; font: inherit; font-size: 10px;
          letter-spacing: 0.12em; color: #000; cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
        }

        /* Grid */
        .cp-grid {
          display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 64px;
        }
        @media(min-width:640px)  { .cp-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px) { .cp-grid{ grid-template-columns:repeat(3,1fr); } }

        /* Card */
        .cp-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.1);
          overflow: hidden; display: flex; flex-direction: column; cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .cp-card:hover {
          border-color: #000;
          box-shadow: 0 10px 36px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }
        .cp-card__img-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          overflow: hidden; background: #f0f0f0;
        }
        .cp-card__img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
          filter: grayscale(0.25);
        }
        .cp-card:hover .cp-card__img { transform: scale(1.05); filter: grayscale(0); }
        .cp-card__badge {
          position: absolute; top: 10px; left: 12px;
          font-family: "Courier New",monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: rgba(255,255,255,0.92); color: #000;
          padding: 4px 9px; border: 1px solid rgba(0,0,0,0.12);
        }
        .cp-card__hover {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.22s;
        }
        .cp-card:hover .cp-card__hover { opacity: 1; }
        .cp-card__inspect {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 18px; background: #EDEDED; color: #000;
          border: none; font-family: "Courier New",monospace;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,0.15); transition: background 0.2s;
        }
        .cp-card__inspect:hover { background: #d9ff3f; }
        .cp-card__body {
          padding: 20px 22px 22px; display: flex; flex-direction: column; flex: 1; gap: 8px;
        }
        .cp-card__meta {
          display: flex; align-items: center; justify-content: space-between;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; color: rgba(0,0,0,0.38);
        }
        .cp-card__date { display: flex; align-items: center; gap: 5px; }
        .cp-card__title {
          font-size: clamp(1.1rem,2vw,1.45rem); font-weight: 700;
          letter-spacing: -0.04em; color: #000; margin: 0; line-height: 1.1;
          transition: color 0.2s;
        }
        .cp-card:hover .cp-card__title { color: #000; }
        .cp-card__desc {
          font-size: 13px; line-height: 1.55; color: rgba(0,0,0,0.52); margin: 0; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .cp-card__footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px; border-top: 1px solid rgba(0,0,0,0.07); margin-top: auto;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
        }
        .cp-card__verified { color: rgba(0,0,0,0.3); text-transform: uppercase; }
        .cp-card__view { display: flex; align-items: center; gap: 5px; color: #000; text-transform: uppercase; }

        /* Lightbox */
        .cp-lb-bg {
          position: fixed; inset: 0; z-index: 200;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        @media(min-width:640px){ .cp-lb-bg{ padding: 32px; } }
        .cp-lb {
          position: relative; max-width: 680px; width: 100%;
          background: #fff; border: 1px solid rgba(0,0,0,0.12);
          overflow: hidden; display: flex; flex-direction: column;
          max-height: 90vh; box-shadow: 0 24px 64px rgba(0,0,0,0.22);
        }
        .cp-lb__close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.14); background: rgba(255,255,255,0.92);
          color: #000; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
        }
        .cp-lb__close:hover { background: #d9ff3f; border-color: #d9ff3f; }
        .cp-lb__img-wrap {
          background: #f0f0f0; padding: 16px;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .cp-lb__img { width: 100%; max-height: 52vh; object-fit: contain; display: block; }
        .cp-lb__body {
          padding: 24px 28px 28px; overflow-y: auto;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .cp-lb__body::-webkit-scrollbar { display: none; }
        .cp-lb__issuer {
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,0,0,0.38); margin: 0 0 6px;
        }
        .cp-lb__title {
          font-size: clamp(1.4rem,3vw,2rem); font-weight: 800;
          letter-spacing: -0.05em; color: #000; margin: 0 0 10px;
        }
        .cp-lb__desc { font-size: 14px; line-height: 1.62; color: rgba(0,0,0,0.52); margin: 0; }
        .cp-lb__actions {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.08);
        }
        .cp-lb__date {
          display: flex; align-items: center; gap: 7px;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; color: rgba(0,0,0,0.38); text-transform: uppercase;
        }
        .cp-lb__verify {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: "Courier New",monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: #000; text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.28); padding-bottom: 2px;
          transition: border-color 0.2s, color 0.2s;
        }
        .cp-lb__verify:hover { border-color: #d9ff3f; }
      `}</style>

      <div className="cp-bg" />

      <div className="cp-inner">
        {/* Back */}
        <motion.button
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="cp-back" onClick={onBack}
        >
          <ArrowLeft size={13} /> Back to Portfolio
        </motion.button>

        {/* Section marker */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="cp-marker">
          <span>Accreditation // Repo</span>
          <span className="cp-marker__count">{filteredCerts.length} / {certificates.length} credentials</span>
        </motion.div>

        {/* Heading + switch */}
        <div className="cp-heading">
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={2} className="cp-title">
            Credentials<br /><em>Certifications</em>
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="cp-switch">
            <button
              type="button"
              onClick={() => setViewMode("cube")}
              className={`cp-switch-btn${viewMode === "cube" ? " cp-switch-btn--on" : ""}`}
            >
              <Box size={13} /> 3D Cube
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`cp-switch-btn${viewMode === "grid" ? " cp-switch-btn--on" : ""}`}
            >
              <LayoutGrid size={13} /> Grid
            </button>
          </motion.div>
        </div>

        {/* Search + filter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="cp-controls">
          <div className="cp-search">
            <Search className="cp-search-icon" size={14} />
            <input
              type="text"
              placeholder="Search topic, provider, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="cp-filters">
            <Filter size={13} className="cp-filter-icon" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cp-filter${activeCategory === cat ? " cp-filter--on" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === "cube" ? (
            <motion.div
              key="cube"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cp-cube-wrap"
            >
              {filteredCerts.length === 0 ? (
                <div className="cp-empty">
                  No matching credentials found.
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>Reset Filters</button>
                </div>
              ) : (
                <>
                  <div style={{ width: 260, height: 260, perspective: "1100px", position: "relative" }}>
                    <div
                      className="cp-cube-spinner"
                      style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
                    >
                      {cubeFaces.map((face, index) => {
                        const cert = filteredCerts[index % filteredCerts.length];
                        return (
                          <div
                            key={index}
                            className="cp-cube-face"
                            style={{ transform: face.transform, backfaceVisibility: "visible" }}
                            onClick={() => cert && setSelectedCert(cert)}
                            title={cert ? `View ${cert.title}` : ""}
                          >
                            {cert ? (
                              <>
                                <img src={cert.image} alt={cert.title} />
                                <div className="cp-cube-overlay">
                                  <div className="cp-cube-eye"><Eye size={16} /></div>
                                  <p className="cp-cube-name">{cert.title}</p>
                                  <span className="cp-cube-issuer">{cert.issuer}</span>
                                </div>
                              </>
                            ) : (
                              <div className="cp-cube-empty"><Award size={34} /></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="cp-cube-hint">
                    Interactive 3D Stage — Hover to pause, click to inspect
                    <button onClick={() => setViewMode("grid")}>Prefer a list? Switch to Grid View →</button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cp-grid"
            >
              {filteredCerts.length === 0 ? (
                <div className="cp-empty" style={{ gridColumn: "1/-1" }}>
                  No matching credentials found.
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>Reset Filters</button>
                </div>
              ) : filteredCerts.map((cert, i) => (
                <motion.article
                  key={cert.id}
                  variants={fadeUp} initial="hidden" animate="visible" custom={i}
                  className="cp-card"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="cp-card__img-wrap">
                    <img src={cert.image} alt={cert.title} className="cp-card__img" />
                    <span className="cp-card__badge">{cert.category}</span>
                    <div className="cp-card__hover">
                      <span className="cp-card__inspect"><Eye size={13} /> Inspect</span>
                    </div>
                  </div>
                  <div className="cp-card__body">
                    <div className="cp-card__meta">
                      <span>{cert.issuer}</span>
                      <span className="cp-card__date"><Calendar size={11} />{cert.date}</span>
                    </div>
                    <h3 className="cp-card__title">{cert.title}</h3>
                    <p className="cp-card__desc">{cert.desc}</p>
                    <div className="cp-card__footer">
                      <span className="cp-card__verified">SYS.VERIFIED</span>
                      <span className="cp-card__view">
                        VIEW FULL <ArrowLeft size={11} style={{ transform: "rotate(180deg)" }} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="cp-lb-bg"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="cp-lb"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cp-lb__close" onClick={() => setSelectedCert(null)} aria-label="Close">
                <X size={17} />
              </button>

              <div className="cp-lb__img-wrap">
                <img src={selectedCert.image} alt={selectedCert.title} className="cp-lb__img" />
              </div>

              <div className="cp-lb__body">
                <p className="cp-lb__issuer">{selectedCert.issuer}</p>
                <h2 className="cp-lb__title">{selectedCert.title}</h2>
                <p className="cp-lb__desc">{selectedCert.desc}</p>
                <div className="cp-lb__actions">
                  <span className="cp-lb__date"><Calendar size={13} /> {selectedCert.date}</span>
                  {selectedCert.link && selectedCert.link !== "#" && (
                    <a
                      href={selectedCert.link} target="_blank" rel="noopener noreferrer"
                      className="cp-lb__verify"
                    >
                      Verify Credential <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
