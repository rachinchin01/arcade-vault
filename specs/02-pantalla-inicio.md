# SPEC 02 — Pantalla de inicio (Home)

> **Status:** Aprobado
> **Depends on:** SPEC 01
> **Date:** 2026-08-14
> **Objective:** Migrar la pantalla Home de `references/templates/home-about/home.jsx` a la ruta raíz `/` de Next.js, moviendo la Biblioteca actual a `/games` y actualizando el Nav y todos los enlaces internos en consecuencia.

---

## Scope

**In:**

- Nueva Home en `/`: hero (silhouettes pixel-art flotantes, eyebrow, título en 3 líneas con degradados, subtítulo, CTAs "Explorar juegos" y "Crear cuenta", indicador de scroll), sección "¿Por qué Arcade Vault?" (4 feature cards con icono pixel), sección "Juegos disponibles ahora" (preview de 6 juegos con `MiniCard` + botón "ver todos"), sección de stats (3 bloques con texto fijo), sección "Actividad en vivo" (ticker de últimas puntuaciones + top jugadores de hoy, ambos con datos de ejemplo hardcodeados) con link a Salón, sección de precios (price card + FAQ) y CTA final.
- Animación scroll-reveal (`IntersectionObserver`, hook `useReveal`) en las secciones del Home, igual que en el template.
- La Biblioteca actual (`app/page.tsx` de spec 01: hero, buscador, chips, grid de `GameCard`) se mueve tal cual a `app/games/page.tsx`, sin cambios funcionales.
- Actualización de `components/Nav.tsx`: nuevo link "Inicio" → `/`, el link "Biblioteca" pasa a apuntar a `/games` (y su estado activo se calcula sobre `/games` y `/juego/*`).
- Actualización de todos los botones "volver"/"salir" que hoy apuntan a `/` asumiendo la Biblioteca (Detalle, Auth, Salón, Reproductor) para que apunten a `/games`.
- Nuevo componente `components/MiniCard.tsx` (cover 1:1, título + categoría), usado solo en la Home.
- CSS de efectos del Home (silhouettes flotantes, scroll bounce, reveal, ticker) portado a `app/globals.css`; el resto del layout/spacing/tipografía se hace con utilidades Tailwind, siguiendo el mismo criterio que spec 01.

**Out of scope (para specs futuros):**

- Pantalla About/Contacto (`about.jsx` del mismo template).
- Backend/API, autenticación real, persistencia de usuario o puntuaciones (igual que spec 01).
- Derivar los números de stats/ticker/top-jugadores desde `lib/data.ts` o desde datos reales — quedan hardcodeados como en el template.
- Sistema de créditos real.
- Tests automatizados.

---

## Data model

No se introducen tipos nuevos. La sección "Juegos disponibles ahora" reutiliza `Game` y `GAMES` de `lib/data.ts` (primeros 6 elementos). Los datos de stats, ticker de puntuaciones y top jugadores de hoy quedan como arrays locales hardcodeados dentro de `app/page.tsx` (Home), portados 1:1 desde `home.jsx`, sin pasar por `lib/data.ts`.

---

## Implementation plan

1. Mover el contenido actual de `app/page.tsx` (Biblioteca) a `app/games/page.tsx` sin cambios funcionales. Verificación: `/games` muestra la Biblioteca con buscador y chips funcionando igual que antes en `/`.
2. Actualizar los enlaces internos que hoy apuntan a `/` asumiendo la Biblioteca, para que apunten a `/games`: botón "volver" en `app/juego/[id]/page.tsx`, botón "volver" en `app/auth/page.tsx`, botón "volver a la biblioteca" en `app/salon/page.tsx`, botón "salir" en `components/GamePlayer.tsx`. Verificación: cada botón navega a `/games`.
3. Agregar a `app/globals.css` los keyframes y clases de efectos del Home aún no portados: `.home-silos`/`.silo` + `@keyframes float`, `.hero-scroll .arrow` + `@keyframes bounce`, `.reveal`/`.reveal.in`, `.tick-row` + `@keyframes tickin` (reutilizando `@keyframes rise` ya existente donde aplique). Verificación: clases disponibles sin colisión de nombres con lo ya portado en spec 01.
4. Crear `components/MiniCard.tsx` (cover cuadrado 1:1, título + categoría) para la sección "Juegos disponibles ahora", tipado con `Game` de `lib/data.ts`.
5. Implementar en `app/page.tsx` el hero de la nueva Home: silhouettes pixel-art flotantes (SVGs inline), eyebrow, título en 3 líneas con degradados, subtítulo, CTAs "Explorar juegos" (`/games`) y "Crear cuenta" (`/auth`) con `components/Button.tsx`, indicador de scroll. Verificación: `/` muestra el hero completo con la animación de flotado de los silhouettes.
6. Agregar la sección "¿Por qué Arcade Vault?" (4 feature cards con icono pixel inline y texto fijo del template) con el hook `useReveal` (`IntersectionObserver`) para el fade-in al hacer scroll. Verificación: las tarjetas aparecen con la animación al entrar en viewport.
7. Agregar la sección "Juegos disponibles ahora": grid de 6 `MiniCard` (primeros 6 de `GAMES`) enlazando a `/juego/[id]`, botón "Ver todos los juegos" → `/games`. Verificación: click en una mini-card navega al detalle correcto del juego.
8. Agregar la sección de stats (3 bloques con texto fijo del template) y la sección "Actividad en vivo" (ticker de últimas puntuaciones + top jugadores de hoy, datos de ejemplo hardcodeados del template) con botón "Ver salón" → `/salon`. Verificación: ambas secciones muestran los datos de ejemplo y el link a Salón funciona.
9. Agregar la sección de precios (price card "Jugador Vault" gratis + FAQ, todo texto fijo) y la sección final CTA ("¿Listo para jugar?" → `/games`). Verificación: ambos botones de esta sección navegan a `/games`.
10. Actualizar `components/Nav.tsx`: agregar link "Inicio" → `/`, cambiar el link "Biblioteca" para que apunte a `/games`, y recalcular el estado activo (`Inicio` activo solo en `/`; `Biblioteca` activo en `/games` y en `/juego/*`). Verificación: el resaltado del Nav es correcto en cada ruta.
11. Revisión visual final de `/` comparando contra `references/templates/home-about/home.jsx` y `styles.css`, y verificación de que `/games`, `/juego/[id]`, `/salon`, `/auth` y el Reproductor siguen funcionando igual que antes con los enlaces actualizados a `/games`.

---

## Acceptance criteria

- [ ] `npm run dev` levanta sin errores en consola.
- [ ] `npm run build` compila sin errores.
- [ ] `npm run lint` pasa sin errores.
- [ ] `/` muestra la nueva Home completa: hero, "¿Por qué Arcade Vault?", "Juegos disponibles ahora", stats, "Actividad en vivo", precios y CTA final.
- [ ] `/games` muestra la Biblioteca (buscador + chips) igual que antes en spec 01.
- [ ] Botones "Explorar juegos" (hero) y "Ver todos los juegos" navegan a `/games`.
- [ ] Botón "Crear cuenta" del hero navega a `/auth`.
- [ ] Click en una `MiniCard` de "Juegos disponibles ahora" navega a `/juego/[id]` del juego correspondiente.
- [ ] Botón "Ver salón" navega a `/salon`.
- [ ] Botón final "Insertar moneda" navega a `/games`.
- [ ] El Nav muestra "Inicio" activo en `/`, y "Biblioteca" activo en `/games` y en `/juego/[id]`.
- [ ] Los botones "volver"/"salir" en Detalle, Auth, Salón y Reproductor navegan a `/games` (ya no a la ruta `/` original).
- [ ] Las secciones con scroll-reveal del Home (why, mini-rail, stats, actividad, precios, final) aparecen con la animación de fade al entrar en el viewport.

---

## Decisions taken and discarded

- **Sí:** Home pasa a ser `/`, la Biblioteca se mueve a `/games`. Razón: decisión explícita del usuario; coincide con el patrón landing + catálogo separado del template (Inicio distinto de Biblioteca en el Nav).
- **Sí:** este spec cubre solo Home; About/Contacto (`about.jsx`) queda fuera. Razón: decisión explícita del usuario — About amerita su propio spec.
- **Sí:** layout/spacing/tipografía de la Home con utilidades Tailwind; solo keyframes y efectos puros (silhouettes flotantes, bounce, reveal, ticker) van a `app/globals.css`. Razón: mismo criterio ya establecido en spec 01 y aplicado en `app/page.tsx` (Biblioteca), `Nav.tsx` y `GameCard.tsx`.
- **Sí:** nuevo componente `MiniCard.tsx` en vez de reutilizar `GameCard.tsx`. Razón: decisión explícita del usuario — cover 1:1 y menos información, visualmente distinto de la card de la Biblioteca.
- **Sí:** datos de stats, ticker de puntuaciones y top jugadores de hoy hardcodeados directo en la Home, sin pasar por `lib/data.ts`. Razón: decisión explícita del usuario; el template tampoco los deriva de `GAMES`/`PLAYERS` de forma determinista.
- **No:** sin persistencia ni lógica real detrás de estos números — siguen siendo mock visual, igual que spec 01.

---

## Identified risks

- **Enlaces rotos por el cambio de ruta de la Biblioteca.** Al mover la Biblioteca de `/` a `/games`, cualquier botón/link que asumiera que "volver" es `/` queda apuntando al lugar equivocado (a la nueva Home en vez de a la Biblioteca). Mitigación: el paso 2 del plan lista explícitamente los 4 puntos ya identificados (`app/juego/[id]/page.tsx`, `app/auth/page.tsx`, `app/salon/page.tsx`, `components/GamePlayer.tsx`) que hoy usan `href="/"` con esa semántica.

---

## What is **not** in this spec

- Pantalla About/Contacto.
- Backend, API o autenticación real.
- Persistencia de usuario o de puntuaciones.
- Datos de stats/ticker/top-jugadores derivados de `lib/data.ts` o de datos reales.
- Sistema de créditos real.
- Tests automatizados.

Cada uno de estos, si se implementa, va en su propio spec.
