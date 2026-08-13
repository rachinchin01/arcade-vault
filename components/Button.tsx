import Link from "next/link";

const CLIP_BTN =
  "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]";

const VARIANT = {
  cyan: {
    border: "border-[var(--cyan)]",
    hover:
      "hover:text-[var(--cyan)] hover:shadow-[0_0_14px_rgba(0,245,255,0.55),inset_0_0_8px_rgba(0,245,255,0.35)]",
    inset: "border-[rgba(0,245,255,0.25)]",
  },
  magenta: {
    border: "border-[var(--magenta)]",
    hover:
      "hover:text-[var(--magenta)] hover:shadow-[0_0_14px_rgba(255,0,110,0.55),inset_0_0_8px_rgba(255,0,110,0.35)]",
    inset: "border-[rgba(255,0,110,0.25)]",
  },
  yellow: {
    border: "border-[var(--yellow)]",
    hover:
      "hover:text-[var(--yellow)] hover:shadow-[0_0_14px_rgba(245,255,0,0.6),inset_0_0_8px_rgba(245,255,0,0.35)]",
    inset: "border-[rgba(245,255,0,0.25)]",
  },
  ghost: {
    border: "border-[var(--ink-faint)]",
    hover: "hover:border-[var(--ink-dim)] hover:text-[var(--ink)]",
    inset: "",
  },
} as const;

const SIZE = {
  sm: "px-3.5 py-2.5 text-[9px]",
  md: "px-5 py-3 text-[10px]",
  lg: "px-7 py-4 text-[12px]",
  xl: "px-9 py-5 text-[14px] tracking-[0.2em]",
} as const;

type Variant = keyof typeof VARIANT;
type Size = keyof typeof SIZE;

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  pulse?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
};

export default function Button({
  variant = "cyan",
  size = "md",
  pulse = false,
  className = "",
  href,
  onClick,
  type = "button",
  children,
}: ButtonProps) {
  const v = VARIANT[variant];
  const base = `pixel relative inline-flex items-center justify-center gap-2.5 border tracking-[0.16em] text-[var(--ink)] transition-[color,box-shadow] duration-150 ${CLIP_BTN} ${v.border} ${v.hover} ${SIZE[size]} ${pulse ? "pulse-glow" : ""} ${className}`;

  const inset = v.inset ? (
    <span className={`pointer-events-none absolute inset-[3px] border ${v.inset} ${CLIP_BTN}`} />
  ) : null;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={base}>
        {inset}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {inset}
      {children}
    </button>
  );
}
