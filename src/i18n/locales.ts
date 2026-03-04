export const locales = ["cs", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export const localeNames: Record<Locale, string> = {
  cs: "Čeština",
  uk: "Українська",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
