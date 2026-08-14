"use client";

import { useEffect } from "react";
import Button from "@/components/Button";
import MiniCard from "@/components/MiniCard";
import { GAMES } from "@/lib/data";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const FEATURE_COLOR: Record<string, string> = {
  cyan: "text-[var(--cyan)]",
  magenta: "text-[var(--magenta)]",
  yellow: "text-[var(--yellow)]",
  green: "text-[var(--green)]",
};

const FEATURES = [
  {
    i: "GAMEPAD",
    t: "JUEGOS CLÁSICOS",
    d: "Arkanoid, Tetris, Snake y muchos más. Los mejores arcades de todos los tiempos en un solo lugar.",
    c: "cyan",
  },
  {
    i: "FREE",
    t: "100% GRATIS",
    d: "Sin suscripciones, sin pagos ocultos. Todos los juegos disponibles de forma gratuita.",
    c: "yellow",
  },
  {
    i: "TROPHY",
    t: "LADDER BOARDS",
    d: "Compite con jugadores de todo el mundo. Escala el ranking y demuestra quién es el mejor.",
    c: "magenta",
  },
  {
    i: "ROCKET",
    t: "SIEMPRE CRECIENDO",
    d: "Agregamos nuevos juegos constantemente. Vuelve seguido, siempre habrá algo nuevo que jugar.",
    c: "green",
  },
] as const;

function FeatureIcon({ kind }: { kind: string }) {
  const C = "currentColor";
  if (kind === "GAMEPAD")
    return (
      <svg className="h-11 w-11 [image-rendering:pixelated] [filter:drop-shadow(0_0_8px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="2" y="6" width="12" height="6" />
          <rect x="0" y="8" width="2" height="4" />
          <rect x="14" y="8" width="2" height="4" />
          <rect x="3" y="8" width="2" height="2" />
          <rect x="2" y="9" width="4" height="0.5" />
          <rect x="11" y="7" width="1.5" height="1.5" />
          <rect x="11" y="10" width="1.5" height="1.5" />
        </g>
      </svg>
    );
  if (kind === "FREE")
    return (
      <svg className="h-11 w-11 [image-rendering:pixelated] [filter:drop-shadow(0_0_8px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="3" y="3" width="10" height="10" fill="none" stroke={C} strokeWidth="1.5" />
          <rect x="5" y="6" width="1.5" height="4" />
          <rect x="5" y="6" width="4" height="1.5" />
          <rect x="5" y="8" width="3" height="1" />
          <rect x="10" y="6" width="1.5" height="4" />
        </g>
      </svg>
    );
  if (kind === "TROPHY")
    return (
      <svg className="h-11 w-11 [image-rendering:pixelated] [filter:drop-shadow(0_0_8px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="3" y="2" width="10" height="2" />
          <rect x="3" y="2" width="2" height="6" />
          <rect x="11" y="2" width="2" height="6" />
          <rect x="5" y="8" width="6" height="2" />
          <rect x="7" y="10" width="2" height="3" />
          <rect x="5" y="13" width="6" height="1.5" />
          <rect x="1" y="3" width="2" height="3" />
          <rect x="13" y="3" width="2" height="3" />
        </g>
      </svg>
    );
  if (kind === "ROCKET")
    return (
      <svg className="h-11 w-11 [image-rendering:pixelated] [filter:drop-shadow(0_0_8px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="7" y="1" width="2" height="2" />
          <rect x="6" y="3" width="4" height="2" />
          <rect x="5" y="5" width="6" height="6" />
          <rect x="4" y="11" width="2" height="2" />
          <rect x="10" y="11" width="2" height="2" />
          <rect x="7" y="6" width="2" height="2" fill="var(--bg)" />
          <rect x="6" y="13" width="1" height="2" />
          <rect x="9" y="13" width="1" height="2" />
        </g>
      </svg>
    );
  return null;
}

export default function Home() {
  useReveal();

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-60px)] items-center justify-center overflow-hidden px-8 pt-20 pb-15 max-[720px]:px-4">
        <div aria-hidden="true" className="absolute inset-0 z-[1] opacity-55">
          <svg
            className="silo absolute top-[14%] left-[8%] w-[80px] text-[var(--cyan)]"
            viewBox="0 0 40 32"
          >
            <g fill="currentColor">
              <rect x="6" y="4" width="4" height="4" />
              <rect x="30" y="4" width="4" height="4" />
              <rect x="2" y="8" width="36" height="4" />
              <rect x="2" y="12" width="4" height="4" />
              <rect x="14" y="12" width="4" height="4" />
              <rect x="22" y="12" width="4" height="4" />
              <rect x="34" y="12" width="4" height="4" />
              <rect x="2" y="16" width="36" height="4" />
              <rect x="6" y="20" width="4" height="4" />
              <rect x="30" y="20" width="4" height="4" />
            </g>
          </svg>
          <svg
            className="silo absolute top-[22%] right-[10%] w-[72px] text-[var(--magenta)]"
            style={{ animationDelay: "-1.5s" }}
            viewBox="0 0 32 32"
          >
            <g fill="currentColor">
              <rect x="8" y="0" width="16" height="4" />
              <rect x="4" y="4" width="24" height="4" />
              <rect x="0" y="8" width="32" height="12" />
              <rect x="0" y="20" width="6" height="6" />
              <rect x="10" y="20" width="4" height="6" />
              <rect x="18" y="20" width="4" height="6" />
              <rect x="26" y="20" width="6" height="6" />
            </g>
          </svg>
          <svg
            className="silo absolute bottom-[18%] left-[12%] w-[88px] text-[var(--yellow)]"
            style={{ animationDelay: "-3s" }}
            viewBox="0 0 32 32"
          >
            <g fill="currentColor">
              <rect x="10" y="0" width="12" height="4" />
              <rect x="6" y="4" width="20" height="4" />
              <rect x="4" y="8" width="6" height="6" />
              <rect x="22" y="8" width="6" height="6" />
              <rect x="2" y="14" width="28" height="10" />
              <rect x="6" y="24" width="4" height="4" />
              <rect x="14" y="24" width="4" height="4" />
              <rect x="22" y="24" width="4" height="4" />
            </g>
          </svg>
          <svg
            className="silo absolute right-[14%] bottom-[22%] w-[60px] text-[var(--green)]"
            style={{ animationDelay: "-4.5s" }}
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <rect x="10" y="0" width="4" height="24" />
              <rect x="0" y="10" width="24" height="4" />
              <rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
            </g>
          </svg>
          <svg
            className="silo absolute top-[38%] left-[4%] w-[70px] text-[#aa00ff]"
            style={{ animationDelay: "-2s" }}
            viewBox="0 0 36 24"
          >
            <g fill="currentColor">
              <rect x="14" y="2" width="8" height="4" />
              <rect x="10" y="6" width="16" height="4" />
              <rect x="4" y="10" width="28" height="4" />
              <rect x="0" y="14" width="36" height="4" />
              <rect x="6" y="18" width="4" height="2" />
              <rect x="16" y="18" width="4" height="2" />
              <rect x="26" y="18" width="4" height="2" />
            </g>
          </svg>
          <svg
            className="silo absolute top-[8%] left-[46%] w-[44px] text-[var(--gold)]"
            style={{ animationDelay: "-3.5s" }}
            viewBox="0 0 20 20"
          >
            <g fill="currentColor">
              <rect x="6" y="0" width="8" height="2" />
              <rect x="2" y="2" width="16" height="2" />
              <rect x="0" y="4" width="20" height="12" />
              <rect x="2" y="16" width="16" height="2" />
              <rect x="6" y="18" width="8" height="2" />
              <rect x="8" y="4" width="4" height="12" fill="var(--bg)" />
            </g>
          </svg>
          <svg
            className="silo absolute bottom-[12%] left-[42%] w-[52px] text-[#ff3060]"
            style={{ animationDelay: "-1s" }}
            viewBox="0 0 24 22"
          >
            <g fill="currentColor">
              <rect x="2" y="2" width="6" height="2" />
              <rect x="16" y="2" width="6" height="2" />
              <rect x="0" y="4" width="10" height="4" />
              <rect x="14" y="4" width="10" height="4" />
              <rect x="0" y="8" width="24" height="4" />
              <rect x="2" y="12" width="20" height="2" />
              <rect x="4" y="14" width="16" height="2" />
              <rect x="6" y="16" width="12" height="2" />
              <rect x="8" y="18" width="8" height="2" />
              <rect x="10" y="20" width="4" height="2" />
            </g>
          </svg>
          <svg
            className="silo absolute top-[50%] right-[4%] w-[60px] text-[#00d4ff]"
            style={{ animationDelay: "-5s" }}
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <rect x="8" y="2" width="8" height="6" />
              <rect x="2" y="8" width="20" height="8" />
              <rect x="8" y="16" width="8" height="6" />
              <rect x="11" y="6" width="2" height="2" fill="var(--bg)" />
              <rect x="11" y="16" width="2" height="2" fill="var(--bg)" />
              <rect x="4" y="11" width="2" height="2" fill="var(--bg)" />
              <rect x="18" y="11" width="2" height="2" fill="var(--bg)" />
            </g>
          </svg>
        </div>

        <div className="relative z-[3] max-w-[1100px] text-center">
          <div className="pixel neon-yellow mb-6 text-[11px] tracking-[0.24em]">
            ▸ INSERTA UNA MONEDA
            <span className="animate-pulse">_</span>
          </div>
          <h1 className="pixel m-0 flex flex-col gap-2 text-[clamp(32px,7vw,88px)] leading-[1.05] tracking-[0.04em]">
            <span className="text-white [text-shadow:0_0_14px_rgba(255,255,255,0.4)]">
              EL ARCADE
            </span>
            <span className="bg-[linear-gradient(180deg,var(--cyan),#4dd0e1)] bg-clip-text text-transparent [filter:drop-shadow(0_0_14px_rgba(0,245,255,0.45))]">
              CLÁSICO ESTÁ
            </span>
            <span className="bg-[linear-gradient(180deg,var(--magenta),#ff6b9e)] bg-clip-text text-transparent [filter:drop-shadow(0_0_14px_rgba(255,0,110,0.45))]">
              DE VUELTA
            </span>
          </h1>
          <p className="mx-auto mt-7 mb-9 max-w-[640px] text-[15px] leading-[1.7] tracking-[0.04em] text-[var(--ink-dim)]">
            Juega los mejores clásicos directamente en tu navegador.
            <br />
            Sin descargas. Sin costo. Solo diversión.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/games" size="xl" pulse>
              ▶ EXPLORAR JUEGOS
            </Button>
            <Button href="/auth" variant="magenta" size="xl">
              ✦ CREAR CUENTA
            </Button>
          </div>
          <div
            aria-hidden="true"
            className="hero-scroll absolute bottom-[-20px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="pixel text-[9px] tracking-[0.2em] text-[var(--ink-faint)]">
              DESLIZA
            </span>
            <span className="arrow">▼</span>
          </div>
        </div>
      </section>

      {/* POR QUÉ */}
      <section className="reveal mx-auto max-w-[1320px] px-8 py-20 max-[720px]:px-4">
        <div className="mb-9 flex items-center gap-4.5">
          <div className="pixel neon-magenta text-[11px] tracking-[0.22em]">{"// 01"}</div>
          <h2 className="pixel m-0 text-[clamp(18px,2.8vw,28px)] tracking-[0.06em] text-[var(--ink)]">
            ¿POR QUÉ ARCADE VAULT?
          </h2>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
        </div>
        <div className="grid grid-cols-4 gap-4.5 max-[980px]:grid-cols-2 max-[520px]:grid-cols-1">
          {FEATURES.map((f, i) => (
            <div
              key={f.t}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`flex flex-col gap-3.5 border border-[var(--line)] bg-[linear-gradient(180deg,var(--bg-2),var(--bg-3))] p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-current hover:shadow-[0_18px_40px_-16px_currentColor,0_0_0_1px_currentColor] ${FEATURE_COLOR[f.c]}`}
            >
              <FeatureIcon kind={f.i} />
              <div className="pixel text-[12px] tracking-[0.1em] text-current [text-shadow:0_0_8px_currentColor]">
                {f.t}
              </div>
              <div className="text-[13px] leading-[1.6] text-[var(--ink-dim)]">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* JUEGOS DISPONIBLES */}
      <section className="reveal mx-auto max-w-[1320px] px-8 py-20 max-[720px]:px-4">
        <div className="mb-9 flex items-center gap-4.5">
          <div className="pixel neon-cyan text-[11px] tracking-[0.22em]">{"// 02"}</div>
          <h2 className="pixel m-0 text-[clamp(18px,2.8vw,28px)] tracking-[0.06em] text-[var(--ink)]">
            JUEGOS DISPONIBLES AHORA
          </h2>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
        </div>
        <div className="grid grid-cols-6 gap-4 max-[1100px]:grid-cols-3 max-[600px]:grid-cols-2">
          {GAMES.slice(0, 6).map((g) => (
            <MiniCard key={g.id} game={g} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button href="/games" size="lg">
            VER TODOS LOS JUEGOS →
          </Button>
        </div>
      </section>

      {/* STATS */}
      <section className="reveal relative overflow-hidden border-y border-[var(--line)] bg-[linear-gradient(180deg,#06060a,#0c0c14)] px-8 py-15 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(80%_60%_at_50%_50%,rgba(245,255,0,0.06),transparent_70%)] max-[720px]:px-4">
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-3 gap-8 max-[720px]:grid-cols-1">
          {[
            { n: "12+", u: "JUEGOS", s: "Y CONTANDO" },
            { n: "MILES", u: "DE PARTIDAS", s: "JUGADAS CADA DÍA" },
            { n: "GLOBAL", u: "RANKING", s: "COMPITE CON EL MUNDO" },
          ].map((st, i) => (
            <div
              key={st.u}
              style={{ transitionDelay: `${i * 90}ms` }}
              className="border-l border-[var(--line)] p-5 text-center first:border-l-0 max-[720px]:border-l-0 max-[720px]:border-t max-[720px]:first:border-t-0 max-[720px]:border-l-[var(--line)]"
            >
              <div className="pixel neon-yellow text-[clamp(32px,5vw,56px)] tracking-[0.04em]">
                {st.n}
              </div>
              <div className="pixel mt-2.5 text-[13px] tracking-[0.18em] text-[var(--ink)]">
                {st.u}
              </div>
              <div className="mono mt-2 text-[11px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
                {st.s}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVIDAD */}
      <section className="reveal mx-auto max-w-[1320px] px-8 py-20 max-[720px]:px-4">
        <div className="mb-9 flex items-center gap-4.5">
          <div className="pixel neon-yellow text-[11px] tracking-[0.22em]">{"// 03"}</div>
          <h2 className="pixel m-0 text-[clamp(18px,2.8vw,28px)] tracking-[0.06em] text-[var(--ink)]">
            ACTIVIDAD EN VIVO
          </h2>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-4.5 max-[900px]:grid-cols-1">
          <div className="border border-[var(--line)] bg-[var(--bg-2)]">
            <div className="flex items-center justify-between gap-2.5 border-b border-[var(--line)] px-3.5 py-3">
              <div className="pixel text-[10px] tracking-[0.1em] text-[var(--cyan)] [text-shadow:0_0_8px_rgba(0,245,255,0.5)]">
                ▸ ÚLTIMAS PUNTUACIONES
              </div>
            </div>
            <div className="max-h-[360px] overflow-hidden py-1.5">
              {[
                { p: "NEONFOX", g: "Caída", s: 184220, t: "hace 2 min", c: "magenta" },
                { p: "PX_KAI", g: "Glotón", s: 96400, t: "hace 5 min", c: "yellow" },
                { p: "Z3R0COOL", g: "Invasores", s: 54190, t: "hace 8 min", c: "green" },
                { p: "VAULT_07", g: "Rocas", s: 41200, t: "hace 12 min", c: "cyan" },
                { p: "GLITCHA", g: "Bloque Buster", s: 28450, t: "hace 18 min", c: "cyan" },
                { p: "ARKADYA", g: "Serpentina", s: 7820, t: "hace 24 min", c: "green" },
                { p: "CYBER_LU", g: "Ranaria", s: 18900, t: "hace 31 min", c: "yellow" },
              ].map((r, i) => (
                <div
                  key={r.p}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="rise-in mono grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-[var(--line-2)] px-4.5 py-2.5 text-[13px] max-[520px]:grid-cols-[1fr_auto] max-[520px]:gap-y-1"
                >
                  <span className={`pixel text-[10px] tracking-[0.06em] ${FEATURE_COLOR[r.c]}`}>
                    {r.p}
                  </span>
                  <span className="text-[12px] text-[var(--ink-dim)] max-[520px]:col-span-2">
                    ▸ {r.g}
                  </span>
                  <span className="pixel text-[11px] text-[var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.5)]">
                    +{r.s.toLocaleString("es-ES")}
                  </span>
                  <span className="text-[11px] tracking-[0.08em] text-[var(--ink-faint)] max-[520px]:col-span-2">
                    {r.t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[var(--line)] bg-[var(--bg-2)]">
            <div className="flex items-center justify-between gap-2.5 border-b border-[var(--line)] px-3.5 py-3">
              <div className="pixel neon-magenta text-[10px] tracking-[0.1em]">
                ▸ TOP JUGADORES · HOY
              </div>
              <Button href="/salon" variant="ghost" size="sm">
                VER SALÓN →
              </Button>
            </div>
            <div className="flex flex-col gap-2.5 px-4.5 pt-2.5 pb-4.5">
              {[
                { r: 1, p: "NEONFOX", s: 312840 },
                { r: 2, p: "PX_KAI", s: 248110 },
                { r: 3, p: "M00NRYU", s: 196720 },
                { r: 4, p: "VAULT_07", s: 154300 },
                { r: 5, p: "GLITCHA", s: 138900 },
              ].map((r) => (
                <div
                  key={r.p}
                  className={`mono grid grid-cols-[36px_1fr_auto] items-center gap-2.5 py-2 ${
                    r.r === 1
                      ? "[&_.rk]:text-[var(--gold)] [&_.rk]:[text-shadow:0_0_6px_rgba(255,207,58,0.6)] [&_.sc]:text-[var(--gold)] [&_.sc]:[text-shadow:0_0_6px_rgba(255,207,58,0.6)]"
                      : r.r === 2
                        ? "[&_.rk]:text-[var(--silver)] [&_.sc]:text-[var(--silver)]"
                        : r.r === 3
                          ? "[&_.rk]:text-[var(--bronze)] [&_.sc]:text-[var(--bronze)]"
                          : ""
                  }`}
                >
                  <span className="rk pixel text-[10px] text-[var(--ink-faint)]">
                    #{String(r.r).padStart(2, "0")}
                  </span>
                  <span className="pixel text-[11px] tracking-[0.06em] text-[var(--ink)]">
                    {r.p}
                  </span>
                  <span className="sc pixel text-[11px] text-[var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.4)]">
                    {r.s.toLocaleString("es-ES")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="reveal mx-auto max-w-[1320px] px-8 py-20 max-[720px]:px-4">
        <div className="mb-9 flex items-center gap-4.5">
          <div className="pixel neon-green text-[11px] tracking-[0.22em]">{"// 04"}</div>
          <h2 className="pixel m-0 text-[clamp(18px,2.8vw,28px)] tracking-[0.06em] text-[var(--ink)]">
            PRECIOS
          </h2>
          <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
        </div>
        <div className="grid grid-cols-2 items-stretch gap-6 max-[900px]:grid-cols-1">
          <div className="relative flex flex-col gap-3.5 border border-[var(--green)] bg-[linear-gradient(180deg,var(--bg-2),#0a0e16)] p-8 shadow-[0_0_28px_rgba(0,255,136,0.18),inset_0_0_14px_rgba(0,255,136,0.08)] before:pointer-events-none before:absolute before:inset-1 before:border before:border-dashed before:border-[rgba(0,255,136,0.3)]">
            <div className="text-[9px] tracking-[0.22em] text-[var(--ink-dim)]">PLAN ÚNICO</div>
            <div className="pixel text-[16px] tracking-[0.08em] text-[var(--green)] [text-shadow:0_0_10px_rgba(0,255,136,0.5)]">
              JUGADOR VAULT
            </div>
            <div className="mt-1.5 flex items-baseline gap-2.5">
              <span className="pixel bg-[linear-gradient(180deg,#fff,var(--green))] bg-clip-text text-[64px] tracking-[0.02em] text-transparent [filter:drop-shadow(0_0_12px_rgba(0,255,136,0.5))]">
                $0
              </span>
              <span className="pixel text-[11px] tracking-[0.16em] text-[var(--ink-dim)]">
                / SIEMPRE
              </span>
            </div>
            <div className="pixel text-[9px] tracking-[0.18em] text-[var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.45)]">
              SIN TRUCOS · SIN LETRA PEQUEÑA
            </div>
            <ul className="mt-2.5 mb-1 flex list-none flex-col gap-2 p-0">
              {[
                "Acceso a todos los juegos",
                "Ranking global y salón de la fama",
                "Sin anuncios entre partidas",
                "Guarda tus puntuaciones",
                "Nuevos juegos cada mes",
                "Funciona en cualquier navegador",
              ].map((item) => (
                <li key={item} className="text-[13px] tracking-[0.02em] text-[var(--ink)]">
                  <span className="text-[var(--green)]">✔</span> {item}
                </li>
              ))}
            </ul>
            <Button href="/auth" size="xl" pulse className="w-full">
              EMPEZAR GRATIS →
            </Button>
            <div className="text-center text-[11px] tracking-[0.1em] text-[var(--ink-faint)]">
              No pedimos tarjeta. Nunca lo haremos.
            </div>
            <div className="pixel absolute -top-4.5 -right-4.5 rotate-[14deg] border-2 border-[var(--magenta)] bg-black/85 px-4.5 py-2.5 text-center text-[13px] leading-[1.15] tracking-[0.16em] text-[var(--magenta)] shadow-[0_0_14px_rgba(255,0,110,0.35),inset_0_0_8px_rgba(255,0,110,0.2)] [text-shadow:0_0_8px_rgba(255,0,110,0.6)]">
              FREE
              <br />
              PLAY
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3.5">
            {[
              {
                q: "¿REALMENTE ES GRATIS?",
                a: 'Sí. Arcade Vault es un proyecto sin fines de lucro hecho por amor a los clásicos. No hay versión "premium" escondida.',
                b: "border-[var(--cyan)]",
              },
              {
                q: "¿NECESITO CREAR CUENTA?",
                a: "No. Puedes jugar como invitado. Si quieres guardar tu puntuación y aparecer en el ranking, regístrate en 10 segundos.",
                b: "border-[var(--magenta)]",
              },
              {
                q: "¿CÓMO SOBREVIVEN SIN COBRAR?",
                a: "Es un proyecto comunitario. Si te gusta, compártelo. Esa es toda la moneda que aceptamos.",
                b: "border-[var(--yellow)]",
              },
            ].map((f) => (
              <div
                key={f.q}
                className={`border border-l-3 border-[var(--line)] bg-[var(--bg-2)] p-5 ${f.b}`}
              >
                <div className="pixel mb-2 text-[10px] tracking-[0.12em] text-[var(--ink)]">
                  {f.q}
                </div>
                <div className="mono text-[13px] leading-[1.6] text-[var(--ink-dim)]">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="reveal relative mx-auto max-w-[900px] px-8 py-25 text-center before:absolute before:top-[30px] before:left-1/2 before:h-px before:w-[60%] before:-translate-x-1/2 before:bg-[linear-gradient(90deg,transparent,var(--cyan),transparent)] before:opacity-50 after:absolute after:bottom-[30px] after:left-1/2 after:h-px after:w-[60%] after:-translate-x-1/2 after:bg-[linear-gradient(90deg,transparent,var(--cyan),transparent)] after:opacity-50">
        <h2 className="pixel mb-9 bg-[linear-gradient(180deg,#fff,var(--yellow))] bg-clip-text text-[clamp(22px,4vw,40px)] tracking-[0.08em] text-transparent [filter:drop-shadow(0_0_12px_rgba(245,255,0,0.4))]">
          ¿LISTO PARA JUGAR?
        </h2>
        <Button href="/games" size="xl" pulse className="px-11 py-6 text-[14px] tracking-[0.2em]">
          INSERTAR MONEDA →
        </Button>
        <div className="mt-7 text-[13px] tracking-[0.06em] text-[var(--ink-dim)]">
          Gratis. Sin registro obligatorio. Empieza en segundos.
        </div>
      </section>
    </div>
  );
}
