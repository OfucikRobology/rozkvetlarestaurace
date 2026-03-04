export type { Locale } from "@/i18n/locales";

export interface MenuItem {
  id: string;
  name: { cs: string; uk: string };
  description: { cs: string; uk: string };
  price: number; // v CZK
  category: MenuCategory;
  image?: string;
  allergens?: number[];
}

export type MenuCategory =
  | "appetizers"
  | "soups"
  | "mainCourses"
  | "desserts"
  | "drinks";

export interface OpeningHours {
  days: { cs: string; uk: string };
  hours: string;
  closed?: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  instagram?: string;
  facebook?: string;
}

export interface CelebrationPackage {
  id: string;
  title: { cs: string; uk: string };
  description: { cs: string; uk: string };
  features: { cs: string[]; uk: string[] };
  image?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: { cs: string; uk: string };
  category: "food" | "interior" | "events" | "decoration";
  width: number;
  height: number;
}
