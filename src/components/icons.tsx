/**
 * Custom modern SVG icon components for Rozkvetlá restaurace.
 * These replace generic lucide-react icons with bespoke,
 * nature-themed vectors that match the restaurant brand.
 */

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/** Elegant blooming flower — replaces Flower2 for brand identity */
export function IconBloom({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* center */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
      {/* petals — 5 symmetrical, slightly organic */}
      <path d="M12 9.5C12 9.5 10 5 12 2.5C14 5 12 9.5 12 9.5Z" />
      <path d="M14.2 10.5C14.2 10.5 18 8 20.5 9.5C18.5 11.5 14.2 10.5 14.2 10.5Z" />
      <path d="M13.8 13.5C13.8 13.5 17.5 16 17.5 19C15 17.5 13.8 13.5 13.8 13.5Z" />
      <path d="M10.2 13.5C10.2 13.5 6.5 16 6.5 19C9 17.5 10.2 13.5 10.2 13.5Z" />
      <path d="M9.8 10.5C9.8 10.5 6 8 3.5 9.5C5.5 11.5 9.8 10.5 9.8 10.5Z" />
    </svg>
  );
}

/** Stylized fork & knife — replaces UtensilsCrossed */
export function IconDining({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* fork */}
      <path d="M7 2v6c0 1.7 1.3 3 3 3v11" />
      <path d="M7 2C7 2 5 4 5 6.5C5 9 7 8 7 8" />
      <line x1="7" y1="2" x2="7" y2="8" />
      <line x1="9" y1="2" x2="9" y2="8" />
      {/* knife */}
      <path d="M17 2C14.5 2 14 5 14 7C14 9 15.5 11 17 11V22" />
    </svg>
  );
}

/** Elegant camera lens — replaces Camera for gallery */
export function IconLens({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="8" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="2" fill="currentColor" fillOpacity="0.12" />
      {/* aperture blades hint */}
      <path d="M12 5V8" />
      <path d="M17.66 8.34L15.54 10.46" />
      <path d="M7 13H4" />
      {/* flash */}
      <path d="M9 3L10.5 5.5" />
      <path d="M15 3L13.5 5.5" />
    </svg>
  );
}

/** Wine glass — replaces Wine for celebrations/bar */
export function IconCelebration({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* glass */}
      <path d="M8 2H16L14 10C14 12 12 14 12 14" />
      <path d="M8 2C8 2 6 6 8 10C9 12 12 14 12 14" />
      {/* stem */}
      <line x1="12" y1="14" x2="12" y2="20" />
      {/* base */}
      <path d="M8 20C8 20 10 22 12 22C14 22 16 20 16 20" />
      {/* sparkle */}
      <path d="M18 5L19 4M19 7L20.5 7M17.5 8L18.5 9.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Nature leaf with veins — replaces Leaf */
export function IconLeaf({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M17 3C17 3 21 8 19 14C17 20 12 21 12 21C12 21 7 20 5 14C3 8 7 3 7 3C7 3 10 5 12 5C14 5 17 3 17 3Z" fill="currentColor" fillOpacity="0.06" />
      {/* central vein */}
      <path d="M12 5V21" />
      {/* side veins */}
      <path d="M12 9C12 9 9 8 7.5 9.5" />
      <path d="M12 9C12 9 15 8 16.5 9.5" />
      <path d="M12 13C12 13 8 12 6.5 14" />
      <path d="M12 13C12 13 16 12 17.5 14" />
      <path d="M12 17C12 17 9 16.5 8 18" />
      <path d="M12 17C12 17 15 16.5 16 18" />
    </svg>
  );
}

/** Growing sprout — replaces Sprout */
export function IconSprout({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* stem */}
      <path d="M12 22C12 22 12 14 12 10" />
      {/* right leaf */}
      <path d="M12 12C12 12 16 10 19 6C19 6 14 5 12 10" fill="currentColor" fillOpacity="0.06" />
      {/* left leaf */}
      <path d="M12 16C12 16 8 14 5 10C5 10 10 9 12 14" fill="currentColor" fillOpacity="0.06" />
      {/* tiny bud at top */}
      <path d="M12 10C12 10 10 6 12 3C14 6 12 10 12 10Z" fill="currentColor" fillOpacity="0.08" />
      {/* soil */}
      <path d="M8 22C8 22 10 20 12 20C14 20 16 22 16 22" />
    </svg>
  );
}

/** Shield with checkmark — for privacy page */
export function IconShieldCheck({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L3 7V12C3 17.5 7 21.5 12 22C17 21.5 21 17.5 21 12V7L12 2Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  );
}

/** Elegant clock face — replaces Clock */
export function IconTime({ className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      {/* hour ticks */}
      <line x1="12" y1="2.5" x2="12" y2="4" strokeWidth="1" />
      <line x1="21.5" y1="12" x2="20" y2="12" strokeWidth="1" />
      <line x1="12" y1="21.5" x2="12" y2="20" strokeWidth="1" />
      <line x1="2.5" y1="12" x2="4" y2="12" strokeWidth="1" />
    </svg>
  );
}

/** Decorative floral divider — standalone component */
export function FloralDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`}>
      <span className="h-px w-12 bg-primary/25" />
      <IconBloom className="h-5 w-5 text-primary/50" strokeWidth={1.2} />
      <span className="h-px w-12 bg-primary/25" />
    </div>
  );
}

/** Decorative SVG leaf for hero backgrounds */
export function DecoLeaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 10C60 10 25 35 25 70C25 90 40 110 60 110C80 110 95 90 95 70C95 35 60 10 60 10Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M60 30V95" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M60 50C45 45 35 55 35 55" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 65C75 60 85 70 85 70" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 80C48 76 40 83 40 83" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
