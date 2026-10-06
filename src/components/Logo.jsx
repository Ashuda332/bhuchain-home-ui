/**
 * BhuChain wordmark.
 *
 * TODO(brand): There is no final logo yet. When it is ready, drop it at
 * `/public/logo.svg` and replace the markup below with:
 *
 *   <img src="/logo.svg" alt="BhuChain" className="h-8 w-auto" />
 *
 * This component is used by both the Navbar and the Footer, so swapping it
 * here updates the logo everywhere.
 */
export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Temporary mark: a land parcel outline anchored on a ledger line. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 shrink-0"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          className="fill-accent/10 stroke-accent/40"
        />
        <path
          d="M8 19.5 16 10l8 9.5"
          stroke="var(--c-accent)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10.5 23h11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">
        Bhu<span className="text-accent">Chain</span>
      </span>
    </span>
  );
}
