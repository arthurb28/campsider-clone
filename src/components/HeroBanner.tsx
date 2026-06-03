"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/images/hero/slider-1-desktop.jpg", alt: "L'expert des équipements de sport d'occasion" },
  { src: "/images/hero/slider-2-desktop.png", alt: "L'expert des équipements de sport d'occasion" },
];
const SLIDE_COUNT = SLIDES.length;
const AUTO_DELAY = 5000;

export function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, AUTO_DELAY);
    return () => clearInterval(timer);
  }, []);

  function handlePrev() {
    setActiveSlide((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }

  function handleNext() {
    setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? handleNext() : handlePrev();
    touchStartX.current = null;
  }

  return (
    // aspect-[16/7] mobile → image visible entièrement, md:aspect-[16/5] desktop
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[16/5]"
      style={{ backgroundColor: "#f5f0e8" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Images — toutes dans le même espace, centrées, sans crop */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "contain",
            objectPosition: "center",
            opacity: i === activeSlide ? 1 : 0,
            transition: "opacity 0.7s ease",
            zIndex: i === activeSlide ? 1 : 0,
          }}
        />
      ))}

      {/* Flèche gauche */}
      <button
        onClick={handlePrev}
        aria-label="Slide précédent"
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ left: 12, zIndex: 10, width: 36, height: 36, borderRadius: "9999px", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer" }}
      >
        <ChevronLeft size={18} color="#262f2c" />
      </button>

      {/* Flèche droite */}
      <button
        onClick={handleNext}
        aria-label="Slide suivant"
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ right: 12, zIndex: 10, width: 36, height: 36, borderRadius: "9999px", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer" }}
      >
        <ChevronRight size={18} color="#262f2c" />
      </button>

      {/* Points de pagination */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-2" style={{ bottom: 12, zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Aller au slide ${i + 1}`}
            style={{
              width: activeSlide === i ? "20px" : "7px",
              height: "7px",
              borderRadius: activeSlide === i ? "4px" : "9999px",
              background: activeSlide === i ? "#262f2c" : "rgba(0,0,0,0.25)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.2s, border-radius 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
