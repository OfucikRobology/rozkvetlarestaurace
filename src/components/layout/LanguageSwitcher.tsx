"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import type { Locale } from "@/i18n/locales";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggle = () => {
    const newLocale: Locale = locale === "cs" ? "uk" : "cs";
    setLocale(newLocale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      className="gap-1.5 text-xs font-medium"
      title={locale === "cs" ? "Переключити на українську" : "Přepnout na češtinu"}
    >
      <Globe className="h-4 w-4" />
      {locale === "cs" ? "UA" : "CZ"}
    </Button>
  );
}
