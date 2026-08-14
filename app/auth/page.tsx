"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function AuthPage() {
  const [tab, setTab] = useState<"in" | "up">("in");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center px-5 py-15">
      <div className="relative w-[min(440px,100%)] border border-[var(--line)] bg-[var(--bg-2)] p-7 shadow-[0_0_30px_rgba(0,245,255,0.18)]">
        <span className="pointer-events-none absolute inset-1 border border-dashed border-[rgba(0,245,255,0.18)]" />

        <div className="mb-4.5 text-center">
          <div className="mx-auto mb-3 h-14 w-14 border border-white/[0.18] shadow-[0_0_16px_rgba(0,245,255,0.55),inset_0_0_8px_rgba(255,0,110,0.5)] [background-blend-mode:screen] [background:linear-gradient(45deg,var(--magenta)_0_50%,transparent_50%),linear-gradient(-45deg,var(--cyan)_0_50%,transparent_50%)]" />
          <h2 className="neon-cyan pixel m-0 mt-1 text-[16px] tracking-[0.1em]">ARCADE VAULT</h2>
          <div className="mono mt-1.5 text-[11px] tracking-[0.16em] text-[var(--ink-faint)]">
            ACCESO AL SISTEMA · v2.6
          </div>
        </div>

        <div className="my-4.5 grid grid-cols-2 border border-[var(--line)]">
          <button
            type="button"
            onClick={() => setTab("in")}
            className={`pixel px-3 py-3 text-[9px] tracking-[0.14em] ${
              tab === "in"
                ? "bg-[rgba(0,245,255,0.08)] text-[var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.5)]"
                : "text-[var(--ink-dim)]"
            }`}
          >
            INICIAR SESIÓN
          </button>
          <button
            type="button"
            onClick={() => setTab("up")}
            className={`pixel px-3 py-3 text-[9px] tracking-[0.14em] ${
              tab === "up"
                ? "bg-[rgba(0,245,255,0.08)] text-[var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.5)]"
                : "text-[var(--ink-dim)]"
            }`}
          >
            CREAR CUENTA
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="mb-3 flex flex-col gap-1.5">
            <label className="mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
              Usuario
            </label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="px_kai"
              className="mono h-11 border border-[var(--line)] bg-[var(--bg)] px-3 text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--cyan)] focus:shadow-[0_0_12px_rgba(0,245,255,0.35)]"
            />
          </div>

          {tab === "up" && (
            <div className="slide-in mb-3 flex flex-col gap-1.5">
              <label className="mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jugador@vault.gg"
                className="mono h-11 border border-[var(--line)] bg-[var(--bg)] px-3 text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--cyan)] focus:shadow-[0_0_12px_rgba(0,245,255,0.35)]"
              />
            </div>
          )}

          <div className="mb-3 flex flex-col gap-1.5">
            <label className="mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
              Contraseña
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className="mono h-11 border border-[var(--line)] bg-[var(--bg)] px-3 text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--cyan)] focus:shadow-[0_0_12px_rgba(0,245,255,0.35)]"
            />
          </div>

          <Button type="submit" size="lg" className="mt-2 w-full">
            {tab === "in" ? "ENTRAR AL VAULT" : "CREAR Y JUGAR"}
          </Button>
        </form>

        <Button href="/games" variant="ghost" className="mt-2.5 w-full">
          JUGAR COMO INVITADO
        </Button>

        <div className="pixel my-4 flex items-center gap-3 text-[8px] tracking-[0.16em] text-[var(--ink-faint)]">
          <span className="h-px flex-1 bg-[var(--line)]" />
          O CONTINÚA CON
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="ghost" size="sm" className="w-full">
            ◆ GOOGLE
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            ▣ GITHUB
          </Button>
        </div>

        <div className="mt-4.5 text-center text-[11px] tracking-[0.1em] text-[var(--ink-faint)]">
          AL ENTRAR ACEPTAS LOS TÉRMINOS DEL SALÓN ARCADE
        </div>
      </div>
    </div>
  );
}
