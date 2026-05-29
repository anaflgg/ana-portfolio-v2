import Link from "next/link";
import { navigationLinks } from "../data/navigation";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#00ff87]/10 bg-[#050d0a]/80 backdrop-blur-md">
      <nav className="font-mono mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          href="#home"
          className="text-lg font-bold text-[#00ff87]"
        >
          AA<span className="text-zinc-500">.dev</span>
        </Link>

        {/* LINKS */}
        <ul className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-zinc-400 transition-colors duration-300 hover:text-[#00ff87]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  );
}