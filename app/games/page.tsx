"use client";

import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import { CATS, GAMES } from "@/lib/data";

export default function Home() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("TODOS");

  const filtered = useMemo(() => {
    return GAMES.filter(
      (g) => (cat === "TODOS" || g.cat === cat) && g.title.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q, cat]);

  return (
    <div>
      <section className="mx-auto max-w-[1320px] px-8 pt-16 pb-8 text-center max-[720px]:px-4 max-[720px]:pt-9 max-[720px]:pb-4">
        <h1 className="pixel flicker m-0 bg-[linear-gradient(180deg,#fff_0%,var(--cyan)_60%,var(--magenta)_110%)] bg-clip-text text-[clamp(28px,6vw,64px)] tracking-[0.06em] text-transparent [filter:drop-shadow(0_0_12px_rgba(0,245,255,0.4))]">
          ARCADE VAULT
        </h1>
        <div className="pixel mt-[18px] text-[clamp(10px,1.6vw,14px)] tracking-[0.2em] text-[var(--yellow)]">
          INSERTA UNA MONEDA PARA JUGAR <span className="animate-pulse">_</span>
        </div>
      </section>

      <div className="mx-auto mt-8 flex max-w-[1320px] flex-wrap gap-3 px-8 max-[720px]:px-4">
        <div className="relative flex h-12 min-w-[220px] flex-1 items-center gap-2.5 border border-[var(--line)] px-4 focus-within:border-[var(--cyan)] focus-within:shadow-[0_0_12px_rgba(0,245,255,0.35)]">
          <span className="pixel text-[11px] text-[var(--cyan)]">⌕</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar un juego por nombre…"
            className="flex-1 border-0 bg-transparent text-[13px] tracking-[0.04em] text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`pixel border bg-[var(--bg-2)] px-3.5 py-3 text-[9px] tracking-[0.12em] ${
                cat === c
                  ? "border-[var(--magenta)] text-[var(--magenta)] shadow-[0_0_10px_rgba(255,0,110,0.35)]"
                  : "border-[var(--line)] text-[var(--ink-dim)] hover:text-[var(--ink)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 mb-20 grid max-w-[1320px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[22px] px-8 max-[720px]:px-4">
        {filtered.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-[var(--ink-faint)]">
            <div className="pixel mb-3 text-[14px] text-[var(--magenta)]">NO HAY RESULTADOS</div>
            <div>Intenta otra búsqueda o categoría.</div>
          </div>
        )}
      </div>
    </div>
  );
}
