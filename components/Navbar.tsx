"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { navigationLinks } from "../data/navigation";

// ─── Variants do menu mobile ──────────────────────────────────────────────────
const menuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut", when: "afterChildren" },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut", when: "beforeChildren", staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open:   { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

// ─── Hamburger ────────────────────────────────────────────────────────────────
function Hamburger({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      className="flex flex-col justify-center gap-[5px] p-1 md:hidden"
    >
      <motion.span
        animate={isOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.3 }}
        className="block w-[22px] h-[2px] bg-[#00ff87] rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-[22px] h-[2px] bg-[#00ff87] rounded-full"
      />
      <motion.span
        animate={isOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.3 }}
        className="block w-[22px] h-[2px] bg-[#00ff87] rounded-full origin-center"
      />
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#00ff87]/10 bg-[#050d0a]/80 backdrop-blur-md">
      <nav className="font-mono mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link href="#home" className="text-lg font-bold text-[#00ff87]">
          AA<span className="text-zinc-500">.dev</span>
        </Link>

        {/* LINKS desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-zinc-400 transition-colors duration-300 hover:text-[#00ff87]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* HAMBURGER mobile */}
        <Hamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </nav>

      {/* MENU mobile com Variants */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-[#00ff87]/10 bg-[#050d0a]/95 backdrop-blur-md"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 list-none">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <motion.div variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-sm text-zinc-400 transition-colors duration-200 hover:text-[#00ff87]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
