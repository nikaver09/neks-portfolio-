import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, GraduationCap, Calendar, MapPin, Award, CheckCircle2, ImageIcon, X, BookOpen, ExternalLink } from "lucide-react";

// --- DATA ---
const tourData = {
  subtitle: "A detailed tour through my academic milestones, technical achievements, and continuous learning path.",
  milestones: [
    {
      type: "Tour Companies",
      title: "UP Cebu Business Incubator for Information Technology (UP CeBu InIT)",
      institution: "University of the Philippines Cebu",
      location: "Cebu City, Philippines",
      date: "2025 — Present",
      details: [
        "A program at University of the Philippines Cebu, established in 2010 with the Department of Science and Technology (DOST), to support startups and innovators in the IT sector. It provides services like mentorship, training, venture financing, and referrals to help businesses grow from idea development to commercialization."
      ],
      journalEntry: "Observations: I observed that they value innovation and try to help achieve and provide sustainable solutions to problems thus helping startups and students by providing guidance.\n\nLearnings: I learned to be resourceful with my ideas to solve a problem like using current trends to inefficient systems to improve it.",
      floatingImage: "/images2/cebuinit.jpg", 
      viewerImage: "/images2/pic23.png",   
      link: { url: "https://upcebu.edu.ph", label: "Visit Portal" }
    },
    {
      type: "Tour Companies",
      title: "Dynata Philippines Inc.",
      institution: "Tech Bootcamp",
      location: "Remote / Online",
      date: "2021 — 2022",
      details: [
        "Completed 500+ hours of rigorous coding tasks focusing on JavaScript frameworks. Deep-dived into building production-ready, accessible, and responsive applications while mastering server management, RESTful API design, and database queries."
      ],
      journalEntry: "Observations: The pacing was intense but perfectly mirrored real-world agile development cycles. \n\nLearnings: Building RESTful APIs from scratch taught me resilience and built the exact muscle memory required to ship production-ready applications.",
      floatingImage: "/images2/dynata.png", 
      viewerImage: "/images2/dynatass.jfif",   
      link: { url: "https://your-certificate-url.com", label: "View Credential" }
    },
    {
      type: "Tour Companies",
      title: "Rivan IT Cebu",
      institution: "Various Tech Firms & Startups",
      location: "Cebu City, Cebu",
      date: "Day 2",
      details: [
        "Interacted with senior software engineers and learned about real-world agile workflows. Toured modern startup offices and observed enterprise-level server infrastructures while attending seminars on the growing tech industry in the Visayas region."
      ],
      journalEntry: "Observations: Walking through Cebu IT Park, the energy of the tech industry was palpable. Teams collaborated seamlessly across modern open-office layouts.\n\nLearnings: It deeply validated my passion for the IT field and showed me the massive infrastructure required to keep global apps running.",
      floatingImage: "/images2/rivan.png", 
      viewerImage: "/images2/rivan.jfif",   
      link: { url: "https://cebuitpark.com", label: "Explore IT Park" }
    },
    {
      type: "Tour Companies",
      title: "Mata Technologies Inc.",
      institution: "Bohol Conservation Center",
      location: "Bohol, Philippines",
      date: "Day 2",
      details: [
        "Studied local conservation efforts for the endangered Philippine Tarsier.",
        "Analyzed the unique geological formations of the Chocolate Hills.",
        "Discussed sustainable tourism practices and the role of technology in environmental monitoring."
      ],
      journalEntry: "Our trip to Bohol was a stark, beautiful contrast to the concrete tech hubs of Cebu. Seeing the tiny, delicate Tarsiers up close and witnessing the vast expanse of the Chocolate Hills reminded me of the broader world our technology serves.",
      floatingImage: "/images2/mata1.png", 
      viewerImage: "/images2/matas666.jpg",   
      link: { url: "https://tourism.bohol.gov.ph", label: "Discover Bohol" }
    },
    {
      type: "Tour Companies",
      title: "T.A.R.S.I.E.R 117",
      institution: "National Historical Commission",
      location: "Cebu City, Cebu",
      date: "Day 3",
      details: [
        "Visited Magellan's Cross and the Basilica Minore del Santo Niño.",
        "Documented centuries-old architecture and urban planning.",
        "Gained a deeper understanding of the socio-cultural foundations of the Philippines."
      ],
      journalEntry: "To understand the future, you have to look at the past. Standing in front of Magellan's Cross and walking the halls of the Basilica, we were tracing the very roots of Philippine history. We documented the colonial architecture and discussed how historic cities adapt to modern infrastructure.",
      floatingImage: "/images2/tarshier.png", 
      viewerImage: "/images2/tars.jfif",   
      link: { url: "https://www.cebucity.gov.ph", label: "Learn About Bohol" }
    }
  ]
};

// Raw Gallery Items Source
const baseGalleryItems = [
  { id: 1,  src: "/images2/bohol1.jpg" },
  { id: 2,  src: "/images2/bohol2.jpg" },
  { id: 3,  src: "/images2/bohol3.jpg" },
  { id: 4,  src: "/images2/cebuj1.png" },
  { id: 5,  src: "/images2/cebuj2.png" },
  { id: 6,  src: "/images2/cebuj3.png" },
  { id: 7,  src: "/images2/pic4.jpg" },
  { id: 8,  src: "/images2/pic5.jpg" },
  { id: 9,  src: "/images2/airport1.jfif" },
  { id: 10, src: "/images2/cebuairport1.jfif" },
  { id: 11, src: "/images2/chocohand.jfif" },
  { id: 12, src: "/images2/lauron1.jfif" },
  { id: 13, src: "/images2/lobocriver1.jfif" },
  { id: 14, src: "/images2/macdo1.jfif" },
  { id: 15, src: "/images2/ua1.jfif" }
];

// --- 3D MATHEMATICAL SPHERE MAPPING ---
const globeItems = [];
for (let i = 0; i < 3; i++) {
  globeItems.push({ ...baseGalleryItems[i], rotY: i * 120, rotX: 38, id: `g-1-${i}` });
}
for (let i = 0; i < 4; i++) {
  globeItems.push({ ...baseGalleryItems[3 + i], rotY: i * 90, rotX: 18, id: `g-2-${i}` });
}
for (let i = 0; i < 4; i++) {
  globeItems.push({ ...baseGalleryItems[7 + i], rotY: (i * 90) + 45, rotX: 0, id: `g-3-${i}` });
}
for (let i = 0; i < 3; i++) {
  globeItems.push({ ...baseGalleryItems[11 + i], rotY: i * 120 + 30, rotX: -18, id: `g-4-${i}` });
}
globeItems.push({ ...baseGalleryItems[14], rotY: 0, rotX: -38, id: `g-5-0` });


// --- ACTION BUTTONS COMPONENT ---
const ActionButtons = ({ item, onOpenImage }) => {
  return (
    <div className="flex items-center gap-3">
      {item.link && (
        <a 
          href={item.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-transparent border border-zinc-700/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-200"
        >
          <ExternalLink size={18} />
        </a>
      )}
      {item.viewerImage && (
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onOpenImage(item);
          }}
          className="flex items-center justify-center w-[42px] h-[42px] rounded-xl bg-[#e8ff47] hover:bg-[#cbe036] text-zinc-950 transition-all duration-200 shadow-md"
        >
          <ImageIcon size={18} />
        </button>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function EducationalTourPage({ onBack }) {
  const [selectedEntry, setSelectedEntry] = useState(null); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  const [rotation, setRotation] = useState({ x: -10, y: 0 }); 
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  useEffect(() => {
    if (selectedEntry || selectedImage || selectedGalleryItem) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedEntry, selectedImage, selectedGalleryItem]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    hasDragged.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      hasDragged.current = true;
    }

    setRotation(prev => ({
      x: Math.max(-65, Math.min(65, prev.x - deltaY * 0.35)), 
      y: prev.y + deltaX * 0.35
    }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    hasDragged.current = false;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      hasDragged.current = true;
    }

    setRotation(prev => ({
      x: Math.max(-65, Math.min(65, prev.x - deltaY * 0.35)),
      y: prev.y + deltaX * 0.35
    }));
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative font-sans selection:bg-[#e8ff47] selection:text-neutral-950">
      
      {/* --- MODAL 1: PREMIUM SMOOTH TRANSITION JOURNAL --- */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 ease-out" onClick={() => setSelectedEntry(null)} />
          <div className="relative bg-[#111113] border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-90 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="p-5 border-b border-zinc-800/60 flex items-start justify-between gap-4 shrink-0 relative">
              <div className="pr-12">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e8ff47] mb-2 block font-bold">
                  Journal Entry // {selectedEntry.date}
                </span>
                <h2 className="font-sans font-bold text-xl text-white tracking-tight leading-tight">
                  {selectedEntry.title}
                </h2>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="absolute top-5 right-5 p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors flex-shrink-0">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 overflow-hidden relative bg-[#0f0f11]">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-[#e8ff47] shrink-0 mt-0.5" />
                <p className="font-sans text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                  {selectedEntry.journalEntry}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: PREMIUM SMOOTH TRANSITION DOCUMENT VIEWER --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 ease-out" onClick={() => setSelectedImage(null)} />
          <div className="relative bg-[#0a0a0a] border border-zinc-800 rounded-2xl w-full max-w-xl shadow-2xl z-10 flex flex-col p-5 overflow-hidden animate-in fade-in zoom-in-90 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex items-start justify-between gap-4 shrink-0 mb-4 relative">
              <h2 className="font-sans font-bold text-lg text-white tracking-tight pr-12">
                {selectedImage.title}
              </h2>
              <button onClick={() => setSelectedImage(null)} className="absolute top-0 right-0 p-1 bg-transparent border border-[#e8ff47] hover:bg-[#e8ff47]/10 text-zinc-300 hover:text-[#e8ff47] rounded-md transition-colors shrink-0">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex justify-center items-center rounded-xl overflow-hidden bg-[#0e0e10]">
              <img src={selectedImage.viewerImage} alt={selectedImage.title} className="max-w-full max-h-[55vh] object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: PREMIUM SMOOTH TRANSITION GLOBE CAROUSEL VIEWER --- */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 ease-out" onClick={() => setSelectedGalleryItem(null)} />
          <div className="relative bg-[#0a0a0a] border border-zinc-800 rounded-2xl w-full max-w-xl shadow-2xl z-10 flex flex-col p-5 overflow-hidden animate-in fade-in zoom-in-90 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex items-start justify-between gap-4 shrink-0 mb-4 relative">
              <div>
                <h2 className="font-sans font-bold text-lg text-white tracking-tight pr-12">
                  {selectedGalleryItem.title || "Gallery Zoom"}
                </h2>
                {selectedGalleryItem.subtitle && (
                  <p className="text-[#e8ff47] font-mono text-[10px] mt-0.5 uppercase tracking-widest">{selectedGalleryItem.subtitle}</p>
                )}
              </div>
              <button onClick={() => setSelectedGalleryItem(null)} className="absolute top-0 right-0 p-1 bg-transparent border border-[#e8ff47] hover:bg-[#e8ff47]/10 text-zinc-300 hover:text-[#e8ff47] rounded-md transition-colors shrink-0">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex justify-center items-center rounded-xl overflow-hidden bg-[#0e0e10]">
              <img src={selectedGalleryItem.src} alt={selectedGalleryItem.title || "Gallery Asset"} className="max-w-full max-h-[55vh] object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="relative z-10">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#e8ff47 1px, transparent 1px), linear-gradient(90deg, #e8ff47 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative z-10">
          <button onClick={onBack} className="group flex items-center gap-2 text-zinc-400 hover:text-[#e8ff47] transition-colors duration-200 mb-12 font-mono text-xs uppercase tracking-widest">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </button>

          <div className="space-y-4 mb-20">
            <h1 className="font-sans font-extrabold text-5xl lg:text-7xl tracking-tight leading-none text-white">
                Cebu-Bohol <span className="text-[#e8ff47]">Educational Tour.</span>
            </h1>
            <p className="font-sans text-zinc-400 text-lg max-w-2xl leading-relaxed">{tourData.subtitle}</p>
          </div>

          <div className="space-y-20 relative before:absolute before:inset-y-0 before:left-4 lg:before:left-8 before:w-px before:bg-zinc-800">
            {tourData.milestones.map((item, index) => (
              <div key={index} className="relative pl-12 lg:pl-20">
                <div className="absolute left-2 lg:left-6 top-1.5 w-5 h-5 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 bg-[#e8ff47] rounded-full" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  <div className="w-full lg:w-7/12 flex flex-col gap-6 order-2 lg:order-1">
                    <div>
                      <h3 className="font-sans font-bold text-2xl md:text-3xl text-white leading-tight mb-4">{item.title}</h3>
                      {item.details.map((desc, dIdx) => (
                        <p key={dIdx} className="font-sans text-[15px] text-zinc-400 leading-relaxed">{desc}</p>
                      ))}
                    </div>
                    <ActionButtons item={item} onOpenImage={setSelectedImage} />
                    <div onClick={() => setSelectedEntry(item)} className="mt-2 bg-[#111113] border border-zinc-800/60 rounded-xl p-5 sm:p-6 cursor-pointer hover:border-zinc-700 transition-colors group shadow-lg">
                      <h4 className="font-sans font-bold text-lg text-white mb-3">Journal Entry</h4>
                      <p className="font-sans text-sm text-zinc-400 leading-relaxed line-clamp-4 whitespace-pre-wrap">{item.journalEntry}</p>
                      <span className="text-xs font-semibold text-zinc-500 group-hover:text-[#e8ff47] transition-colors mt-3 inline-block">Read full entry &rarr;</span>
                    </div>
                  </div>

                  {item.floatingImage && (
                    <div className="w-full lg:w-5/12 shrink-0 rounded-xl overflow-hidden border-r-[6px] border-[#e8ff47] shadow-2xl relative cursor-default order-1 lg:order-2 min-h-[240px] bg-zinc-900/40 flex items-center justify-center">
                      <img src={item.floatingImage} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- GEOMETRIC 3D GLOBE GALLERY VIEW WITH CORE TEXT --- */}
      <div className="relative w-full overflow-hidden bg-[#070708] py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 mb-12 relative z-50 text-center">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl tracking-tight text-white drop-shadow-lg">
            Tour <span className="text-[#e8ff47]">Highlights</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-lg mx-auto">Click and drag to orbit the 3D Sphere. Click on any frame to expand it.</p>
        </div>

        <div
          className={`relative w-full h-[500px] flex items-center justify-center overflow-hidden touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleMouseUp}
        >
          {/* CENTER BACKGROUND BRAND TEXT */}
          <div className="absolute pointer-events-none select-none text-center z-0 animate-pulse" style={{ animationDuration: '3s' }}>
            <h3 className="font-sans font-black text-xl md:text-2xl text-white tracking-tight uppercase leading-tight drop-shadow-[0_0_25px_rgba(232,255,71,0.2)]">
              Da best ka <br />
              <span className="text-[#e8ff47]">Cebu-Bohol</span>
            </h3>
          </div>

          <div style={{ perspective: '1400px' }} className="w-full h-full flex items-center justify-center pointer-events-none z-10">
            <div
              className="relative w-[110px] h-[155px] md:w-[130px] md:h-[185px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              {globeItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => !isDragging && setSelectedGalleryItem(item)}
                  className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.85)] border border-zinc-800/80 pointer-events-auto hover:border-[#e8ff47] transition-colors bg-zinc-900 group"
                  style={{
                    transform: `rotateY(${item.rotY}deg) rotateX(${item.rotX}deg) translateZ(320px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <img src={item.src} alt={item.title || "Gallery Item"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" draggable="false" />
                  {item.title && (
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent">
                      <h3 className="text-[#e8ff47] font-sans text-[10px] font-bold truncate leading-none">{item.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}