const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-[background-position,color,border-color,transform,box-shadow] duration-500 " +
  "active:scale-[0.98] whitespace-nowrap";

const variants = {
  // Gold gradient; the sheen slides on hover.
  primary:
    "bg-gold bg-[position:100%_0] text-accent-ink shadow-[0_0_0_1px_rgb(255_255_255/0.15)_inset,0_10px_30px_-10px_var(--c-glow)] hover:bg-[position:0%_0] hover:-translate-y-0.5",
  secondary:
    "border border-line bg-surface/50 text-ink backdrop-blur hover:border-accent/70 hover:text-accent",
  // For use on the always-dark night bands.
  ghostLight: "border border-white/20 text-sand hover:border-[#d9b873]/70 hover:text-[#e9d39a]",
};

/** Anchor styled as a button (the page has no real actions yet, only links). */
export default function Button({ href = "#", variant = "primary", className = "", children, ...rest }) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
