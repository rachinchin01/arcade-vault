# CLAUDE.md

Este archivo da guía a Claude Code (claude.ai/code) al trabajar con código en este repositorio.

@AGENTS.md

**Nota de idioma:** toda comunicación en este proyecto (respuestas de chat y documentación como este archivo) debe ser en español. Mantener términos técnicos, código, nombres de API/CLI y mensajes de error exactos sin traducir.

## Proyecto

Arcade Vault — plataforma para jugar online y competir por la mayor cantidad de puntos (ver README.md). Actualmente es un scaffold recién creado con `create-next-app`, sin funcionalidades de juego implementadas todavía.

## Comandos

```bash
npm run dev      # levanta el servidor de desarrollo (Next.js, Turbopack)
npm run build    # build de producción
npm run start    # corre el build de producción
npm run lint     # eslint (flat config, eslint-config-next)
```

No hay test runner configurado todavía.

## Skills
Usa siempre /frontend-design para diseñar la intefaz de usuario. 

## Arquitectura

- Next.js App Router, TypeScript, React 19. Las rutas/páginas viven bajo `app/`.
- Estilos con Tailwind CSS v4 vía `@tailwindcss/postcss` (no hay `tailwind.config.*` — v4 es CSS-first, configurado en `app/globals.css`).
- Alias de path `@/*` apunta a la raíz del repo (`tsconfig.json`).
- `app/layout.tsx` carga las fuentes Geist y define el shell HTML raíz; `app/page.tsx` es la página de inicio por defecto.

## Convenciones de trabajo

- Este repo fija una versión de Next.js (16.3.0) más nueva que el conocimiento de entrenamiento del asistente — según AGENTS.md, consultar `node_modules/next/dist/docs/` (docs de App Router bajo `01-app/`, Pages Router bajo `02-pages/`) antes de escribir código de framework, en vez de confiar en conocimiento previo de Next.js.
- El bloque de breaking changes al inicio de AGENTS.md lo regenera `next dev` (ver `node_modules/next/dist/server/lib/generate-agent-files.js`). Dejarlo tal cual; commitearlo es lo esperado y mantiene el árbol de trabajo limpio.
- README.md menciona un flujo spec-driven (`/spec`, `/spec-impl`) del paquete de skills `Klerith/fernando-skills`. Ya está instalado (ver `skills-lock.json` y `.agents/skills/`): `/spec` guía la definición de una feature por fases (contexto → preguntas de clarificación → escritura → guardado en `specs/NN-slug.md`) sin escribir código; `/spec-impl` implementa un spec ya aprobado. Para features nuevas de tamaño medio/grande, usar este flujo en vez de improvisar directo en código.
- `references/templates/` contiene mockups JSX/HTML (no compilados, no forman parte del build de Next.js) que sirven de referencia de diseño/arquitectura para la futura implementación: pantallas `biblioteca` (catálogo), `detalle`, `player` (reproductor del juego), `auth` y `salon` (hall of fame), enrutadas por hash (`location.hash`) con sesión de usuario y puntajes persistidos en `localStorage` (`av_user`, `av_scores`). Útil como referencia de UX/flujo antes de escribir specs o código real, pero no es código productivo.
