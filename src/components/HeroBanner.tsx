export function HeroBanner() {
  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[16/5]"
      style={{ backgroundColor: "#f5f0e8" }}
    >
      <img
        src="/images/hero/slider-1-desktop.jpg"
        alt="L'expert des équipements de sport d'occasion"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "contain", objectPosition: "center" }}
      />
    </div>
  );
}
