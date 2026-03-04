# Typography Reference

Curated Google Font pairings organized by aesthetic direction. Each pairing includes a display font (headings) and a body font (text), plus import instructions.

## How to Use

1. Pick the aesthetic that matches your project
2. Copy the Google Fonts import link
3. Apply the display font to headings, the body font to paragraphs and UI text

Always import via HTML `<link>` or CSS `@import`. Set `font-display: swap` for performance.

---

## Modern / Clean

For SaaS products, dashboards, professional tools.

**Pairing 1: Satoshi + DM Sans**
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Satoshi', sans-serif;
--font-body: 'DM Sans', sans-serif;
```

**Pairing 2: Plus Jakarta Sans + Source Sans 3**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Plus Jakarta Sans', sans-serif;
--font-body: 'Source Sans 3', sans-serif;
```

**Pairing 3: Outfit + Nunito Sans**
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Nunito+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Outfit', sans-serif;
--font-body: 'Nunito Sans', sans-serif;
```

**Pairing 4: General Sans + Inter (as body only)**
```html
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@600,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```
Note: Inter is acceptable as a body font when paired with a distinctive display font.

---

## Bold / Impactful

For landing pages, marketing sites, creative agencies.

**Pairing 1: Clash Display + Cabinet Grotesk**
```html
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=cabinet-grotesk@400,500,700&display=swap" rel="stylesheet">
```
```css
--font-display: 'Clash Display', sans-serif;
--font-body: 'Cabinet Grotesk', sans-serif;
```

**Pairing 2: Syne + Work Sans**
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Syne', sans-serif;
--font-body: 'Work Sans', sans-serif;
```

**Pairing 3: Unbounded + Manrope**
```html
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Unbounded', sans-serif;
--font-body: 'Manrope', sans-serif;
```

**Pairing 4: Bricolage Grotesque + Instrument Sans**
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Bricolage Grotesque', sans-serif;
--font-body: 'Instrument Sans', sans-serif;
```

---

## Elegant / Editorial

For portfolios, blogs, luxury brands, editorial content.

**Pairing 1: Playfair Display + Lora**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Playfair Display', serif;
--font-body: 'Lora', serif;
```

**Pairing 2: Fraunces + Libre Franklin**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;800&family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Fraunces', serif;
--font-body: 'Libre Franklin', sans-serif;
```

**Pairing 3: DM Serif Display + DM Sans**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'DM Serif Display', serif;
--font-body: 'DM Sans', sans-serif;
```

**Pairing 4: Cormorant Garamond + Jost**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500&display=swap" rel="stylesheet">
```
```css
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Jost', sans-serif;
```

---

## Futuristic / Tech

For developer tools, AI products, crypto, gaming.

**Pairing 1: JetBrains Mono + Geist Sans**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css" rel="stylesheet">
```
```css
--font-display: 'JetBrains Mono', monospace;
--font-body: 'Geist Sans', sans-serif;
```

**Pairing 2: Space Mono + Space Grotesk**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```
```css
--font-display: 'Space Mono', monospace;
--font-body: 'Space Grotesk', sans-serif;
```
Note: Space Grotesk is acceptable when used intentionally for tech contexts, not as a lazy default.

**Pairing 3: Orbitron + Exo 2**
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Exo+2:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Orbitron', sans-serif;
--font-body: 'Exo 2', sans-serif;
```

**Pairing 4: Chakra Petch + IBM Plex Sans**
```html
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Chakra Petch', sans-serif;
--font-body: 'IBM Plex Sans', sans-serif;
```

---

## Warm / Friendly

For consumer apps, food/wellness brands, community platforms.

**Pairing 1: Quicksand + Poppins**
```html
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Quicksand', sans-serif;
--font-body: 'Poppins', sans-serif;
```

**Pairing 2: Fredoka + Nunito**
```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Fredoka', sans-serif;
--font-body: 'Nunito', sans-serif;
```

**Pairing 3: Lexend + Karla**
```html
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Karla:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Lexend', sans-serif;
--font-body: 'Karla', sans-serif;
```

---

## Brutalist / Raw

For experimental projects, art sites, counterculture brands.

**Pairing 1: Archivo Black + Archivo**
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Archivo Black', sans-serif;
--font-body: 'Archivo', sans-serif;
```

**Pairing 2: Anton + Inconsolata**
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inconsolata:wght@400;500;600&display=swap" rel="stylesheet">
```
```css
--font-display: 'Anton', sans-serif;
--font-body: 'Inconsolata', monospace;
```

---

## Typography Application Rules

### Heading Styles
```css
h1 {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

h2 {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}
```

### Body Text
```css
body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
}

/* Comfortable reading width */
.prose { max-width: 68ch; }

/* Small text / labels */
.label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```
