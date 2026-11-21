# Tasks

## 1. Fuente única de datos legales

- [x] 1.1 En `src/data/site.ts`, agregar a `site` el bloque `legal` con `razonSocial: 'Universo Crafter SpA'` y `rut: '78.519.223-0'`; verificar que `npm run build` compila sin errores de tipos.

## 2. Footer y datos estructurados

- [x] 2.1 En `src/components/Footer.astro`, reemplazar los literales "Universo Crafter SpA." y "RUT: 78.519.223-0" del `<address>` por `{site.legal.razonSocial}` y `RUT: {site.legal.rut}`, sin cambiar marcado ni clases; verificar que el footer renderizado muestra el mismo texto que antes.
- [x] 2.2 En `src/layouts/Layout.astro`, agregar `legalName: site.legal.razonSocial` y `taxID: site.legal.rut` al objeto `jsonLd`; verificar tras `npm run build` que `rg -o '"legalName":"[^"]*"|"taxID":"[^"]*"' dist/index.html` devuelve "Universo Crafter SpA" y "78.519.223-0".

## 3. Términos y condiciones

- [x] 3.1 En `src/pages/terminos-condiciones.astro`, sección "1. Quiénes somos", reemplazar el literal "Universo Crafter SpA" por `{site.legal.razonSocial}` y `RUT: [PLACEHOLDER: RUT de la empresa]` por `RUT: {site.legal.rut}`; interpolar también la razón social en la `description` del `Layout`; verificar que `rg 'PLACEHOLDER: RUT' src` no devuelve resultados.
- [x] 3.2 Actualizar la constante `actualizado` a `'noviembre de 2026'`; verificar tras el build que `dist/terminos-condiciones/index.html` contiene "RUT: 78.519.223-0" y "Última actualización: noviembre de 2026".

## 4. Política de cookies

- [x] 4.1 En `src/pages/politica-cookies.astro`, agregar antes de "¿Qué son las cookies?" una sección "Responsable del sitio" con el mismo marcado y clases que las demás secciones, indicando razón social, `RUT: {site.legal.rut}`, ubicación (Santiago, Región Metropolitana, Chile, desde `site.address`) y correo (`site.email`); verificar tras el build que `dist/politica-cookies/index.html` contiene "Universo Crafter SpA" y "RUT: 78.519.223-0".
- [x] 4.2 Actualizar la constante `actualizado` a `'noviembre de 2026'`; verificar que la página muestra "Última actualización: noviembre de 2026".

## 5. Verificación de integración

- [x] 5.1 Ejecutar `rg -n '78\.519\.223-0' src` y verificar que el único resultado está en `src/data/site.ts`.
- [x] 5.2 Ejecutar `npm run build` y luego `rg -l 'RUT: 78\.519\.223-0' dist`; verificar que aparecen todas las páginas que incluyen el footer (inicio, términos, cookies y preguntas frecuentes; `/gracias` no usa el footer).
- [x] 5.3 Revisar en el navegador `/terminos-condiciones` y `/politica-cookies` en ancho móvil (375 px) y escritorio; verificar que los datos legales se leen sin desbordes ni cortes de texto.
