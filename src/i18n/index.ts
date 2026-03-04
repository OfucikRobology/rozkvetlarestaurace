import type { Locale } from "./locales";
import cs from "./translations/cs.json";
import uk from "./translations/uk.json";

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

const translations: Record<Locale, Translations> = { cs, uk };

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.cs;
}

// Pomocna funkce pro pristup k vnorenym prekladum pres tecku
// Priklad: t("nav.home") -> "Úvod"
export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let result: TranslationValue = translations[locale] ?? translations.cs;

  for (const k of keys) {
    if (typeof result === "object" && result !== null && k in result) {
      result = (result as Record<string, TranslationValue>)[k];
    } else {
      // Fallback na cestinu
      let fallback: TranslationValue = translations.cs;
      for (const fk of keys) {
        if (typeof fallback === "object" && fallback !== null && fk in fallback) {
          fallback = (fallback as Record<string, TranslationValue>)[fk];
        } else {
          return key; // Klic nenalezen
        }
      }
      return typeof fallback === "string" ? fallback : key;
    }
  }

  return typeof result === "string" ? result : key;
}

export type { Locale } from "./locales";
