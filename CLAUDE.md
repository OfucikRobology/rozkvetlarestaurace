# Rozkvetla Restaurace - Web

## Projekt
Restauracni web postaveny na Next.js 15 (App Router) s TypeScriptem a Tailwind CSS.
Vicejazycny web: cestina (hlavni) + ukrajinstina.

## Technologie
- **Framework:** Next.js 15, App Router, React 19
- **Jazyk:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint
- **Package manager:** npm

## Struktura
```
src/
  app/              # Next.js App Router - stranky a layouty
    [locale]/        # Jazykove routy (cs, uk)
  components/       # Znovupouzitelne React komponenty
    ui/             # Zakladni UI prvky (Button, Card, ...)
    sections/       # Sekce stranky (Hero, Menu, Contact, ...)
    layout/         # Layout komponenty (Header, Footer, Nav)
  lib/              # Utilitni funkce a helpery
  i18n/             # Preklady a jazykova konfigurace
  data/             # Staticka data (menu, otviraci doby, ...)
  types/            # TypeScript typy a rozhrani
  assets/           # Obrazky, fonty, ikony
public/             # Staticke soubory (favicon, og-image, ...)
```

## Konvence
- Komunikace s uzivatelem: **cesky** (nebo ukrajinsky na pozadani)
- Kod a komentare: **cesky** (nazvy komponent anglicky kvuli konvenci)
- Komponenty: PascalCase, jeden soubor = jedna komponenta
- Soubory: kebab-case pro utility, PascalCase pro komponenty
- Commit messages: cesky
- Preklady: pouzivat i18n system, zadne hardcoded texty

## Dulezite prikazy
```bash
npm run dev          # Spustit dev server
npm run build        # Build pro produkci
npm run lint         # Spustit ESLint
```

## Jazyky webu
- `cs` - cestina (vychozi)
- `uk` - ukrajinstina
