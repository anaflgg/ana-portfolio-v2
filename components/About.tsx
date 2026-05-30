"use client";

import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { SectionBadge } from "@/components/SectionBadge";

// ─── HackerText ───────────────────────────────────────────────────────────────
const HACKER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function HackerText() {
  const [text, setText] = useState("");
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function generate() {
      if (!containerRef.current) return;
      const length = Math.floor(containerRef.current.offsetWidth / 10);
      setText(
        Array.from({ length }, () =>
          HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)]
        ).join("")
      );
    }

    generate();
    const interval = setInterval(generate, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      ref={containerRef}
      className="font-mono text-sm text-[#00ff87]/40 tracking-[0.1em] overflow-hidden whitespace-nowrap select-none"
      aria-hidden="true"
    >
      {text}
    </p>
  );
}

// ─── Dados ────────────────────────────────────────────────────────────────────
const workCards = [
  { icon: "🧠", title: "Penso antes de codar",  desc: "Entendo o problema, organizo ideias e planejo soluções simples e eficientes." },
  { icon: "🔨", title: "Aprendo construindo",    desc: "Coloco a mão na massa, transformo ideias em projetos e evoluo a cada linha de código." },
  { icon: "🎯", title: "Foco no que importa",    desc: "Priorizo o que gera impacto, entrego valor e busco sempre a melhor experiência." },
  { icon: "📈", title: "Evolução constante",     desc: "Estudar, praticar, errar, ajustar e repetir. Esse é o ciclo que me move todos os dias." },
];

const moveItems = [
  { icon: "🧩", title: "Resolver problemas reais",  desc: "Transformar desafios complexos em soluções simples e úteis." },
  { icon: "⚡", title: "Ver ideias ganhando vida",  desc: "Não tem sensação melhor do que ver algo que criei funcionando." },
  { icon: "⭐", title: "Evoluir todos os dias",     desc: "1% melhor a cada dia. Pequenas melhorias, grandes resultados." },
];

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="sobre" className="py-24" aria-labelledby="sobre-heading">
      <div className="max-w-7xl mx-auto px-8 md:px-20 flex flex-col md:flex-row gap-16 md:gap-20">

        {/* ── Coluna esquerda: texto ── */}
        <div className="flex-1 flex flex-col gap-8">

          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-4">
              <SectionBadge label="02. sobre mim" />
              <h2
                id="sobre-heading"
                className="font-sans font-bold text-white leading-tight mt-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Quem é a{" "}
                <span className="text-[#00ff87]" style={{ textShadow: "0 0 30px rgba(0,255,135,0.4)" }}>
                  Ana?
                </span>
              </h2>
              <div className="w-16 h-px bg-[#00ff87]/40" aria-hidden="true" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-5">
              <div className="bg-gradient-to-r from-[#00ff87]/[0.06] to-transparent border-l-2 border-[#00ff87] px-5 py-4 rounded-r-lg">
                <p className="text-base leading-7 text-white/70">
                  Tenho 22 anos, sou formada em{" "}
                  <strong className="text-[#00ff87] font-medium">Análise e Desenvolvimento de Sistemas</strong>{" "}
                  e cresci cercada de programação, meus irmãos são desenvolvedores e sempre foram minha maior inspiração.
                </p>
              </div>
              <p className="text-base leading-7 text-white/40">
                Após concluir a faculdade em 2023, precisei pausar minha jornada. Retomei os estudos em 2026 com uma mentalidade diferente: parei de buscar o caminho perfeito e comecei a{" "}
                <strong className="text-[#00ff87] font-medium">construir</strong>. Foi aí que tudo começou a fazer sentido.
              </p>
              <p className="text-base leading-7 text-white/40">
                Aprendo muito mais colocando a mão na massa do que consumindo teoria. Cada projeto que entrego me ensina mais do que horas de aula, e é assim que continuo evoluindo, consistentemente, sem pular etapas.
              </p>
              <p className="text-base leading-7 text-white/40">
                Meu objetivo é evoluir até me tornar{" "}
                <strong className="text-[#00ff87] font-medium">engenheira de software</strong>, construindo soluções cada vez mais completas e bem pensadas.
              </p>
            </div>
          </FadeUp>

          {/* Hacker text */}
          <FadeUp delay={0.3}>
            <HackerText />
          </FadeUp>

        </div>

        {/* ── Coluna direita: cards ── */}
        <div className="flex-1 flex flex-col gap-10">

          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-5">
              <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.15em] text-[#00ff87]/60 uppercase">
                como eu trabalho
                <span className="flex-1 h-px bg-[#00ff87]/15" aria-hidden="true" />
              </p>
              <div className="grid grid-cols-2 gap-3" role="list">
                {workCards.map((card) => (
                  <article key={card.title} role="listitem" className="bg-[#00ff87]/[0.03] border border-[#00ff87]/10 rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 hover:border-[#00ff87]/30 hover:bg-[#00ff87]/[0.06] hover:-translate-y-1">
                    <span className="text-2xl mb-1" aria-hidden="true">{card.icon}</span>
                    <h3 className="font-sans text-sm font-bold text-white">{card.title}</h3>
                    <p className="text-xs leading-relaxed text-white/40">{card.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col gap-5">
              <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.15em] text-[#00ff87]/60 uppercase">
                o que me move
                <span className="flex-1 h-px bg-[#00ff87]/15" aria-hidden="true" />
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {moveItems.map((item) => (
                  <li key={item.title} className="bg-[#00ff87]/[0.03] border border-[#00ff87]/10 rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-300 hover:border-[#00ff87]/30 hover:bg-[#00ff87]/[0.06] hover:-translate-y-0.5">
                    <span className="text-xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-white mb-0.5">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-white/40">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
