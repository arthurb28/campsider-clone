"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        background: "linear-gradient(150deg, #1e3a2f 0%, #2a4a3a 55%, #335544 100%)",
        padding: "110px 24px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(76,128,118,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.92)",
            fontSize: "12px",
            fontWeight: 700,
            padding: "7px 18px",
            borderRadius: "20px",
            marginBottom: "28px",
            letterSpacing: "0.8px",
            border: "1px solid rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        >
          🚴 Reprise de vélo de route
        </span>

        <h1
          style={{
            fontSize: "clamp(30px, 5vw, 54px)",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.12,
            marginBottom: "22px",
            letterSpacing: "-0.5px",
          }}
        >
          Vendez votre vélo de route
          <br />
          au meilleur prix
        </h1>

        <p
          style={{
            fontSize: "clamp(17px, 2.5vw, 21px)",
            color: "rgba(255,255,255,0.78)",
            marginBottom: "44px",
            lineHeight: 1.5,
          }}
        >
          Estimation gratuite sous 48h. Sans engagement.
        </p>

        <a
          href="#formulaire"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#be4a09",
            color: "white",
            padding: "15px 32px",
            borderRadius: "4px",
            fontSize: "17px",
            fontWeight: 700,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#a84008";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#be4a09";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Estimer mon vélo →
        </a>
      </div>
    </section>
  );
}

// ── BARRE DE RÉASSURANCE ──────────────────────────────────────────────────────
const REASSURANCE_ITEMS = [
  "⏱ Estimation sous 48h",
  "🔒 Transaction sécurisée",
  "🚴 Experts vélo",
  "✅ Sans engagement",
];

function ReassuranceBar() {
  return (
    <div
      style={{
        backgroundColor: "#f4f2ee",
        padding: "18px 24px",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {REASSURANCE_ITEMS.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#262f2c",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── COMMENT ÇA MARCHE ─────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    icon: "📝",
    title: "Décrivez votre vélo",
    desc: "Remplissez le formulaire en ligne en quelques minutes : marque, modèle, année, état et photos.",
  },
  {
    num: "02",
    icon: "📞",
    title: "Recevez une offre",
    desc: "Nos experts vous contactent sous 48h avec une estimation personnalisée et sans engagement.",
  },
  {
    num: "03",
    icon: "✨",
    title: "On s'occupe de tout",
    desc: "Campsider gère la vente et la transaction. Vous recevez votre paiement directement.",
  },
];

function HowItWorks() {
  return (
    <section style={{ backgroundColor: "white", padding: "88px 24px" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(24px, 3.5vw, 34px)",
            fontWeight: 800,
            color: "#262f2c",
            marginBottom: "52px",
            letterSpacing: "-0.3px",
          }}
        >
          Vendre son vélo n&apos;a jamais été aussi simple
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "28px" }}
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                backgroundColor: "#f9f9f9",
                border: "1.5px solid #e5e5e5",
                borderRadius: "14px",
                padding: "40px 32px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#d8d8d8",
                  lineHeight: 1,
                  marginBottom: "18px",
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: "#1e3a2f",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  fontSize: "24px",
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#262f2c",
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </div>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FORMULAIRE ────────────────────────────────────────────────────────────────
const FORM_ARGS = [
  {
    icon: "📧",
    title: "Confirmation automatique par email",
    desc: "Accusé de réception immédiat après votre demande.",
  },
  {
    icon: "👤",
    title: "Un expert vous rappelle sous 48h",
    desc: "Notre équipe spécialisée analyse votre dossier et vous contacte rapidement.",
  },
  {
    icon: "💬",
    title: "Devis personnalisé, sans engagement",
    desc: "Estimation 100 % gratuite. Aucune obligation de vendre.",
  },
];

const MARQUES = ["Specialized", "Trek", "Giant", "Cannondale", "BMC", "Pinarello", "Autre"];
const ETATS = [
  { value: "comme_neuf", label: "Comme neuf" },
  { value: "tres_bon", label: "Très bon état" },
  { value: "bon", label: "Bon état" },
  { value: "correct", label: "État correct" },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [photosLabel, setPhotosLabel] = useState("");
  const [factureLabel, setFactureLabel] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    border: `1.5px solid ${errors[name] ? "#ef4444" : "#e5e5e5"}`,
    borderRadius: "6px",
    fontSize: "15px",
    fontFamily: "inherit",
    color: "#262f2c",
    background: "white",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const LABEL: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 800,
    color: "#262f2c",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  };

  const FG: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  };

  function clearError(name: string) {
    setErrors((prev) => ({ ...prev, [name]: false }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};

    for (const name of ["marque", "modele", "annee", "etat", "localisation", "email", "tel"]) {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      if (!el?.value.trim()) newErrors[name] = true;
    }
    const cb = form.elements.namedItem("typeVelo") as HTMLInputElement | null;
    if (!cb?.checked) newErrors["typeVelo"] = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/reprise", {
        method: "POST",
        body: new FormData(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = (await res.json()) as { error?: string };
        setSubmitError(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="formulaire"
      style={{
        backgroundColor: "#f9f9f9",
        padding: "88px 24px",
        borderTop: "1px solid #e5e5e5",
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]"
        style={{ maxWidth: "1360px", margin: "0 auto", gap: "72px", alignItems: "start" }}
      >
        {/* ── Colonne gauche : arguments ── */}
        <div>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#262f2c",
              marginBottom: "14px",
              lineHeight: 1.2,
            }}
          >
            Parlez-nous de votre vélo
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "40px", lineHeight: 1.7 }}>
            Remplissez le formulaire et recevez une estimation gratuite sous 48h, directement
            dans votre boîte mail.
          </p>

          {FORM_ARGS.map((arg) => (
            <div
              key={arg.title}
              style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "28px" }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "white",
                  border: "1.5px solid #e5e5e5",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {arg.icon}
              </div>
              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#262f2c",
                    marginBottom: "3px",
                  }}
                >
                  {arg.title}
                </strong>
                <span style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.5 }}>
                  {arg.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Colonne droite : formulaire ── */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e5e5",
            borderRadius: "16px",
            padding: "44px",
            boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
          }}
        >
          {submitted ? (
            <div
              style={{
                backgroundColor: "#d1fae5",
                border: "1.5px solid #34d399",
                borderRadius: "10px",
                padding: "40px 24px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#065f46",
                  marginBottom: "10px",
                }}
              >
                ✅ Demande envoyée avec succès !
              </h3>
              <p style={{ fontSize: "15px", color: "#047857", lineHeight: 1.7 }}>
                Un expert Campsider vous contactera sous 48h à l&apos;adresse email indiquée.
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#262f2c", marginBottom: "30px" }}>
                Votre demande de reprise
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "18px" }}>

                  {/* ─ Titre section ─ */}
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    Informations sur le vélo
                  </div>

                  {/* Marque */}
                  <div style={FG}>
                    <label style={LABEL}>Marque *</label>
                    <select
                      name="marque"
                      style={fieldStyle("marque")}
                      onChange={() => clearError("marque")}
                    >
                      <option value="">Sélectionnez une marque</option>
                      {MARQUES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Modèle */}
                  <div style={FG}>
                    <label style={LABEL}>Modèle *</label>
                    <input
                      name="modele"
                      type="text"
                      placeholder="ex : Tarmac SL7 Comp"
                      style={fieldStyle("modele")}
                      onChange={() => clearError("modele")}
                    />
                  </div>

                  {/* Année */}
                  <div style={FG}>
                    <label style={LABEL}>Année *</label>
                    <select
                      name="annee"
                      style={fieldStyle("annee")}
                      onChange={() => clearError("annee")}
                    >
                      <option value="">Sélectionnez une année</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* État */}
                  <div style={FG}>
                    <label style={LABEL}>État général *</label>
                    <select
                      name="etat"
                      style={fieldStyle("etat")}
                      onChange={() => clearError("etat")}
                    >
                      <option value="">Sélectionnez un état</option>
                      {ETATS.map((e) => (
                        <option key={e.value} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Prix */}
                  <div style={FG}>
                    <label style={LABEL}>Prix d&apos;achat initial (€)</label>
                    <input
                      name="prix"
                      type="number"
                      placeholder="ex : 2 500"
                      min="0"
                      style={fieldStyle("prix")}
                    />
                  </div>

                  {/* Localisation */}
                  <div style={FG}>
                    <label style={LABEL}>Localisation du vélo *</label>
                    <input
                      name="localisation"
                      type="text"
                      placeholder="Ville ou code postal"
                      style={fieldStyle("localisation")}
                      onChange={() => clearError("localisation")}
                    />
                  </div>

                  {/* Confirmation type vélo */}
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      backgroundColor: errors["typeVelo"]
                        ? "rgba(239,68,68,0.05)"
                        : "rgba(76,128,118,0.07)",
                      border: `1.5px solid ${errors["typeVelo"] ? "#ef4444" : "rgba(76,128,118,0.25)"}`,
                      borderRadius: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="typeVelo"
                      id="typeVelo"
                      style={{
                        width: "18px",
                        height: "18px",
                        accentColor: "#4c8076",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      onChange={() => clearError("typeVelo")}
                    />
                    <label
                      htmlFor="typeVelo"
                      style={{ fontSize: "14px", fontWeight: 700, color: "#262f2c", cursor: "pointer" }}
                    >
                      Je confirme que mon vélo est bien un vélo de route
                    </label>
                  </div>

                  {/* Photos */}
                  <div style={{ ...FG, gridColumn: "1 / -1" }}>
                    <label style={LABEL}>
                      Photos du vélo{" "}
                      <span
                        style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#6b7280" }}
                      >
                        (facultatif)
                      </span>
                    </label>
                    <label
                      style={{
                        border: "2px dashed #e5e5e5",
                        borderRadius: "8px",
                        padding: "22px 16px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "#f9f9f9",
                        display: "block",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4c8076")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
                    >
                      <input
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files?.length) {
                            setPhotosLabel(
                              `${files.length} fichier${files.length > 1 ? "s" : ""} sélectionné${files.length > 1 ? "s" : ""}`
                            );
                          }
                        }}
                      />
                      <span style={{ fontSize: "28px", display: "block", marginBottom: "6px" }}>📷</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#4c8076" }}>
                        Cliquez pour ajouter des photos
                      </span>
                      <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                        JPG, PNG — plusieurs fichiers acceptés
                      </p>
                    </label>
                    {photosLabel && (
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>{photosLabel}</span>
                    )}
                  </div>

                  {/* Facture */}
                  <div style={{ ...FG, gridColumn: "1 / -1" }}>
                    <label style={LABEL}>
                      Facture d&apos;origine{" "}
                      <span
                        style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#6b7280" }}
                      >
                        (facultatif — pour une offre plus rapide)
                      </span>
                    </label>
                    <label
                      style={{
                        border: "2px dashed #e5e5e5",
                        borderRadius: "8px",
                        padding: "22px 16px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "#f9f9f9",
                        display: "block",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4c8076")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
                    >
                      <input
                        type="file"
                        name="facture"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFactureLabel(file.name);
                        }}
                      />
                      <span style={{ fontSize: "28px", display: "block", marginBottom: "6px" }}>📄</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#4c8076" }}>
                        Téléchargez votre facture d&apos;origine
                      </span>
                      <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                        PDF, JPG, PNG
                      </p>
                    </label>
                    {factureLabel && (
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>{factureLabel}</span>
                    )}
                  </div>

                  {/* Infos complémentaires */}
                  <div style={{ ...FG, gridColumn: "1 / -1" }}>
                    <label style={LABEL}>Informations complémentaires</label>
                    <textarea
                      name="infos"
                      placeholder="Options, accessoires, historique d'entretien, modifications…"
                      style={{ ...fieldStyle("infos"), resize: "vertical", minHeight: "90px" }}
                    />
                  </div>

                  {/* ─ Titre section coordonnées ─ */}
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e5e5",
                      marginTop: "8px",
                    }}
                  >
                    Vos coordonnées
                  </div>

                  {/* Email */}
                  <div style={FG}>
                    <label style={LABEL}>Email *</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      style={fieldStyle("email")}
                      onChange={() => clearError("email")}
                    />
                  </div>

                  {/* Téléphone */}
                  <div style={FG}>
                    <label style={LABEL}>Téléphone *</label>
                    <input
                      name="tel"
                      type="tel"
                      placeholder="06 00 00 00 00"
                      style={fieldStyle("tel")}
                      onChange={() => clearError("tel")}
                    />
                  </div>

                  {/* Submit */}
                  <div style={{ gridColumn: "1 / -1", marginTop: "6px" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: loading ? "#4c8076" : "#1e3a2f",
                        color: "white",
                        border: "none",
                        padding: "17px 32px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: 700,
                        cursor: loading ? "not-allowed" : "pointer",
                        width: "100%",
                        fontFamily: "inherit",
                        transition: "background 0.2s, transform 0.1s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = "#162d22";
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) e.currentTarget.style.backgroundColor = "#1e3a2f";
                      }}
                    >
                      {loading && (
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(255,255,255,0.4)",
                            borderTopColor: "white",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                      )}
                      {loading ? "Envoi en cours…" : "Envoyer ma demande de reprise"}
                    </button>

                    {submitError && (
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "14px",
                          color: "#ef4444",
                          marginTop: "10px",
                          padding: "10px 14px",
                          backgroundColor: "rgba(239,68,68,0.06)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: "6px",
                        }}
                      >
                        ⚠️ {submitError}
                      </p>
                    )}

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "13px",
                        color: "#6b7280",
                        marginTop: "12px",
                      }}
                    >
                      🔒 Vos données sont confidentielles
                    </p>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Quels vélos acceptez-vous ?",
    a: "Tous les vélos de route en bon état, de 2015 à aujourd'hui, des grandes marques (Specialized, Trek, Giant, Cannondale, BMC, Pinarello, etc.).",
  },
  {
    q: "Combien de temps prend la reprise ?",
    a: "Notre équipe vous contacte sous 48h après réception de votre demande. Le processus complet de vente dure généralement 1 à 3 semaines.",
  },
  {
    q: "Comment suis-je payé ?",
    a: "Une fois le vélo vendu sur notre plateforme, vous recevez le paiement directement sur votre compte bancaire. La transaction est 100 % sécurisée par Campsider.",
  },
  {
    q: "Est-ce vraiment gratuit ?",
    a: "Le dépôt de demande et l'estimation sont totalement gratuits et sans engagement. Vous n'avez aucune obligation de vendre votre vélo via Campsider.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        backgroundColor: "white",
        padding: "88px 24px",
        borderTop: "1px solid #e5e5e5",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(24px, 3.5vw, 34px)",
            fontWeight: 800,
            color: "#262f2c",
            marginBottom: "52px",
            letterSpacing: "-0.3px",
          }}
        >
          Questions fréquentes
        </h2>

        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                border: "1.5px solid #e5e5e5",
                borderRadius: "10px",
                marginBottom: "12px",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  background: openIndex === i ? "#f9f9f9" : "none",
                  border: "none",
                  padding: "22px 24px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: openIndex === i ? "#4c8076" : "#262f2c",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  fontFamily: "inherit",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <span>{item.q}</span>
                <span
                  style={{
                    fontSize: "20px",
                    flexShrink: 0,
                    transition: "transform 0.3s",
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    lineHeight: 1,
                  }}
                >
                  ▾
                </span>
              </button>
              <div
                style={{
                  maxHeight: openIndex === i ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <div
                  style={{
                    padding: "4px 24px 22px",
                    fontSize: "15px",
                    color: "#6b7280",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function ReprisePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ReassuranceBar />
        <HowItWorks />
        <FormSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
