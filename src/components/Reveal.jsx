import { motion } from "motion/react";

/**
 * Fade-up (with a soft de-blur) on scroll. Reduced-motion users get no movement
 * because the app is wrapped in <MotionConfig reducedMotion="user">.
 */
export default function Reveal({ as = "div", delay = 0, y = 28, className = "", children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
