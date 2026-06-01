import { cn } from "@/lib/utils";

const footerColumns = [
  { title: "À-PROPOS", links: ["Comment ça marche ?", "On recrute !", "Mentions légales", "Politique de confidentialité", "Devenir vendeur partenaire"] },
  { title: "AIDE", links: ["Aide acheteur", "Aide vendeur", "Comment vendre ?", "Livraison", "FAQ", "Contact"] },
  { title: "ACHETER", links: ["Sac de randonnée", "Montre GPS", "Tente", "Veste de randonnée", "Chaussure de randonnée", "Sac de couchage"] },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn(className)} style={{ backgroundColor: "#262f2c", color: "#f4f2ee" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "40px 24px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 24, fontWeight: 800, color: "#f4f2ee", margin: 0 }}>Campsider</p>
        <p
          style={{
            fontSize: 14,
            color: "rgba(244,242,238,0.75)",
            lineHeight: 1.6,
            marginTop: 12,
            maxWidth: 500,
            marginBottom: 0,
          }}
        >
          Campsider est la 1ère marketplace dédiée aux équipements de sport outdoor d&apos;occasion (sports d&apos;hiver, randonnée, trail-running, escalade et alpinisme). Notre mission ? Rendre accessible l&apos;aventure à tous, et protéger nos terrains de jeu en privilégiant la seconde main.
        </p>
      </div>

      <div style={{ borderTop: "1px solid rgba(244,242,238,0.15)", margin: "24px 0" }} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: "24px 48px" }}>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#f4f2ee",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
                margin: "0 0 16px",
              }}
            >
              {col.title}
            </p>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-[#f4f2ee]"
                style={{ display: "block", fontSize: 14, color: "rgba(244,242,238,0.65)", lineHeight: 2, textDecoration: "none" }}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: "1px solid rgba(244,242,238,0.15)",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" aria-label="Instagram" style={{ color: "#f4f2ee", display: "flex" }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" aria-label="Facebook" style={{ color: "#f4f2ee", display: "flex" }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
        <p style={{ fontSize: 12, color: "rgba(244,242,238,0.5)", margin: 0 }}>Mastercard · Visa · PayPal</p>
      </div>

      <p style={{ fontSize: 13, color: "rgba(244,242,238,0.4)", textAlign: "center", marginTop: 16 }}>
        © 2026 Campsider
      </p>
      </div>
    </footer>
  );
}
