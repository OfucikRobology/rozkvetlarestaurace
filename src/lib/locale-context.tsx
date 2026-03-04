"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Locale } from "@/i18n/locales";
import { defaultLocale } from "@/i18n/locales";
import cs from "@/i18n/translations/cs.json";
import uk from "@/i18n/translations/uk.json";

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

const translations: Record<Locale, Translations> = { cs, uk };

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale") as Locale;
      if (saved === "cs" || saved === "uk") return saved;
    }
    return defaultLocale;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let result: TranslationValue =
        translations[locale] ?? translations.cs;

      for (const k of keys) {
        if (typeof result === "object" && result !== null && k in result) {
          result = (result as Record<string, TranslationValue>)[k];
        } else {
          // Fallback na cestinu
          let fallback: TranslationValue = translations.cs;
          for (const fk of keys) {
            if (
              typeof fallback === "object" &&
              fallback !== null &&
              fk in fallback
            ) {
              fallback = (fallback as Record<string, TranslationValue>)[fk];
            } else {
              return key;
            }
          }
          return typeof fallback === "string" ? fallback : key;
        }
      }

      return typeof result === "string" ? result : key;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
