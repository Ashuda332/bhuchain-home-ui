import Container from "../components/Container.jsx";
import WordReveal from "../components/WordReveal.jsx";

export default function Statement() {
  return (
    <section id="statement" aria-label="Our mission" className="py-24 sm:py-36">
      <Container>
        <WordReveal
          className="max-w-5xl font-display text-[1.9rem] font-medium leading-[1.2] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.6rem]"
          text="A land record should be something you can prove, not something you have to trust. BhuChain makes every parcel in Odisha verifiable, permanent and impossible to sell twice."
        />
      </Container>
    </section>
  );
}
