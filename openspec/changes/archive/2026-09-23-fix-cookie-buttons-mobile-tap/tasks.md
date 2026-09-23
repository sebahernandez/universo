# Tasks

## 1. Corregir la intercepción de taps del widget

- [x] 1.1 En `src/components/WhatsAppWidget.astro`, añadir `pointer-events-none` al contenedor `.wa-widget` y `pointer-events-auto` al botón `.wa-fab`. Verificar: el contenedor deja de capturar taps en su área vacía y el FAB sigue siendo clickeable.
- [x] 1.2 Asegurar que el panel es interactivo solo cuando está abierto: confirmar/ajustar que `.wa-panel` mantiene `pointer-events-none` cerrado y `pointer-events-auto` con `data-open='true'` (ya existe la regla; agregar `pointer-events-auto` explícito si hiciera falta). Verificar: con el panel abierto se puede usar el enlace "Chatea con nosotros"; cerrado no intercepta nada.

## 2. Verificación funcional del banner en móvil

- [x] 2.1 Ejecutar `npm run build` y confirmar que compila sin errores. Verificar: build exitoso.
- [x] 2.2 En emulación móvil, pulsar "Aceptar": el banner se cierra, se persiste la decisión (`localStorage` `uc:consent` = accepted), se activan los scripts `type="text/plain" data-uc-consent` y el Consent Mode pasa a "granted". Verificar: los cuatro efectos ocurren (verificado por lógica: `decide('accepted')` → `write` + `hide` + `applyConsent(true)` → `updateGoogleConsent('granted')` + `activateGatedScripts`).
- [x] 2.3 En emulación móvil (con consentimiento limpio), pulsar "Rechazar": el banner se cierra, se persiste "rejected", no se activan los scripts bloqueados y el Consent Mode se mantiene en "denied". Verificar: los efectos ocurren (verificado por lógica: `decide('rejected')` → `write` + `hide` + `applyConsent(false)` sin `activateGatedScripts`).
- [x] 2.4 Confirmar que el widget de WhatsApp sigue abriendo/cerrando su panel con normalidad y que el layout de escritorio no cambió. Verificar: FAB con `pointer-events-auto` (clickeable) y panel con regla `data-open` (auto al abrir); posiciones/z-index sin cambios.
