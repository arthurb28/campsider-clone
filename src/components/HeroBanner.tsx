"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/images/hero/slider-1-desktop.jpg", alt: "L'expert des équipements de sport d'occasion" },
  { src: "/images/hero/slider-2-desktop.png", alt: "L'expert des équipements de sport d'occasion" },
];
const SLIDE_COUNT = SLIDES.length;
const AUTO_DELAY = 5000; // millisecondes entre chaque slide

export function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Avance automatique
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

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", backgroundColor: "#f5f0e8" }}>

      {/* Images en fondu */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="w-full"
          style={{
            display: "block",
            maxHeight: "480px",
            objectFit: "cover",
            objectPosition: "center",
            position: i === activeSlide ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
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
        style={{
          position: "absolute", top: "50%", left: "16px", transform: "translateY(-50%)",
          width: "40px", height: "40px", borderRadius: "9999px",
          background: "rgba(255,255,255,0.9)", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10,
        }}
      >
        <ChevronLeft size={20} color="#262f2c" />
      </button>

      {/* Flèche droite */}
      <button
        onClick={handleNext}
        aria-label="Slide suivant"
        style={{
          position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)",
          width: "40px", height: "40px", borderRadius: "9999px",
          background: "rgba(255,255,255,0.9)", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10,
        }}
      >
        <ChevronRight size={20} color="#262f2c" />
      </button>

      {/* Points de pagination */}
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Aller au slide ${i + 1}`}
            style={{
              width: activeSlide === i ? "24px" : "8px",
              height: "8px",
              borderRadius: activeSlide === i ? "4px" : "9999px",
              background: activeSlide === i ? "#ffffff" : "rgba(255,255,255,0.5)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.2s, border-radius 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
