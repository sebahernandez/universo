# Tasks

## 1. Incorporar el componente Infinite Spiral

- [x] 1.1 Traer el componente Infinite Spiral de React Bits al repo (`src/components/reactbits/InfiniteSpiral.tsx` + `.css`, variante TS+CSS del registro oficial). Sin dependencias externas (solo React + CSS + requestAnimationFrame). Verificar: el componente existe y `npm run build` compila sin errores.
- [x] 1.2 Revisar la API: `items` (string|{src,alt,href}), `animationMode='auto'` (autoplay), `speed`, `direction`, `pauseOnHover`, `cardWidth/cardHeight/cardRadius`, respeta `prefers-reduced-motion`. Verificar: documentado.

## 2. Rediseñar la sección de proyectos

- [x] 2.1 En `src/components/Proyectos.astro`, layout de dos columnas: izquierda el título "Nuestros Proyectos" (GradientText, alineado a la izquierda en lg) + subtítulo; derecha el contenedor del espiral. Verificar: en escritorio, texto izquierda / espiral derecha.
- [x] 2.2 Montar `InfiniteSpiral` como isla `client:load` (hidrata al cargar, sin depender del scroll) con las imágenes de `galeria` (`cld(item.src, 400)` + `alt`), autoplay continuo. Verificar: 12 imágenes de proyecto renderizadas y ciclando.
- [x] 2.3 Eliminar el código muerto del modal: `#galeria-modal`, `<style>`, `<script>` y `#galeria-grid`. Verificar: 0 referencias a galeria-modal/grid/item en el HTML.

## 3. Responsive y accesibilidad

- [x] 3.1 Móvil: apilado (una columna, texto arriba / espiral abajo) con alto acotado (`h-[360px]` → `sm:h-[460px]` → `lg:h-[560px]`) y `overflow-hidden`. Verificar: sin scroll horizontal, el espiral cabe.
- [x] 3.2 Reservar el alto del contenedor del espiral (altura fija) para evitar CLS antes de hidratar. Verificar: contenedor con altura fija.
- [x] 3.3 Respetar `prefers-reduced-motion`: el componente detiene el auto-giro cuando la preferencia está activa (lógica incorporada). Verificar: presente en el componente.
- [x] 3.4 Conservar `alt` en las imágenes del espiral (desde `galeria`). Verificar: cada item lleva su alt.

## 4. Verificación

- [x] 4.1 Ejecutar `npm run build` y confirmar que compila sin errores. Verificar: build exitoso; isla hidratada emitida.
- [x] 4.2 Revisión visual (móvil y escritorio, capturas headless con Chrome): el espiral cicla las imágenes en cascada a la derecha, texto a la izquierda; en móvil se apila (texto arriba, espiral abajo); sin modal ni desbordes. Se cambió a `client:load` para que hidrate siempre. Verificar: confirmado en 1712px y 390px.
