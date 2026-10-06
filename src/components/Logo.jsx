/**
 * BhuChain logo (compact, for navbar and footer).
 *
 * Built from the official logo (public/brand/logo-original.webp):
 *  - the interlocked silver + gold rings are redrawn as SVG,
 *  - the "BHUCHAIN" letterforms are used as a CSS mask
 *    (public/brand/wordmark-mask.png) filled with the gold gradient.
 *
 * TODO(brand): when an official vector logo exists, export it as
 * `/public/logo.svg` and replace the markup below with
 *   <img src="/logo.svg" alt="BhuChain" className="h-8 w-auto" />
 * Navbar and Footer both use this component, so one change updates both.
 */
export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label="BhuChain">
      <RingsMark className="h-8 w-auto" />
      <span aria-hidden="true" className="mask-wordmark bg-gold block h-[15px] w-[100px]" />
    </span>
  );
}

export function RingsMark({ className = "" }) {
  return (
    <svg viewBox="0 0 44 32" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="lm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eddeb1" />
          <stop offset=".5" stopColor="#c29e61" />
          <stop offset="1" stopColor="#8f7240" />
        </linearGradient>
        <linearGradient id="lm-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dad2ce" />
          <stop offset=".6" stopColor="#9d9996" />
          <stop offset="1" stopColor="#4d4b4a" />
        </linearGradient>
      </defs>
      <circle cx="17" cy="16" r="12" stroke="url(#lm-silver)" strokeWidth="3.2" />
      <circle cx="27" cy="16" r="12" stroke="url(#lm-gold)" strokeWidth="3.2" />
      {/* silver passes over gold at the lower crossing: interlocked */}
      <path d="M20.6 27.4 A12 12 0 0 0 25.6 25.3" stroke="url(#lm-silver)" strokeWidth="3.2" />
    </svg>
  );
}
