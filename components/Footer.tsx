export default function Footer() {
  return (
    <footer
      className="border-t border-[#00ff87]/[0.08] py-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-20 flex items-center justify-between gap-4 flex-wrap">

        <a
          href="#home"
          aria-label="Voltar ao topo"
          className="font-mono text-[1rem] font-bold text-[#00ff87] no-underline tracking-[0.05em]"
        >
          AA<span className="text-white/40">.dev</span>
        </a>

        <p className="font-mono text-[0.72rem] text-white/30 tracking-[0.05em]">
          feito com{" "}
          <span className="text-[#00ff87]" aria-hidden="true">💚</span>{" "}
          por Ana Ananias
        </p>

        <nav className="flex gap-6" aria-label="Links do rodapé">
          {[
            { label: "GitHub",   href: "https://github.com/anaflgg" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/anaflgg/" },
            { label: "Email",    href: "mailto:anaflaviananias3@gmail.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[0.72rem] text-white/35 no-underline tracking-[0.05em] transition-colors duration-200 hover:text-[#00ff87]"
            >
              {label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}
