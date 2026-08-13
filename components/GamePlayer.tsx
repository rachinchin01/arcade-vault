"use client";

import { useState } from "react";
import Button from "@/components/Button";
import type { Game } from "@/lib/data";

const HUD = {
  player: "INVITADO",
  score: 48920,
  lives: 3,
  level: 4,
};

export default function GamePlayer({ game }: { game: Game }) {
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [saved, setSaved] = useState(false);
  const [initials, setInitials] = useState(HUD.player);

  const closeModal = () => {
    setOver(false);
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-8 pb-16 max-[720px]:px-4">
      <div className="mb-4.5 flex flex-wrap items-center justify-between gap-4 border border-[var(--line)] bg-[var(--bg-2)] px-4.5 py-3.5">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-1">
            <div className="mono text-[10px] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
              Jugador
            </div>
            <div className="pixel text-[16px] text-[var(--ink)]">{HUD.player}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="mono text-[10px] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
              Puntuación
            </div>
            <div className="pixel text-[16px] text-[var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.5)]">
              {HUD.score.toLocaleString("es-ES")}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="mono text-[10px] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
              Vidas
            </div>
            <div className="pixel text-[16px] text-[var(--magenta)] [text-shadow:0_0_6px_rgba(255,0,110,0.5)]">
              {"♥ ".repeat(HUD.lives).trim()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="mono text-[10px] tracking-[0.14em] text-[var(--ink-faint)] uppercase">
              Nivel
            </div>
            <div className="pixel text-[16px] text-[var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.5)]">
              {String(HUD.level).padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Button variant="yellow" onClick={() => setPaused((p) => !p)}>
            {paused ? "REANUDAR" : "PAUSA"}
          </Button>
          <Button variant="magenta" onClick={() => setOver(true)}>
            FIN
          </Button>
          <Button href={`/juego/${game.id}`} variant="ghost">
            SALIR
          </Button>
        </div>
      </div>

      <div className="crt">
        <div className="crt-screen">
          <div className="game-arena">
            <div className="grid-floor" />
            <div className="enemy e1" />
            <div className="enemy e2" />
            <div className="enemy e3" />
            <div className="player-ship" />
          </div>
          {paused && (
            <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/60">
              <div className="text-center">
                <div className="pixel neon-yellow text-[22px]">EN PAUSA</div>
                <div className="mono mt-2.5 text-[11px] tracking-[0.16em] text-[var(--ink-dim)]">
                  PULSA REANUDAR PARA CONTINUAR
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="crt-bottom">
          <span className="led">SEÑAL OK</span>
          <span>
            {game.title} · CRT-83 · 60 HZ
          </span>
          <span>CARGA · 1MB</span>
        </div>
      </div>

      {over && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5">
          <div className="relative w-[min(480px,96vw)] border border-[var(--magenta)] bg-[var(--bg-2)] p-8 text-center shadow-[0_0_30px_rgba(255,0,110,0.4),inset_0_0_16px_rgba(255,0,110,0.18)]">
            <span className="pointer-events-none absolute inset-1 border border-dashed border-[rgba(255,0,110,0.4)]" />
            <h2 className="pixel m-0 mb-4.5 text-[22px] tracking-[0.12em] text-[var(--magenta)] [text-shadow:0_0_12px_rgba(255,0,110,0.7)]">
              FIN DEL JUEGO
            </h2>
            <div className="mono text-[11px] tracking-[0.2em] text-[var(--ink-faint)] uppercase">
              PUNTUACIÓN FINAL
            </div>
            <div className="pixel mt-4 mb-1.5 text-[36px] text-[var(--yellow)] [text-shadow:0_0_16px_rgba(245,255,0,0.6)]">
              {HUD.score.toLocaleString("es-ES")}
            </div>

            {!saved ? (
              <div className="mt-5.5 mb-3 flex gap-2">
                <input
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 10))}
                  placeholder="TUS INICIALES"
                  className="mono h-11 flex-1 border border-[var(--line)] bg-[var(--bg)] px-3 text-[var(--ink)] outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_10px_rgba(0,245,255,0.35)]"
                />
                <Button variant="yellow" onClick={() => setSaved(true)}>
                  GUARDAR PUNTUACIÓN
                </Button>
              </div>
            ) : (
              <div className="pixel mt-3.5 text-[11px] text-[var(--green)] [text-shadow:0_0_8px_var(--green)]">
                ▸ PUNTUACIÓN GUARDADA_
              </div>
            )}

            <div className="mt-4.5 flex flex-wrap justify-center gap-2.5">
              <Button onClick={closeModal}>JUGAR DE NUEVO</Button>
              <Button href="/" variant="magenta">
                VOLVER AL VAULT
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
