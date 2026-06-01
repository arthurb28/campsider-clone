import type { CSSProperties } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Condition = "NEUF" | "OCCASION";

interface Product {
  id: string;
  brand: string;
  model: string;
  imageSrc: string;
  currentPrice: string;
  oldPrice: string;
  discount: number;
  condition: Condition;
  chips: string[];
}

const products: Product[] = [
  {
    id: "corratec",
    brand: "CORRATEC",
    model: "Dolomiti Elite",
    imageSrc: "/images/products/corratec-dolomiti.png",
    currentPrice: "789,99 €",
    oldPrice: "1 399 €",
    discount: -44,
    condition: "NEUF",
    chips: ["2025", "51", "170 - 180 cm", "S…"],
  },
  {
    id: "bmc",
    brand: "BMC",
    model: "URS 01",
    imageSrc: "/images/products/bmc-urs01.jpg",
    currentPrice: "1 872 €",
    oldPrice: "5 299 €",
    discount: -65,
    condition: "OCCASION",
    chips: ["2019", "62", "188 - 205 cm", "S.."],
  },
  {
    id: "orbea",
    brand: "ORBEA",
    model: "Orca OMX Carbone",
    imageSrc: "/images/products/orbea-orca-omx.jpg",
    currentPrice: "2 496 €",
    oldPrice: "5 799 €",
    discount: -57,
    condition: "OCCASION",
    chips: ["2023", "47", "155 - 168 cm", "S…"],
  },
];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article style={{ cursor: "pointer", flex: "0 0 250px", background: "white" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1/1",
          background: "#f9f9f9",
          overflow: "hidden",
        }}
      >
        <img
          src={product.imageSrc}
          alt={`${product.brand} ${product.model}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: 12,
          }}
        />
        <button
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} color="#262f2c" />
        </button>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <span
            style={{
              background: "#be4a09",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 6px",
              borderRadius: 2,
            }}
          >
            {product.discount}%
          </span>
          <span
            style={{
              background: "#262f2c",
              color: "white",
              fontSize: 10,
              fontWeight: 500,
              padding: "3px 6px",
              borderRadius: 2,
              textTransform: "uppercase",
            }}
          >
            {product.condition}
          </span>
        </div>
      </div>
      <div style={{ padding: "12px 0" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#072a36" }}>{product.brand}</div>
        <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 2 }}>{product.model}</div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#be4a09" }}>{product.currentPrice}</span>
          <span style={{ fontSize: 14, color: "#d1d5db", textDecoration: "line-through" }}>{product.oldPrice}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 8,
          }}
        >
          {product.chips.map((chip) => (
            <span
              key={chip}
              style={{
                background: "#f9f9f9",
                border: "1px solid #e5e5e5",
                borderRadius: 4,
                padding: "3px 8px",
                fontSize: 12,
                color: "#262f2c",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function BestDealsSection() {
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
          <h2 style={{ fontSize: 18, fontWeight: 500, color: "#262f2c", margin: 0 }}>Nos meilleurs deals</h2>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "2px 0 0" }}>Ils n&apos;attendent que vous</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={{
              backgroundColor: "#be4a09",
              color: "white",
              borderRadius: 4,
              padding: "8px 20px",
              fontSize: 14,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Voir plus
          </button>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #e5e5e5",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            ‹
          </button>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #e5e5e5",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>
      </div>
      <div
        style={{
          padding: "0 24px 32px",
          display: "flex",
          gap: 16,
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        } as CSSProperties}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
