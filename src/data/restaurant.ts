import type { ContactInfo, OpeningHours } from "@/types";

export const RESTAURANT_NAME = "Rozkvetlá restaurace";
export const RESTAURANT_CAPACITY = 150;

export const contactInfo: ContactInfo = {
  address: "Topolová 2916/14, Praha 10 - Záběhlice",
  phone: "+420 731 163 777",
  email: "verunkatarhaj@seznam.cz",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.5!2d14.4876!3d50.0531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTopolov%C3%A1+2916%2F14%2C+Praha+10!5e0!3m2!1scs!2scz!4v1",
};

export const openingHours: OpeningHours[] = [
  {
    days: { cs: "Pondělí – Čtvrtek", uk: "Понеділок – Четвер" },
    hours: "11:00 – 22:00",
  },
  {
    days: { cs: "Pátek", uk: "П'ятниця" },
    hours: "11:00 – 23:00",
  },
  {
    days: { cs: "Sobota", uk: "Субота" },
    hours: "12:00 – 23:00",
  },
  {
    days: { cs: "Neděle", uk: "Неділя" },
    hours: "12:00 – 21:00",
  },
];

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/menu", labelKey: "nav.menu" },
  { href: "/rezervace", labelKey: "nav.reservation" },
  { href: "/objednat", labelKey: "nav.takeaway" },
  { href: "/oslavy", labelKey: "nav.celebrations" },
  { href: "/galerie", labelKey: "nav.gallery" },
  { href: "/kontakt", labelKey: "nav.contact" },
] as const;
