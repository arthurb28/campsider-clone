"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  logoText: string;
  fontSize: number;
}

const brands: Brand[] = [
  { id: "cannondale", name: "Cannondale", logoText: "Cannondale", fontSize: 16 },
  { id: "specialized", name: "Specialized", logoText: "SPECIALIZED", fontSize: 14 },
  { id: "giant", name: "Giant", logoText: "GIANT", fontSize: 20 },
  { id: "rossignol", name: "Rossignol", logoText: "ROSSIGNOL", fontSize: 14 },
  { id: "dynastar", name: "Dynastar", logoText: "▲ DYNASTAR", fontSize: 14 },
];

export function BrandsSection() {
  return (
    <section className={cn("bg-white")}>
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 500, color: "#262f2c", margin: 0 }}>Nos plus belles marques</h2>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "2px 0 0" }}>Petits prix garantis</p>
        </div>
      </div>
      <div
        style={{
          padding: "0 24px 32px",
          display: "flex",
          gap: 12,
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        } as CSSProperties}
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: "0 0 180px",
            }}
          >
            <div
              style={{
                border: "1px solid #e5e5e5",
                background: "white",
                width: 180,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  fontSize: brand.fontSize,
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {brand.logoText}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#262f2c",
                textAlign: "center",
                paddingTop: 6,
              }}
            >
              {brand.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
