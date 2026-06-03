"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Mail, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

function AnnouncementBar() {
  return (
    <div className="w-full text-white" style={{ backgroundColor: "#4c8076", fontSize: "13px" }}>
      <div className="flex items-center justify-between" style={{ maxWidth: "1360px", margin: "0 auto", padding: "8px 16px", gap: "16px" }}>
        <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
          <span>Voir nos </span>
          <a href="#" className="font-bold underline">4 809 avis</a>
          <span> sur </span>
          <span className="font-bold flex items-center gap-1">
            <span className="text-green-300">✦</span> Trustpilot
          </span>
        </div>

        <div className="hidden md:flex items-center" style={{ gap: "24px" }}>
          {["Matériel contrôlé et garanti", "Paiement 100 % sécurisé", "Retour possible 30 jours", "Livraison rapide et intégrée"].map((label) => (
            <div key={label} className="flex items-center gap-1 whitespace-nowrap">
              <Check size={14} strokeWidth={2.5} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0 cursor-pointer whitespace-nowrap">
          <span>🇫🇷</span>
          <span> FR </span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

const MAIN_NAV = [
  "Vélos de route", "Vélos gravel", "VTT électriques",
  "VTT musculaires", "VTC électriques", "Vélos de ville électriques", "Skis alpins",
];
const RIGHT_NAV = ["BLOG", "AIDE ET SUPPORT"];

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col md:hidden"
      style={{ backgroundColor: "#262f2c" }}
    >
      {/* Barre du haut */}
      <div className="flex items-center justify-between" style={{ padding: "0 16px", height: "70px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <a href="/" style={{ color: "white", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px", textDecoration: "none" }}>
          Campsider
        </a>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "white", display: "flex", alignItems: "center" }}>
          <X size={24} color="white" />
        </button>
      </div>

      {/* Recherche mobile */}
      <div style={{ padding: "16px" }}>
        <div className="flex items-center bg-white" style={{ borderRadius: "4px", padding: "0 12px", height: "44px", gap: "8px" }}>
          <input
            type="text"
            placeholder="Rechercher un produit, une marque…"
            className="flex-1 border-none outline-none bg-transparent"
            style={{ fontSize: "14px", color: "#262f2c" }}
            autoFocus
          />
          <Search size={16} style={{ color: "#9ca3af" }} />
        </div>
      </div>

      {/* Liens de navigation */}
      <nav style={{ overflowY: "auto", flex: 1 }}>
        {MAIN_NAV.map((label) => (
          <a
            key={label}
            href="#"
            onClick={onClose}
            style={{ display: "block", color: "white", fontSize: "16px", fontWeight: 500, padding: "16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
        {RIGHT_NAV.map((label) => (
          <a
            key={label}
            href="#"
            onClick={onClose}
            style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 700, padding: "16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", letterSpacing: "0.5px" }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* CTA reprise */}
      <div style={{ padding: "16px" }}>
        <a
          href="/reprise"
          style={{ display: "block", textAlign: "center", backgroundColor: "#be4a09", color: "white", fontSize: "15px", fontWeight: 700, padding: "14px", borderRadius: "6px", textDecoration: "none" }}
        >
          Estimer mon vélo →
        </a>
      </div>
    </div>
  );
}

function MainHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div className="w-full" style={{ backgroundColor: "#262f2c", height: "70px" }}>
      <div className="h-full flex items-center" style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 16px", gap: "16px" }}>
        <a href="/" className="no-underline flex-shrink-0" style={{ color: "white", fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px" }}>
          Campsider
        </a>

        {/* Barre de recherche — desktop uniquement */}
        <div className="hidden md:flex flex-1 items-center bg-white" style={{ borderRadius: "4px", padding: "0 12px", gap: "8px", height: "44px" }}>
          <input
            type="text"
            placeholder="Rechercher un produit, une marque…"
            className="flex-1 border-none outline-none bg-transparent"
            style={{ fontSize: "14px", color: "#262f2c" }}
          />
          <Search size={18} style={{ color: "#9ca3af" }} />
        </div>

        <div className="flex items-center" style={{ marginLeft: "auto", gap: "16px", color: "white" }}>
          <div className="hidden md:flex flex-col" style={{ fontSize: "12px" }}>
            <span style={{ opacity: 0.8 }}>Lundi au Samedi 10h-19h</span>
            <span className="underline font-medium">Échanger par téléphone</span>
          </div>
          <Search className="flex md:hidden" size={22} color="white" />
          <Mail className="hidden md:flex" size={22} color="white" />
          <User size={22} color="white" />
          <ShoppingBag size={22} color="white" />
          <button
            className="flex md:hidden"
            onClick={onMenuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileSearchBar() {
  return (
    <div className="flex md:hidden" style={{ backgroundColor: "#262f2c", padding: "0 16px 12px" }}>
      <div className="flex items-center bg-white w-full" style={{ borderRadius: "4px", padding: "0 12px", height: "40px", gap: "8px" }}>
        <Search size={16} style={{ color: "#9ca3af", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Rechercher un produit, une marque…"
          className="flex-1 border-none outline-none bg-transparent"
          style={{ fontSize: "14px", color: "#262f2c" }}
        />
      </div>
    </div>
  );
}

function CategoryNav() {
  const pathname = usePathname();
  const isReprisePage = pathname === "/reprise";

  return (
    <div className="hidden md:block w-full whitespace-nowrap" style={{ backgroundColor: "#262f2c", borderTop: "1px solid rgba(255,255,255,0.1)", height: "44px" }}>
      <div className="flex items-center h-full hide-scrollbar" style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ flex: 1 }} />
        <div className="flex items-center h-full overflow-x-auto hide-scrollbar">
          {MAIN_NAV.map((label) => (
            <a key={label} href="#" className="inline-flex items-center h-full hover:underline" style={{ color: "white", fontSize: "14px", padding: "0 14px", textDecoration: "none" }}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center h-full" style={{ flex: 1, justifyContent: "flex-end" }}>
          {RIGHT_NAV.map((label) => (
            <a key={label} href="#" className="inline-flex items-center h-full font-bold hover:underline" style={{ color: "white", fontSize: "14px", padding: "0 14px", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a
            href="/reprise"
            className="inline-flex items-center font-bold"
            style={{ backgroundColor: "#be4a09", color: "white", fontSize: "13px", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", marginLeft: "8px", whiteSpace: "nowrap", transition: "background-color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a84008")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#be4a09")}
          >
            Estimer mon vélo →
          </a>
          {isReprisePage && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("ouvrir-reprise"))}
              className="inline-flex items-center font-bold"
              style={{ backgroundColor: "white", color: "#262f2c", fontSize: "13px", padding: "8px 16px", borderRadius: "4px", border: "none", cursor: "pointer", marginLeft: "6px", whiteSpace: "nowrap", fontFamily: "inherit", transition: "background-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f4f2ee")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              Déposer ma demande
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <AnnouncementBar />
        <MainHeader onMenuOpen={() => setMenuOpen(true)} />
        <MobileSearchBar />
        <CategoryNav />
      </header>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
