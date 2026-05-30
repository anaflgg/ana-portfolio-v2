"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeUp } from "@/components/FadeUp";
import { SectionBadge } from "@/components/SectionBadge";
import { ProjectModal } from "@/components/ProjectModal";
import GlitchText from "@/components/GlitchText";

export type Project = {
  num: string;
  name: string;
  image: string;
  descShort: string;
  descLong: string;
  tags: string[];
  highlights: string[];
  live: string;
  code: string;
};

// ─── Dados ────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    num: "01",
    name: "MotoLog Gestão de Entregas",
    image: "/img/projects/motolog-print.png",
    descShort:
      "Sistema web de gestão de entregas para farmácias. Do papel e caneta ao banco de dados — tabela diária, histórico, acerto com motoboy e CRUD completo.",
    descLong:
      "Sistema fullstack criado para resolver um problema real vivido no trabalho como operadora de caixa. Substitui o controle manual em papel por um dashboard digital com autenticação, tabela diária de entregas, histórico por dia, modal de edição, acerto com motoboy e status em tempo real.",
    tags: ["Typescript", "React.js", "Next.js", "Tailwind", "PostgreSQL"],
    highlights: [
      "Autenticação completa com Supabase Auth e Row Level Security",
      "Banco de dados relacional PostgreSQL com trigger automático de perfil",
      "Roteamento dinâmico com App Router do Next.js",
      "CRUD completo com modal de edição e atualização em tempo real",
    ],
    live: "https://motolog-delivery-management.vercel.app/login",
    code: "https://github.com/anaflgg/motolog-delivery-management",
  },
  {
    num: "02",
    name: "Pokédex UI",
    image: "/img/projects/pokedex-image-modal.png",
    descShort:
      "Aplicação que consome a PokeAPI com busca em tempo real, dark mode e carregamento progressivo.",
    descLong:
      "Aplicação que consome a PokeAPI utilizando fetch e async/await, com busca em tempo real por nome ou número, dark mode, carregamento progressivo com paginação e renderização dinâmica de dados no DOM.",
    tags: ["JavaScript", "Tailwind", "API"],
    highlights: [
      "Consumo de API REST com fetch e async/await",
      "Busca em tempo real com lista completa de 1000+ pokémons",
      "Dark mode com Tailwind e toggle de classe",
      "Modal dinâmico com dados detalhados via múltiplos endpoints da API",
    ],
    live: "https://anaflgg.github.io/pokedex-ui-api/",
    code: "https://github.com/anaflgg/pokedex-ui-api",
  },
  {
    num: "03",
    name: "Banco de Talentos Nexus",
    image: "/img/projects/talent-pool-nexus-print-desktop.png",
    descShort:
      "Landing page de banco de talentos com formulário validado no front e back-end, armazenamento em JSON e suporte a envio de currículo.",
    descLong:
      "Landing page de banco de talentos para desenvolvedores, com formulário de candidatura completo. O formulário valida os dados no front e no back, salva candidatos em JSON e armazena o currículo enviado.",
    tags: ["HTML", "Tailwind", "CSS", "JavaScript", "PHP"],
    highlights: [
      "Validação completa de formulário no front-end e no back-end",
      "Envio de dados e arquivos com fetch e FormData",
      "Upload de currículo com controle de tipo e tamanho de arquivo",
      "Persistência de dados em JSON e armazenamento de arquivos no servidor",
    ],
    live: "https://nexus-talent-pool.infinityfreeapp.com/?i=1",
    code: "https://github.com/anaflgg/nexus-talent-pool",
  },
  {
    num: "04",
    name: "Pomodoro Focus Spell",
    image: "/img/projects/pomodoro-print-desktop.png",
    descShort:
      "Pomodoro temático com modos de sessão, animações visuais e salvamento automático do progresso via localStorage.",
    descLong:
      "Pomodoro temático com modos de foco personalizados, controle de sessões em tempo real e salvamento automático no navegador. Possui interface dinâmica com animações e layout responsivo.",
    tags: ["HTML", "CSS", "JavaScript", "localStorage"],
    highlights: [
      "Controle de timer com setInterval e gerenciamento de estado",
      "Persistência de sessões utilizando localStorage",
      "Interface dinâmica com renderização e manipulação do DOM",
      "Animações visuais com CSS e feedback interativo ao usuário",
    ],
    live: "https://anaflgg.github.io/pomodoro-focus-spell/",
    code: "https://github.com/anaflgg/pomodoro-focus-spell",
  },
  {
    num: "05",
    name: "História dos Meus Gatinhos",
    image: "/img/projects/meus-gatinhos-print-desktop.png",
    descShort:
      "SPA responsiva com animações ao scroll, cards interativos e modais, construída com Bootstrap 5.",
    descLong:
      "Página interativa desenvolvida para apresentar histórias e características de forma visual e dinâmica. Possui efeitos de animação ao rolar a página, cards interativos com efeito flip, galerias de imagens em modal e layout totalmente responsivo.",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    highlights: [
      "Animações ao scroll utilizando AOS (Animate On Scroll)",
      "Cards interativos com efeito flip usando CSS e JavaScript",
      "Galeria de imagens em carrossel dentro de modais",
      "Layout responsivo com Bootstrap 5",
    ],
    live: "https://anaflgg.github.io/historia_dos_meus_gatos/",
    code: "https://github.com/anaflgg/historia_dos_meus_gatos",
  },
];

// ─── GlitchCard ───────────────────────────────────────────────────────────────
function GlitchCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      tabIndex={0}
      role="listitem"
      aria-label={`Ver detalhes do projeto ${project.name}`}
      className="
        group relative w-[22rem] bg-[#00ff87]/[0.03] border border-[#00ff87]/10
        rounded-2xl overflow-hidden flex flex-col cursor-pointer
        transition-all duration-300
        hover:border-[#00ff87]/40 hover:-translate-y-1.5
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,255,135,0.08)]
        hover:animate-card-glitch
      "
    >
      {/* scanlines overlay — sempre presente, visível só no hover */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-150
          [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,135,0.03)_2px,rgba(0,255,135,0.03)_4px)]
        "
      />

      {/* glitch color-shift overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0
          group-hover:opacity-100 group-hover:animate-glitch-overlay
          bg-[rgba(0,255,135,0.04)] mix-blend-screen
        "
      />

      {/* thumb */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/30">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05] group-hover:[filter:hue-rotate(10deg)_saturate(1.2)]"
          sizes="352px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* info */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <span className="font-mono text-[0.7rem] text-[#00ff87]/70 tracking-[0.1em]">
          {project.num}
        </span>

        <h3 className="font-sans text-[1.15rem] font-bold text-white leading-snug">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="font-sans text-[1.15rem] font-bold text-white leading-snug"
          >
            {project.name}
          </GlitchText>
        </h3>

        <p className="font-sans text-[0.82rem] text-white/50 leading-relaxed flex-1">
          {project.descShort}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.65rem] text-[#00ff87] border border-[#00ff87]/30 rounded-full px-2.5 py-0.5 bg-[#00ff87]/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="font-mono text-[0.7rem] text-[#00ff87]/50 text-left mt-2 transition-colors duration-200 group-hover:text-[#00ff87]">
          ver detalhes →
        </button>
      </div>
    </article>
  );
}

// ─── ProjectCard (export para uso externo se necessário) ──────────────────────
export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return <GlitchCard project={project} onClick={onClick} />;
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto px-8 md:px-20 flex flex-col gap-12">

          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-4">
              <SectionBadge label="05. projetos" />
              <h2
                id="projects-heading"
                className="font-sans font-bold text-white leading-tight mt-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                O que eu{" "}
                <span
                  className="text-[#00ff87]"
                  style={{ textShadow: "0 0 30px rgba(0,255,135,0.4)" }}
                >
                  construí
                </span>
              </h2>
              <div className="w-16 h-px bg-[#00ff87]/40" aria-hidden="true" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-5" role="list">
              {projects.map((project) => (
                <GlitchCard
                  key={project.num}
                  project={project}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          </FadeUp>

        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
