# Proposal

## Why

En móvil el banner de consentimiento de cookies (`CookieConsent.astro`, fijo abajo a la izquierda y de ancho casi completo) se monta encima del botón flotante de WhatsApp (`WhatsAppWidget.astro`, fijo abajo a la derecha). Ambos ocupan la franja inferior de la pantalla y se tapan entre sí, dificultando tocar los botones Aceptar/Rechazar y el FAB de WhatsApp.

## What Changes

- Reposicionar/apilar el banner de cookies en móvil para que no se solape con el botón flotante de WhatsApp; en pantallas anchas el layout actual (banner abajo-izquierda, WhatsApp abajo-derecha) se mantiene.
- Garantizar que en móvil tanto los botones del banner como el FAB de WhatsApp queden completamente visibles y tocables (sin superposición y con un z-index coherente).
- Sin cambios en la lógica de consentimiento (persistencia, enforcement de scripts, Consent Mode): es un ajuste de presentación/posicionamiento.

## Capabilities

### New Capabilities
- `cookie-consent`: El banner de consentimiento de cookies del sitio, incluida su presentación responsive y su coexistencia con otros elementos flotantes (botón de WhatsApp).

### Modified Capabilities
<!-- Ninguna: no existe una capacidad previa para el banner de cookies. -->

## Impact

- `src/components/CookieConsent.astro`: posicionamiento/ancho responsive del banner y z-index.
- `src/components/WhatsAppWidget.astro`: referencia de posición (abajo-derecha, z-50) a considerar; posible ajuste menor si hace falta para evitar el solape.
- Sin nuevas dependencias ni cambios en la lógica de consentimiento.
