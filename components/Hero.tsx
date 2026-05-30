"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/Button";
import Image from "next/image";

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charIdx = useRef(0);
  const apagando = useRef(false);

  useEffect(() => {
    const texto = texts[0];

    function tick() {
      if (!apagando.current) {
        // digitando
        charIdx.current += 1;
        setDisplayed(texto.slice(0, charIdx.current));

        if (charIdx.current === texto.length) {
          // terminou de escrever → pausa 2.5s antes de apagar
          apagando.current = true;
          timeoutRef.current = setTimeout(tick, 2500);
        } else {
          timeoutRef.current = setTimeout(tick, 120);
        }
      } else {
        // apagando
        charIdx.current -= 1;
        setDisplayed(texto.slice(0, charIdx.current));

        if (charIdx.current === 0) {
          // terminou de apagar → pausa 500ms antes de redigitar
          apagando.current = false;
          timeoutRef.current = setTimeout(tick, 500);
        } else {
          timeoutRef.current = setTimeout(tick, 70);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, 120);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [texts]);

  return (
    <h2
      className="font-sans text-xl md:text-2xl text-white/80 mt-1 h-8"
      aria-label="Desenvolvedora Web"
    >
      <span aria-hidden="true">
        {displayed}
        <span className="text-[#00ff87] animate-pulse">|</span>
      </span>
    </h2>
  );
}

// ─── FadeUp scroll-triggered ──────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

// ─── Hero Visual (foto + rings + code tags) ───────────────────────────────────
function HeroVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="flex-1 flex justify-center items-center relative"
      aria-label="Foto de Ana Ananias"
    >
      {/* wrapper — tamanho total do conjunto */}
      <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem]">

        {/*── Ring externo sólido com glow ── */}
        <div
          className="absolute inset-0 rounded-full border border-[#00ff87]/20"
          style={{ boxShadow: "0 0 40px rgba(0,255,135,0.06)" }}
        />

        {/* ── Ring tracejado girando (Framer Motion) ── */}
        <motion.div
          className="absolute inset-5 rounded-full border border-dashed border-[#00ff87]/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        />

        {/* ── Foto com glow verde ── */}
        <div
          className="absolute inset-14 rounded-full overflow-hidden border-2 border-[#00ff87]/25 bg-[#00ff87]/5"
          style={{ boxShadow: "0 0 60px rgba(0,255,135,0.12), inset 0 0 30px rgba(0,255,135,0.04)" }}
        >
          <Image
            src="/img/foto-perfil.jpeg"
            alt="Foto de Ana Ananias"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Code tags flutuando ── */}

        {/* </html> — canto superior direito */}
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
          className="absolute -top-2 -right-4 font-mono text-xs text-[#00ff87]/70 border border-[#00ff87]/20 bg-[#050d0a] px-2.5 py-1 rounded"
          aria-hidden="true"
        >
          &lt;/html&gt;
        </motion.span>

        {/* async/await — lado direito */}
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
          className="absolute right-[-3.5rem] top-1/2 -translate-y-1/2 font-mono text-xs text-[#00ff87]/70 border border-[#00ff87]/20 bg-[#050d0a] px-2.5 py-1 rounded"
          aria-hidden="true"
        >
          async/await
        </motion.span>

        {/* fetch() — inferior esquerdo */}
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
          className="absolute -bottom-2 left-4 font-mono text-xs text-[#00ff87]/70 border border-[#00ff87]/20 bg-[#050d0a] px-2.5 py-1 rounded"
          aria-hidden="true"
        >
          fetch()
        </motion.span>

      </div>
    </motion.figure>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Grid de fundo hacker */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Glow de fundo central */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(0,255,135,0.3) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Inner ── */}
      <div className="relative max-w-7xl mx-auto w-full px-8 py-12 flex flex-col md:flex-row items-center gap-16 md:px-20 md:py-16">

        {/* Conteúdo esquerdo */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Badge */}
          <FadeUp delay={0.1}>
            <span
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00ff87]/70 border border-[#00ff87]/20 rounded-full px-4 py-1.5 w-fit"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]" />
              </span>
              disponível para oportunidades
            </span>
          </FadeUp>

          {/* Nome */}
          <FadeUp delay={0.2}>
            <p className="font-mono text-base tracking-[0.15em] text-[#00ff87]/60 lowercase mb-1" aria-hidden="true">
              olá, eu sou
            </p>
            <h1
              id="hero-heading"
              className="font-sans font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Ana{" "}
              <span
                className="text-[#00ff87]"
                style={{ textShadow: "0 0 30px rgba(0,255,135,0.5), 0 0 60px rgba(0,255,135,0.2)" }}
              >
                Ananias
              </span>
            </h1>
            <Typewriter texts={["Desenvolvedora Web"]} />
          </FadeUp>

          {/* Bio */}
          <FadeUp delay={0.3}>
            <p className="font-sans text-base leading-7 text-white/40 max-w-md">
              Apaixonada por interfaces bem feitas. Transformo ideias em experiências
              digitais com tecnologias modernas, sempre com atenção aos detalhes e amor
              pelo que faço.
            </p>
          </FadeUp>

          {/* Botão */}
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap gap-4">
                <Button href="#projects">Ver projetos</Button>
            </div>
          </FadeUp>

          {/* Social */}
          <FadeUp delay={0.5}>
            <nav className="flex gap-3" aria-label="Redes">
              <a
                href="https://github.com/anaflgg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub da Ana"
                className="p-2.5 rounded-md border border-[#00ff87]/20 text-[#00ff87]/50 hover:text-[#00ff87] hover:border-[#00ff87]/50 hover:bg-[#00ff87]/5 transition-all duration-200"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/anaflgg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Ana"
                className="p-2.5 rounded-md border border-[#00ff87]/20 text-[#00ff87]/50 hover:text-[#00ff87] hover:border-[#00ff87]/50 hover:bg-[#00ff87]/5 transition-all duration-200"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </nav>
          </FadeUp>
        </div>

        {/* Foto */}
        <HeroVisual />
      </div>

      {/* Scroll hint */}
      <p
        className="relative text-center font-mono text-xs text-[#00ff87]/20 pb-8 tracking-[0.05em]"
        aria-hidden="true"
      >
        scroll para ver mais ↓
      </p>
    </section>
  );
}
