# Tasks

## 1. Datos y contenido base

- [x] 1.1 Crear `src/data/faq.ts` con un array de 8–10 objetos `{ pregunta, respuesta }` cubriendo productos/personalización, cómo comprar, plazos, envíos (Bluexpress por pagar / retiro en taller sin costo), pagos y cambios; datos no confirmados como `[PLACEHOLDER: ...]`. Verificar: `npm run build` compila y el array tiene 8–10 entradas coherentes con `src/data/content.ts`.
- [x] 1.2 Definir los datos de identificación del vendedor a usar en Términos (razón social "Universo Crafter SpA", tienda online Santiago RM, canales desde `src/data/site.ts`), marcando `[PLACEHOLDER: RUT]` y otros datos faltantes. Verificar: revisión de que no hay datos inventados (RUT/plazos/medios de pago quedan como placeholder).

## 2. Página de Preguntas Frecuentes

- [x] 2.1 Crear `src/pages/preguntas-frecuentes.astro` usando `Layout` + `Header` + `Footer`, con `<title>` y `meta description` propios (indexable), título "Preguntas frecuentes" y CTA de contacto (WhatsApp y/o `/#contacto`). Verificar: `curl -s -o /dev/null -w '%{http_code}' /preguntas-frecuentes` = 200 y la página muestra header/footer.
- [x] 2.2 Renderizar la FAQ como acordeón accesible con `<details>`/`<summary>` a partir de `src/data/faq.ts`. Verificar por teclado: Enter/Espacio expande y colapsa; el contenido está en el DOM aunque esté colapsado.
- [x] 2.3 Inyectar JSON-LD `FAQPage` derivado del MISMO array `faq.ts` (cada `Question`/`acceptedAnswer` = texto visible). Verificar: el JSON-LD del HTML generado coincide con las preguntas visibles (validable en Rich Results Test).

## 3. Página de Términos y Condiciones

- [x] 3.1 Crear `src/pages/terminos-condiciones.astro` (Layout + Header + Footer, indexable, título "Términos y condiciones") con las secciones: identificación de la empresa, proceso de pedido/precios/pagos, producción/envíos/entregas, cambios y devoluciones (respetando Ley 19.496), propiedad intelectual, y vigencia/ley aplicable. Verificar: HTTP 200 en `/terminos-condiciones` y presencia de las 6 secciones.
- [x] 3.2 Redactar la cláusula de cambios/devoluciones distinguiendo producto personalizado sin falla vs. producto con defecto, sin negar la garantía legal por fallas; plazos como `[PLACEHOLDER]` si no están confirmados. Verificar: revisión de que no se declara "sin devolución" para casos protegidos por ley.
- [x] 3.3 Incluir fecha de última actualización y mención de legislación chilena. Verificar: ambos textos presentes al pie de la página.

## 4. Formalizar Política de Cookies (página existente)

- [x] 4.1 Revisar `src/pages/politica-cookies.astro` contra `specs/politica-cookies/spec.md`: inventario de almacenamiento (`uc:consent`, `uc:form-enviado`), categorías, botones "Cambiar mis preferencias" (`ucConsent.open()`) y "Rechazar cookies" (`ucConsent.reject()`), instrucciones de navegador, fecha y contacto. Verificar: cada requisito de la spec tiene su elemento correspondiente en la página; ajustar lo que falte.

## 5. Navegación y enlaces

- [x] 5.1 En `src/components/Footer.astro`, reapuntar "Preguntas frecuentes" → `/preguntas-frecuentes` y "Términos y condiciones" → `/terminos-condiciones` (la "Política de cookies" ya está correcta). Verificar: los tres enlaces del footer navegan a sus páginas.
- [x] 5.2 Confirmar que el menú y el logo usan anclas absolutas `/#seccion` y funcionan desde las tres páginas internas. Verificar: desde cada página interna, un enlace del menú lleva a la home y hace scroll a la sección.

## 6. Verificación integral

- [x] 6.1 `npm run build` sin errores y confirmar que `dist/preguntas-frecuentes/index.html`, `dist/terminos-condiciones/index.html` y `dist/politica-cookies/index.html` existen y aparecen en `sitemap-index.xml`.
- [x] 6.2 Levantar el sitio (`npm run dev`/`preview`) y recorrer las tres páginas: header/footer visibles, banner de cookies operativo, acordeón de FAQ accesible, y navegación del menú funcional desde páginas internas.
- [x] 6.3 Inventario final de `[PLACEHOLDER]`: listar todos los que queden en FAQ y Términos y confirmarlos con el negocio antes de publicar. Verificar: `grep -rn "\[PLACEHOLDER" src/` documentado en el resumen.
