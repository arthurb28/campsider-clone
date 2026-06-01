import { cn } from "@/lib/utils";

const pressItems = [
  { id: "m6", type: "m6" as const, headline: "Campsider dans le 20h" },
  { id: "echos", type: "echos" as const, headline: "Campsider : le site de revente de matériel outdoor" },
  { id: "monde", type: "monde" as const, headline: "Campsider mise sur l'essor des articles d'occasion" },
];

function PressLogo({ type }: { type: "m6" | "echos" | "monde" }) {
  if (type === "m6") {
    return (
      <div style={{ fontSize: 48, fontWeight: 900, color: "#e4051c" }}>
        M<span style={{ fontSize: 32 }}>6</span>
      </div>
    );
  }
  if (type === "echos") {
    return (
      <div style={{ fontSize: 22, fontWeight: 700, color: "#c41e3a", borderBottom: "3px solid #c41e3a" }}>
        Les Echos
      </div>
    );
  }
  return (
    <div style={{ fontSize: 22, fontWeight: 400, fontStyle: "italic", color: "#000" }}>
      Le Monde
    </div>
  );
}

export function PressSection({ className }: { className?: string }) {
  return (
    <section className={cn(className)} style={{ padding: "32px 24px", background: "white" }}>
      <div style={{ paddingBottom: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "#262f2c" }}>Ils parlent de nous</span>
        <span style={{ fontSize: 14, color: "#9ca3af", marginLeft: 8 }}>(et en bien)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 16 }}>
        {pressItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #e5e5e5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 24px 16px",
              gap: 16,
            }}
          >
            <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PressLogo type={item.type} />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#262f2c" }}>{item.headline}</span>
              <span style={{ fontSize: 13, color: "#262f2c", textDecoration: "underline", cursor: "pointer" }}>
                Lire plus
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
