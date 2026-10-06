import { MotionConfig } from "motion/react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import ChainOfTitle from "./sections/ChainOfTitle.jsx";
import FraudLab from "./sections/FraudLab.jsx";
import BhuIdAnatomy from "./sections/BhuIdAnatomy.jsx";
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
        <ChainOfTitle />
        <FraudLab />
        <BhuIdAnatomy />
        <Pilot />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
