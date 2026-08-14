# SPEC 03 — Pantalla About/Contacto con envío de correo (Resend)

> **Status:** Implementado
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-08-14
> **Objective:** Migrar la pantalla About/Contacto de `references/templates/home-about/about.jsx` a la ruta `/about` de Next.js, con el formulario de contacto enviando un correo real vía Resend.

---

## Scope

**In:**

- Nueva ruta `/about`: sección About (kicker, título, misión, 3 highlights con icono pixel) + sección Contacto (intro con tips, formulario nombre/correo/mensaje), portada 1:1 desde `about.jsx` con utilidades Tailwind, siguiendo el mismo criterio de spec 01/02 (solo keyframes/efectos puros van a `app/globals.css`, el resto es Tailwind).
- Divisor decorativo entre ambas secciones (`about-divider` del template: barra + pixels parpadeantes).
- Envío real del formulario de contacto vía Server Action (`app/about/actions.ts`) usando el SDK `resend`, con:
  - Remitente: `Arcade Vault <onboarding@resend.dev>` (dominio sandbox de Resend).
  - Destino: `jhelos@gmail.com`.
  - `replyTo`: el correo ingresado por el usuario en el formulario.
- Validación mínima en cliente (campos vacíos → shake, igual que el template) y en el Server Action (mismos 3 campos obligatorios).
- Dos estados de resultado distintos tras enviar: éxito (terminal `VAULT-OS // TERMINAL` igual al template) y error real (variante visual de error, no el terminal de éxito falso) si Resend falla o si falta `RESEND_API_KEY`.
- Actualización de `components/Nav.tsx`: nuevo link "Acerca de" → `/about` (desktop y panel móvil), con estado activo en `/about`.
- Variables de entorno documentadas (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`) leídas en el Server Action, con valores por defecto para `CONTACT_EMAIL_TO`/`CONTACT_EMAIL_FROM` iguales a los de este spec.

**Out of scope (para specs futuros):**

- Dominio propio verificado en Resend (se usa el dominio sandbox `onboarding@resend.dev` mientras no exista uno).
- Rate limiting / anti-spam / captcha en el formulario.
- Persistencia de los mensajes de contacto (no se guardan en ninguna base de datos).
- Envío de correo de confirmación al usuario que llena el formulario (solo se notifica al destino).
- Autenticación real, sistema de créditos real (igual que specs 01 y 02).
- Tests automatizados.

---

## Data model

No se introducen tipos persistidos. El Server Action expone un tipo de resultado:

```ts
// app/about/actions.ts
type ContactState = {
  ok: boolean;
  error: string | null;
};

function sendContactMessage(name: string, email: string, message: string): Promise<ContactState>;
```

El estado local del formulario en `app/about/page.tsx` sigue el mismo shape que el template (`{ name, email, msg }`), más un estado de resultado (`"idle" | "success" | "error"`) para decidir qué variante del panel mostrar tras el submit.

---

## Implementation plan

1. **(Ya hecho antes de este spec, se documenta como punto de partida)** `components/Nav.tsx`: agregado link "Acerca de" → `/about` en el nav de escritorio y en el panel móvil, con `isAboutActive = pathname === "/about"`. Verificación: el link aparece en ambos y se resalta en `/about`.
2. **(Ya hecho antes de este spec, se documenta como punto de partida)** `app/about/actions.ts`: Server Action `sendContactMessage` con el SDK `resend` (ya instalado en `package.json`), leyendo `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (default `jhelos@gmail.com`) y `CONTACT_EMAIL_FROM` (default `Arcade Vault <onboarding@resend.dev>`) desde variables de entorno. Revisar que valide los 3 campos y que devuelva `ContactState` distinguiendo el caso "falta `RESEND_API_KEY`" del caso "Resend respondió error".
3. Documentar las variables de entorno requeridas (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`) en un archivo `.env.local.example` en la raíz del repo (no committeado el `.env.local` real, ya cubierto por `.gitignore`). Verificación: el archivo existe y lista las 3 variables con valores de ejemplo/comentario.
4. Crear `app/about/page.tsx` (client component) con la sección About: kicker, título, párrafo de misión y los 3 highlights (`HEART`/`BROWSER`/`PLANT`) con sus iconos SVG pixel portados 1:1 desde `about.jsx`, con el hook `useReveal` (`IntersectionObserver`) ya usado en `app/page.tsx` (Home) para el fade-in. Verificación: `/about` muestra la sección About con el mismo copy que el template.
5. Agregar a `app/globals.css` las clases/keyframes puros del divisor y highlights que no sean triviales en Tailwind: `.about-divider .div-pixels span` + `@keyframes pxblink` (parpadeo), y el `@keyframes shake` del formulario. Verificación: clases disponibles sin colisión con lo ya portado en spec 01/02.
6. Agregar el divisor decorativo entre About y Contacto (barra + pixels parpadeantes) usando las clases del paso 5. Verificación: se ve el divisor con la animación de parpadeo.
7. Agregar la sección Contacto: intro (kicker, título, subtítulo, 3 tips con LED de color) y formulario (nombre, correo, mensaje) con `useState`, validación de campos vacíos con clase `shake` igual al template. Verificación: enviar el formulario vacío dispara el shake y no llama al Server Action.
8. Conectar el `onSubmit` del formulario a `sendContactMessage` (importado de `app/about/actions.ts`): al enviar con los 3 campos completos, mostrar un estado de carga breve, luego renderizar el terminal `VAULT-OS // TERMINAL` de éxito (igual al template, con el nombre del usuario) si `ok: true`, o un panel de error (mismo contenedor `terminal-success` pero con paleta de error y el mensaje de `ContactState.error`) si `ok: false`. Verificación: con `RESEND_API_KEY` válida se ve el terminal de éxito; sin la variable configurada se ve el panel de error con el mensaje correspondiente.
9. Revisión visual final de `/about` comparando contra `references/templates/home-about/about.jsx` y `styles.css`, y `npm run lint` / `npm run build` sin errores.

---

## Acceptance criteria

- [ ] `npm run dev` levanta sin errores en consola.
- [ ] `npm run build` compila sin errores.
- [ ] `npm run lint` pasa sin errores.
- [ ] `/about` muestra la sección About completa (kicker, título, misión, 3 highlights) y la sección Contacto (intro + tips + formulario).
- [ ] El Nav muestra "Acerca de" en escritorio y en el panel móvil, y se resalta como activo en `/about`.
- [ ] Enviar el formulario con algún campo vacío dispara el shake y no envía ningún correo.
- [ ] Enviar el formulario completo con `RESEND_API_KEY` configurada envía el correo a `jhelos@gmail.com` (remitente `Arcade Vault <onboarding@resend.dev>`, `replyTo` = correo del formulario) y muestra el terminal de éxito con el nombre ingresado.
- [ ] Enviar el formulario completo sin `RESEND_API_KEY` configurada (o si Resend responde error) muestra un panel de error distinto del terminal de éxito, sin afirmar falsamente que el mensaje se envió.
- [ ] Botón "Enviar otro mensaje" (estado de éxito) resetea el formulario a campos vacíos.
- [ ] `.env.local.example` existe en la raíz y documenta `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`.

---

## Decisions

- **Sí:** remitente `Arcade Vault <onboarding@resend.dev>` (dominio sandbox de Resend). Razón: decisión explícita del usuario tras aclarar que Resend no permite enviar desde un dominio `gmail.com` sin verificar; no hay dominio propio disponible todavía.
- **Sí:** `jhelos@gmail.com` como destino (`to`) de los mensajes del formulario, no como remitente. Razón: confirmado explícitamente por el usuario.
- **Sí:** el correo del visitante se usa como `replyTo`, no como `from`. Razón: permite responder directo al visitante sin necesitar verificar su dominio en Resend.
- **Sí:** mostrar un estado de error real y distinto del terminal de éxito cuando el envío falla. Razón: decisión explícita del usuario — evitar que el visitante crea que su mensaje llegó cuando en realidad falló.
- **Sí:** se mantiene el código ya escrito antes de este spec (`components/Nav.tsx` con el link "Acerca de", `app/about/actions.ts` con el Server Action) como punto de partida documentado en el plan, en vez de revertirlo. Razón: decisión explícita del usuario.
- **Sí:** `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` como variables de entorno (no hardcodeadas), con defaults sensatos en el código para `CONTACT_EMAIL_TO`/`CONTACT_EMAIL_FROM`. Razón: la API key es un secreto y no debe committearse; el repo ya ignora `.env*` en `.gitignore`.
- **No:** dominio propio verificado en Resend en este spec. Razón: no existe todavía; queda como mejora futura si se consigue un dominio.
- **No:** captcha, rate limiting o persistencia de mensajes. Razón: fuera del alcance definido por el usuario para este MVP de contacto.

---

## Identified risks

| Riesgo | Mitigación |
| --- | --- |
| `RESEND_API_KEY` no configurada en el entorno de despliegue | El Server Action detecta la ausencia de la variable y devuelve `ContactState.error` específico; el usuario ve el panel de error, no un falso éxito. |
| Dominio sandbox `onboarding@resend.dev` tiene límites/restricciones de uso en cuentas Resend gratuitas | Documentado en `.env.local.example` y en este spec como decisión temporal; migrar a dominio propio verificado es un spec/tarea futura. |

---

## What is **not** in this spec

- Dominio propio verificado en Resend.
- Rate limiting, anti-spam o captcha en el formulario de contacto.
- Persistencia de los mensajes enviados.
- Correo de confirmación automático al visitante.
- Autenticación real, sistema de créditos real.
- Tests automatizados.

Cada uno de estos, si se implementa, va en su propio spec.
