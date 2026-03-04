"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { IconBloom } from "@/components/icons";
import { useLocale } from "@/lib/locale-context";
import { contactInfo, openingHours, NAV_LINKS } from "@/data/restaurant";

export function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo a popis */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <IconBloom className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-semibold">
                Rozkvetlá restaurace
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Navigace */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("nav.home")}
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contact.title")}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-primary"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {contactInfo.address}
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {contactInfo.email}
              </a>
            </div>
          </div>

          {/* Otviraci doba */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contact.openingHours")}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {openingHours.map((item, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <span>{item.days[locale]}</span>
                  <span className="font-medium text-foreground">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spodni pruh */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="https://www.nesnezseno.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              Nesnězeno.cz
              <ExternalLink className="h-3 w-3" />
            </a>
            <Link href="/ochrana-udaju" className="transition-colors hover:text-primary">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
