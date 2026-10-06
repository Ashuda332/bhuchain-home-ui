import Reveal from "./Reveal.jsx";

export default function SectionHeading({ title, intro, id, align = "left", className = "" }) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  return (
    <Reveal className={`max-w-2xl ${alignCls} ${className}`}>
      <h2 id={id} className="text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
