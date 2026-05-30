"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { navigationLinks } from "../data/navigation";

const NAVBAR_HEIGHT = 80; // px — altura da navbar fixa

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

// ─── scroll suave com offset da navbar ───────────────────────────────────────
function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const [isOpen, setIsOpen]             = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hovered, setHovered]           = useState<string | null>(null);

  // detecta seção ativa: qual section cobre mais a tela no momento
  const updateActive = useCallback(() => {
    const ids = navigationLinks.map((l) => l.href.replace("#", ""));
    let bestId   = "";
    let bestDist = Infinity;

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // distância do topo da section ao ponto logo abaixo da navbar
      const dist = Math.abs(rect.top - NAVBAR_HEIGHT);
      // considera seções que já passaram da navbar ou estão prestes a entrar
      if (rect.top <= NAVBAR_HEIGHT + 80 && dist < bestDist) {
        bestDist = dist;
        bestId   = id;
      }
    });

    if (bestId) setActiveSection(bestId);
  }, []);

  useEffect(() => {
    // roda uma vez ao montar
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const highlighted = hovered ?? activeSection;

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#00ff87]/10 bg-[#050d0a]/80 backdrop-blur-md">
      <nav className="font-mono mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <button
          onClick={() => scrollToSection("#home")}
          className="text-lg font-bold text-[#00ff87] cursor-pointer"
        >
          AA<span className="text-zinc-500">.dev</span>
        </button>

        {/* LINKS desktop */}
        <ul
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navigationLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isHighlighted = highlighted === id;

            return (
              <li key={link.label} className="relative">
                <button
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => setHovered(id)}
                  className="relative z-10 block px-4 py-1.5 text-sm transition-colors duration-200 cursor-pointer"
                  style={{ color: isHighlighted ? "#00ff87" : "#a1a1aa" }}
                >
                  {/* pill animado com layoutId */}
                  {isHighlighted && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(0,255,135,0.08)",
                        border: "1px solid rgba(0,255,135,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>

                {/* ponto indicador de seção ativa */}
                {activeSection === id && !hovered && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff87]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* HAMBURGER mobile */}
        <Hamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </nav>

      {/* MENU mobile */}
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
            <ul className="flex flex-col gap-1 px-4 py-4 list-none">
              {navigationLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={link.label}>
                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => {
                          scrollToSection(link.href);
                          setIsOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                        style={{
                          color:      isActive ? "#00ff87"              : "#a1a1aa",
                          background: isActive ? "rgba(0,255,135,0.06)" : "transparent",
                          border:     isActive ? "1px solid rgba(0,255,135,0.15)" : "1px solid transparent",
                        }}
                      >
                        <span
                          className="font-mono text-[0.6rem] transition-opacity duration-200"
                          style={{ opacity: isActive ? 1 : 0 }}
                        >
                          ▸
                        </span>
                        <span className="font-mono text-sm">{link.label}</span>
                      </button>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
