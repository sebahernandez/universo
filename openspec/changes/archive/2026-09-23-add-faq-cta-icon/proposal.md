# Proposal

## Why

La caja de cierre de la página de preguntas frecuentes ("¿No resolvimos tu duda?") es puramente textual y pasa desapercibida. Añadir un ícono visual de interrogación refuerza el mensaje de ayuda y aporta identidad a ese llamado a la acción.

## What Changes

- Añadir un ícono decorativo de interrogación en la esquina superior derecha de la caja "¿No resolvimos tu duda?" en la página de preguntas frecuentes.
- La imagen se sirve desde Cloudinary: `https://res.cloudinary.com/v5ovpy2d/image/upload/v1790198860/interrogacion-icon.webp`.
- El ícono es decorativo (no aporta información esencial) y no debe interferir con el texto ni con los botones de contacto.

## Capabilities

### New Capabilities
- `faq-support-cta`: La caja de contacto de cierre en la página de preguntas frecuentes, incluida su presentación visual (ícono decorativo) y sus acciones de contacto.

### Modified Capabilities
<!-- Ninguna: no existe una capacidad previa para el CTA de la página de FAQ. -->

## Impact

- `src/pages/preguntas-frecuentes.astro`: la caja `<div>` "¿No resolvimos tu duda?" (línea ~60).
- Sin nuevas dependencias; la imagen se carga por URL remota de Cloudinary ya usado en el proyecto.
