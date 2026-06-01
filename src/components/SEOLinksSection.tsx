import { cn } from "@/lib/utils";

const row1 = [
  { title: "Nos tops catégories", links: ["Skis alpins", "Chaussures de ski alpin", "Snowboard occasion", "Skis de randonnée", "Sacs de randonnée"] },
  { title: "Nos tops marques", links: ["Rossignol", "Dynastar", "Salomon", "Head", "Atomic"] },
  { title: "Par gamme", links: ["Rossignol Hero Elite", "Rossignol Experience", "Salomon S/Max", "Salomon QST", "Rossignol React"] },
  { title: "Ski-Snow", links: ["Skis Freestyle", "Skis Femme", "Skis Enfants", "Splitboard", "Combinaison Ski"] },
  { title: "Vélo", links: ["VTT", "Vélos de route", "VTT Femme Occasion", "Vélos Enfants", "Vélos électriques"] },
];

const row2 = [
  { title: "Rossignol", links: ["Pursuit", "Nova", "Sprayer", "Blackops", "React"] },
  { title: "Dynastar", links: ["Intense", "Cham", "Team", "Legend", "Powertrack"] },
  { title: "Salomon S/Max", links: ["S/Max 4", "S/Max 8", "S/Max 12", "S/Max Blast", "S/Max X7"] },
  { title: "Plus de marques", links: ["Blizzard", "Millet", "Patagonia", "Scarpa", "Völkl"] },
  { title: "Nos conseils", links: ["Choisir ses skis alpins", "Entretenir ses vêtements de ski", "Choisir sa veste de ski", "Choisir ses chaussures de ski", "Choisir la taille de son vélo"] },
];

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#262f2c", textTransform: "uppercase", marginBottom: 12, margin: "0 0 12px" }}>
        {title}
      </p>
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="hover:text-[#262f2c]"
          style={{ display: "block", fontSize: 13, color: "#9ca3af", lineHeight: "1.8", textDecoration: "none" }}
        >
          {link}
        </a>
      ))}
    </div>
  );
}

export function SEOLinksSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(className)}
      style={{ padding: "32px 24px", background: "white", borderTop: "1px solid #f0f0f0" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5" style={{ gap: "24px 16px", marginBottom: 24 }}>
        {row1.map((col) => (
          <LinkColumn key={col.title} title={col.title} links={col.links} />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5" style={{ gap: "24px 16px" }}>
        {row2.map((col) => (
          <LinkColumn key={col.title} title={col.title} links={col.links} />
        ))}
      </div>
    </section>
  );
}
