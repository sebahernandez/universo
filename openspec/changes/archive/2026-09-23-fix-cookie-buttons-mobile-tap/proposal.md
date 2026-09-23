# Proposal

## Why

En móvil, al pulsar Aceptar o Rechazar en el banner de cookies no ocurre nada: el banner no se cierra y las funciones de consentimiento no se ejecutan. Causa raíz: el contenedor del widget flotante de WhatsApp (`.wa-widget`, `z-50`, ancho ≈ 19rem y alto por el panel) no controla `pointer-events`, así que su caja invisible intercepta los taps sobre la mitad derecha del banner (`z-40`, ancho completo en móvil). En escritorio el banner es angosto y va a la izquierda, por eso no se reproduce.

## What Changes

- Hacer que el contenedor del widget de WhatsApp deje de capturar taps en su área vacía/invisible: `pointer-events-none` en el contenedor y `pointer-events-auto` solo en los elementos realmente interactivos (el botón flotante y el panel cuando está abierto).
- Como resultado, los botones Aceptar/Rechazar del banner reciben el tap en móvil, el banner se cierra y se ejecutan correctamente las funciones de consentimiento (persistencia, activación de scripts al aceptar, Google Consent Mode).
- Sin cambios en la lógica de consentimiento ni en el comportamiento del widget de WhatsApp (abrir/cerrar el panel sigue igual).

## Capabilities

### New Capabilities
<!-- Ninguna. -->

### Modified Capabilities
- `cookie-consent`: Se explicita que los controles interactivos del banner deben poder recibir la interacción del usuario en móvil aunque otros elementos flotantes se solapen visualmente con él (ningún flotante debe interceptar sus taps).

## Impact

- `src/components/WhatsAppWidget.astro`: `pointer-events` del contenedor `.wa-widget` y de sus hijos interactivos.
- `src/components/CookieConsent.astro`: sin cambios de lógica; se verifica que Aceptar/Rechazar cierran el banner y ejecutan sus funciones.
- Sin nuevas dependencias.
