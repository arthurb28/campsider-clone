import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SelectionItem {
  id: string;
  tag: string;
  label: string;
  subtitle: string;
  caption: string;
  bgColor: string;
  imageSrc: string;
  imageAlt: string;
}

const selections: SelectionItem[] = [
  { id: "velos-e", tag: "⚡ ROULEZ JEUNESSE", label: "SÉLECTION", subtitle: "Nos vélos électriques", caption: "Vélos électriques", bgColor: "#2d5a4e", imageSrc: "/images/selections/velos-electriques.jpg", imageAlt: "Vélos électriques" },
  { id: "skis-r", tag: "🎿 À VOUS LES PISTES", label: "TOP MARQUES", subtitle: "Nos skis alpins Rossignol", caption: "Sélection Skis Rossignol", bgColor: "#3a5a2a", imageSrc: "/images/selections/skis-rossignol.jpg", imageAlt: "Sélection Skis Rossignol" },
  { id: "vtt-bp", tag: "⚡ PETITS PRIX", label: "BONS PLANS", subtitle: "VTT à moins de 1500€", caption: "VTT < 1500€", bgColor: "#4a6741", imageSrc: "/images/selections/vtt-pas-cher.jpg", imageAlt: "VTT < 1500€" },
  { id: "skis-d", tag: "🎿 À VOUS LES PISTES", label: "DESTOCKAGE", subtitle: "Nos skis alpins Jusqu'à -70%", caption: "Bons plans skis alpins", bgColor: "#5b7fa8", imageSrc: "/images/selections/skis-bons-plans.jpg", imageAlt: "Bons plans skis alpins" },
  { id: "route-tm", tag: "⚡ JUSQU'À -40%", label: "TOP MARQUES", subtitle: "Sélection Vélos de route", caption: "Top marques vélos de route", bgColor: "#b8792a", imageSrc: "/images/selections/velos-route-top.jpg", imageAlt: "Top marques vélos de route" },
];

export function SelectionSection() {
  return (
    <section className={cn("bg-white")}>
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
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        } as CSSProperties}
      >
        {selections.map((item) => (
          <div key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 240px" }}>
            <div
              style={{
                flex: "0 0 240px",
                height: 200,
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                cursor: "pointer",
                backgroundColor: item.bgColor,
                width: "100%",
              }}
            >
              {/* Product image positioned on the right */}
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: -8,
                  height: "90%",
                  width: "60%",
                  objectFit: "contain",
                  objectPosition: "bottom right",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: "white",
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{item.subtitle}</div>
                </div>
              </div>
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
