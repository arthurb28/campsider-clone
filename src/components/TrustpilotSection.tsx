import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    title: "Merci très bon site",
    body: "Merci très bon site",
    author: "Fernando Aguiar",
    time: "Il y a 17 heures",
  },
  {
    id: 2,
    title: "Vélo en très bon état",
    body: "Vélo en très bon état, conseil téléphonique avant achat de qualité",
    author: "Elise G",
    time: "Il y a 18 heures",
  },
  {
    id: 3,
    title: "Très bien rapport qualité prix",
    body: "Très bien rapport qualité prix service je recommande",
    author: "Asmat Mohammed",
    time: "Il y a 1 jour",
  },
];

export function TrustpilotSection() {
  return (
    <section style={{ padding: "24px 24px", background: "#ffffff", width: "100%", overflow: "hidden" }}>
      <div style={{ maxWidth: "1310px", margin: "0 auto", width: "100%" }}>

        {/* Score — ligne horizontale compacte */}
        <div className="flex items-center" style={{ gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#262f2c", margin: 0 }}>Excellent</p>
            <p style={{ color: "#00b67a", fontSize: "18px", letterSpacing: "2px", margin: "2px 0 0" }}>★★★★★</p>
          </div>
          <div style={{ width: "1px", height: "36px", background: "#e5e5e5", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
              Basé sur <strong><u>4 809 avis</u></strong>
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#191919", margin: "2px 0 0" }}>★ Trustpilot</p>
          </div>
        </div>

        {/* Cartes — scroll horizontal, cartes adaptées au mobile */}
        <div
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            width: "100%",
            minWidth: 0,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                flex: "0 0 clamp(200px, 70vw, 260px)",
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#00b67a", fontSize: "14px", letterSpacing: "1px" }}>★★★★★</span>
                <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap" }}>✓ Sur invitation</span>
              </div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#262f2c", margin: 0 }}>{review.title}</p>
              <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.5, margin: 0 }}>{review.body}</p>
              <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{review.author}, {review.time}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
