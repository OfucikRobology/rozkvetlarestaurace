/**
 * Placeholder SVG illustrations for the gallery and other sections.
 * Each illustration is a soft, minimal vector representing its category.
 */

interface IllustrationProps {
  className?: string;
}

/* ─── Food illustrations ─── */

export function IllustrationPlate({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* plate */}
      <ellipse cx="100" cy="95" rx="70" ry="20" fill="currentColor" fillOpacity="0.06" />
      <ellipse cx="100" cy="90" rx="60" ry="40" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="100" cy="88" rx="50" ry="32" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      {/* food on plate */}
      <circle cx="90" cy="80" r="12" fill="currentColor" fillOpacity="0.10" />
      <circle cx="110" cy="82" r="10" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="100" cy="75" rx="18" ry="8" fill="currentColor" fillOpacity="0.06" />
      {/* steam */}
      <path d="M88 55C88 55 86 48 90 44C94 40 88 34 88 34" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 52C100 52 98 45 102 41C106 37 100 31 100 31" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M112 55C112 55 110 48 114 44C118 40 112 34 112 34" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
      {/* fork */}
      <line x1="38" y1="60" x2="50" y2="100" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="58" x2="38" y2="72" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="58" x2="41" y2="72" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      {/* knife */}
      <line x1="162" y1="58" x2="150" y2="100" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M164 56C164 56 166 64 164 72" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationBowl({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* shadow */}
      <ellipse cx="100" cy="120" rx="55" ry="10" fill="currentColor" fillOpacity="0.05" />
      {/* bowl */}
      <path d="M40 70C40 70 40 110 100 110C160 110 160 70 160 70" fill="currentColor" fillOpacity="0.08" />
      <path d="M35 70H165" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 70C40 70 40 110 100 110C160 110 160 70 160 70" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      {/* soup content */}
      <ellipse cx="100" cy="72" rx="58" ry="6" fill="currentColor" fillOpacity="0.06" />
      {/* garnish */}
      <circle cx="85" cy="68" r="4" fill="currentColor" fillOpacity="0.10" />
      <circle cx="110" cy="69" r="3" fill="currentColor" fillOpacity="0.08" />
      <path d="M95 65C95 65 100 60 105 65" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" strokeLinecap="round" />
      {/* steam */}
      <path d="M80 50C80 50 78 42 82 38" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 48C100 48 98 40 102 36" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M120 50C120 50 118 42 122 38" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
      {/* spoon */}
      <path d="M155 50C155 50 160 55 158 62C156 69 150 75 150 75" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="155" cy="48" rx="5" ry="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
    </svg>
  );
}

export function IllustrationDumplings({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* plate */}
      <ellipse cx="75" cy="145" rx="55" ry="18" fill="currentColor" fillOpacity="0.06" />
      <ellipse cx="75" cy="140" rx="50" ry="35" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="75" cy="138" rx="42" ry="28" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      {/* dumplings - semicircle shapes */}
      <path d="M55 125C55 118 62 112 70 112C78 112 85 118 85 125" fill="currentColor" fillOpacity="0.10" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
      <path d="M65 130C65 123 72 117 80 117C88 117 95 123 95 130" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <path d="M48 132C48 126 54 121 61 121C68 121 74 126 74 132" fill="currentColor" fillOpacity="0.10" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      {/* fork marks on dumplings */}
      <path d="M63 119L67 116M70 119L74 116M77 120L81 117" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" strokeLinecap="round" />
      {/* sour cream dollop */}
      <ellipse cx="80" cy="122" rx="8" ry="5" fill="currentColor" fillOpacity="0.06" />
      {/* herb sprig */}
      <path d="M90 115C90 115 95 108 92 100" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" strokeLinecap="round" />
      <path d="M92 108C96 106 98 108 96 112" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      <path d="M90 104C86 102 84 104 86 108" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      {/* steam */}
      <path d="M60 95C60 95 58 88 62 84" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M75 92C75 92 73 85 77 81" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationCake({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* shadow */}
      <ellipse cx="100" cy="125" rx="50" ry="8" fill="currentColor" fillOpacity="0.05" />
      {/* cake base */}
      <rect x="55" y="85" width="90" height="35" rx="4" fill="currentColor" fillOpacity="0.08" />
      <rect x="60" y="70" width="80" height="20" rx="4" fill="currentColor" fillOpacity="0.06" />
      {/* frosting drips */}
      <path d="M60 72C60 72 65 78 70 72C75 66 80 72 85 72C90 72 95 66 100 72C105 78 110 72 115 72C120 72 125 66 130 72C135 78 140 72 140 72" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      {/* layer line */}
      <line x1="58" y1="100" x2="142" y2="100" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      {/* decorations on top */}
      <circle cx="80" cy="66" r="4" fill="currentColor" fillOpacity="0.10" />
      <circle cx="100" cy="64" r="5" fill="currentColor" fillOpacity="0.12" />
      <circle cx="120" cy="66" r="4" fill="currentColor" fillOpacity="0.10" />
      {/* candle */}
      <rect x="98" y="48" width="4" height="16" rx="2" fill="currentColor" fillOpacity="0.10" />
      <ellipse cx="100" cy="44" rx="4" ry="6" fill="currentColor" fillOpacity="0.12" />
      {/* flame glow */}
      <circle cx="100" cy="42" r="8" fill="currentColor" fillOpacity="0.04" />
      {/* plate */}
      <path d="M45 120H155" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Interior illustrations ─── */

export function IllustrationDiningHall({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* floor */}
      <rect x="0" y="150" width="300" height="50" fill="currentColor" fillOpacity="0.03" />
      {/* back wall */}
      <rect x="20" y="20" width="260" height="130" fill="currentColor" fillOpacity="0.04" />
      {/* window */}
      <rect x="110" y="30" width="80" height="60" rx="2" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" />
      <line x1="150" y1="30" x2="150" y2="90" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="110" y1="60" x2="190" y2="60" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      {/* curtains */}
      <path d="M108 28C108 28 115 35 112 50C109 65 108 90 108 90" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M192 28C192 28 185 35 188 50C191 65 192 90 192 90" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" strokeLinecap="round" />
      {/* table left */}
      <ellipse cx="80" cy="135" rx="35" ry="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="80" y1="147" x2="80" y2="170" stroke="currentColor" strokeOpacity="0.10" strokeWidth="2" />
      {/* table right */}
      <ellipse cx="220" cy="135" rx="35" ry="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="220" y1="147" x2="220" y2="170" stroke="currentColor" strokeOpacity="0.10" strokeWidth="2" />
      {/* chairs (simple) */}
      <rect x="52" y="140" width="8" height="25" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="100" y="140" width="8" height="25" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="195" y="140" width="8" height="25" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="240" y="140" width="8" height="25" rx="2" fill="currentColor" fillOpacity="0.06" />
      {/* hanging lamp center */}
      <line x1="150" y1="0" x2="150" y2="25" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <path d="M138 25C138 25 144 35 150 35C156 35 162 25 162 25" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <circle cx="150" cy="30" r="3" fill="currentColor" fillOpacity="0.10" />
      {/* plant on table */}
      <path d="M75 128C75 128 72 118 78 115C84 112 80 105 80 105" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" strokeLinecap="round" />
      <circle cx="80" cy="104" r="5" fill="currentColor" fillOpacity="0.06" />
    </svg>
  );
}

export function IllustrationTerrace({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* sky */}
      <rect x="0" y="0" width="200" height="60" fill="currentColor" fillOpacity="0.02" />
      {/* sun */}
      <circle cx="160" cy="25" r="12" fill="currentColor" fillOpacity="0.06" />
      <circle cx="160" cy="25" r="18" fill="currentColor" fillOpacity="0.02" />
      {/* pergola */}
      <line x1="20" y1="50" x2="20" y2="120" stroke="currentColor" strokeOpacity="0.10" strokeWidth="2" />
      <line x1="180" y1="50" x2="180" y2="120" stroke="currentColor" strokeOpacity="0.10" strokeWidth="2" />
      <line x1="15" y1="50" x2="185" y2="50" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
      {/* pergola beams */}
      <line x1="50" y1="48" x2="50" y2="55" stroke="currentColor" strokeOpacity="0.06" strokeWidth="6" />
      <line x1="90" y1="48" x2="90" y2="55" stroke="currentColor" strokeOpacity="0.06" strokeWidth="6" />
      <line x1="130" y1="48" x2="130" y2="55" stroke="currentColor" strokeOpacity="0.06" strokeWidth="6" />
      {/* table */}
      <ellipse cx="100" cy="100" rx="30" ry="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="100" y1="110" x2="100" y2="130" stroke="currentColor" strokeOpacity="0.10" strokeWidth="2" />
      {/* chairs */}
      <rect x="60" y="105" width="6" height="20" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="134" y="105" width="6" height="20" rx="2" fill="currentColor" fillOpacity="0.06" />
      {/* hanging plant */}
      <path d="M45 50C45 50 40 60 45 65C50 70 42 78 42 78" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      <circle cx="45" cy="62" r="4" fill="currentColor" fillOpacity="0.06" />
      <circle cx="42" cy="70" r="3" fill="currentColor" fillOpacity="0.06" />
      {/* ground */}
      <line x1="0" y1="135" x2="200" y2="135" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
    </svg>
  );
}

export function IllustrationBar({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* back shelf */}
      <rect x="30" y="15" width="140" height="60" rx="3" fill="currentColor" fillOpacity="0.04" />
      <line x1="30" y1="45" x2="170" y2="45" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      {/* bottles on shelf */}
      <rect x="50" y="20" width="8" height="22" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="65" y="18" width="7" height="24" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="80" y="20" width="8" height="22" rx="2" fill="currentColor" fillOpacity="0.10" />
      <rect x="100" y="17" width="7" height="25" rx="2" fill="currentColor" fillOpacity="0.06" />
      <rect x="115" y="19" width="8" height="23" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="130" y="20" width="7" height="22" rx="2" fill="currentColor" fillOpacity="0.06" />
      {/* glasses on lower shelf */}
      <path d="M55 48L58 65H52L55 48Z" fill="currentColor" fillOpacity="0.06" />
      <path d="M75 48L78 65H72L75 48Z" fill="currentColor" fillOpacity="0.06" />
      <path d="M95 48L98 65H92L95 48Z" fill="currentColor" fillOpacity="0.06" />
      <path d="M115 48L118 65H112L115 48Z" fill="currentColor" fillOpacity="0.06" />
      {/* bar counter */}
      <rect x="15" y="85" width="170" height="8" rx="3" fill="currentColor" fillOpacity="0.10" />
      <rect x="20" y="93" width="160" height="40" rx="2" fill="currentColor" fillOpacity="0.06" />
      {/* bar stools */}
      <circle cx="50" cy="115" r="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="50" y1="123" x2="50" y2="145" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" />
      <circle cx="100" cy="115" r="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="100" y1="123" x2="100" y2="145" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" />
      <circle cx="150" cy="115" r="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="150" y1="123" x2="150" y2="145" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" />
      {/* pendant light */}
      <line x1="100" y1="0" x2="100" y2="8" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
      <path d="M92 8C92 8 96 15 100 15C104 15 108 8 108 8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" />
    </svg>
  );
}

/* ─── Events illustrations ─── */

export function IllustrationWedding({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* arch */}
      <path d="M60 180C60 180 60 60 150 40C240 60 240 180 240 180" stroke="currentColor" strokeOpacity="0.10" strokeWidth="2" fill="currentColor" fillOpacity="0.03" />
      {/* flowers on arch */}
      <circle cx="80" cy="80" r="8" fill="currentColor" fillOpacity="0.08" />
      <circle cx="70" cy="95" r="6" fill="currentColor" fillOpacity="0.06" />
      <circle cx="90" cy="70" r="5" fill="currentColor" fillOpacity="0.06" />
      <circle cx="220" cy="80" r="8" fill="currentColor" fillOpacity="0.08" />
      <circle cx="230" cy="95" r="6" fill="currentColor" fillOpacity="0.06" />
      <circle cx="210" cy="70" r="5" fill="currentColor" fillOpacity="0.06" />
      {/* top flower cluster */}
      <circle cx="150" cy="38" r="10" fill="currentColor" fillOpacity="0.10" />
      <circle cx="140" cy="45" r="7" fill="currentColor" fillOpacity="0.06" />
      <circle cx="160" cy="45" r="7" fill="currentColor" fillOpacity="0.06" />
      {/* long table */}
      <rect x="70" y="140" width="160" height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
      <rect x="85" y="146" width="130" height="30" rx="2" fill="currentColor" fillOpacity="0.04" />
      {/* table settings */}
      <circle cx="110" cy="137" r="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
      <circle cx="150" cy="137" r="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
      <circle cx="190" cy="137" r="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
      {/* centerpiece */}
      <path d="M145 130C145 130 148 120 150 118C152 120 155 130 155 130" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      <circle cx="150" cy="116" r="5" fill="currentColor" fillOpacity="0.08" />
      {/* hearts */}
      <path d="M148 60C148 56 142 52 142 58C142 62 148 66 148 66C148 66 154 62 154 58C154 52 148 56 148 60Z" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

export function IllustrationParty({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* banner / bunting */}
      <path d="M20 20C20 20 60 35 100 25C140 15 180 30 180 30" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      {/* flags */}
      <path d="M45 22L40 38L50 38Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M75 22L70 38L80 38Z" fill="currentColor" fillOpacity="0.06" />
      <path d="M105 20L100 36L110 36Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M135 22L130 38L140 38Z" fill="currentColor" fillOpacity="0.06" />
      <path d="M165 26L160 42L170 42Z" fill="currentColor" fillOpacity="0.08" />
      {/* cake */}
      <rect x="80" y="80" width="40" height="20" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="85" y="68" width="30" height="15" rx="3" fill="currentColor" fillOpacity="0.06" />
      <path d="M85 70C85 70 90 65 95 70C100 75 105 70 110 70C115 70 115 65 115 70" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1" strokeLinecap="round" />
      {/* candles */}
      <rect x="93" y="58" width="3" height="10" rx="1" fill="currentColor" fillOpacity="0.10" />
      <rect x="103" y="58" width="3" height="10" rx="1" fill="currentColor" fillOpacity="0.10" />
      <ellipse cx="94.5" cy="55" rx="3" ry="4" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="104.5" cy="55" rx="3" ry="4" fill="currentColor" fillOpacity="0.08" />
      {/* plate */}
      <ellipse cx="100" cy="105" rx="30" ry="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      {/* balloons */}
      <ellipse cx="40" cy="65" rx="12" ry="15" fill="currentColor" fillOpacity="0.06" />
      <line x1="40" y1="80" x2="42" y2="100" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
      <ellipse cx="160" cy="60" rx="12" ry="15" fill="currentColor" fillOpacity="0.08" />
      <line x1="160" y1="75" x2="158" y2="95" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
      {/* confetti dots */}
      <circle cx="60" cy="50" r="2" fill="currentColor" fillOpacity="0.08" />
      <circle cx="140" cy="45" r="2" fill="currentColor" fillOpacity="0.06" />
      <circle cx="30" cy="90" r="1.5" fill="currentColor" fillOpacity="0.06" />
      <circle cx="170" cy="85" r="1.5" fill="currentColor" fillOpacity="0.08" />
      <circle cx="55" cy="115" r="1.5" fill="currentColor" fillOpacity="0.06" />
      <circle cx="150" cy="110" r="1.5" fill="currentColor" fillOpacity="0.06" />
    </svg>
  );
}

/* ─── Decoration illustrations ─── */

export function IllustrationFlowerVase({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* shadow */}
      <ellipse cx="75" cy="185" rx="30" ry="5" fill="currentColor" fillOpacity="0.04" />
      {/* vase */}
      <path d="M55 130C50 145 52 175 60 180C65 183 85 183 90 180C98 175 100 145 95 130" fill="currentColor" fillOpacity="0.08" />
      <path d="M55 130C55 130 60 125 75 125C90 125 95 130 95 130" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      {/* stems */}
      <line x1="65" y1="125" x2="55" y2="75" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="75" y1="125" x2="75" y2="60" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="85" y1="125" x2="95" y2="70" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      {/* flowers */}
      <circle cx="55" cy="72" r="12" fill="currentColor" fillOpacity="0.06" />
      <circle cx="55" cy="72" r="5" fill="currentColor" fillOpacity="0.12" />
      <circle cx="75" cy="56" r="14" fill="currentColor" fillOpacity="0.08" />
      <circle cx="75" cy="56" r="6" fill="currentColor" fillOpacity="0.12" />
      <circle cx="95" cy="67" r="11" fill="currentColor" fillOpacity="0.06" />
      <circle cx="95" cy="67" r="4" fill="currentColor" fillOpacity="0.12" />
      {/* small buds */}
      <circle cx="45" cy="85" r="5" fill="currentColor" fillOpacity="0.06" />
      <circle cx="105" cy="80" r="5" fill="currentColor" fillOpacity="0.06" />
      {/* leaves */}
      <path d="M68 100C68 100 58 92 55 95C52 98 62 102 68 100Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M82 95C82 95 92 87 95 90C98 93 88 97 82 95Z" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

export function IllustrationPlants({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* pots */}
      <path d="M25 100L20 130H60L55 100Z" fill="currentColor" fillOpacity="0.08" />
      <rect x="22" y="95" width="36" height="8" rx="2" fill="currentColor" fillOpacity="0.10" />
      <path d="M90 105L86 130H124L120 105Z" fill="currentColor" fillOpacity="0.06" />
      <rect x="88" y="100" width="34" height="7" rx="2" fill="currentColor" fillOpacity="0.08" />
      <path d="M155 100L150 130H185L180 100Z" fill="currentColor" fillOpacity="0.08" />
      <rect x="152" y="95" width="32" height="8" rx="2" fill="currentColor" fillOpacity="0.10" />
      {/* plant 1 - tall leafy */}
      <line x1="40" y1="95" x2="40" y2="55" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 70C40 70 28 60 25 65C22 70 35 74 40 70Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M40 60C40 60 52 50 55 55C58 60 45 64 40 60Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M40 80C40 80 52 72 54 77C56 82 43 83 40 80Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M40 55C40 55 35 45 38 42C41 39 43 48 40 55Z" fill="currentColor" fillOpacity="0.08" />
      {/* plant 2 - bushy */}
      <circle cx="105" cy="80" r="14" fill="currentColor" fillOpacity="0.06" />
      <circle cx="95" cy="75" r="10" fill="currentColor" fillOpacity="0.06" />
      <circle cx="115" cy="78" r="10" fill="currentColor" fillOpacity="0.06" />
      <circle cx="105" cy="70" r="8" fill="currentColor" fillOpacity="0.08" />
      {/* plant 3 - succulent */}
      <path d="M167 90C167 90 162 75 167 70C172 75 167 90 167 90Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M167 88C167 88 155 78 157 72C162 74 167 88 167 88Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M167 88C167 88 179 78 177 72C172 74 167 88 167 88Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M167 92C167 92 150 85 152 80C158 80 167 92 167 92Z" fill="currentColor" fillOpacity="0.06" />
      <path d="M167 92C167 92 184 85 182 80C176 80 167 92 167 92Z" fill="currentColor" fillOpacity="0.06" />
      {/* shelf line */}
      <line x1="10" y1="135" x2="190" y2="135" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
    </svg>
  );
}

export function IllustrationSeasonal({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* wreath circle */}
      <circle cx="100" cy="75" r="45" stroke="currentColor" strokeOpacity="0.08" strokeWidth="8" fill="none" />
      <circle cx="100" cy="75" r="45" stroke="currentColor" strokeOpacity="0.04" strokeWidth="14" fill="none" />
      {/* leaf decorations around wreath */}
      <path d="M60 45C60 45 50 38 48 42C46 46 56 48 60 45Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M55 60C55 60 44 55 42 59C40 63 51 63 55 60Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M140 45C140 45 150 38 152 42C154 46 144 48 140 45Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M145 60C145 60 156 55 158 59C160 63 149 63 145 60Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M60 105C60 105 50 112 48 108C46 104 56 102 60 105Z" fill="currentColor" fillOpacity="0.10" />
      <path d="M140 105C140 105 150 112 152 108C154 104 144 102 140 105Z" fill="currentColor" fillOpacity="0.10" />
      {/* berries */}
      <circle cx="52" cy="50" r="3" fill="currentColor" fillOpacity="0.12" />
      <circle cx="148" cy="50" r="3" fill="currentColor" fillOpacity="0.12" />
      <circle cx="55" cy="100" r="3" fill="currentColor" fillOpacity="0.10" />
      <circle cx="145" cy="100" r="3" fill="currentColor" fillOpacity="0.10" />
      {/* top bow */}
      <path d="M90 28C90 28 85 20 92 18C99 16 100 25 100 28" fill="currentColor" fillOpacity="0.08" />
      <path d="M110 28C110 28 115 20 108 18C101 16 100 25 100 28" fill="currentColor" fillOpacity="0.08" />
      <circle cx="100" cy="28" r="3" fill="currentColor" fillOpacity="0.12" />
      {/* center star */}
      <path d="M100 65L103 72H110L104 77L107 84L100 79L93 84L96 77L90 72H97L100 65Z" fill="currentColor" fillOpacity="0.10" />
    </svg>
  );
}

/* ─── Map of category to illustrations ─── */

const foodIllustrations = [IllustrationPlate, IllustrationBowl, IllustrationDumplings, IllustrationCake];
const interiorIllustrations = [IllustrationDiningHall, IllustrationTerrace, IllustrationBar];
const eventsIllustrations = [IllustrationWedding, IllustrationParty];
const decorationIllustrations = [IllustrationFlowerVase, IllustrationPlants, IllustrationSeasonal];

export function getIllustrationForGallery(category: string, index: number) {
  switch (category) {
    case "food":
      return foodIllustrations[index % foodIllustrations.length];
    case "interior":
      return interiorIllustrations[index % interiorIllustrations.length];
    case "events":
      return eventsIllustrations[index % eventsIllustrations.length];
    case "decoration":
      return decorationIllustrations[index % decorationIllustrations.length];
    default:
      return IllustrationPlate;
  }
}
