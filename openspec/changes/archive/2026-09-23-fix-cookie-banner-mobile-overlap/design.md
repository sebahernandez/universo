# Design

## Context

Ver proposal.md - Why. Estado actual:
- `CookieConsent.astro`: `fixed bottom-4 left-4 z-40`, ancho `max-w-[calc(100%-2rem)]` en móvil (≈ ancho completo) y `sm:max-w-md` en pantallas anchas.
- `WhatsAppWidget.astro`: `fixed bottom-5 right-5 z-50` (FAB de 56px), `sm:bottom-6 sm:right-6`.

En móvil el banner ocupa casi todo el ancho pegado abajo, por lo que su franja inferior derecha queda debajo del FAB de WhatsApp (z-50 por encima de z-40): se tapan mutuamente.

## Goals / Non-Goals

- **Goal**: Que en móvil el banner y el FAB de WhatsApp no se solapen y ambos sean tocables.
- **Goal**: No alterar el layout en escritorio ni la lógica de consentimiento.
- **Non-Goal**: Rediseñar el banner o el widget de WhatsApp.
- **Non-Goal**: Cambiar la posición del FAB de WhatsApp en escritorio.

## Decisions

- **Decisión: En móvil, elevar el banner por encima del FAB en lugar de moverlo a otra esquina.**
  El banner se mantiene abajo, pero se le añade un offset inferior en móvil (por ejemplo `bottom` suficiente para librar el FAB de 56px + su margen) de modo que quede apilado *sobre* el botón de WhatsApp, no encima de él. En `sm+` se restaura el `bottom-4` actual.
  - Alternativa descartada: mover el banner a `bottom-left` con ancho reducido dejando hueco a la derecha para el FAB — en pantallas angostas el texto queda muy comprimido.
  - Alternativa descartada: desplazar el FAB de WhatsApp hacia arriba cuando el banner está visible — implicaría acoplar ambos componentes con JS/estado compartido; más complejo y frágil que reposicionar solo el banner con CSS.

- **Decisión: Reservar el hueco del FAB.** El offset inferior del banner en móvil se dimensiona para librar la altura del FAB (`h-14` = 56px) más su separación inferior (`bottom-5` = 20px) y un pequeño margen, de forma que el FAB quede visible bajo el banner.

## Risks / Trade-offs

- [El banner apilado sobre el FAB reduce el alto útil inferior en móvil] → Aceptable: es temporal (hasta decidir) y solo en la franja inferior.
- [Cambios futuros en el tamaño/posición del FAB podrían volver a solaparlo] → Mitigación: documentar en el código que el offset del banner depende de la geometría del FAB.

## Migration Plan

No aplica (cambio de presentación sin datos ni API).
