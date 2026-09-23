# Tasks

## 1. Unificar el espaciado entre palabras

- [x] 1.1 En `src/components/Hero.astro` (línea del `<h1>`), eliminar `mr-[0.3em]` del span de "Papeleria" y dejar el espacio natural `{' '}` como único separador. Verificar en el navegador que entre "Papeleria" y "Creativa" queda un solo espacio (no un hueco ancho).
- [x] 1.2 En `src/components/DisplayTitle.astro` (línea del `<h2>`), eliminar `mr-[0.25em]` del span `lead` y dejar el espacio natural `{' '}` como único separador. Verificar que el hueco coincide visualmente con el del hero.
- [x] 1.3 Revisar los usos de `DisplayTitle` (p. ej. en `src/pages/*.astro` / secciones) y confirmar que ningún `lead`/`accent` contiene espacios extra en el texto que produzcan dobles/triples. Verificar inspeccionando el HTML renderizado.

## 2. Evitar el recorte de glifos

- [x] 2.1 En `src/styles/global.css`, en `.text-grad-cool, .text-grad-warm`, añadir colchón vertical (padding superior además del `padding-bottom` actual) para que el clip-text no corte ascendentes/tildes ni descendentes. Verificar mirando "P", "l", "í", "p", "g" en el hero.
- [x] 2.2 Ajustar el `line-height` del título (`leading-[1.02]`) en `Hero.astro` y `DisplayTitle.astro` lo justo para que ningún glifo quede cortado arriba/abajo, sin desmaquetar el bloque. Verificar en móvil, sm y desktop.
- [x] 2.3 Confirmar que el `overflow-hidden` de la sección hero no recorta el título; si recortara, aislar el padding en el propio título en vez de tocar el `overflow` de la sección. Verificar el borde superior/izquierdo del `<h1>`.

## 3. Verificación integral

- [x] 3.1 Ejecutar `npm run build` y `npm run preview`, y revisar hero + títulos de sección en móvil (≤639px), sm y desktop: separación uniforme entre palabras, sin espacios dobles y sin letras recortadas.
