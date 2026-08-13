import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { GAMES, seededScores } from "@/lib/data";

const TAG_LABELS = ["1 JUGADOR", "TECLADO / TÁCTIL", "RETRO 1985"];

export default async function GameDetailPage({ params }: PageProps<"/juego/[id]">) {
  const { id } = await params;
  const game = GAMES.find((g) => g.id === id);
  if (!game) notFound();

  const scores = seededScores(id.length * 17 + 3, 10);

  return (
    <div className="mx-auto grid max-w-[1320px] grid-cols-[1.4fr_1fr] gap-8 px-8 py-12 max-[900px]:grid-cols-1 max-[720px]:px-4 max-[720px]:py-6">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--line)]">
          <div className={`cover-bg ${game.cover}`} />
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {[game.cat, ...TAG_LABELS].map((tag) => (
              <span
                key={tag}
                className="pixel border border-[var(--line)] px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-[var(--ink-dim)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="neon-cyan pixel m-0 text-[clamp(20px,3vw,32px)] tracking-[0.06em]">
            {game.title}
          </h2>
          <p className="m-0 text-[14px] leading-[1.7] text-[var(--ink-dim)]">{game.long}</p>

          <div className="mt-2 grid grid-cols-3 gap-px border border-[var(--line)] bg-[var(--line)]">
            <div className="bg-[var(--bg-2)] p-3.5">
              <div className="mono text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
                Partidas
              </div>
              <div className="pixel mt-1.5 text-[16px] text-[var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.5)]">
                {game.plays}
              </div>
            </div>
            <div className="bg-[var(--bg-2)] p-3.5">
              <div className="mono text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
                Mejor global
              </div>
              <div className="pixel mt-1.5 text-[16px] text-[var(--magenta)] [text-shadow:0_0_6px_rgba(255,0,110,0.5)]">
                {game.best.toLocaleString("es-ES")}
              </div>
            </div>
            <div className="bg-[var(--bg-2)] p-3.5">
              <div className="mono text-[10px] tracking-[0.12em] text-[var(--ink-faint)] uppercase">
                Dificultad
              </div>
              <div className="pixel mt-1.5 text-[16px] text-[var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.5)]">
                ★ ★ ★ ☆ ☆
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={`/juego/${game.id}/jugar`} size="xl" pulse>
              ▶ JUGAR AHORA
            </Button>
            <Button href="/" variant="ghost" size="lg">
              VOLVER AL VAULT
            </Button>
          </div>
        </div>
      </div>

      <aside>
        <div className="border border-[var(--line)] bg-[var(--bg-2)]">
          <h3 className="pixel m-0 border-b border-[var(--line)] px-4 py-3.5 text-[11px] tracking-[0.14em] text-[var(--magenta)] [text-shadow:0_0_8px_rgba(255,0,110,0.5)]">
            MEJORES PUNTUACIONES
          </h3>
          {scores.map((r, i) => {
            const rankClass =
              i === 0
                ? "text-[var(--gold)] [text-shadow:0_0_6px_rgba(255,207,58,0.6)]"
                : i === 1
                  ? "text-[var(--silver)] [text-shadow:0_0_6px_rgba(199,208,224,0.5)]"
                  : i === 2
                    ? "text-[var(--bronze)] [text-shadow:0_0_6px_rgba(217,122,58,0.5)]"
                    : "text-[var(--ink-faint)]";
            const scoreClass =
              i === 0
                ? "text-[var(--gold)] [text-shadow:0_0_6px_rgba(255,207,58,0.6)]"
                : i === 1
                  ? "text-[var(--silver)] [text-shadow:0_0_6px_rgba(199,208,224,0.5)]"
                  : i === 2
                    ? "text-[var(--bronze)] [text-shadow:0_0_6px_rgba(217,122,58,0.5)]"
                    : "text-[var(--cyan)]";
            return (
              <div
                key={r.name}
                className="mono grid grid-cols-[36px_1fr_110px] items-center gap-2.5 border-b border-[var(--line-2)] px-4 py-2.5 text-[13px]"
              >
                <div className={`pixel text-[11px] ${rankClass}`}>
                  #{String(r.rank).padStart(2, "0")}
                </div>
                <div className="text-[var(--ink)]">
                  {r.name}
                  <div className="text-[10px] tracking-[0.1em] text-[var(--ink-faint)]">
                    {r.date}
                  </div>
                </div>
                <div className={`pixel text-right text-[12px] ${scoreClass}`}>
                  {r.score.toLocaleString("es-ES")}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
