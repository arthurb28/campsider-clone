import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const articles = [
  { id: "1", title: "Nos conseils d'achat pour un vélo de route", imageSrc: "/images/blog/velo-de-route.png" },
  { id: "2", title: "Quelles sont les aides à l'achat d'un vélo électrique ?", imageSrc: "/images/blog/vtt-electrique.jpg" },
  { id: "3", title: "Comment bien choisir ses skis alpins ?", imageSrc: "/images/blog/skis-alpins.jpg" },
];

export function BlogSection({ className }: { className?: string }) {
  return (
    <section className={cn(className)} style={{ background: "white", paddingBottom: 32 }}>
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 500, color: "#262f2c" }}>Nos meilleurs conseils</span>
          <span style={{ fontSize: 14, color: "#9ca3af", marginLeft: 8 }}>On vous dit tout</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={{
              background: "#be4a09",
              color: "white",
              borderRadius: 4,
              padding: "6px 16px",
              fontSize: 14,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Voir plus
          </button>
          <button
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 4,
              padding: "6px 8px",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={18} color="#262f2c" />
          </button>
          <button
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 4,
              padding: "6px 8px",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronRight size={18} color="#262f2c" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 16, padding: "0 24px" }}>
        {articles.map((article) => (
          <div key={article.id} style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}>
            <img
              src={article.imageSrc}
              alt={article.title}
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            />
            <p style={{ fontSize: 14, fontWeight: 500, color: "#262f2c", padding: "8px 0 4px", lineHeight: 1.4 }}>
              {article.title}
            </p>
            <span style={{ fontSize: 13, color: "#262f2c", textDecoration: "underline" }}>Lire plus</span>
          </div>
        ))}
      </div>
    </section>
  );
}
