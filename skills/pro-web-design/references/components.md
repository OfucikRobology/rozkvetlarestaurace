# Component Patterns Reference

Production-grade patterns for common UI components. Each pattern includes the CSS approach and key implementation details.

## Buttons

### Hierarchy System
Every page needs a clear button hierarchy. Never use two primary buttons side by side.

```css
/* Primary — main CTA, filled */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1;
  letter-spacing: 0.01em;
  color: white;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: all 0.2s ease-out;
  min-height: 44px; /* Touch target */
}
.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--color-primary-muted);
}
.btn-primary:active {
  transform: translateY(0);
}

/* Secondary — outlined */
.btn-secondary {
  /* Same base as primary */
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text);
  background: transparent;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: all 0.2s ease-out;
  min-height: 44px;
}
.btn-secondary:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-text-muted);
}

/* Ghost — text only */
.btn-ghost {
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease-out;
}
.btn-ghost:hover {
  color: var(--color-text);
}
```

### Button Sizes
```css
.btn-sm { padding: 0.5rem 1rem; font-size: 0.8125rem; min-height: 36px; }
.btn-md { padding: 0.75rem 1.5rem; font-size: 0.875rem; min-height: 44px; }
.btn-lg { padding: 1rem 2rem; font-size: 1rem; min-height: 52px; }
```

---

## Cards

### Standard Card
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg, 12px);
  padding: 1.5rem;
  transition: all 0.2s ease-out;
}
.card:hover {
  border-color: var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* Card with image */
.card-media {
  overflow: hidden;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--color-border-subtle);
}
.card-media img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: transform 0.3s ease-out;
}
.card-media:hover img {
  transform: scale(1.03);
}
.card-media .card-body {
  padding: 1.25rem 1.5rem;
}
```

### Card Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

### Pricing Card (special pattern)
```css
.pricing-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg, 16px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}
.pricing-card.featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary), 0 8px 32px var(--color-primary-muted);
}
.pricing-card .price {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 1.5rem 0;
}
.pricing-card .price span {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text-muted);
}
```

---

## Navigation

### Top Navigation
```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--color-bg) 85%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: 0 1.5rem;
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.15s;
  position: relative;
}
.nav-link:hover, .nav-link.active {
  color: var(--color-text);
}
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
}

/* Mobile hamburger breakpoint */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-mobile-toggle { display: flex; }
}
```

### Mobile Navigation
```css
.mobile-nav {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--color-bg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}
.mobile-nav.open {
  transform: translateX(0);
}
.mobile-nav-link {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border-subtle);
  color: var(--color-text);
  text-decoration: none;
}
```

---

## Forms

### Input Fields
```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.input-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.01em;
}
.input-field {
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md, 8px);
  outline: none;
  transition: all 0.15s ease-out;
  min-height: 44px;
}
.input-field::placeholder {
  color: var(--color-text-subtle);
}
.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-muted);
}
.input-field:invalid:not(:placeholder-shown) {
  border-color: var(--color-error);
}
.input-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
.input-error {
  font-size: 0.75rem;
  color: var(--color-error);
}
```

---

## Hero Sections

### Centered Hero (most common)
```css
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-primary);
  background: var(--color-primary-muted);
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  max-width: 14ch;
  margin-bottom: 1.25rem;
}
.hero p {
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  color: var(--color-text-muted);
  max-width: 48ch;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
```

### Split Hero (image + text)
```css
.hero-split {
  min-height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .hero-split {
    grid-template-columns: 1fr;
    text-align: center;
    min-height: auto;
    padding: 3rem 1.5rem;
  }
}
```

---

## Section Layouts

### Feature Grid
```css
.features {
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.features-header {
  text-align: center;
  margin-bottom: 4rem;
}
.features-header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}
.features-header p {
  color: var(--color-text-muted);
  max-width: 50ch;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.feature-card {
  padding: 2rem;
  border-radius: var(--radius-lg, 12px);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
}
.feature-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md, 10px);
  background: var(--color-primary-muted);
  color: var(--color-primary);
  margin-bottom: 1.25rem;
}
```

### Testimonials
```css
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.testimonial {
  padding: 1.5rem;
  border-radius: var(--radius-lg, 12px);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
}
.testimonial-text {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.testimonial-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary-muted);
}
.testimonial-name {
  font-weight: 600;
  font-size: 0.875rem;
}
.testimonial-role {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
```

---

## Footer

```css
.footer {
  border-top: 1px solid var(--color-border-subtle);
  padding: 4rem 1.5rem 2rem;
  margin-top: 6rem;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 3rem;
}
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
.footer-brand {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.footer-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 30ch;
}
.footer-heading {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}
.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
.footer-link {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.15s;
}
.footer-link:hover {
  color: var(--color-text);
}
.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-subtle);
  font-size: 0.8125rem;
  color: var(--color-text-subtle);
}
```

---

## Animations Library

### Entry Animations
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Usage: add class + stagger with custom property */
.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
  opacity: 0;
}
/* Stagger children */
.stagger > :nth-child(1) { animation-delay: 0ms; }
.stagger > :nth-child(2) { animation-delay: 80ms; }
.stagger > :nth-child(3) { animation-delay: 160ms; }
.stagger > :nth-child(4) { animation-delay: 240ms; }
.stagger > :nth-child(5) { animation-delay: 320ms; }
.stagger > :nth-child(6) { animation-delay: 400ms; }
```

### Scroll Reveal (JavaScript)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
