import { cn } from "@/lib/utils";

export function NewsletterSection({ className }: { className?: string }) {
  return (
    <section className={cn(className)} style={{ padding: "32px 24px", background: "white" }}>
      <div
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: 4,
          padding: "40px 24px",
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#262f2c", margin: 0 }}>
          Devenez membre de la communauté Campsider
        </h2>
        <p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>
          Et recevez nos bons plans, réductions, conseils directement sur votre boite mail !
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full" style={{ maxWidth: 480 }}>
          <input
            type="email"
            placeholder="Email"
            className="flex-1"
            style={{ border: "1px solid #e5e5e5", borderRadius: 4, padding: "10px 16px", fontSize: 14, outline: "none", width: "100%" }}
          />
          <button
            style={{ background: "#be4a09", color: "white", borderRadius: 4, padding: "10px 24px", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            S&apos;inscrire
          </button>
        </div>
      </div>
    </section>
  );
}
