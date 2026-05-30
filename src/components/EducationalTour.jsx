import { useState } from "react";
import { ArrowUpRight, X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function EducationalTour() {
  const [activeId, setActiveId] = useState(1); 
  const [selectedTour, setSelectedTour] = useState(null); // Holds the currently opened "folder"
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks which image inside the folder we are looking at

  // We now use 'coverImg' for the main card, and an 'images' array for the folder contents
  const gallery = [
    { 
      id: 1, 
      title: "Cebu Tour", 
      subtitle: "Philippines", 
      coverImg: "/images2/cebu.jpg", 
      images: [
        "/images2/pic4.jpg",
        "/images2/pic5.jpg",
        "/images2/pic6.jpg",
        "/images2/pic7.jpg",
        "/images2/pic8.jpg",
        "/images2/cebuj1.png",
        "/images2/cebuj2.png",
        "/images2/cebuj3.png",
        "/images2/cebuj4.png",
        "/images2/pic9.jpg",
        "/images2/pic10.jpg",
        "/images2/pic12.jpg",
        "/images2/pic14.jpg",
        "/images2/pic15.jpg",
        "/images2/pic16.jpg",
        "/images2/pic17.jpg",
      ]
    },
    { 
      id: 2, 
      title: "Bohol Tour", 
      subtitle: "Philippines", 
      coverImg: "/images2/bohol.jpg", 
      images: [
        "/images2/bohol1.jpg",
        "/images2/bohol2.jpg",
        "/images2/bohol3.jpg",
        "/images2/boholj1.jfif",
        "/images2/boholj2.jfif",
      ]
    },
  ];

  const handleCardClick = (item) => {
    if (activeId === item.id) {
      // Open the lightbox and reset the index to the first image in the folder
      setSelectedTour(item);
      setCurrentIndex(0);
    } else {
      setActiveId(item.id);
    }
  };

  // Functions to navigate through the folder's images
  const nextImage = (e) => {
    e.stopPropagation(); // Prevents the click from closing the modal
    setCurrentIndex((prev) => (prev === selectedTour.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? selectedTour.images.length - 1 : prev - 1));
  };

  return (
    <>
      <section id="educational-tour" className="py-24 bg-ink relative border-t border-muted/20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <h2 className="font-heading font-medium text-ghost tracking-widest uppercase text-xs">
                  Learning Beyond Borders
                </h2>
              </div>
              
              <h3 className="font-display text-5xl md:text-7xl font-bold text-snow leading-tight">
                EDUCATIONAL
                <br />
                <span className="text-accent">TOUR</span>
              </h3>
            </div>
            
            <p className="text-ghost text-lg leading-relaxed max-w-sm md:text-right">
              Click to expand a tour. Click again to view the full image album.
            </p>
          </div>

          {/* Expandable Accordion Gallery */}
          <div className="flex w-full h-[450px] md:h-[600px] gap-2 md:gap-4">
            {gallery.map((item) => {
              const isActive = activeId === item.id;
              
              return (
                <div 
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`relative rounded-full md:rounded-[40px] overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive ? "flex-[10] md:flex-[12]" : "flex-1 md:flex-[2]"
                  }`}
                >
                  <img
                    src={item.coverImg} // Changed to coverImg
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  <div 
                    className={`absolute bottom-0 left-0 w-full p-6 md:p-10 flex items-center gap-4 md:gap-6 transition-all duration-500 delay-150 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-accent/20 backdrop-blur-md border border-accent/50 flex items-center justify-center text-accent">
                      <MapPin size={24} />
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-heading font-bold text-snow text-xl md:text-3xl tracking-wider uppercase whitespace-nowrap mb-1 md:mb-2">
                        {item.title}
                      </h4>
                      <p className="text-ghost text-sm md:text-lg font-medium whitespace-nowrap">
                        {item.subtitle} • {item.images.length} Photos
                      </p>
                    </div>
                    
                    <div className="hidden md:flex w-12 h-12 shrink-0 rounded-full bg-white/5 backdrop-blur-md items-center justify-center text-snow hover:bg-accent hover:text-ink transition-colors">
                      <ArrowUpRight size={24} />
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
            className="absolute top-6 right-6 md:top-10 md:right-10 text-ghost hover:text-accent transition-colors duration-200 z-[101]"
            onClick={() => setSelectedTour(null)}
          >
            <X size={40} strokeWidth={1.5} />
          </button>

          {/* Previous Arrow */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-[#151515] text-snow flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-all duration-300 z-[101]"
            onClick={prevImage}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Arrow */}
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-[#151515] text-snow flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-all duration-300 z-[101]"
            onClick={nextImage}
          >
            <ChevronRight size={32} />
          </button>

          {/* Image & Text Container */}
          <div 
            className="relative max-w-6xl w-full flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedTour.images[currentIndex]} 
              alt={`${selectedTour.title} image ${currentIndex + 1}`} 
              className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10 transition-opacity duration-300"
            />
            
            <div className="mt-8 text-center">
              <h4 className="font-heading font-bold text-snow text-2xl md:text-3xl tracking-widest uppercase mb-2">
                {selectedTour.title}
              </h4>
              <p className="text-accent tracking-widest uppercase mb-4">{selectedTour.subtitle}</p>
              
              {/* Image Counter (e.g., 1 / 5) */}
              <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-ghost text-sm font-mono tracking-widest">
                {currentIndex + 1} / {selectedTour.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}