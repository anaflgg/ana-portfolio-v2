"use client";

import Image from "next/image";
import { FadeUp } from "@/components/FadeUp";
import { SectionBadge } from "@/components/SectionBadge";

// ─── Dados ────────────────────────────────────────────────────────────────────
const experiences = [
  {
    title: "Marketplace Odontológico",
    status: "em andamento",
    role: "Desenvolvedora Front-end",
    type: "Projeto Real de Cliente",
    description: [
      `Meu irmão sênior me deu a oportunidade de trabalhar com ele num produto real:
      a recriação de marketplace odontológico desatualizado e com funcionalidades limitadas,
      substituindo uma plataforma antiga por uma solução moderna. Trabalhamos no mesmo
      repositório — eu responsável pelo front-end, ele focado no back-end e banco de dados.`,
      `Criei a identidade visual no <b>Figma</b>, desenvolvi componentes <b>React</b> com rotas
      otimizadas em <b>Next.js</b> e tipagem em <b>TypeScript</b>. Trabalhei com <b>Git</b> na
      minha própria branch, abrindo <b>pull requests</b> para revisão do meu irmão antes de cada
      merge. Consumi os endpoints da API, validei payloads no <b>Insomnia</b> e cheguei a solicitar
      ajustes na API para buscar dados do usuário cadastrado. Usei o <b>MySQL Workbench</b> para
      analisar o banco e entender as regras de negócio. Durante o desenvolvimento, utilizei o
      <b>Claude Code</b> como assistente no terminal para acelerar a escrita de componentes e
      resolver problemas mais rápido.`,
    ],
    tags: ["TypeScript", "React.js", "Next.js", "Tailwind", "Git", "Figma", "API REST", "Insomnia", "MySQL Workbench", "Claude Code"],
    images: [
      { src: "/img/experience/vs-code.png",      caption: "VS Code — TypeScript & Git",        alt: "VS Code com TypeScript e Git" },
      { src: "/img/experience/tela-inicial.png", caption: "React.js — Interface",               alt: "Interface do marketplace" },
      { src: "/img/experience/teste-api.png",    caption: "Insomnia — Teste de requisições",    alt: "Teste de requisições no Insomnia" },
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experiencia" className="py-28" aria-labelledby="exp-heading">
      <div className="max-w-[1100px] mx-auto px-8 md:px-10 flex flex-col gap-14">

        {/* Header */}
        <FadeUp delay={0.1}>
          <div className="flex flex-col gap-4">
            <SectionBadge label="04. experiências" />
            <h2
              id="exp-heading"
              className="font-sans font-bold text-white leading-tight mt-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Minha{" "}
              <span className="text-[#00ff87]" style={{ textShadow: "0 0 30px rgba(0,255,135,0.4)" }}>
                atuação
              </span>
            </h2>
            <div className="w-16 h-px bg-[#00ff87]/40" aria-hidden="true" />
          </div>
        </FadeUp>

        {/* Cards */}
        {experiences.map((exp, i) => (
          <FadeUp key={exp.title} delay={0.15 + i * 0.1}>
            <article className="relative bg-[#00ff87]/[0.03] border border-[#00ff87]/12 rounded-2xl p-10 overflow-hidden transition-all duration-300 hover:border-[#00ff87]/28 hover:shadow-[0_0_32px_rgba(0,255,135,0.06)]">

              {/* barra lateral esquerda */}
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ background: "linear-gradient(180deg, #00ff87, transparent)" }}
                aria-hidden="true"
              />

              {/* topo: título + status */}
              <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                <h3 className="font-mono text-xl font-bold text-white leading-snug">
                  {exp.title}
                </h3>
                <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] text-[#00ff87] bg-[#00ff87]/[0.08] border border-[#00ff87]/25 rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#00ff87] animate-pulse" aria-hidden="true" />
                  {exp.status}
                </span>
              </div>

              {/* role */}
              <span className="block font-mono text-[0.78rem] text-[#00ff87]/60 tracking-[0.04em] mb-6">
                {exp.role}&nbsp;·&nbsp;{exp.type}
              </span>

              {/* divisor */}
              <div
                className="w-full h-px mb-6"
                style={{ background: "linear-gradient(90deg, rgba(0,255,135,0.2), transparent)" }}
                aria-hidden="true"
              />

              {/* descrição */}
              <div className="flex flex-col gap-5 mb-8">
                {exp.description.map((para, j) => (
                  <p
                    key={j}
                    className="font-sans text-[0.97rem] text-white/55 leading-[1.8] [&_b]:text-[#00ff87] [&_b]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-9" role="list" aria-label="Tecnologias utilizadas">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="font-mono text-[0.7rem] text-[#00ff87] bg-[#00ff87]/[0.07] border border-[#00ff87]/20 rounded-full px-3 py-1 transition-all duration-200 hover:bg-[#00ff87]/[0.14] hover:border-[#00ff87]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* galeria */}
              <p className="font-mono text-[0.7rem] text-white/30 tracking-[0.1em] uppercase mb-4">
                prints do projeto
              </p>

              {/* grid desktop / scroll mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:pb-3 max-sm:scrollbar-none">
                {exp.images.map((img) => (
                  <div
                    key={img.src}
                    className="group relative rounded-xl overflow-hidden border border-[#00ff87]/10 bg-[#00ff87]/[0.03] aspect-[16/10] transition-all duration-300 hover:border-[#00ff87]/35 hover:-translate-y-1 max-sm:flex-shrink-0 max-sm:w-[82vw] max-sm:max-w-[300px] max-sm:snap-start cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 82vw, 33vw"
                    />
                    {/* caption no hover */}
                    <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050d0a]/92 to-transparent font-mono text-[0.65rem] text-[#00ff87] px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.caption}
                    </span>
                  </div>
                ))}
              </div>

              {/* scroll hint mobile */}
              <p className="mt-3 text-center font-mono text-[0.65rem] text-white/25 sm:hidden" aria-hidden="true">
                ← arraste para ver mais →
              </p>

            </article>
          </FadeUp>
        ))}

      </div>
    </section>
  );
}
