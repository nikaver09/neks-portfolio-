import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function EducationalTour() {
  const [activeId, setActiveId] = useState(1);
  const [selectedTour, setSelectedTour] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gallery = [
    {
      id: 1,
      title: "Cebu Tour",
      subtitle: "Philippines",
      coverImg: "/images2/cebura.jpg",
      images: [
        "/images2/pic4.jpg", "/images2/pic5.jpg", "/images2/pic6.jpg",
        "/images2/pic7.jpg", "/images2/pic8.jpg", "/images2/cebuj1.png",
        "/images2/cebuj2.png", "/images2/cebuj3.png", "/images2/cebuj4.png",
        "/images2/pic9.jpg", "/images2/pic10.jpg", "/images2/pic12.jpg",
        "/images2/pic14.jpg", "/images2/pic15.jpg", "/images2/pic16.jpg",
        "/images2/pic17.jpg",
      ]
    },
    {
      id: 2,
      title: "Bohol Tour",
      subtitle: "Philippines",
      coverImg: "/images2/bohol.jpg",
      images: [
        "/images2/bohol1.jpg", "/images2/bohol2.jpg", "/images2/bohol3.jpg",
        "/images2/boholj1.jfif", "/images2/boholj2.jfif",
      ]
    },
  ];

  const handleCardClick = (item) => {
    if (activeId === item.id) {
      setSelectedTour(item);
      setCurrentIndex(0);
    } else {
      setActiveId(item.id);
    }
  };

  // Memoized navigation functions
  const nextImage = useCallback(() => {
    if (!selectedTour) return;
    setCurrentIndex((prev) => (prev === selectedTour.images.length - 1 ? 0 : prev + 1));
  }, [selectedTour]);

  const prevImage = useCallback(() => {
    if (!selectedTour) return;
    setCurrentIndex((prev) => (prev === 0 ? selectedTour.images.length - 1 : prev - 1));
  }, [selectedTour]);

  // UX Fix: Keyboard navigation & Body scroll lock
  useEffect(() => {
    if (!selectedTour) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden"; // Prevent background scrolling

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedTour(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedTour, nextImage, prevImage]);

  // Performance Optimization: Preload the next image to prevent flicker
  useEffect(() => {
    if (selectedTour) {
      const nextIdx = (currentIndex + 1) % selectedTour.images.length;
      const img = new Image();
      img.src = selectedTour.images[nextIdx];
    }
  }, [currentIndex, selectedTour]);

  return (
    <>
      <section id="educational-tour" className="py-16 md:py-24 bg-ink relative border-t border-muted/20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          {/* Header Section */}
          <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <h2 className="font-heading font-medium text-ghost tracking-widest uppercase text-xs">
                  Learning Beyond Borders
                </h2>
              </div>
              
              <h3 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-snow leading-tight">
                EDUCATIONAL
                <br />
                <span className="text-accent">TOUR</span>
              </h3>
            </div>
            
            <p className="text-ghost text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              Click to expand a tour. Click again to view the full image album.
            </p>
          </div>

          {/* Expandable Accordion Gallery */}
          <div className="flex w-full h-[350px] sm:h-[450px] md:h-[600px] gap-2 md:gap-4">
            {gallery.map((item) => {
              const isActive = activeId === item.id;
              
              return (
                <div 
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`relative rounded-[30px] md:rounded-[40px] overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive ? "flex-[8] sm:flex-[10] md:flex-[12]" : "flex-[2] md:flex-[2]"
                  }`}
                  aria-expanded={isActive}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={item.coverImg}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  {/* Card Content */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 transition-all duration-500 delay-150 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                  >
                    <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-accent/20 backdrop-blur-md border border-accent/50 flex items-center justify-center text-accent">
                      <MapPin size={20} className="md:w-6 md:h-6" />
                    </div>

                    <div className="flex-1 min-w-0"> {/* min-w-0 helps text truncation in flex containers */}
                      <h4 className="font-heading font-bold text-snow text-lg sm:text-xl md:text-3xl tracking-wider uppercase truncate mb-1">
                        {item.title}
                      </h4>
                      <p className="text-ghost text-xs sm:text-sm md:text-lg font-medium truncate">
                        {item.subtitle} • {item.images.length} Photos
                      </p>
                    </div>
                    
                    <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-white/5 backdrop-blur-md items-center justify-center text-snow hover:bg-accent hover:text-ink transition-colors">
                      <ArrowUpRight size={20} className="md:w-6 md:h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Album Slider Modal */}
      {selectedTour && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-xl p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedTour(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-10 md:right-10 text-ghost hover:text-accent transition-colors duration-200 z-[101] p-2"
            onClick={() => setSelectedTour(null)}
            aria-label="Close modal"
          >
            <X size={32} className="md:w-10 md:h-10" strokeWidth={1.5} />
          </button>

          {/* Previous Arrow */}
          <button 
            className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/10 bg-[#151515] text-snow flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-all duration-300 z-[101]"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>

          {/* Next Arrow */}
          <button 
            className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/10 bg-[#151515] text-snow flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-all duration-300 z-[101]"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} className="md:w-8 md:h-8" />
          </button>

          {/* Image & Text Container */}
          <div 
            className="relative max-w-6xl w-full flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedTour.images[currentIndex]} 
              alt={`${selectedTour.title} image ${currentIndex + 1}`} 
              className="w-auto max-w-full max-h-[65vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10 transition-opacity duration-300"
            />
            
            <div className="mt-6 md:mt-8 text-center px-4">
              <h4 className="font-heading font-bold text-snow text-xl md:text-3xl tracking-widest uppercase mb-1 md:mb-2">
                {selectedTour.title}
              </h4>
              <p className="text-accent text-sm md:text-base tracking-widest uppercase mb-3 md:mb-4">
                {selectedTour.subtitle}
              </p>
              
              {/* Image Counter */}
              <div className="inline-block px-3 py-1 md:px-4 rounded-full border border-white/10 bg-white/5 text-ghost text-xs md:text-sm font-mono tracking-widest">
                {currentIndex + 1} / {selectedTour.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}