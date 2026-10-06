import { MotionConfig } from "motion/react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import Statement from "./sections/Statement.jsx";
import Problem from "./sections/Problem.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import Features from "./sections/Features.jsx";
import Pilot from "./sections/Pilot.jsx";
import FinalCta from "./sections/FinalCta.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  return (
    // reducedMotion="user": honours the OS "reduce motion" setting for all motion components.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main">
        <Hero />
        <Statement />
        <Problem />
        <HowItWorks />
        <Features />
        <Pilot />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
