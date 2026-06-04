import type { CSSProperties } from "react";

interface SelectionItem {
  id: string;
  tag: string;
  label: string;
  subtitle: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
}

const selections: SelectionItem[] = [
  { id: "velos-e", tag: "⚡ ROULEZ JEUNESSE", label: "SÉLECTION", subtitle: "Nos vélos électriques", caption: "Vélos électriques", imageSrc: "/images/selections/velos-electriques.jpg", imageAlt: "Vélos électriques" },
  { id: "skis-r", tag: "🎿 À VOUS LES PISTES", label: "TOP MARQUES", subtitle: "Nos skis alpins Rossignol", caption: "Sélection Skis Rossignol", imageSrc: "/images/selections/skis-rossignol.jpg", imageAlt: "Sélection Skis Rossignol" },
  { id: "vtt-bp", tag: "⚡ PETITS PRIX", label: "BONS PLANS", subtitle: "VTT à moins de 1500€", caption: "VTT < 1500€", imageSrc: "/images/selections/vtt-pas-cher.jpg", imageAlt: "VTT < 1500€" },
  { id: "skis-d", tag: "🎿 À VOUS LES PISTES", label: "DESTOCKAGE", subtitle: "Nos skis alpins Jusqu'à -70%", caption: "Bons plans skis alpins", imageSrc: "/images/selections/skis-bons-plans.jpg", imageAlt: "Bons plans skis alpins" },
  { id: "route-tm", tag: "⚡ JUSQU'À -40%", label: "TOP MARQUES", subtitle: "Sélection Vélos de route", caption: "Top marques vélos de route", imageSrc: "/images/selections/velos-route-top.jpg", imageAlt: "Top marques vélos de route" },
];

export function SelectionSection() {
  return (
    <section className="bg-white" style={{ overflow: "hidden" }}>
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 500, color: "#262f2c", margin: 0 }}>Notre sélection du moment</h2>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "2px 0 0" }}>Rien que pour vous</p>
        </div>
      </div>
      <div
        style={{
          padding: "0 24px 32px",
          display: "flex",
          gap: 12,
          overflowX: "auto",
          width: "100%",
          minWidth: 0,
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        } as CSSProperties}
      >
        {selections.map((item) => (
          <div key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 clamp(170px, 55vw, 240px)" }}>
            <div
              style={{
                flex: "0 0 clamp(170px, 55vw, 240px)",
                height: 180,
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#262f2c",
                textAlign: "center",
                paddingTop: 8,
              }}
            >
              {item.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
