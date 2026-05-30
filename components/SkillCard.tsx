"use client";

import { useRef, useState, useCallback } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFabcdef0123456789";

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function generateGlitchText(length = 10) {
  return Array.from({ length }, () => randomChar()).join("");
}

type SkillCardProps = {
  name: string;
  icon: React.ReactNode;
};

export function SkillCard({ name, icon }: SkillCardProps) {
  const [glitching, setGlitching] = useState(false);
  const [glitchLines, setGlitchLines] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGlitch = useCallback(() => {
    setGlitching(true);
    intervalRef.current = setInterval(() => {
      const lines = Array.from({ length: 3 }, () => generateGlitchText(10)).join("\n");
      setGlitchLines(lines);
    }, 60);
  }, []);

  const stopGlitch = useCallback(() => {
    setGlitching(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <article
      className="relative w-[110px] overflow-hidden flex flex-col items-center gap-3 px-4 py-6 rounded-2xl border border-[#00ff87]/10 bg-[#00ff87]/[0.03] cursor-default transition-all duration-300 hover:border-[#00ff87]/50 hover:bg-[#00ff87]/[0.07] hover:-translate-y-1.5 hover:scale-105"
      onMouseEnter={startGlitch}
      onMouseLeave={stopGlitch}
      onTouchStart={startGlitch}
      onTouchEnd={stopGlitch}
      role="listitem"
      aria-label={name}
    >
      {/* ícone */}
      <div className={`text-4xl w-10 h-10 flex items-center justify-center transition-opacity duration-150 ${glitching ? "opacity-0" : "opacity-100"}`}>
        {icon}
      </div>

      {/* nome */}
      <span className={`font-mono text-[0.68rem] text-center transition-colors duration-300 ${glitching ? "text-[#00ff87]" : "text-white/50"}`}>
        {name}
      </span>

      {/* overlay glitch */}
      {glitching && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#050d0a]/85 rounded-2xl pointer-events-none px-2">
          <pre className="font-mono text-[0.6rem] text-[#00ff87]/80 leading-snug text-center whitespace-pre w-full">
            {glitchLines}
          </pre>
          <span className="font-mono text-[0.7rem] font-bold text-[#00ff87]">{name}</span>
        </div>
      )}
    </article>
  );
}
