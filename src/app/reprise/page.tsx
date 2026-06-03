"use client";

import React, { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ── CONSTANTES ────────────────────────────────────────────────────────────────
const TYPES_VELO = [
  { id: "Vélo de route", emoji: "🏁" },
  { id: "VTT musculaire", emoji: "🌲" },
  { id: "VTT électrique", emoji: "⚡" },
  { id: "Vélo gravel", emoji: "🪨" },
  { id: "VTC / Vélo urbain", emoji: "🚲" },
  { id: "Vélo électrique de ville", emoji: "🔋" },
  { id: "Autre", emoji: "❓" },
];
const MARQUES = ["Specialized", "Trek", "Giant", "Cannondale", "BMC", "Scott", "Orbea", "Bianchi", "Colnago", "De Rosa", "Pinarello", "Autre"];
const ETATS = [
  { value: "comme_neuf", label: "Comme neuf", desc: "Jamais ou très peu utilisé, aucune marque visible" },
  { value: "tres_bon", label: "Très bon état", desc: "Quelques traces légères d'utilisation, tout fonctionne parfaitement" },
  { value: "bon", label: "Bon état", desc: "Utilisation normale visible, aucun défaut fonctionnel" },
  { value: "correct", label: "État correct", desc: "Signes d'usure importants mais utilisable, peut nécessiter un entretien" },
  { value: "mauvais", label: "Mauvais état", desc: "Défauts significatifs, nécessite des réparations" },
];
const SITUATIONS = [
  "Je souhaite vendre rapidement",
  "Je veux connaître la valeur de mon vélo",
  "Je compare mes options avant de décider",
  "C'est juste pour avoir une idée",
  "Autre",
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);

// ── MODAL FORMULAIRE ──────────────────────────────────────────────────────────
function FormModal({ onClose }: { onClose: () => void }) {
  const [etape, setEtape] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [typeVelo, setTypeVelo] = useState("");
  const [marqueSelect, setMarqueSelect] = useState("");
  const [marqueAutre, setMarqueAutre] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [etat, setEtat] = useState("");
  const [motivation, setMotivation] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [infos, setInfos] = useState("");
  const [photosLabel, setPhotosLabel] = useState("");
  const [factureLabel, setFactureLabel] = useState("");
  const photosRef = useRef<HTMLInputElement>(null);
  const factureRef = useRef<HTMLInputElement>(null);

  // Fermer sur Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Bloquer le scroll du body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const f = (err = false): React.CSSProperties => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${err ? "#ef4444" : "#e5e5e5"}`,
    borderRadius: "8px", fontSize: "15px", fontFamily: "inherit",
    color: "#262f2c", background: "white", outline: "none",
    transition: "border-color 0.2s",
  });
  const LABEL: React.CSSProperties = {
    fontSize: "12px", fontWeight: 800, color: "#6b7280",
    textTransform: "uppercase", letterSpacing: "0.6px",
  };
  const FG: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" };

  function clr(name: string) { setErrors(p => ({ ...p, [name]: false })); }

  function valider() {
    const e: Record<string, boolean> = {};
    if (etape === 1) {
      if (!typeVelo) e["typeVelo"] = true;
      if (!(marqueSelect === "Autre" ? marqueAutre.trim() : marqueSelect)) e["marque"] = true;
      if (!modele.trim()) e["modele"] = true;
      if (!annee) e["annee"] = true;
      if (!etat) e["etat"] = true;
    }
    if (etape === 2) {
      if (!email.trim()) e["email"] = true;
      if (!tel.trim()) e["tel"] = true;
    }
    if (etape === 3) {
      if (!motivation) e["motivation"] = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function suivant() { if (valider()) setEtape(s => s + 1); }

  async function handleSubmit() {
    const marque = marqueSelect === "Autre" ? marqueAutre : marqueSelect;
    const fd = new FormData();
    fd.append("typeVelo", typeVelo);
    fd.append("motivation", motivation);
    fd.append("marque", marque); fd.append("modele", modele);
    fd.append("annee", annee); fd.append("etat", etat);
    fd.append("prix", ""); fd.append("localisation", localisation);
    fd.append("email", email); fd.append("tel", tel);
    fd.append("infos", infos);
    const pf = photosRef.current?.files;
    if (pf) for (let i = 0; i < pf.length; i++) fd.append("photos", pf[i]);
    const ff = factureRef.current?.files?.[0];
    if (ff) fd.append("facture", ff);
    setLoading(true); setSubmitError("");
    try {
      const res = await fetch("/api/reprise", { method: "POST", body: fd });
      if (res.ok) setSubmitted(true);
      else {
        const data = await res.json() as { error?: string };
        setSubmitError(data.error ?? "Une erreur est survenue.");
      }
    } catch { setSubmitError("Erreur réseau. Vérifiez votre connexion."); }
    finally { setLoading(false); }
  }

  function ErrMsg({ msg }: { msg: string }) {
    return (
      <p style={{ fontSize: "13px", color: "#ef4444", marginTop: "10px", padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px" }}>
        ⚠️ {msg}
      </p>
    );
  }

  function BtnNext({ label = "Continuer →", onPress = suivant }: { label?: string; onPress?: () => void }) {
    return (
      <button
        type="button" onClick={onPress} disabled={loading}
        style={{
          width: "100%", marginTop: "24px", padding: "16px",
          borderRadius: "8px", border: "none",
          backgroundColor: loading ? "#4c8076" : "#1e3a2f",
          color: "white", fontSize: "16px", fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#162d22"; }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1e3a2f"; }}
      >
        {loading && <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />}
        {loading ? "Envoi en cours…" : label}
      </button>
    );
  }

  function BtnBack() {
    return (
      <button
        type="button" onClick={() => setEtape(s => s - 1)}
        style={{ background: "none", border: "none", color: "#6b7280", fontSize: "14px", cursor: "pointer", marginTop: "16px", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "4px" }}
      >
        ← Retour
      </button>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, backgroundColor: "white", overflowY: "auto" }}>

      {/* Barre du haut */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: "white", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px" }}>
        <span style={{ fontSize: "20px", fontWeight: 800, color: "#262f2c", letterSpacing: "-0.5px" }}>Campsider</span>
        <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1.5px solid #e5e5e5", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "14px", color: "#6b7280", fontFamily: "inherit", fontWeight: 600 }}>
          ✕ Fermer
        </button>
      </div>

      {/* Contenu centré */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {submitted ? (
          <div style={{ textAlign: "center", paddingTop: "40px" }}>
            <div style={{ fontSize: "56px", marginBottom: "20px" }}>✅</div>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#262f2c", marginBottom: "12px" }}>Demande envoyée !</h2>
            <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto" }}>
              Un expert Campsider vous contactera sous <strong>48h</strong>{" "}à l&apos;adresse mail indiquée.
            </p>
            <button onClick={onClose} style={{ marginTop: "32px", padding: "12px 32px", backgroundColor: "#1e3a2f", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* ── ÉTAPE 1 : vélo + infos ── */}
            {etape === 1 && (
              <div>
                <div style={{ marginBottom: "28px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#262f2c", marginBottom: "6px" }}>
                    Obtenez votre estimation gratuite
                  </h2>
                  <p style={{ fontSize: "15px", color: "#6b7280" }}>En moins de 2 minutes. Sans engagement.</p>
                </div>

                {/* Type de vélo */}
                <p style={{ ...LABEL, marginBottom: "10px" }}>Type de vélo *</p>
                <div className="grid grid-cols-4 sm:grid-cols-4" style={{ gap: "8px", marginBottom: "24px" }}>
                  {TYPES_VELO.map((t) => (
                    <button
                      key={t.id} type="button"
                      onClick={() => { setTypeVelo(t.id); clr("typeVelo"); }}
                      style={{
                        padding: "14px 8px", borderRadius: "10px", cursor: "pointer",
                        border: `2px solid ${typeVelo === t.id ? "#1e3a2f" : errors["typeVelo"] ? "#ef4444" : "#e5e5e5"}`,
                        background: typeVelo === t.id ? "#f0f7f5" : "white",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: "6px", fontFamily: "inherit", transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1e3a2f"; e.currentTarget.style.background = "#f0f7f5"; }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = typeVelo === t.id ? "#1e3a2f" : errors["typeVelo"] ? "#ef4444" : "#e5e5e5";
                        e.currentTarget.style.background = typeVelo === t.id ? "#f0f7f5" : "white";
                      }}
                    >
                      <span style={{ fontSize: "22px" }}>{t.emoji}</span>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#262f2c", textAlign: "center", lineHeight: 1.3 }}>{t.id}</span>
                    </button>
                  ))}
                </div>

                {/* Marque / Modèle / Année / État */}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "14px" }}>
                  <div style={FG}>
                    <label style={LABEL}>Marque *</label>
                    <select style={f(!!errors["marque"])} value={marqueSelect} onChange={(e) => { setMarqueSelect(e.target.value); clr("marque"); }}>
                      <option value="">Sélectionnez une marque</option>
                      {MARQUES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {marqueSelect === "Autre" && (
                      <input type="text" placeholder="Précisez la marque" value={marqueAutre} style={f(!!errors["marque"])} onChange={(e) => { setMarqueAutre(e.target.value); clr("marque"); }} />
                    )}
                  </div>

                  <div style={FG}>
                    <label style={LABEL}>Modèle *</label>
                    <input type="text" placeholder="ex : Tarmac SL7 Comp" value={modele} style={f(!!errors["modele"])} onChange={(e) => { setModele(e.target.value); clr("modele"); }} />
                  </div>

                  <div style={FG}>
                    <label style={LABEL}>Année *</label>
                    <select style={f(!!errors["annee"])} value={annee} onChange={(e) => { setAnnee(e.target.value); clr("annee"); }}>
                      <option value="">Sélectionnez</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>

                  <div style={{ ...FG, gridColumn: "1 / -1" }}>
                    <label style={LABEL}>État général *</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {ETATS.map(et => (
                        <button
                          key={et.value} type="button"
                          onClick={() => { setEtat(et.value); clr("etat"); }}
                          style={{
                            padding: "12px 16px", borderRadius: "10px", cursor: "pointer", textAlign: "left",
                            border: `2px solid ${etat === et.value ? "#1e3a2f" : errors["etat"] ? "#ef4444" : "#e5e5e5"}`,
                            background: etat === et.value ? "#f0f7f5" : "white",
                            fontFamily: "inherit", transition: "all 0.15s",
                            display: "flex", flexDirection: "column", gap: "2px",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1e3a2f"; e.currentTarget.style.background = "#f0f7f5"; }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = etat === et.value ? "#1e3a2f" : errors["etat"] ? "#ef4444" : "#e5e5e5";
                            e.currentTarget.style.background = etat === et.value ? "#f0f7f5" : "white";
                          }}
                        >
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#262f2c" }}>{et.label}</span>
                          <span style={{ fontSize: "12px", color: "#6b7280" }}>{et.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {Object.values(errors).some(Boolean) && <ErrMsg msg="Veuillez remplir tous les champs obligatoires." />}
                <BtnNext label="Obtenir mon estimation →" />
              </div>
            )}

            {/* ── ÉTAPE 2 : Coordonnées ── */}
            {etape === 2 && (
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#262f2c", marginBottom: "6px" }}>Vos coordonnées</h2>
                <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "24px" }}>Pour qu&apos;un expert vous recontacte sous 48h.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "14px" }}>
                  <div style={FG}>
                    <label style={LABEL}>Email *</label>
                    <input type="email" placeholder="votre@email.com" value={email} style={f(!!errors["email"])} onChange={(e) => { setEmail(e.target.value); clr("email"); }} />
                  </div>
                  <div style={FG}>
                    <label style={LABEL}>Téléphone *</label>
                    <input type="tel" placeholder="06 00 00 00 00" value={tel} style={f(!!errors["tel"])} onChange={(e) => { setTel(e.target.value); clr("tel"); }} />
                  </div>
                  <div style={{ ...FG, gridColumn: "1 / -1" }}>
                    <label style={LABEL}>Localisation <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#9ca3af" }}>(facultatif)</span></label>
                    <input type="text" placeholder="Ville ou code postal" value={localisation} style={f(false)} onChange={(e) => setLocalisation(e.target.value)} />
                  </div>
                </div>
                <div style={{ marginTop: "16px", padding: "12px 16px", backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #e5e5e5", fontSize: "13px", color: "#6b7280", lineHeight: 1.6 }}>
                  🔒 Vos données sont utilisées uniquement pour traiter votre demande. Nous ne vous enverrons pas de spam et ne partageons jamais vos informations avec des tiers.
                </div>
                {Object.values(errors).some(Boolean) && <ErrMsg msg="Veuillez renseigner votre email et votre téléphone." />}
                <BtnNext />
                <div style={{ textAlign: "center" }}><BtnBack /></div>
              </div>
            )}

            {/* ── ÉTAPE 3 : Motivation ── */}
            {etape === 3 && (
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#262f2c", marginBottom: "6px" }}>Pourquoi souhaitez-vous vendre votre vélo ?</h2>
                <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "24px" }}>Cela nous aide à vous proposer la meilleure offre.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { value: "vendre_vite", label: "Vendre mon vélo le plus vite possible" },
                    { value: "meilleur_prix", label: "Obtenir le meilleur prix, même si ça prend un peu plus de temps" },
                    { value: "financer_nouveau", label: "Financer l'achat d'un nouveau vélo" },
                    { value: "connaitre_valeur", label: "Juste connaître la valeur de mon vélo (je me renseigne)" },
                  ].map(opt => (
                    <button
                      key={opt.value} type="button"
                      onClick={() => { setMotivation(opt.value); clr("motivation"); }}
                      style={{
                        padding: "16px 20px", borderRadius: "10px", cursor: "pointer", textAlign: "left",
                        border: `2px solid ${motivation === opt.value ? "#1e3a2f" : errors["motivation"] ? "#ef4444" : "#e5e5e5"}`,
                        background: motivation === opt.value ? "#f0f7f5" : "white",
                        fontFamily: "inherit", transition: "all 0.15s",
                        fontSize: "15px", fontWeight: motivation === opt.value ? 700 : 500, color: "#262f2c",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1e3a2f"; e.currentTarget.style.background = "#f0f7f5"; }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = motivation === opt.value ? "#1e3a2f" : errors["motivation"] ? "#ef4444" : "#e5e5e5";
                        e.currentTarget.style.background = motivation === opt.value ? "#f0f7f5" : "white";
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors["motivation"] && <ErrMsg msg="Veuillez sélectionner une option." />}
                <BtnNext />
                <div style={{ textAlign: "center" }}><BtnBack /></div>
              </div>
            )}

            {/* ── ÉTAPE 4 : Infos complémentaires ── */}
            {etape === 4 && (
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#262f2c", marginBottom: "4px" }}>
                  Pour aller plus loin <span style={{ fontSize: "16px", fontWeight: 400, color: "#6b7280" }}>(facultatif)</span>
                </h2>
                <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "24px" }}>
                  Ces éléments affinent notre estimation. Vous pouvez directement envoyer votre demande.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                  <div style={FG}>
                    <label style={LABEL}>Photos du vélo</label>
                    <label style={{ border: "2px dashed #e5e5e5", borderRadius: "8px", padding: "18px 16px", textAlign: "center", cursor: "pointer", backgroundColor: "#f9f9f9", display: "block", transition: "border-color 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4c8076"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e5e5"; }}>
                      <input type="file" ref={photosRef} accept="image/*" multiple style={{ display: "none" }}
                        onChange={(e) => { const fl = e.target.files; if (fl?.length) setPhotosLabel(`${fl.length} fichier${fl.length > 1 ? "s" : ""} sélectionné${fl.length > 1 ? "s" : ""}`); }} />
                      <span style={{ fontSize: "22px", display: "block", marginBottom: "4px" }}>📷</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#4c8076" }}>Ajouter des photos</span>
                      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>JPG, PNG — plusieurs fichiers acceptés</p>
                    </label>
                    {photosLabel && <span style={{ fontSize: "13px", color: "#6b7280" }}>{photosLabel}</span>}
                  </div>

                  <div style={FG}>
                    <label style={LABEL}>Facture d&apos;origine</label>
                    <label style={{ border: "2px dashed #e5e5e5", borderRadius: "8px", padding: "18px 16px", textAlign: "center", cursor: "pointer", backgroundColor: "#f9f9f9", display: "block", transition: "border-color 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4c8076"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e5e5"; }}>
                      <input type="file" ref={factureRef} accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }}
                        onChange={(e) => { const fl = e.target.files?.[0]; if (fl) setFactureLabel(fl.name); }} />
                      <span style={{ fontSize: "22px", display: "block", marginBottom: "4px" }}>📄</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#4c8076" }}>Télécharger la facture</span>
                      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>PDF, JPG, PNG</p>
                    </label>
                    {factureLabel && <span style={{ fontSize: "13px", color: "#6b7280" }}>{factureLabel}</span>}
                  </div>

                  <div style={FG}>
                    <label style={LABEL}>Informations complémentaires</label>
                    <textarea placeholder="Options, accessoires, historique d'entretien, modifications…" value={infos} onChange={(e) => setInfos(e.target.value)}
                      style={{ ...f(false), resize: "vertical", minHeight: "90px" }} />
                  </div>
                </div>

                {submitError && <ErrMsg msg={submitError} />}
                <BtnNext label="Envoyer ma demande →" onPress={handleSubmit} />
                <div style={{ textAlign: "center" }}><BtnBack /></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section style={{ backgroundImage: "url('/images/Gemini_Generated_Image_kniiq7kniiq7knii (1).png')", backgroundSize: "cover", backgroundPosition: "center", padding: "110px 24px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20, 40, 30, 0.6)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
        <span style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.92)", fontSize: "12px", fontWeight: 700, padding: "7px 18px", borderRadius: "20px", marginBottom: "28px", letterSpacing: "0.8px", border: "1px solid rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
          🚴 Reprise de vélo
        </span>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 800, color: "white", lineHeight: 1.12, marginBottom: "22px", letterSpacing: "-0.5px" }}>
          Vendez votre vélo<br />au meilleur prix
        </h1>
        <p style={{ fontSize: "clamp(17px, 2.5vw, 21px)", color: "rgba(255,255,255,0.78)", marginBottom: "44px", lineHeight: 1.5 }}>
          Estimation gratuite sous 48h. Sans engagement.
        </p>
        <button
          onClick={onOpen}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#be4a09", color: "white", padding: "15px 32px", borderRadius: "4px", fontSize: "17px", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a84008"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#be4a09"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Estimer mon vélo →
        </button>
      </div>
    </section>
  );
}

// ── RÉASSURANCE ───────────────────────────────────────────────────────────────
const REASSURANCE_ITEMS = ["⏱ Estimation sous 48h", "🔒 Transaction sécurisée", "🚴 Experts vélo", "✅ Sans engagement"];

function ReassuranceBar() {
  return (
    <div style={{ backgroundColor: "#f4f2ee", padding: "18px 24px", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        {REASSURANCE_ITEMS.map(item => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "#262f2c", whiteSpace: "nowrap" }}>{item}</div>
        ))}
      </div>
    </div>
  );
}

// ── AVIS TRUSTPILOT ───────────────────────────────────────────────────────────
const AVIS_REPRISE = [
  {
    id: 1,
    title: "Vente rapide et au bon prix",
    body: "J'ai vendu mon Specialized Tarmac en moins de 2 semaines. L'équipe m'a proposé une offre très correcte et tout s'est passé sans accroc.",
    author: "Thomas R.",
    time: "Il y a 2 jours",
  },
  {
    id: 2,
    title: "Service client au top",
    body: "Estimation reçue en 24h comme promis. Très professionnel, ils connaissent vraiment bien les vélos. Je recommande à 100 %.",
    author: "Marine D.",
    time: "Il y a 4 jours",
  },
  {
    id: 3,
    title: "Processus simple et transparent",
    body: "Aucune mauvaise surprise. Le prix annoncé était le prix payé. Paiement reçu rapidement après la vente. Parfait.",
    author: "Julien B.",
    time: "Il y a 1 semaine",
  },
  {
    id: 4,
    title: "Enfin une solution fiable",
    body: "J'avais essayé Le Bon Coin sans succès. Campsider a géré tout à ma place et mon Canyon a trouvé preneur en 10 jours.",
    author: "Sophie L.",
    time: "Il y a 1 semaine",
  },
  {
    id: 5,
    title: "Très bonne expérience",
    body: "Deuxième vente avec Campsider, toujours aussi satisfait. Équipe réactive, estimation honnête et transaction sécurisée.",
    author: "Nicolas M.",
    time: "Il y a 2 semaines",
  },
];

function TrustpilotRepriseSection() {
  const [offset, setOffset] = React.useState(0);
  const visible = 3;
  const max = AVIS_REPRISE.length - visible;

  function prev() { setOffset(o => Math.max(0, o - 1)); }
  function next() { setOffset(o => Math.min(max, o + 1)); }

  return (
    <section style={{ backgroundColor: "white", padding: "28px 24px", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>

        {/* Score Trustpilot compact */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "10px" }}>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 800, color: "#262f2c", margin: 0 }}>Excellent</p>
            <p style={{ color: "#00b67a", fontSize: "14px", letterSpacing: "1px", margin: "1px 0 0" }}>★★★★★</p>
          </div>
          <div style={{ width: "1px", height: "30px", backgroundColor: "#e5e5e5" }} />
          <div>
            <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>4 809 avis</p>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#191919", margin: "2px 0 0" }}>★ Trustpilot</p>
          </div>
        </div>

        {/* Cartes défilantes */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", minWidth: 0, overflow: "hidden" }}>
          <button onClick={prev} disabled={offset === 0} aria-label="Précédent"
            style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #e5e5e5", background: offset === 0 ? "#f5f5f5" : "white", cursor: offset === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: offset === 0 ? "#ccc" : "#262f2c" }}
          >‹</button>

          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", minWidth: 0 }}>
            {AVIS_REPRISE.slice(offset, offset + visible).map(avis => (
              <div key={avis.id} style={{ border: "1px solid #e5e5e5", borderRadius: "8px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#00b67a", fontSize: "12px", letterSpacing: "1px" }}>★★★★★</span>
                  <span style={{ fontSize: "10px", color: "#9ca3af" }}>✓ Sur invitation</span>
                </div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#262f2c", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{avis.title}</p>
                <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{avis.body}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>{avis.author} · {avis.time}</p>
              </div>
            ))}
          </div>

          <button onClick={next} disabled={offset >= max} aria-label="Suivant"
            style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #e5e5e5", background: offset >= max ? "#f5f5f5" : "white", cursor: offset >= max ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: offset >= max ? "#ccc" : "#262f2c" }}
          >›</button>
        </div>

      </div>
    </section>
  );
}

// ── RAISONS DE VENDRE ─────────────────────────────────────────────────────────
const RAISONS = [
  { img: "/images/C'est simple.png", label: "C'est simple", desc: "Pas d'annonce à gérer, on s'occupe de tout" },
  { img: "/images/C'est rapide.png", label: "C'est rapide", desc: "Estimation en quelques clics et paiement express" },
  { img: "/images/C'est sécurisé.png", label: "C'est sécurisé", desc: "Paiement garanti, transaction couverte par Campsider" },
  { img: "/images/Prix juste.png", label: "Prix juste", desc: "Estimation par des experts du vélo d'occasion, pas de frais cachés" },
];

function RaisonsSection() {
  return (
    <section style={{ backgroundColor: "#f4f2ee", padding: "64px 24px", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#262f2c", marginBottom: "40px", letterSpacing: "-0.3px" }}>
          4 Raisons de vendre votre vélo à Campsider
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4" style={{ gap: "16px" }}>
          {RAISONS.map(r => (
            <div key={r.label} style={{ backgroundColor: "white", border: "1.5px solid #e5e5e5", borderRadius: "14px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ width: "56px", height: "56px", backgroundColor: "#1D3D2D", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={r.img} alt={r.label} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              </div>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "#262f2c", margin: 0 }}>{r.label}</p>
              <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.55, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMMENT ÇA MARCHE ─────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", img: "/images/Décrivez votre vélo.png", title: "Décrivez votre vélo", desc: "Remplissez le formulaire en quelques minutes : marque, modèle, année, état et photos." },
  { num: "02", img: "/images/Recevez une offre.png", title: "Recevez une offre", desc: "Nos experts vous contactent sous 48h avec une estimation personnalisée et sans engagement." },
  { num: "03", img: "/images/On s'occupe de tout.png", title: "On s'occupe de tout", desc: "Campsider gère la vente et la transaction. Vous recevez votre paiement directement." },
];

function HowItWorks({ onOpen }: { onOpen: () => void }) {
  return (
    <section style={{ backgroundColor: "white", padding: "88px 24px" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, color: "#262f2c", marginBottom: "52px", letterSpacing: "-0.3px" }}>
          Vendre son vélo n&apos;a jamais été aussi simple
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "28px", marginBottom: "52px" }}>
          {STEPS.map(step => (
            <div key={step.num}
              style={{ backgroundColor: "#f9f9f9", border: "1.5px solid #e5e5e5", borderRadius: "14px", padding: "40px 32px", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "48px", fontWeight: 800, color: "#d8d8d8", lineHeight: 1, marginBottom: "18px" }}>{step.num}</div>
              <div style={{ width: "56px", height: "56px", backgroundColor: "#1D3D2D", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <img src={step.img} alt={step.title} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              </div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#262f2c", marginBottom: "10px" }}>{step.title}</div>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onOpen}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#be4a09", color: "white", padding: "16px 40px", borderRadius: "8px", fontSize: "17px", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#a84008"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#be4a09"; }}
          >
            Estimer mon vélo gratuitement →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
{ q: "Combien de temps prend la reprise ?", a: "Notre équipe vous contacte sous 48h après réception de votre demande. Le processus complet de vente dure généralement 1 à 3 semaines." },
  { q: "Comment suis-je payé ?", a: "Une fois le vélo vendu sur notre plateforme, vous recevez le paiement directement sur votre compte bancaire. La transaction est 100 % sécurisée par Campsider." },
  { q: "Est-ce vraiment gratuit ?", a: "Le dépôt de demande et l'estimation sont totalement gratuits et sans engagement. Vous n'avez aucune obligation de vendre votre vélo via Campsider." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section style={{ backgroundColor: "white", padding: "88px 24px", borderTop: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, color: "#262f2c", marginBottom: "52px", letterSpacing: "-0.3px" }}>Questions fréquentes</h2>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ border: "1.5px solid #e5e5e5", borderRadius: "10px", marginBottom: "12px", overflow: "hidden" }}>
              <button type="button" onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: "100%", background: openIndex === i ? "#f9f9f9" : "none", border: "none", padding: "22px 24px", fontSize: "16px", fontWeight: 700, color: openIndex === i ? "#4c8076" : "#262f2c", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", fontFamily: "inherit", transition: "background 0.2s, color 0.2s" }}>
                <span>{item.q}</span>
                <span style={{ fontSize: "20px", flexShrink: 0, transition: "transform 0.3s", transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", lineHeight: 1 }}>▾</span>
              </button>
              <div style={{ maxHeight: openIndex === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                <div style={{ padding: "4px 24px 22px", fontSize: "15px", color: "#6b7280", lineHeight: 1.7 }}>{item.a}</div>
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
  const [modalOuvert, setModalOuvert] = useState(false);
  const ouvrir = () => setModalOuvert(true);
  const fermer = () => setModalOuvert(false);

  useEffect(() => {
    window.addEventListener("ouvrir-reprise", ouvrir);
    return () => window.removeEventListener("ouvrir-reprise", ouvrir);
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection onOpen={ouvrir} />
        <ReassuranceBar />
        <TrustpilotRepriseSection />
        <RaisonsSection />
        <HowItWorks onOpen={ouvrir} />
        <FAQSection />
      </main>
      <Footer />
      {modalOuvert && <FormModal onClose={fermer} />}
    </>
  );
}
