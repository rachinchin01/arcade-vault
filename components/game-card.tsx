"use client";

import { useRef } from "react";
import type { Game } from "@/lib/games";

export function GameCard({ game }: { game: Game }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translateY(-6px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg)`;
  };

  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      className="card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="cover">
        <div className={`cover-bg ${game.cover}`} />
        <div className="label">{game.cat}</div>
      </div>
      <div className="meta">
        <div className="title">{game.title}</div>
        <div className="desc">{game.short}</div>
        <div className="row">
          <div className="score-badge">
            <span>MEJOR PUNTUACIÓN</span>
            <b>{game.best.toLocaleString("es-AR")}</b>
          </div>
          <button
            type="button"
            className="btn ghost"
            disabled
            title="Disponible próximamente"
            style={{ cursor: "not-allowed", opacity: 0.6 }}
          >
            PRONTO
          </button>
        </div>
      </div>
    </div>
  );
}
