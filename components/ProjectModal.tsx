"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "@/components/Projects";


type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // fecha com Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // trava scroll do body
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative bg-[#0d1a12] border border-[#00ff87]/15 rounded-2xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto scrollbar-thin"
          >
            {/* botão fechar */}
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 text-xs hover:border-[#00ff87]/50 hover:text-[#00ff87] transition-all duration-200"
            >
              ✕
            </button>

            {/* thumb */}
            <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden bg-black/40">
              <Image src={project.image} alt={project.name} fill className="object-cover" sizes="640px" />
            </div>

            {/* body */}
            <div className="flex flex-col gap-4 px-8 py-7">
              <span className="font-mono text-[0.7rem] text-[#00ff87]/70 tracking-[0.1em]">{project.num}</span>
              <h2 className="font-sans text-2xl font-bold text-white leading-tight -mt-1">{project.name}</h2>
              <p className="font-sans text-[0.9rem] text-white/60 leading-[1.7]">{project.descLong}</p>

              {/* tags */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.62rem] text-[#00ff87]/60 tracking-[0.15em] uppercase">tecnologias</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[0.65rem] text-[#00ff87] border border-[#00ff87]/30 rounded-full px-2.5 py-0.5 bg-[#00ff87]/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* highlights */}
              {project.highlights.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.62rem] text-[#00ff87]/60 tracking-[0.15em] uppercase">destaques</span>
                  <ul className="flex flex-col gap-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 font-sans text-[0.85rem] text-white/70 leading-snug">
                        <span className="text-[#00ff87] text-[0.7rem] mt-0.5 flex-shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* botões */}
              <div className="flex gap-3 flex-wrap mt-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00ff87] text-[#0a0f0a] font-mono text-[0.78rem] font-bold transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
                  >
                    ↗ ver ao vivo
                  </a>
                )}
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#00ff87]/30 text-[#00ff87] font-mono text-[0.78rem] font-bold transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
                  >
                    ⌥ ver código
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
