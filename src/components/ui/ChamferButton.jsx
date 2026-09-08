import { motion } from "framer-motion";

export default function ChamferButton({
  children,
  onClick,
  href,
  target,
  rel,
  variant = "primary", // primary, secondary, outline, ghost
  className = "",
  type = "button",
  disabled = false,
  icon: Icon,
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "chamfer-clip bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
    secondary:
      "chamfer-clip bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40",
    outline:
      "chamfer-clip bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",
    ghost:
      "chamfer-pill bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10",
  };

  const content = (
    <>
      {children}
      {Icon && <Icon size={14} className="shrink-0" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variantStyles[variant]} px-6 py-3 ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantStyles[variant]} px-6 py-3 ${className}`}
    >
      {content}
    </motion.button>
  );
}
