# SPEC 01 — Pantallas visuales del MVP (Biblioteca, Detalle, Reproductor, Salón de la Fama, Auth)

> **Status:** Aprobado
> **Depends on:** —
> **Date:** 2026-08-13
> **Objective:** Migrar las 5 pantallas de `references/templates/` (prototipo HTML/React suelto) a rutas reales de Next.js App Router con Tailwind v4, solo la parte visual, sin lógica de juego ni backend real.

---

## Scope

**In:**

- 5 pantallas: Biblioteca (`/`), Detalle de juego (`/juego/[id]`), Reproductor (`/juego/[id]/jugar`), Salón de la Fama (`/salon`), Auth (`/auth`).
- Nav (barra superior + panel móvil) y footer, montados en `app/layout.tsx`, presentes en las 5 rutas.
- Tema visual completo del template (neón, grid en perspectiva, scanlines, efectos CRT, covers de juego, tipografías Press Start 2P / JetBrains Mono) migrado a `app/globals.css`.
- Datos mock estáticos (`GAMES`, `CATS`, `PLAYERS`, `seededScores`) portados a TypeScript.
- Interactividad de UI local sin persistencia: buscador y chips de categoría en Biblioteca, tabs en Auth y Salón de la Fama, menú móvil del Nav, toggle de pausa y modal de fin de juego en Reproductor.

**Out of scope (para specs futuras):**

- Juegos reales jugables (Bloque Buster, Caída, Serpentina, etc.) — solo existe la pantalla contenedora (Reproductor) con arena estática.
- Backend/API, autenticación real (sesiones, contraseñas, OAuth Google/GitHub).
- Persistencia de usuario o puntuaciones (nada de `localStorage` de sesión ni de scores).
- Sistema de créditos real (el contador "CRÉDITOS · 03" del Nav queda como texto fijo).
- Modo versus / multiplayer (Duelo Pixel u otros).
- Tests automatizados.

---

## Data model

```ts
// lib/data.ts
type Game = {
  id: string;
  title: string;
  short: string;
  long: string;
  cat: "ARCADE" | "PUZZLE" | "SHOOTER" | "VERSUS";
  cover: string; // clase CSS del cover, ej. "cover-bricks"
  color: "cyan" | "magenta" | "yellow" | "green";
  best: number;
  plays: string;
};

type ScoreRow = { rank: number; name: string; score: number; date: string };

const GAMES: Game[] = [/* portado 1:1 desde references/templates/data.jsx */];
const CATS: string[] = ["TODOS", "ARCADE", "PUZZLE", "SHOOTER", "VERSUS"];
const PLAYERS: string[] = [/* portado 1:1 */];
function seededScores(seed: number, count?: number): ScoreRow[] { /* portado 1:1 */ }
```

No hay persistencia: `seededScores` sigue siendo determinista por seed, generada en cada render, igual que en el template.

---

## Implementation plan

1. Migrar tema y efectos de `references/templates/styles.css` a `app/globals.css` (variables de color, fondo con grid/vignette, scanlines, efectos neón, keyframes, clases `cover-*`), y configurar las fuentes Press Start 2P y JetBrains Mono con `next/font/google` en `app/layout.tsx`. Verificación: `npm run dev` muestra fondo oscuro con grid y tipografía correcta en la página por defecto.
2. Crear `lib/data.ts` con los tipos `Game`/`ScoreRow` y los datos mock (`GAMES`, `CATS`, `PLAYERS`, `seededScores`) portados desde `data.jsx`.
3. Crear `components/Nav.tsx` (barra superior + panel móvil, siempre en estado deslogueado) y montarlo junto al footer en `app/layout.tsx`. Verificación: el Nav y el footer se ven en cualquier ruta.
4. Implementar `app/page.tsx` (Biblioteca): hero, buscador y chips de categoría con `useState`, grid de `GameCard` que enlaza a `/juego/[id]`.
5. Implementar `app/juego/[id]/page.tsx` (Detalle): info del juego, tags, stats, leaderboard con `seededScores`, botón a `/juego/[id]/jugar` y botón de volver.
6. Implementar `app/juego/[id]/jugar/page.tsx` (Reproductor): HUD estático (jugador, puntuación, vidas, nivel con valores de ejemplo fijos), arena CRT estática sin animación, botón PAUSA con toggle visual, botón FIN que abre el modal de fin de juego con puntaje de ejemplo fijo e input de iniciales decorativo, botón SALIR que vuelve a `/juego/[id]`.
7. Implementar `app/salon/page.tsx` (Salón de la Fama): tabs de juego con `useState`, podio top 3, tabla de posiciones con `seededScores`.
8. Implementar `app/auth/page.tsx` (Auth): tabs Iniciar sesión/Crear cuenta con `useState`, formulario decorativo (sin submit real ni guardado), botón "jugar como invitado" y botones sociales decorativos.
9. Revisión visual final comparando cada ruta contra `references/templates/Arcade Vault.html`, ajustando detalles de estilo que hayan quedado desalineados.

---

## Acceptance criteria

- [ ] `npm run dev` levanta sin errores en consola.
- [ ] `npm run build` compila sin errores.
- [ ] `npm run lint` pasa sin errores.
- [ ] `/` muestra la Biblioteca con hero, buscador que filtra por título y chips de categoría funcionales.
- [ ] Click en una tarjeta de juego navega a `/juego/[id]`.
- [ ] `/juego/[id]` muestra info del juego y tabla de mejores puntuaciones.
- [ ] Botón "JUGAR AHORA" en `/juego/[id]` navega a `/juego/[id]/jugar`.
- [ ] `/juego/[id]/jugar` muestra el HUD con valores estáticos que no cambian solos.
- [ ] Botón FIN en el Reproductor abre el modal de fin de juego con puntaje de ejemplo.
- [ ] Botón SALIR en el Reproductor vuelve a `/juego/[id]`.
- [ ] `/salon` muestra podio top 3 y tabla de posiciones, y cambia de juego al hacer click en las tabs.
- [ ] `/auth` muestra el formulario con tabs Iniciar sesión/Crear cuenta que cambian el campo de correo visible.
- [ ] El Nav está presente en las 5 rutas y siempre muestra "Iniciar Sesión" (nunca estado logueado).
- [ ] El menú móvil del Nav abre y cierra correctamente en viewport angosto.

---

## Decisions

- **Sí:** rutas reales de Next.js App Router (`/`, `/juego/[id]`, `/juego/[id]/jugar`, `/salon`, `/auth`) en vez del router por hash del template. Razón: idiomático para App Router, permite deep-linking y es la base para specs futuras.
- **Sí:** nombres de ruta en español, coherentes con el copy de la UI.
- **Sí:** tema base y efectos (colores, grid, scanlines, CRT, keyframes, `cover-*`) migrados a `app/globals.css`; todo el layout/spacing/tipografía de las pantallas nuevas se hace con utilidades Tailwind en vez de más clases CSS custom. Razón: el CSS del template no es trivial de replicar 1:1 en utilidades, pero no tiene sentido seguir escribiendo CSS custom para lo nuevo.
- **Sí:** mantener estado local de UI (buscador, chips, tabs, menú móvil, modal de fin de juego) con `useState`. Razón: necesario para poder ver y demostrar cada pantalla en sus distintos estados.
- **No:** persistencia real (`localStorage` de usuario o de puntuaciones) ni temporizador falso que sube el puntaje solo. Razón: MVP puramente visual, sin lógica de juego ni de sesión.
- **Sí:** Nav siempre en estado deslogueado ("Iniciar Sesión"). Razón: no hay autenticación real en este MVP.
- **Sí:** fuentes Press Start 2P y JetBrains Mono cargadas con `next/font/google` (en vez del `<link>` a Google Fonts del template). Razón: evita depender del CDN de Google Fonts en runtime y es consistente con el uso de `next/font` ya presente en el scaffold (Geist).
- **No:** Courier Prime (fallback mono del template) no se agrega como fuente propia; el fallback del navegador es suficiente. Razón: simplifica, se usaba solo como último fallback en la cadena de `--mono`.

---

## What is **not** in this spec

- Juegos reales jugables.
- Backend, API o autenticación real.
- Persistencia de usuario o de puntuaciones.
- Sistema de créditos real.
- Modo versus / multiplayer.
- Tests automatizados.

Cada uno de estos, si se implementa, va en su propio spec.
