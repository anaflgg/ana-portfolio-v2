"use client";

import { FadeUp } from "@/components/FadeUp";
import { SectionBadge } from "@/components/SectionBadge";
import { SkillCard } from "@/components/SkillCard";

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML",       icon: <i className="devicon-html5-plain colored" /> },
      { name: "CSS",        icon: <i className="devicon-css3-plain colored" /> },
      { name: "JavaScript", icon: <i className="devicon-javascript-plain colored" /> },
      { name: "TypeScript", icon: <i className="devicon-typescript-plain colored" /> },
      { name: "Tailwind",   icon: <i className="devicon-tailwindcss-plain colored" /> },
      { name: "React.js",   icon: <i className="devicon-react-original colored" /> },
      { name: "Next.js",    icon: <i className="devicon-nextjs-plain" style={{ color: "#fff" }} /> },
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      { name: "API REST",    icon: <i className="devicon-fastapi-plain colored" /> },
      { name: "Supabase",    icon: <i className="devicon-supabase-plain colored" /> },
      { name: "PostgreSQL",  icon: <i className="devicon-postgresql-plain colored" /> },
      {
        name: "Insomnia",
        icon: (
          <img
            src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/insomnia.svg"
            alt="Insomnia"
            width={40}
            style={{ filter: "invert(1)" }}
          />
        ),
      },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git",    icon: <i className="devicon-git-plain colored" /> },
      { name: "Figma",  icon: <i className="devicon-figma-plain colored" /> },
      { name: "Vercel", icon: <i className="devicon-vercel-plain" style={{ color: "#fff" }} /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto px-8 md:px-20 flex flex-col gap-12">

        <FadeUp delay={0.1}>
          <div className="flex flex-col gap-4">
            <SectionBadge label="03. tecnologias" />
            <h2
              id="skills-heading"
              className="font-sans font-bold text-white leading-tight mt-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Ferramentas que{" "}
              <span className="text-[#00ff87]" style={{ textShadow: "0 0 30px rgba(0,255,135,0.4)" }}>
                uso
              </span>
            </h2>
            <div className="w-16 h-px bg-[#00ff87]/40" aria-hidden="true" />
          </div>
        </FadeUp>

        <div className="flex flex-col gap-10">
          {skillGroups.map((group, i) => (
            <FadeUp key={group.label} delay={0.1 + i * 0.1}>
              <div className="flex flex-col gap-4">
                <h3 className="text-center font-mono text-xs tracking-[0.15em] text-[#00ff87]/70 uppercase">
                  {group.label}
                </h3>
                <div className="flex flex-wrap justify-center gap-4" role="list">
                  {group.skills.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
