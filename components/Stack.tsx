"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SectionBadge } from "@/components/SectionBadge";

// ─── dados — só o que foi usado no portfolio ──────────────────────────────────
const TECHS = [
  { name: "TypeScript", sigla: "TS",  color: "#3178c6", category: "language", status: "ACTIVE" },
  { name: "React",      sigla: "RX",  color: "#61dafb", category: "framework", status: "ACTIVE" },
  { name: "Next.js",    sigla: "NX",  color: "#ffffff", category: "framework", status: "ACTIVE" },
  { name: "Tailwind",   sigla: "TW",  color: "#38bdf8", category: "styling",   status: "ACTIVE" },
  { name: "Motion",     sigla: "MO",  color: "#ff4d6d", category: "animation", status: "ACTIVE" },
  { name: "Claude Code",     sigla: "AI",  color: "#cc785c", category: "ai",        status: "ACTIVE" },
  { name: "Git",        sigla: "GT",  color: "#f05032", category: "devops",    status: "ACTIVE" },
  { name: "Vercel",     sigla: "VC",  color: "#ffffff", category: "deploy",    status: "ACTIVE" },
  { name: "GitHub",     sigla: "GH",  color: "#e6edf3", category: "devops",    status: "ACTIVE" },
];

const CATEGORY_COLOR: Record<string, string> = {
  language:  "#3178c6",
  framework: "#61dafb",
  styling:   "#38bdf8",
  animation: "#ff4d6d",
  backend:   "#3ecf8e",
  ai:        "#cc785c",
  devops:    "#f05032",
  deploy:    "#ffffff",
};

// ─── TechCard ─────────────────────────────────────────────────────────────────
function TechCard({ tech, detected, index }: {
  tech: typeof TECHS[0];
  detected: boolean;
  index: number;
}) {
  const [glitching, setGlitching] = useState(false);

  // mini glitch ao ser detectado
  useEffect(() => {
    if (detected) {
      setGlitching(true);
      const t = setTimeout(() => setGlitching(false), 400);
      return () => clearTimeout(t);
    }
  }, [detected]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={detected ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="relative border rounded-xl p-4 flex flex-col gap-3 overflow-hidden group"
      style={{
        borderColor: detected ? `${tech.color}30` : "rgba(0,255,135,0.06)",
        background: detected ? `${tech.color}06` : "transparent",
      }}
    >
      {/* scan flash ao detectar */}
      {glitching && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `${tech.color}20` }}
        />
      )}

      {/* topo: sigla + status */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[0.65rem] font-bold px-2 py-0.5 rounded border"
          style={{
            color: detected ? tech.color : "rgba(0,255,135,0.2)",
            borderColor: detected ? `${tech.color}40` : "rgba(0,255,135,0.1)",
            background: detected ? `${tech.color}10` : "transparent",
          }}
        >
          {tech.sigla}
        </span>

        <span className="font-mono text-[0.55rem] tracking-widest"
          style={{ color: detected ? "#00ff87" : "rgba(0,255,135,0.15)" }}
        >
          {detected ? "● DETECTED" : "○ SCANNING"}
        </span>
      </div>

      {/* nome */}
      <span
        className="font-mono text-[0.9rem] font-bold transition-colors duration-200"
        style={{ color: detected ? "#fff" : "rgba(255,255,255,0.1)" }}
      >
        {detected ? tech.name : "????????"}
      </span>

      {/* categoria */}
      <span
        className="font-mono text-[0.6rem] tracking-[0.15em] uppercase"
        style={{ color: detected ? CATEGORY_COLOR[tech.category] + "99" : "transparent" }}
      >
        {tech.category}
      </span>

      {/* barra de progresso */}
      <div className="h-px w-full rounded-full overflow-hidden"
        style={{ background: "rgba(0,255,135,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: detected ? "100%" : "0%" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          style={{ background: tech.color }}
        />
      </div>
    </motion.div>
  );
}

// ─── Stack ────────────────────────────────────────────────────────────────────
export default function Stack() {
  const sectionRef   = useRef<HTMLElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const inView       = useInView(sectionRef, { once: true, amount: 0.2 });
  const [detected, setDetected]   = useState<boolean[]>(Array(TECHS.length).fill(false));
  const [scanY, setScanY]         = useState<number>(-4);
  const [scanning, setScanning]   = useState(false);
  const [done, setDone]           = useState(false);
  const [scanCount, setScanCount] = useState(0); // linha do terminal

  useEffect(() => {
    if (inView && !scanning && !done) setScanning(true);
  }, [inView, scanning, done]);

  // animação da linha de scan
  useEffect(() => {
    if (!scanning) return;

    const DURATION = 2500; // ms total da varredura
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const pct = progress * 100;
      setScanY(pct);
      setScanCount(Math.floor(progress * 48));

      // detecta cards conforme a linha passa por eles
      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const cards = gridRef.current.querySelectorAll("[data-card]");
        const scanAbsY = gridRect.top + (pct / 100) * gridRect.height;

        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          if (scanAbsY >= cardCenter) {
            setDetected((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        });
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setScanning(false);
        setDone(true);
        setDetected(Array(TECHS.length).fill(true));
      }
    };

    requestAnimationFrame(tick);
  }, [scanning]);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="py-24"
      aria-labelledby="stack-heading"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-20 flex flex-col gap-12">

        {/* cabeçalho */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionBadge label="o que usamos aqui?" />
          <h2
            id="stack-heading"
            className="font-sans font-bold text-white leading-tight mt-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Ferramentas{" "}
            <span
              className="text-[#00ff87]"
              style={{ textShadow: "0 0 30px rgba(0,255,135,0.4)" }}
            >
              detectadas nesse Portfólio
            </span>
          </h2>
          <div className="w-16 h-px bg-[#00ff87]/40" aria-hidden="true" />
        </motion.div>

        {/* terminal de log + grid lado a lado */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* log terminal */}
          <motion.div
            className="w-full lg:w-72 flex-shrink-0 bg-[#050d0a] border border-[#00ff87]/15 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00ff87]/10 bg-[#00ff87]/[0.03]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="font-mono text-[0.65rem] text-white/30 ml-1">scan.log</span>
            </div>
            <div className="p-4 font-mono text-[0.7rem] leading-[1.8] min-h-[220px]">
              <div className="text-[#00ff87]/60">$ run --scan ./portfolio</div>
              <div className="text-white/30">initializing scanner...</div>
              {inView && (
                <>
                  <div className="text-white/40">
                    scanning: <span className="text-[#00ff87]/70">{scanCount}/48 modules</span>
                  </div>
                  {TECHS.map((t, i) => detected[i] && (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#00ff87]"
                    >
                      ✓ {t.name} <span className="text-white/30">[{t.category}]</span>
                    </motion.div>
                  ))}
                  {done && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#00ff87] mt-1"
                    >
                      <span className="text-white/30">————————————</span>
                      <br />
                      {TECHS.length} tools found.
                      <span className="inline-block animate-[blink_0.8s_step-end_infinite] ml-1">█</span>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* grid com scan */}
          <div className="flex-1 relative" ref={gridRef}>
            {/* linha de scan */}
            {scanning && (
              <motion.div
                className="absolute left-0 right-0 z-20 pointer-events-none"
                style={{ top: `${scanY}%` }}
              >
                {/* linha principal */}
                <div className="h-px w-full bg-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.9),0_0_30px_rgba(0,255,135,0.4)]" />
                {/* glow acima */}
                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: "linear-gradient(to top, transparent, rgba(0,255,135,0.04))" }}
                />
              </motion.div>
            )}

            {/* cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {TECHS.map((tech, i) => (
                <div key={tech.name} data-card>
                  <TechCard tech={tech} detected={detected[i]} index={i} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
