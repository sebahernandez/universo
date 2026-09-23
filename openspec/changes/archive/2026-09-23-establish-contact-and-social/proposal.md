# Proposal

## Why

El sitio ya ofrece varios canales de contacto y perfiles sociales (formulario, WhatsApp, email, Instagram, Facebook), pero su comportamiento no está documentado como spec y hay una inconsistencia de datos: el footer se presenta como **tienda online** ("Santiago, Región Metropolitana. Tienda online"), mientras que los datos del sitio y el schema SEO exponen una **dirección física en Talagante**. Queremos fijar la spec de referencia de "redes sociales y contacto" y, de paso, alinear la ubicación al modelo de tienda online.

## What Changes

- Se documenta como capability el comportamiento de **contacto y redes sociales**: formulario (Web3Forms), WhatsApp (widget flotante + tarjetas + enlace con mensaje pre-cargado), email y perfiles sociales (Instagram, Facebook), incluyendo su reflejo en el SEO (`sameAs`, `telephone`, `email`).
- Se establece una **única fuente de verdad** de estos datos en `src/data/site.ts`, consumida por los componentes.
- **Corrección de datos (confirmada):** la URL real de **Facebook** es `https://www.facebook.com/universocrafterpenaflor/` (hoy apunta a `universocrafter`). **Instagram** se mantiene en `https://www.instagram.com/universocrafter/` (verificado, correcto).
- **Mejora:** el negocio se representa como **tienda online** (Santiago, Región Metropolitana; sin dirección de calle pública). El schema estructurado **no** debe exponer la calle física de Talagante, y footer + schema deben quedar **consistentes**.
- Se define el comportamiento observable de los enlaces externos (abrir en pestaña nueva, `rel="noopener"`) y del flujo del formulario (validación de campos requeridos, honeypot anti-spam, redirección a `/gracias`, autorización de acceso a `/gracias`).

## Capabilities

### New Capabilities
- `contact-and-social`: Canales de contacto (formulario, WhatsApp, email) y perfiles de redes sociales del sitio, su presentación (footer, sección de contacto, widget) y su reflejo en los datos estructurados de SEO.

### Modified Capabilities
<!-- Ninguna: no existe spec previa de contacto/redes. -->

## Impact

- `src/data/site.ts` (fuente de verdad; ajuste del modelo de ubicación a tienda online).
- `src/layouts/Layout.astro` (JSON-LD: `sameAs`, `telephone`, `email`, dirección sin calle física).
- `src/components/Footer.astro`, `src/components/Contacto.astro`, `src/components/WhatsAppWidget.astro`, `src/components/SocialIcon.astro` (presentación de contacto/redes).
- Sin nuevas dependencias. Mejora principalmente de datos/consistencia y documentación de comportamiento.
