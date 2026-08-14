"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { GAMES, seededScores } from "@/lib/data";

const RANK_CLASS: Record<number, { rk: string; sc: string }> = {
  0: {
    rk: "text-[var(--gold)] [text-shadow:0_0_6px_rgba(255,207,58,0.6)]",
    sc: "text-[var(--gold)] [text-shadow:0_0_6px_rgba(255,207,58,0.6)]",
  },
  1: { rk: "text-[var(--silver)]", sc: "text-[var(--silver)]" },
  2: { rk: "text-[var(--bronze)]", sc: "text-[var(--bronze)]" },
};

export default function SalonPage() {
  const [tab, setTab] = useState(GAMES[0].id);
  const rows = useMemo(() => seededScores(tab.length * 23 + 7, 12), [tab]);

  return (
    <div className="mx-auto max-w-[1200px] px-8 pt-8 pb-20 max-[720px]:px-4">
      <div className="mb-7 text-center">
        <h1 className="pixel m-0 bg-[linear-gradient(180deg,var(--yellow),var(--magenta))] bg-clip-text text-[clamp(24px,4.5vw,44px)] tracking-[0.08em] text-transparent [filter:drop-shadow(0_0_14px_rgba(245,255,0,0.4))]">
          SALÓN DE LA FAMA
        </h1>
        <p className="pixel mt-3 text-[10px] tracking-[0.1em] text-[var(--ink-dim)]">
          LOS NOMBRES QUE NUNCA SE BORRAN DE LA PANTALLA
        </p>
      </div>

      <div className="mb-5.5 flex flex-wrap justify-center gap-1.5">
        {GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setTab(g.id)}
            className={`pixel border bg-[var(--bg-2)] px-3.5 py-3 text-[9px] tracking-[0.12em] ${
              tab === g.id
                ? "border-[var(--magenta)] text-[var(--magenta)] shadow-[0_0_10px_rgba(255,0,110,0.35)]"
                : "border-[var(--line)] text-[var(--ink-dim)] hover:text-[var(--ink)]"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-[1fr_1.2fr_1fr] items-end gap-3.5 max-[720px]:grid-cols-1">
        <div className="relative border border-[var(--silver)] bg-[var(--bg-2)] px-3.5 pt-4.5 pb-4 text-center">
          <div className="pixel text-[28px] [text-shadow:0_0_12px_currentColor] text-[var(--silver)]">
            02
          </div>
          <div className="pixel mt-2 text-[12px] tracking-[0.06em]">{rows[1].name}</div>
          <div className="pixel mt-2 text-[16px] text-[var(--cyan)] [text-shadow:0_0_8px_rgba(0,245,255,0.5)]">
            {rows[1].score.toLocaleString("es-ES")}
          </div>
          <div className="mono mt-1.5 text-[11px] tracking-[0.12em] text-[var(--ink-faint)]">
            {rows[1].date}
          </div>
        </div>

        <div className="relative border border-[var(--gold)] bg-[var(--bg-2)] px-3.5 pt-4.5 pb-4 text-center shadow-[0_0_22px_rgba(255,207,58,0.35)]">
          <div className="pixel text-[9px] tracking-[0.18em] text-[var(--gold)]">CAMPEÓN</div>
          <div className="pixel mt-1 text-[36px] [text-shadow:0_0_12px_currentColor] text-[var(--gold)]">
            01
          </div>
          <div className="pixel mt-2 text-[12px] tracking-[0.06em]">{rows[0].name}</div>
          <div className="pixel mt-2 text-[20px] text-[var(--cyan)] [text-shadow:0_0_8px_rgba(0,245,255,0.5)]">
            {rows[0].score.toLocaleString("es-ES")}
          </div>
          <div className="mono mt-1.5 text-[11px] tracking-[0.12em] text-[var(--ink-faint)]">
            {rows[0].date}
          </div>
        </div>

        <div className="relative border border-[var(--bronze)] bg-[var(--bg-2)] px-3.5 pt-4.5 pb-4 text-center">
          <div className="pixel text-[28px] [text-shadow:0_0_12px_currentColor] text-[var(--bronze)]">
            03
          </div>
          <div className="pixel mt-2 text-[12px] tracking-[0.06em]">{rows[2].name}</div>
          <div className="pixel mt-2 text-[16px] text-[var(--cyan)] [text-shadow:0_0_8px_rgba(0,245,255,0.5)]">
            {rows[2].score.toLocaleString("es-ES")}
          </div>
          <div className="mono mt-1.5 text-[11px] tracking-[0.12em] text-[var(--ink-faint)]">
            {rows[2].date}
          </div>
        </div>
      </div>

      <div className="border border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mono grid grid-cols-[70px_1fr_1fr_140px] items-center gap-2.5 border-b border-[var(--line)] px-4.5 py-3 text-[13px] max-[720px]:grid-cols-[50px_1fr_90px_90px] max-[720px]:px-3 max-[720px]:py-2.5 max-[720px]:text-[12px]">
          <div className="pixel text-[10px] tracking-[0.16em] text-[var(--ink-faint)]">RANGO</div>
          <div className="pixel text-[10px] tracking-[0.16em] text-[var(--ink-faint)]">JUGADOR</div>
          <div className="pixel text-[10px] tracking-[0.16em] text-[var(--ink-faint)]">
            PUNTUACIÓN
          </div>
          <div className="pixel text-[10px] tracking-[0.16em] text-[var(--ink-faint)]">FECHA</div>
        </div>
        {rows.map((r, i) => {
          const rank = RANK_CLASS[i];
          return (
            <div
              key={`${tab}-${r.name}-${i}`}
              className="rise-in mono grid grid-cols-[70px_1fr_1fr_140px] items-center gap-2.5 border-b border-[var(--line-2)] px-4.5 py-3 text-[13px] max-[720px]:grid-cols-[50px_1fr_90px_90px] max-[720px]:px-3 max-[720px]:py-2.5 max-[720px]:text-[12px]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`pixel text-[11px] ${rank?.rk ?? "text-[var(--ink-dim)]"}`}>
                #{String(r.rank).padStart(2, "0")}
              </div>
              <div className="text-[var(--ink)]">{r.name}</div>
              <div className={`pixel text-[12px] ${rank?.sc ?? "text-[var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.4)]"}`}>
                {r.score.toLocaleString("es-ES")}
              </div>
              <div className="text-[var(--ink-faint)]">{r.date}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Button href="/games" size="lg">
          VOLVER A LA BIBLIOTECA
        </Button>
      </div>
    </div>
  );
}
