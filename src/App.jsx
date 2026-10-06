import { MotionConfig } from "motion/react";
import SmoothScroll from "./components/SmoothScroll.jsx";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import Capabilities from "./sections/Capabilities.jsx";
import Features from "./sections/Features.jsx";
import Stats from "./sections/Stats.jsx";
import Platform from "./sections/Platform.jsx";
import Vision from "./sections/Vision.jsx";
import Updates from "./sections/Updates.jsx";
import CtaBand from "./sections/CtaBand.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  return (
    // reducedMotion="user": honours the OS "reduce motion" setting for all motion components.
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Navbar />
      <main id="main">
        <Hero />
        <Capabilities />
        <Features />
        <Stats />
        <Platform />
        <Vision />
        <Updates />
        <CtaBand />
      </main>
      <Footer />
    </MotionConfig>
  );
}
