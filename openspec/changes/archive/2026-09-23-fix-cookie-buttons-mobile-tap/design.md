# Design

## Context

Ver proposal.md - Why. Estructura actual del widget (`src/components/WhatsAppWidget.astro`):
- Contenedor: `.wa-widget fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3` (sin control de `pointer-events`). Su ancho lo fija el panel (`w-[19rem]`/`sm:w-[21rem]`) y su alto abarca panel + gap + FAB.
- Panel: `.wa-panel pointer-events-none ...`; al abrir, `.wa-widget[data-open='true'] .wa-panel { pointer-events: auto }`.
- FAB: botón `.wa-fab` (56px) interactivo.

El contenedor, aunque visualmente casi vacío, es una caja `z-50` que captura taps en toda su superficie. El banner de cookies (`z-40`, ancho completo en móvil) queda por detrás → sus botones del lado derecho no reciben el tap.

## Goals / Non-Goals

- **Goal**: Que en móvil los botones del banner reciban el tap aunque el widget se solape.
- **Goal**: No alterar el comportamiento del widget (abrir/cerrar panel) ni la lógica de consentimiento.
- **Non-Goal**: Rediseñar el widget o el banner, ni cambiar posiciones/z-index.

## Decisions

- **Decisión: Neutralizar los `pointer-events` del contenedor del widget en lugar de mover el banner.**
  Aplicar `pointer-events-none` al contenedor `.wa-widget` y `pointer-events-auto` a sus hijos realmente interactivos: el FAB siempre, y el panel cuando está abierto (ya alterna `pointer-events`). Así la caja invisible del contenedor deja de interceptar taps y estos llegan al banner que está detrás.
  - Alternativa descartada: subir el `z-index` del banner por encima del widget → el banner (ancho completo) taparía el FAB y rompería el acceso a WhatsApp.
  - Alternativa descartada: reducir el ancho del contenedor al del FAB → el panel abierto necesita el ancho de 19rem; complicaría el layout de apertura.

## Risks / Trade-offs

- [Con `pointer-events-none` en el contenedor, si en el futuro se añaden elementos interactivos directamente al contenedor habría que darles `pointer-events-auto`] → Mitigación: dejar el patrón documentado en el propio marcado (contenedor none, hijos interactivos auto).

## Migration Plan

No aplica (cambio de presentación/interacción sin datos ni API).
