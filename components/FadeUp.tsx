"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
};

export function FadeUp({ children, delay = 0 }: FadeUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
