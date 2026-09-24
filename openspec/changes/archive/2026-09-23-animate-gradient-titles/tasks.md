# Tasks

## 1. Integrar React en Astro

- [x] 1.1 Instalar `@astrojs/react`, `react` y `react-dom` (versiones compatibles con Astro 7) con npm. Verificar: quedan en `package.json` y `npm install` termina sin errores.
- [x] 1.2 Añadir la integración `react()` en `astro.config.mjs` (junto a sitemap). Verificar: `npm run build` reconoce React sin errores.

## 2. Incorporar el componente GradientText de React Bits

- [x] 2.1 Traer el componente `GradientText` de React Bits al repo (`src/components/reactbits/GradientText.tsx`), adaptado para render en línea en los títulos. Verificar: el componente existe y compila sin errores de tipos.
- [x] 2.2 Respetar la dirección de degradado actual (`100deg`) vía prop `direction` (colores compartidos en `src/data/gradients.ts`), sin cambiar los stops. Verificar: el HTML generado usa `linear-gradient(100deg, …)` con los colores actuales.

## 3. Usar GradientText en los títulos (alcance: todos los títulos)

- [x] 3.1 En `Hero.astro`, reemplazar los dos `<span>` (cool/warm) por dos `GradientText` (render estático, sin `client:`), en línea con un único espacio; conservar `data-fit-title`, `font-display` y el `<span class="sr-only">Papelería Creativa</span>` con `aria-hidden` en los degradados. Verificar: hero en una línea, con efecto y texto accesible intacto.
- [x] 3.2 En `DisplayTitle.astro`, reemplazar los `<span>` `lead`/`accent` por dos `GradientText`; conservar `data-fit-title` y el subtítulo. Verificar: todos los títulos de sección muestran el efecto.
- [x] 3.3 Extender a los demás títulos: `Contacto.astro` (encabezado) y `gracias.astro` (encabezado). La etiqueta pequeña "Nuestro proyecto" de `Proyectos.astro` se deja estática por decisión de alcance. Verificar: Contacto y gracias muestran el efecto; la etiqueta de Proyectos queda estática.
- [x] 3.4 Confirmar que el efecto fluye en bucle, con los mismos colores y la tipografía display, y que los glifos no se recortan (colchón/clip intactos). Verificar: HTML/CSS con `background-clip:text`, `background-size:300%`, animación `rb-gradient-flow` y colchón `padding/margin`.

## 4. Accesibilidad y verificación

- [x] 4.1 En `src/styles/global.css`, añadir una regla `@media (prefers-reduced-motion: reduce)` que desactive la animación del `GradientText` (degradado estático). Verificar: la regla existe y apunta a `.animated-gradient-text .text-content`.
- [x] 4.2 Verificar el ajuste de tamaño en móvil (`data-fit-title`): el script sigue midiendo el `<h1>/<h2>` y los `GradientText` se renderizan en línea. Verificar: layout en línea preservado (revisión de código y HTML).
- [x] 4.3 Ejecutar `npm run build` y confirmar que compila sin errores; comprobar que ninguna página envía JS de React (render estático). Verificar: build exitoso y sin `<script src>`/`astro-island` en el HTML.
- [ ] 4.4 Revisión visual final (móvil y escritorio): hero y títulos con el efecto de React Bits, colores y tipografía actuales, layout intacto. Verificar: pendiente de confirmación visual del usuario.
