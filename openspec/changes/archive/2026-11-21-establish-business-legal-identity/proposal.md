# Proposal

## Why

Los documentos legales del sitio no identifican de forma completa al vendedor: `/terminos-condiciones` todavía muestra el marcador `RUT: [PLACEHOLDER: RUT de la empresa]`, `/politica-cookies` no identifica a ninguna persona jurídica responsable, y el footer tiene la razón social y el RUT escritos como texto literal en el componente. El negocio ya confirmó sus datos comerciales (Universo Crafter SpA, RUT 78.519.223-0), por lo que corresponde publicarlos de manera consistente en todas las páginas con información legal.

## What Changes

- Incorporar los datos legales del negocio (razón social "Universo Crafter SpA" y RUT "78.519.223-0") al módulo único de datos del sitio, junto a los datos de contacto existentes.
- `/terminos-condiciones`: reemplazar el marcador `[PLACEHOLDER: RUT de la empresa]` de la sección "1. Quiénes somos" por el RUT real, leído desde la fuente única; actualizar la fecha de "Última actualización".
- `/politica-cookies`: agregar una sección que identifique al responsable del sitio (razón social, RUT, ubicación y correo de contacto); actualizar la fecha de "Última actualización".
- Footer: mantener la razón social y el RUT visibles en todas las páginas, pero leyéndolos de la fuente única en lugar de texto literal.
- Datos estructurados (JSON-LD `OnlineStore`): agregar `legalName` y `taxID` con los mismos valores.

Fuera de alcance:

- Los demás marcadores `[PLACEHOLDER]` de los términos (impuestos y vigencia de cotizaciones, medios de pago, plazo de producción, plazo para reclamos): requieren datos que el negocio aún no ha entregado.
- `/preguntas-frecuentes` y `/gracias`: no son documentos legales; ya muestran el footer con los datos legales.
- Crear nuevas páginas legales (por ejemplo, una política de privacidad).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `contact-and-social`: se agrega la identificación legal del negocio (razón social y RUT) a la fuente única de datos, su presencia en el footer y su reflejo en los datos estructurados.
- `terminos-condiciones`: el requisito "Identificación de la empresa" deja de admitir el RUT como `[PLACEHOLDER]` y exige el RUT real.
- `politica-cookies`: se agrega el requisito de identificar al responsable del sitio con razón social y RUT.

## Impact

- `src/data/site.ts`: nuevo bloque de datos legales.
- `src/pages/terminos-condiciones.astro`: sección 1, meta descripción sin cambios de fondo, fecha de actualización.
- `src/pages/politica-cookies.astro`: nueva sección de identificación del responsable, fecha de actualización.
- `src/components/Footer.astro`: razón social y RUT leídos desde `site`.
- `src/layouts/Layout.astro`: `legalName` y `taxID` en el JSON-LD.
- Sin dependencias nuevas, sin cambios de rutas ni de navegación.
