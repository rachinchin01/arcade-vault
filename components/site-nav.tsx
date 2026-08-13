"use client";

import { useState } from "react";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="av-nav">
        <div className="logo">
          <div className="logo-mark" />
          <div className="logo-text neon-cyan">
            ARCADE <span className="neon-magenta">VAULT</span>
          </div>
        </div>

        <div className="links">
          <a className="active" aria-current="page">
            Biblioteca
          </a>
          <a aria-disabled="true" style={{ pointerEvents: "none", opacity: 0.5 }}>
            Salón de la Fama · pronto
          </a>
        </div>

        <div className="spacer" />

        <div className="coin-counter">
          <span className="coin" />
          <span>CRÉDITOS · 03</span>
        </div>

        <button
          type="button"
          className="btn ghost auth-btn"
          disabled
          title="Disponible próximamente"
          style={{ cursor: "not-allowed", opacity: 0.6 }}
        >
          Pronto
        </button>

        <button
          type="button"
          className="btn ghost hamburger"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          ≡
        </button>
      </nav>

      <div
        className={`av-mobile-backdrop${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`av-mobile-panel${open ? " open" : ""}`}>
        <div className="pixel neon-cyan" style={{ fontSize: 11, marginBottom: 16 }}>
          MENÚ
        </div>
        <a className="active" onClick={() => setOpen(false)}>
          Biblioteca
        </a>
        <a aria-disabled="true" style={{ pointerEvents: "none", opacity: 0.5 }}>
          Salón de la Fama · pronto
        </a>
        <a aria-disabled="true" style={{ pointerEvents: "none", opacity: 0.5 }}>
          Iniciar Sesión · pronto
        </a>
        <div style={{ flex: 1 }} />
        <div
          className="pixel"
          style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}
        >
          CRÉDITOS · 03
        </div>
      </aside>
    </>
  );
}
