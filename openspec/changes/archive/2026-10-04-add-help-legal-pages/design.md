# Design

## Context

Sitio Astro 7 estático, Tailwind v4, one-page. Ya existe `src/pages/politica-cookies.astro` (patrón `Layout` + `Header` + `Footer`, contenido en español-CL) y el gestor de consentimiento `window.ucConsent` (`src/components/CookieConsent.astro`). Las secciones de la home tienen `id`s y la navegación usa anclas absolutas `/#seccion`. El sitemap (`@astrojs/sitemap`) toma rutas automáticamente. Ver `proposal.md - Why` para la motivación.

## Goals / Non-Goals

**Goals:**
- Añadir dos páginas nuevas (`/preguntas-frecuentes`, `/terminos-condiciones`) y formalizar la existente (`/politica-cookies`) siguiendo el mismo patrón visual y de layout.
- Mantener una sola fuente de verdad para datos ya existentes (contacto, envíos) evitando duplicar texto que pueda desincronizarse.
- FAQ con datos estructurados `FAQPage` y acordeón accesible.
- Dejar el contenido legal redactado pero con `[PLACEHOLDER]` visibles donde el negocio debe confirmar datos.

**Non-Goals:**
- No se implementa un CMS ni contenido editable por el usuario final.
- No se redacta asesoría legal vinculante; el texto es una base a revisar por el negocio.
- No se modifica la lógica del banner/consentimiento (`CookieConsent.astro`), solo se referencia su API.

## Decisions

- **Tres páginas separadas (no una combinada)**: elegido por el usuario. Consistente con `/politica-cookies` ya existente y mejor para SEO (cada tema con su URL, título y meta). Alternativa descartada: una sola `/ayuda` con anclas (mezcla legal + FAQ y diluye SEO).
- **Patrón de página reutilizado**: cada página importa `Layout`, `Header`, `Footer`, igual que `politica-cookies.astro`. Se reutilizan tokens del `@theme` (`text-tinta`, `text-tinta-suave`, `font-display`, `rounded-tarjeta`, etc.). Evita CSS nuevo.
- **FAQ como acordeón nativo `<details>`/`<summary>`**: accesible por teclado sin JS y con estado semántico. Alternativa descartada: acordeón con JS + `aria-expanded` (más código y riesgo de accesibilidad). El contenido queda en el DOM (crawleable) aunque esté colapsado.
- **Contenido de la FAQ en datos (`src/data/`) + JSON-LD derivado del mismo array**: se define un array de `{ pregunta, respuesta }` (p. ej. `src/data/faq.ts`) que alimenta tanto el render visible como el `FAQPage` JSON-LD, garantizando que coincidan (requisito de la spec). Alternativa descartada: escribir el JSON-LD a mano aparte del HTML (se desincroniza).
- **Estrategia de placeholders**: los datos no confirmados se escriben como `[PLACEHOLDER: descripción]` en el texto visible, para que sean imposibles de pasar por alto antes de publicar. Se listará en `tasks.md` el inventario de placeholders a resolver.
- **Reapuntado del footer**: en `src/components/Footer.astro`, `ayuda[0]` → `/preguntas-frecuentes` y `ayuda[2]` → `/terminos-condiciones`. La "Política de cookies" ya apunta correcto.
- **Cumplimiento legal (Ley 19.496)**: los términos NO deben negar la garantía legal por fallas. Se redacta distinguiendo producto personalizado sin falla vs. producto con defecto, respetando el derecho a cambio/reparación/devolución por defectos.

## Risks / Trade-offs

- [El texto legal es una base no revisada por abogado] → Marcar claramente como borrador con `[PLACEHOLDER]` y recomendar revisión del negocio antes de publicar; no afirmar cláusulas que contradigan la ley del consumidor.
- [Placeholders olvidados llegan a producción] → Inventario explícito en `tasks.md` y `[PLACEHOLDER: ...]` visible en la UI (no un comentario oculto).
- [JSON-LD FAQ que no coincide con lo visible penaliza SEO] → Derivar ambos del mismo array de datos.
- [Duplicar datos de envío/contacto y desincronizar] → Reutilizar `src/data/content.ts` y `src/data/site.ts` donde aplique en vez de recopiar cifras.

## Open Questions

- Datos del negocio pendientes (a resolver antes de publicar, no bloquean el diseño ni las specs): RUT de Universo Crafter SpA, medios de pago aceptados, plazo exacto de producción y plazo de gestión de cambios/devoluciones. Se dejan como `[PLACEHOLDER]`.
