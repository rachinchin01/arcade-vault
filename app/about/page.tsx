"use client";

import { useEffect, useState, useTransition } from "react";
import Button from "@/components/Button";
import { sendContactMessage } from "./actions";

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

const HIGHLIGHT_COLOR: Record<string, string> = {
  magenta: "text-[var(--magenta)]",
  cyan: "text-[var(--cyan)]",
  green: "text-[var(--green)]",
};

const HIGHLIGHTS = [
  { i: "HEART", t: "HECHO CON ❤️ PARA JUGADORES", c: "magenta" },
  { i: "BROWSER", t: "JUEGOS EN HTML — CORREN EN CUALQUIER NAVEGADOR", c: "cyan" },
  { i: "PLANT", t: "PROYECTO EN CONSTANTE CRECIMIENTO", c: "green" },
] as const;

function HighlightIcon({ kind }: { kind: string }) {
  const C = "currentColor";
  if (kind === "HEART")
    return (
      <svg className="h-9 w-9 [image-rendering:pixelated] [filter:drop-shadow(0_0_6px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="2" y="3" width="4" height="2" />
          <rect x="10" y="3" width="4" height="2" />
          <rect x="1" y="4" width="2" height="4" />
          <rect x="13" y="4" width="2" height="4" />
          <rect x="2" y="8" width="2" height="2" />
          <rect x="12" y="8" width="2" height="2" />
          <rect x="3" y="9" width="10" height="2" />
          <rect x="4" y="11" width="8" height="2" />
          <rect x="5" y="12" width="6" height="2" />
          <rect x="6" y="13" width="4" height="1" />
          <rect x="7" y="14" width="2" height="1" />
        </g>
      </svg>
    );
  if (kind === "BROWSER")
    return (
      <svg className="h-9 w-9 [image-rendering:pixelated] [filter:drop-shadow(0_0_6px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="1" y="2" width="14" height="12" fill="none" stroke={C} strokeWidth="1.4" />
          <rect x="1" y="2" width="14" height="3" />
          <rect x="3" y="3" width="1" height="1" fill="var(--bg)" />
          <rect x="5" y="3" width="1" height="1" fill="var(--bg)" />
          <rect x="7" y="3" width="1" height="1" fill="var(--bg)" />
          <rect x="3" y="7" width="4" height="1" />
          <rect x="3" y="9" width="6" height="1" />
          <rect x="3" y="11" width="3" height="1" />
        </g>
      </svg>
    );
  if (kind === "PLANT")
    return (
      <svg className="h-9 w-9 [image-rendering:pixelated] [filter:drop-shadow(0_0_6px_currentColor)]" viewBox="0 0 16 16">
        <g fill={C}>
          <rect x="7" y="2" width="2" height="10" />
          <rect x="4" y="4" width="3" height="2" />
          <rect x="9" y="6" width="3" height="2" />
          <rect x="3" y="3" width="2" height="2" />
          <rect x="11" y="5" width="2" height="2" />
          <rect x="3" y="12" width="10" height="2" />
          <rect x="4" y="14" width="8" height="1" />
        </g>
      </svg>
    );
  return null;
}

const TIPS = [
  { t: "RESPUESTA EN 24-48H", led: "bg-[var(--green)] shadow-[0_0_6px_var(--green)]" },
  { t: "SUGERENCIAS BIENVENIDAS", led: "bg-[var(--yellow)] shadow-[0_0_6px_var(--yellow)]" },
  { t: "SIN SPAM, JAMÁS", led: "bg-[var(--magenta)] shadow-[0_0_6px_var(--magenta)]" },
] as const;

export default function AboutPage() {
  useReveal();

  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    startTransition(async () => {
      const result = await sendContactMessage(
        form.name.trim(),
        form.email.trim(),
        form.msg.trim(),
      );
      if (result.ok) {
        setStatus("success");
      } else {
        setErrorMsg(result.error);
        setStatus("error");
      }
    });
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMsg(null);
    setForm({ name: "", email: "", msg: "" });
  };

  return (
    <div className="relative">
      {/* ABOUT */}
      <section className="mx-auto max-w-[1100px] px-8 pt-20 pb-10 text-center max-[720px]:px-4">
        <div className="pixel neon-yellow mb-4.5 text-[11px] tracking-[0.24em]">
          ▸ ACERCA DE
        </div>
        <h1 className="pixel m-0 bg-[linear-gradient(180deg,#fff,var(--cyan)_80%)] bg-clip-text text-[clamp(26px,5vw,52px)] tracking-[0.06em] text-transparent [filter:drop-shadow(0_0_14px_rgba(0,245,255,0.4))]">
          ACERCA DE ARCADE VAULT
        </h1>
        <p className="mx-auto mt-7 max-w-[720px] text-[15px] leading-[1.8] tracking-[0.03em] text-[var(--ink-dim)]">
          ARCADE VAULT nació del amor por los videojuegos clásicos. Nuestra misión es preservar y
          celebrar los arcades que definieron una generación, haciéndolos accesibles para todos,
          en cualquier lugar y sin costo.
        </p>

        <div className="mt-13 grid grid-cols-3 gap-4.5 max-[820px]:grid-cols-1">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.t}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`flex items-center gap-4 border border-[var(--line)] bg-[var(--bg-2)] px-5 py-4.5 text-left transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-current hover:shadow-[0_12px_28px_-14px_currentColor] ${HIGHLIGHT_COLOR[h.c]}`}
            >
              <HighlightIcon kind={h.i} />
              <div className="pixel text-[10px] leading-[1.5] tracking-[0.1em] text-[var(--ink)]">
                {h.t}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* divisor decorativo */}
      <div
        aria-hidden="true"
        className="reveal about-divider mx-auto flex max-w-[1200px] items-center gap-4 px-8 py-15 max-[720px]:px-4"
      >
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--magenta),transparent)]" />
        <div className="div-pixels flex gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--magenta),transparent)]" />
      </div>

      {/* CONTACTO */}
      <section className="reveal mx-auto max-w-[1200px] px-8 pb-20 max-[720px]:px-4">
        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6">
          <div>
            <div className="pixel neon-cyan mb-3.5 text-[11px] tracking-[0.24em]">
              ▸ CONTACTO
            </div>
            <h2 className="pixel m-0 text-[clamp(22px,3.5vw,36px)] tracking-[0.06em] text-[var(--cyan)] [text-shadow:0_0_12px_rgba(0,245,255,0.4)]">
              CONTÁCTANOS
            </h2>
            <p className="my-4.5 text-[14px] leading-[1.7] text-[var(--ink-dim)]">
              ¿Tienes alguna sugerencia, quieres proponer un juego, o simplemente quieres
              saludar? Escríbenos.
            </p>
            <div className="flex flex-col gap-2.5">
              {TIPS.map((tip) => (
                <div
                  key={tip.t}
                  className="pixel flex items-center gap-2.5 text-[9px] tracking-[0.14em] text-[var(--ink-dim)]"
                >
                  <span className={`h-2 w-2 rounded-full ${tip.led}`} />
                  {tip.t}
                </div>
              ))}
            </div>
          </div>

          {status === "idle" ? (
            <form
              onSubmit={onSubmit}
              className={`relative border border-[var(--line)] bg-[var(--bg-2)] p-7 before:pointer-events-none before:absolute before:inset-1 before:border before:border-dashed before:border-[rgba(0,245,255,0.15)] ${
                shake ? "shake" : ""
              }`}
            >
              <div className="mb-3 flex flex-col gap-1.5">
                <label className="mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
                  Nombre
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="px_kai"
                  className="mono h-11 border border-[var(--line)] bg-[var(--bg)] px-3 text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--cyan)] focus:shadow-[0_0_12px_rgba(0,245,255,0.35)]"
                />
              </div>
              <div className="mb-3 flex flex-col gap-1.5">
                <label className="mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jugador@vault.gg"
                  className="mono h-11 border border-[var(--line)] bg-[var(--bg)] px-3 text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--cyan)] focus:shadow-[0_0_12px_rgba(0,245,255,0.35)]"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1.5">
                <label className="mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
                  Mensaje
                </label>
                <textarea
                  rows={5}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder="Cuéntanos qué tienes en mente…"
                  className="mono resize-y border border-[var(--line)] bg-[var(--bg)] p-3 text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--cyan)] focus:shadow-[0_0_12px_rgba(0,245,255,0.35)]"
                />
              </div>
              <Button type="submit" size="xl" className="w-full">
                {pending ? "▶ ENVIANDO…" : "▶ ENVIAR MENSAJE"}
              </Button>
            </form>
          ) : status === "success" ? (
            <div className="overflow-hidden border border-[var(--green)] bg-black font-[var(--mono)] shadow-[0_0_22px_rgba(0,255,136,0.25)]">
              <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--bg)] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="pixel ml-2 text-[9px] tracking-[0.14em] text-[var(--ink-faint)]">
                  VAULT-OS // TERMINAL
                </span>
              </div>
              <div className="p-4.5 pb-5.5 text-[13px] leading-[1.8]">
                <div className="text-[var(--green)]">
                  <span className="mr-2 text-[var(--cyan)]">vault@arcade:~$</span>
                  ./send_message --to=team
                </div>
                <div className="text-[var(--ink-dim)]">[OK] Conectando con servidor…</div>
                <div className="text-[var(--ink-dim)]">[OK] Validando contenido…</div>
                <div className="text-[var(--ink-dim)]">[OK] Transmitiendo paquete…</div>
                <div className="mt-3 font-bold whitespace-pre-wrap text-[var(--green)] [text-shadow:0_0_6px_rgba(0,255,136,0.45)]">
                  &gt; MENSAJE RECIBIDO. TE RESPONDEREMOS PRONTO. GRACIAS, {form.name.toUpperCase()}.
                  <span className="animate-pulse">_</span>
                </div>
                <div className="mt-4.5">
                  <Button type="button" variant="ghost" onClick={resetForm}>
                    ENVIAR OTRO MENSAJE
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden border border-[var(--magenta)] bg-black font-[var(--mono)] shadow-[0_0_22px_rgba(255,0,110,0.25)]">
              <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--bg)] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="pixel ml-2 text-[9px] tracking-[0.14em] text-[var(--ink-faint)]">
                  VAULT-OS // TERMINAL
                </span>
              </div>
              <div className="p-4.5 pb-5.5 text-[13px] leading-[1.8]">
                <div className="text-[var(--green)]">
                  <span className="mr-2 text-[var(--cyan)]">vault@arcade:~$</span>
                  ./send_message --to=team
                </div>
                <div className="text-[var(--ink-dim)]">[OK] Conectando con servidor…</div>
                <div className="text-[var(--magenta)]">[ERROR] Transmisión fallida.</div>
                <div className="mt-3 font-bold whitespace-pre-wrap text-[var(--magenta)] [text-shadow:0_0_6px_rgba(255,0,110,0.45)]">
                  &gt; {errorMsg ?? "No se pudo enviar el mensaje."}
                  <span className="animate-pulse">_</span>
                </div>
                <div className="mt-4.5">
                  <Button type="button" variant="ghost" onClick={() => setStatus("idle")}>
                    REINTENTAR
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
