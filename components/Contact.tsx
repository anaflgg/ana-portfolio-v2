"use client";

import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { SectionBadge } from "@/components/SectionBadge";
import { Button } from "@/components/Button";

// ─── tipos ────────────────────────────────────────────────────────────────────
type TerminalLine = {
  text: string;
  type?: "default" | "dim" | "success" | "error";
};

// ─── dados ────────────────────────────────────────────────────────────────────
const TERMINAL_LINES: TerminalLine[] = [
  { text: "> iniciando conexão segura..." },
  { text: "> criptografando canal...",          type: "dim" },
  { text: "> protocolo: TLS 1.3 ✓",            type: "dim" },
  { text: "> localizando destino: ana@dev" },
  { text: "> verificando disponibilidade..." },
  { text: "> status: ONLINE",                  type: "success" },
  { text: "> portas abertas: email / linkedin / github", type: "dim" },
  { text: "> conexão estabelecida ✓",          type: "success" },
];

const LINE_DELAY    = 600; // ms entre linhas
const HOLD_AFTER    = 1000; // ms segura o terminal após última linha

// ─── Terminal ─────────────────────────────────────────────────────────────────
function ContactTerminal({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const totalLines = TERMINAL_LINES.length;

    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        if (cancelled) return;
        setVisibleLines((prev) => [...prev, line]);

        // última linha → aguarda e some
        if (i === totalLines - 1) {
          setTimeout(() => {
            if (cancelled) return;
            setHiding(true);
            setTimeout(() => {
              if (!cancelled) onDone();
            }, 500);
          }, HOLD_AFTER);
        }
      }, i * LINE_DELAY);
    });

    return () => { cancelled = true; };
  }, [onDone]);

  const colorClass: Record<string, string> = {
    success: "text-[#00ff87]",
    dim:     "text-white/35",
    error:   "text-[#ff5f56]",
    default: "text-white/75",
  };

  return (
    <div
      className={`
        absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8
        transition-all duration-500
        ${hiding ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"}
      `}
    >
      <div className="w-full max-w-[600px] bg-[#050d0a] border border-[#00ff87]/25 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,135,0.08),0_30px_60px_rgba(0,0,0,0.5)]">
        {/* barra */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#00ff87]/[0.04] border-b border-[#00ff87]/10">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="font-mono text-[0.72rem] text-white/35 ml-2">
            ana@portfolio:~
          </span>
        </div>

        {/* corpo */}
        <div className="p-6 min-h-[200px] font-mono text-[0.82rem] leading-loose">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={`${colorClass[line.type ?? "default"]} animate-[termLineIn_0.15s_ease_forwards]`}
            >
              {line.text}
            </div>
          ))}
          <span className="inline-block text-[#00ff87] animate-[blink_0.8s_step-end_infinite]">
            █
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── ContactCard ──────────────────────────────────────────────────────────────
function ContactCard({
  href,
  onClick,
  icon,
  label,
  value,
  sub,
  arrowIcon,
}: {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  arrowIcon: React.ReactNode;
}) {
  const [subText, setSubText] = useState(sub);
  const [subHighlight, setSubHighlight] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      setSubText("copiado! ✓");
      setSubHighlight(true);
      setTimeout(() => {
        setSubText(sub);
        setSubHighlight(false);
      }, 2000);
    }
  };

  return (
    <a
      href={href ?? "#"}
      onClick={handleClick}
      target={href && !onClick ? "_blank" : undefined}
      rel={href && !onClick ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 px-5 py-4 bg-[#00ff87]/[0.03] border border-[#00ff87]/10 rounded-2xl no-underline transition-all duration-250 hover:border-[#00ff87]/40 hover:bg-[#00ff87]/[0.06] hover:translate-x-1 group"
    >
      {/* ícone */}
      <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/15 flex items-center justify-center text-[#00ff87] flex-shrink-0">
        {icon}
      </div>

      {/* info */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-mono text-[0.6rem] text-[#00ff87]/60 tracking-[0.12em]">
          {label}
        </span>
        <span className="font-sans text-[0.88rem] font-semibold text-white truncate">
          {value}
        </span>
        <span
          className={`font-mono text-[0.68rem] transition-colors duration-200 ${
            subHighlight ? "text-[#00ff87]" : "text-white/35"
          }`}
        >
          {subText}
        </span>
      </div>

      {/* seta */}
      <div className="text-[#00ff87]/40 flex-shrink-0 transition-all duration-200 group-hover:text-[#00ff87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {arrowIcon}
      </div>
    </a>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef   = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "terminal" | "content">("idle");

  // IntersectionObserver — dispara o terminal quando a seção entra na tela
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && phase === "idle") {
            setPhase("terminal");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  const copyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("anaflaviananias3@gmail.com");
  };

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-24 min-h-[600px]"
      aria-labelledby="contact-heading"
    >
      {/* ── terminal overlay ── */}
      {phase === "terminal" && (
        <ContactTerminal onDone={() => setPhase("content")} />
      )}

      {/* ── conteúdo real ── */}
      <div
        className={`transition-all duration-600 ${
          phase === "content"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-20 flex flex-col gap-12">

          {/* cabeçalho */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-4">
              <SectionBadge label="06. contato" />
              <h2
                id="contact-heading"
                className="font-sans font-bold text-white leading-tight mt-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Vamos{" "}
                <span
                  className="text-[#00ff87]"
                  style={{ textShadow: "0 0 30px rgba(0,255,135,0.4)" }}
                >
                  conversar?
                </span>
              </h2>
              <div className="w-16 h-px bg-[#00ff87]/40" aria-hidden="true" />
            </div>
          </FadeUp>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            {/* esquerda */}
            <FadeUp delay={0.15}>
              <div className="flex flex-col gap-7">
                <p className="font-sans text-[0.95rem] text-white/60 leading-[1.8]">
                  Estou disponível para oportunidades de trabalho júnior,
                  freelancer ou colaborações em projetos. Se você quer alguém
                  que aprende rápido, entrega com qualidade e se joga nos
                  desafios,{" "}
                  <strong className="text-[#00ff87]">me chama.</strong>
                </p>

                <div className="flex flex-col gap-3">
                  {/* email */}
                  <ContactCard
                    onClick={copyEmail}
                    icon={
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    }
                    label="EMAIL"
                    value="anaflaviananias3@gmail.com"
                    sub="Verifico sempre"
                    arrowIcon={
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    }
                  />

                  {/* linkedin */}
                  <ContactCard
                    href="https://www.linkedin.com/in/anaflgg/"
                    icon={
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    }
                    label="LINKEDIN"
                    value="Ana Flávia Ananias"
                    sub="linkedin.com/in/anaflgg"
                    arrowIcon={
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17 17 7M7 7h10v10"/>
                      </svg>
                    }
                  />

                  {/* github */}
                  <ContactCard
                    href="https://github.com/anaflgg"
                    icon={
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    }
                    label="GITHUB"
                    value="anaflgg"
                    sub="github.com/anaflgg"
                    arrowIcon={
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17 17 7M7 7h10v10"/>
                      </svg>
                    }
                  />
                </div>
              </div>
            </FadeUp>

            {/* direita — CTA card */}
            <FadeUp delay={0.25}>
              <div className="bg-[#00ff87]/[0.04] border border-[#00ff87]/12 rounded-2xl p-10 flex flex-col items-center text-center gap-4">
                <span className="text-[3.5rem] leading-none" aria-hidden="true">
                  👩‍💻
                </span>
                <h3 className="font-sans text-[1.3rem] font-bold text-white">
                  Aberta a oportunidades
                </h3>
                <p className="font-sans text-[0.88rem] text-white/50 leading-[1.7] max-w-[280px]">
                  Estágio, júnior ou freela — se o projeto é desafiador e a
                  equipe é boa, eu topo.
                </p>
                <Button href="mailto:anaflaviananias3@gmail.com" variant="primary">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block mr-2 align-middle">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  Mandar um email
                </Button>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
