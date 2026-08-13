import Link from "next/link";
import type { Game } from "@/lib/data";

const PLAY_VARIANT: Record<Game["color"], { border: string; hover: string }> = {
  magenta: {
    border: "border-[var(--magenta)]",
    hover:
      "hover:text-[var(--magenta)] hover:shadow-[0_0_14px_rgba(255,0,110,0.55),inset_0_0_8px_rgba(255,0,110,0.35)]",
  },
  yellow: {
    border: "border-[var(--yellow)]",
    hover:
      "hover:text-[var(--yellow)] hover:shadow-[0_0_14px_rgba(245,255,0,0.6),inset_0_0_8px_rgba(245,255,0,0.35)]",
  },
  cyan: {
    border: "border-[var(--cyan)]",
    hover:
      "hover:text-[var(--cyan)] hover:shadow-[0_0_14px_rgba(0,245,255,0.55),inset_0_0_8px_rgba(0,245,255,0.35)]",
  },
  green: {
    border: "border-[var(--cyan)]",
    hover:
      "hover:text-[var(--cyan)] hover:shadow-[0_0_14px_rgba(0,245,255,0.55),inset_0_0_8px_rgba(0,245,255,0.35)]",
  },
};

export default function GameCard({ game }: { game: Game }) {
  const play = PLAY_VARIANT[game.color];

  return (
    <Link
      href={`/juego/${game.id}`}
      className="relative flex flex-col gap-3.5 border border-[var(--line)] p-3.5 transition-[transform,box-shadow,border-color] duration-200 [background:linear-gradient(180deg,var(--bg-2),var(--bg-3))] hover:-translate-y-1.5 hover:border-[var(--cyan)] hover:shadow-[0_18px_40px_-10px_rgba(0,245,255,0.4),0_0_0_1px_rgba(0,245,255,0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-[var(--line-2)]">
        <div className={`cover-bg ${game.cover}`} />
        <div className="pixel absolute bottom-2 left-2 z-[2] border border-[var(--line)] bg-black/60 px-1.5 py-1 text-[8px] text-[var(--cyan)]">
          {game.cat}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="pixel text-[13px] tracking-[0.06em] text-[var(--ink)]">{game.title}</div>
        <div className="min-h-[36px] text-[12px] text-[var(--ink-dim)]">{game.short}</div>
        <div className="mt-1 flex items-center justify-between gap-2.5">
          <div className="mono flex flex-col text-[10px] tracking-[0.08em] text-[var(--ink-faint)] uppercase">
            <span>MEJOR PUNTUACIÓN</span>
            <b className="pixel text-[12px] tracking-[0.06em] text-[var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.6)]">
              {game.best.toLocaleString("es-ES")}
            </b>
          </div>
          <span
            className={`pixel relative inline-flex items-center justify-center border px-3.5 py-2.5 text-[9px] tracking-[0.16em] text-[var(--ink)] transition-[color,box-shadow] duration-150 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] ${play.border} ${play.hover}`}
          >
            JUGAR
          </span>
        </div>
      </div>
    </Link>
  );
}
