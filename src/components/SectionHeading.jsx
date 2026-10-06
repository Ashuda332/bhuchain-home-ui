import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, intro, id, align = "left", className = "" }) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  return (
    <Reveal className={`max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && (
        <p className={`mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent ${align === "center" ? "justify-center" : ""}`}>
          <span aria-hidden="true" className="bg-gold h-px w-6" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
