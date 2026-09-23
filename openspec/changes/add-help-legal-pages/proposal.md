# Proposal

## Why

El sitio de Universo Crafter es una landing one-page a la que ya se le sumó la página interna `/politica-cookies`. En el footer, los enlaces "Preguntas frecuentes" y "Términos y condiciones" siguen siendo placeholders que apuntan a `/#contacto`, y la política de cookies existe como página pero sin una spec que la formalice. Faltan tres páginas de ayuda/legales que aporten confianza al comprador (tienda 100% online), respondan dudas frecuentes de compra/envío y dejen por escrito las condiciones de venta de una empresa formal (Universo Crafter SpA).

## What Changes

- Crear la página **`/preguntas-frecuentes`** con una FAQ de 8–10 preguntas y respuestas reales sobre productos personalizados, cómo comprar, plazos, envíos (Bluexpress por pagar / retiro en taller), pagos y cambios.
- Crear la página **`/terminos-condiciones`** con las condiciones de venta redactadas (identificación de la empresa, proceso de pedido, precios, pagos, plazos de producción, envíos, cambios/devoluciones según la Ley del Consumidor de Chile, propiedad intelectual y contacto), marcando con `[PLACEHOLDER]` los datos que el negocio debe confirmar.
- **Formalizar `/politica-cookies`** (página ya existente) como capability con spec propia, para que su comportamiento (consentimiento, categorías, revocación) quede documentado y versionado.
- Reapuntar los enlaces del footer: "Preguntas frecuentes" → `/preguntas-frecuentes`, "Términos y condiciones" → `/terminos-condiciones` (la "Política de cookies" ya apunta correcto).
- Todas las páginas reutilizan el patrón existente (`Layout` + `Header` + `Footer`), son indexables, y usan anclas absolutas (`/#seccion`) para navegar de vuelta a la home.

## Capabilities

### New Capabilities
- `preguntas-frecuentes`: página de FAQ que agrupa y responde las dudas frecuentes de compra, personalización, envíos y pagos; enlazada desde el footer y con JSON-LD `FAQPage` para SEO.
- `politica-cookies`: página de política de cookies y su relación con el mecanismo de consentimiento del sitio (qué se almacena, categorías, cómo aceptar/rechazar y revocar).
- `terminos-condiciones`: página de términos y condiciones de venta de Universo Crafter SpA, alineada con la normativa chilena de protección al consumidor.

### Modified Capabilities
<!-- Ninguna: no existen specs previas bajo openspec/specs/. -->

## Impact

- **Rutas nuevas**: `src/pages/preguntas-frecuentes.astro`, `src/pages/terminos-condiciones.astro`. Página existente documentada: `src/pages/politica-cookies.astro`.
- **Componentes afectados**: `src/components/Footer.astro` (reapuntar 2 enlaces de la sección "Ayuda").
- **Datos/SEO**: `astro.config.mjs` sitemap incluirá las nuevas rutas automáticamente; JSON-LD `FAQPage` en la página de FAQ. Posible reuso de datos desde `src/data/` (contacto, envíos) para mantener una sola fuente de verdad.
- **Consentimiento**: la página de cookies referencia el gestor `window.ucConsent` ya implementado (`src/components/CookieConsent.astro`), sin cambiar su lógica.
- **Sin cambios de dependencias** ni breaking changes.
