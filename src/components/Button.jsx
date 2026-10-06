const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium " +
  "transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98] whitespace-nowrap";

const variants = {
  primary: "bg-primary text-primary-ink hover:bg-[#1630d9]",
  secondary: "border border-line bg-bg text-ink hover:bg-band",
  light: "bg-white text-primary hover:bg-white/90",
  ghostLight: "bg-white/10 text-white hover:bg-white/20",
  dark: "bg-white/10 text-white hover:bg-white/15",
};

/** Small square mark used inside primary buttons (echoes the pixel motif). */
export const Square = ({ className = "" }) => (
  <span aria-hidden="true" className={`inline-block h-3 w-3 rounded-[2px] bg-current ${className}`} />
);

export const Chevron = ({ className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 3 5 5-5 5" />
  </svg>
);

/** Anchor styled as a button (the page has no real actions yet, only links). */
export default function Button({ href = "#", variant = "primary", className = "", children, ...rest }) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
