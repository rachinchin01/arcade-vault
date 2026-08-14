import Link from "next/link";
import type { Game } from "@/lib/data";

export default function MiniCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/juego/${game.id}`}
      className="border border-[var(--line)] bg-[var(--bg-2)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--cyan)]"
    >
      <div className="relative aspect-square overflow-hidden">
        <div className={`cover-bg ${game.cover}`} />
      </div>
      <div className="px-3 py-2.5">
        <div className="pixel text-[10px] tracking-[0.06em] text-[var(--ink)]">{game.title}</div>
        <div className="mono mt-1 text-[10px] tracking-[0.14em] text-[var(--ink-faint)]">
          {game.cat}
        </div>
      </div>
    </Link>
  );
}
