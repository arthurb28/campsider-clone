"use client";

const categories = [
  { id: "route", label: "Vélos de route", imageSrc: "/images/categories/velos-de-route.jpg" },
  { id: "gravel", label: "Vélos gravel", imageSrc: "/images/categories/velos-gravel.png" },
  { id: "vtt-e", label: "VTT électriques", imageSrc: "/images/categories/vtt-electriques.png" },
  { id: "vtt-m", label: "VTT musculaires", imageSrc: "/images/categories/vtt-musculaires.jpg" },
  { id: "vtc-e", label: "VTC électriques", imageSrc: "/images/categories/vtc-electriques.png" },
  { id: "ville", label: "Vélos ville électriques", imageSrc: "/images/categories/vtc-electriques.png" },
];

export function CategoryCards() {
  return (
    <section
      style={{
        padding: "24px 24px 32px",
        background: "#ffffff",
      }}
    >
      <div
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
        }}
      >
        {categories.map((cat) => (
          <a
            key={cat.id}
            href="#"
            style={{
              flex: "0 0 190px",
              border: "1px solid #e5e5e5",
              background: "#ffffff",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <img
              src={cat.imageSrc}
              alt={cat.label}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "contain",
                padding: "16px",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#262f2c",
                textAlign: "center",
                padding: "8px 4px 12px",
                borderTop: "1px solid #e5e5e5",
              }}
            >
              {cat.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
