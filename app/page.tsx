"use client";

import { useMemo, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { GameCard } from "@/components/game-card";
import { CATEGORIES, GAMES } from "@/lib/games";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("TODOS");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GAMES.filter(
      (g) => (category === "TODOS" || g.cat === category) && g.title.toLowerCase().includes(q)
    );
  }, [query, category]);

  return (
    <>
      <SiteNav />
      <main className="av-main fade-in">
        <section className="av-hero">
          <h1 className="flicker">ARCADE VAULT</h1>
          <p className="sub">
            INSERTÁ UNA MONEDA PARA JUGAR <span className="blink">_</span>
          </p>
        </section>

        <div className="av-filters">
          <div className="av-search">
            <span className="ico">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un juego por nombre…"
              aria-label="Buscar juego"
            />
          </div>
          <div className="av-chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${category === c ? " active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="av-grid">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: 80,
                color: "var(--ink-faint)",
              }}
            >
              <div
                className="pixel"
                style={{ fontSize: 14, color: "var(--magenta)", marginBottom: 12 }}
              >
                NO HAY RESULTADOS
              </div>
              <div>Probá otra búsqueda o categoría.</div>
            </div>
          )}
        </div>
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "20px 32px",
          textAlign: "center",
          color: "var(--ink-faint)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
        }}
      >
        © 2026 ARCADE VAULT · HECHO CON PÍXELES Y NEÓN
      </footer>
    </>
  );
}
