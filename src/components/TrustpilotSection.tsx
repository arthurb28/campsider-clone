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
    <section
      className="flex flex-col md:flex-row items-start"
      style={{
        padding: "32px 24px",
        background: "#ffffff",
        gap: "32px",
        maxWidth: "1310px",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Left block */}
      <div style={{ flexShrink: 0 }}>
        <p
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#262f2c",
            margin: "0 0 4px 0",
          }}
        >
          Excellent
        </p>
        <p
          style={{
            color: "#00b67a",
            fontSize: "24px",
            letterSpacing: "2px",
            margin: "0 0 6px 0",
          }}
        >
          ★★★★★
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            margin: "0 0 8px 0",
          }}
        >
          Basé sur{" "}
          <strong>
            <u>4 809 avis</u>
          </strong>
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#191919",
            margin: "0 0 8px 0",
          }}
        >
          ★ Trustpilot
        </p>
        <a
          href="#"
          style={{
            fontSize: "13px",
            textDecoration: "underline",
            color: "#262f2c",
            display: "block",
            marginTop: "8px",
          }}
        >
          Nos avis 5 étoiles
        </a>
      </div>

      {/* Right block */}
      <div
        className="hide-scrollbar"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflowX: "auto",
          minWidth: 0,
        }}
      >
        {/* Left arrow */}
        <button
          aria-label="Avis précédents"
          className="hidden md:flex"
          style={{
            flexShrink: 0,
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            border: "1px solid #e5e5e5",
            background: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={16} color="#262f2c" />
        </button>

        {/* Review cards */}
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              flex: "0 0 220px",
              border: "1px solid #e5e5e5",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minWidth: 0,
            }}
          >
            {/* Top row: stars + badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#00b67a", fontSize: "16px" }}>
                ★★★★★
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  marginLeft: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                ✓ Sur invitation
              </span>
            </div>

            {/* Title */}
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#262f2c",
                margin: 0,
              }}
            >
              {review.title}
            </p>

            {/* Body */}
            <p
              style={{
                fontSize: "13px",
                color: "#262f2c",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {review.body}
            </p>

            {/* Footer */}
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                margin: 0,
              }}
            >
              {review.author}, {review.time}
            </p>
          </div>
        ))}

        {/* Right arrow */}
        <button
          aria-label="Avis suivants"
          className="hidden md:flex"
          style={{
            flexShrink: 0,
            width: "36px",
            height: "36px",
            borderRadius: "9999px",
            border: "1px solid #e5e5e5",
            background: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={16} color="#262f2c" />
        </button>
      </div>
    </section>
  );
}
