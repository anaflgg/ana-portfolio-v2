type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
};

export function Button({
  children,
  variant = "primary",
}: ButtonProps) {

  const variants = {
    primary:
      "bg-[#00ff87] text-black hover:bg-[#00c96b] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,255,135,0.3)]",

    outline:
      "border border-[#00ff87]/30 text-[#00ff87] hover:bg-[#00ff87]/10 hover:-translate-y-0.5",
  };

  return (
    <button
      className={`
        rounded-xl px-7 py-3
        font-mono text-sm font-bold
        transition-all duration-200
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}