# Tasks

## 1. Reposicionar el banner en móvil

- [x] 1.1 En `src/components/CookieConsent.astro`, ajustar las clases del contenedor `#uc-cookie-banner` para que en móvil el banner se eleve por encima del FAB de WhatsApp (offset inferior que libre ~56px de alto + margen del FAB), restaurando `bottom-4` en `sm:`. Verificar: en un viewport móvil, el banner y el botón de WhatsApp no se superponen.
- [x] 1.2 Revisar el z-index del banner respecto al FAB (z-50) para asegurar que ambos sean tocables y ninguno intercepte los toques del otro. Verificar: se puede pulsar Aceptar/Rechazar y también el FAB sin que uno tape al otro.

## 2. Verificación

- [x] 2.1 Ejecutar `npm run build` y confirmar que compila sin errores. Verificar: build exitoso.
- [x] 2.2 Comprobar manualmente (o con emulación móvil del navegador) que: (a) en móvil el banner no se solapa con WhatsApp y ambos son tocables; (b) en escritorio el layout no cambió; (c) Aceptar/Rechazar siguen ocultando el banner y aplicando el consentimiento. Verificar: los tres puntos se cumplen.
