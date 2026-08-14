"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CLIP_BTN =
  "[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]";

function NavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`pixel normal-case relative px-3.5 py-2.5 text-[9px] tracking-[0.16em] transition-colors ${
        active
          ? "text-[var(--cyan)] [text-shadow:0_0_8px_rgba(0,245,255,0.65)]"
          : "text-[var(--ink-dim)] hover:text-[var(--ink)]"
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-x-3.5 bottom-1 h-0.5 bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan),0_0_16px_var(--cyan)]" />
      )}
    </Link>
  );
}

function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`pixel normal-case border-b border-dashed border-[var(--line-2)] px-3 py-3.5 text-[11px] ${
        active ? "text-[var(--cyan)]" : "text-[var(--ink-dim)]"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isLibraryActive = pathname === "/" || pathname.startsWith("/juego");
  const isSalonActive = pathname === "/salon";
  const isAuthActive = pathname === "/auth";

  const close = () => setOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center gap-6 border-b border-[var(--line)] px-8 py-3.5 backdrop-blur-[8px] [background:linear-gradient(180deg,rgba(10,10,15,0.92),rgba(10,10,15,0.78))] max-[840px]:px-4 max-[840px]:py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-7 w-7 border border-white/[0.18] shadow-[0_0_12px_rgba(0,245,255,0.55),inset_0_0_6px_rgba(255,0,110,0.5)] [background-blend-mode:screen] [background:linear-gradient(45deg,var(--magenta)_0_50%,transparent_50%),linear-gradient(-45deg,var(--cyan)_0_50%,transparent_50%)]" />
          <span className="pixel neon-cyan text-[12px] tracking-[0.12em]">
            ARCADE <span className="neon-magenta">VAULT</span>
          </span>
        </Link>

        <div className="ml-2 flex items-center gap-1 max-[840px]:hidden">
          <NavLink href="/" active={isLibraryActive}>
            Biblioteca
          </NavLink>
          <NavLink href="/salon" active={isSalonActive}>
            Salón de la Fama
          </NavLink>
        </div>

        <div className="flex-1" />

        <div className="pixel flex items-center gap-2 text-[9px] text-[var(--yellow)] max-[840px]:hidden">
          <span className="h-3.5 w-3.5 rounded-full shadow-[0_0_8px_var(--yellow)] [background:radial-gradient(circle_at_35%_35%,#fff8b0,#f5ff00_60%,#b0b800)]" />
          CRÉDITOS · 03
        </div>

        <Link
          href="/auth"
          className={`pixel normal-case relative ml-4 inline-flex items-center justify-center gap-2.5 border border-[var(--cyan)] px-5 py-3 text-[10px] tracking-[0.16em] text-[var(--ink)] transition-[color,box-shadow] duration-150 hover:text-[var(--cyan)] hover:shadow-[0_0_14px_rgba(0,245,255,0.55),inset_0_0_8px_rgba(0,245,255,0.35)] ${CLIP_BTN}`}
        >
          <span
            className={`pointer-events-none absolute inset-[3px] border border-[rgba(0,245,255,0.25)] ${CLIP_BTN}`}
          />
          Iniciar Sesión
        </Link>

        <button
          type="button"
          aria-label="Menú"
          onClick={() => setOpen(true)}
          className={`pixel ml-2 hidden items-center justify-center border border-[var(--ink-faint)] px-4 py-3 text-base leading-none text-[var(--ink-dim)] transition-colors hover:border-[var(--ink-dim)] hover:text-[var(--ink)] max-[840px]:inline-flex ${CLIP_BTN}`}
        >
          ≡
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[55] bg-black/60 transition-opacity duration-150 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[60] flex w-[min(320px,86vw)] flex-col gap-2 border-l border-[var(--line)] bg-[var(--bg-2)] px-5 py-6 transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pixel neon-cyan mb-4 text-[11px]">MENÚ</div>
        <MobileLink href="/" active={isLibraryActive} onClick={close}>
          Biblioteca
        </MobileLink>
        <MobileLink href="/salon" active={isSalonActive} onClick={close}>
          Salón de la Fama
        </MobileLink>
        <MobileLink href="/auth" active={isAuthActive} onClick={close}>
          Iniciar Sesión
        </MobileLink>
        <div className="flex-1" />
        <div className="pixel text-[9px] tracking-[0.16em] text-[var(--ink-faint)]">
          CRÉDITOS · 03
        </div>
      </aside>
    </>
  );
}
