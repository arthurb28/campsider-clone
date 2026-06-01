export interface CategoryCard {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ProductCard {
  id: string;
  brand: string;
  model: string;
  imageSrc: string;
  imageAlt: string;
  currentPrice: string;
  oldPrice: string;
  discountPercent: number;
  condition: "NEUF" | "OCCASION";
  year?: number;
  frameSize?: string;
  heightRange?: string;
  href: string;
}

export interface SelectionCard {
  id: string;
  tag: string;
  tagLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  bgColor: string;
}

export interface BrandCard {
  id: string;
  name: string;
  logoSrc: string;
  href: string;
}

export interface PressCard {
  id: string;
  logoSrc: string;
  logoAlt: string;
  headline: string;
  href: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

export interface TrustpilotReview {
  id: string;
  title: string;
  body: string;
  author: string;
  timeAgo: string;
}

export interface NavCategory {
  label: string;
  href: string;
  highlight?: boolean;
}
