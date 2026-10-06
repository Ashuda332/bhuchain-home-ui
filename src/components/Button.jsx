const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-200 " +
  "active:scale-[0.98] whitespace-nowrap";

const variants = {
  primary:
    "bg-accent text-accent-ink shadow-soft hover:brightness-110 hover:-translate-y-0.5",
  secondary:
    "border border-line bg-surface/70 text-ink backdrop-blur hover:border-accent hover:text-accent",
  // For use on the always-dark navy bands.
  light: "bg-sand text-navy hover:bg-white hover:-translate-y-0.5",
  ghostLight: "border border-white/25 text-sand hover:border-white/60 hover:bg-white/5",
};

/** Anchor styled as a button (the page has no real actions yet, only links). */
export default function Button({ href = "#", variant = "primary", className = "", children, ...rest }) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
