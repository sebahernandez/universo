# Design

## Context

Ver proposal.md - Why. Estado actual (`src/components/Proyectos.astro`):
- `DisplayTitle` centrado ("Nuestros" / "Proyectos" + subtítulo) + grilla `#galeria-grid` (2/3/6 columnas) de 13 imágenes de `galeria` (data/content), cada una un `<button>` que abre un modal/lightbox (`#galeria-modal`) con super-resolución Cloudinary. Incluye `<style>` y `<script>` del modal.
- React ya está integrado (`@astrojs/react`) por un cambio previo. Cloudinary helpers en `src/lib/cloudinary` (`cld`, `cldSrcset`, …).

El componente **Infinite Spiral** de React Bits es animado e interactivo: a diferencia de GradientText (CSS puro), requiere JavaScript en el cliente (hidratación) y posiblemente una dependencia de animación/WebGL que React Bits declare.

## Goals / Non-Goals

- **Goal**: Sección de proyectos con texto a la izquierda y el espiral (imágenes de `galeria` ciclando) a la derecha; responsive con apilado en móvil.
- **Goal**: Quitar la grilla y el modal/lightbox actuales.
- **Goal**: Respetar `prefers-reduced-motion` y mantener `alt`.
- **Non-Goal**: Conservar la vista ampliada (modal) — se elimina por decisión del usuario.
- **Non-Goal**: Cambiar las imágenes de proyecto (se usa `galeria` tal cual).

## Decisions

- **Decisión: Traer el componente oficial Infinite Spiral de React Bits al repo.**
  Copiar/instalar el componente (CLI de React Bits o copia manual) en `src/components/reactbits/InfiniteSpiral.*` e instalar las dependencias que declare (p. ej. `gsap` y/o `ogl`). Se determina al implementar según lo que pida el componente.

- **Decisión: Hidratación por isla (`client:visible`).**
  El efecto es interactivo/animado y sí necesita JS; la sección está bajo el pliegue, así que `client:visible` hidrata al acercarse. Acepta el peso de JS que esto conlleva (a diferencia de GradientText, aquí sí se envía runtime + componente).

- **Decisión: Fuente de imágenes.**
  Pasar al componente el array de imágenes de `galeria` como URLs de Cloudinary (`cld(item.src, <ancho adecuado>)`) con su `alt`. Ajustar el ancho solicitado al tamaño en que el espiral las muestra (`f_auto,q_auto`).

- **Decisión: Layout dos columnas.**
  `lg:grid-cols-2` (o flex) en la sección: izquierda el título+subtítulo (alineados a la izquierda, reutilizando la tipografía/degradado actuales — puede requerir una variante alineada a la izquierda de `DisplayTitle` o inlinear el título con `GradientText`), derecha el contenedor del espiral con alto acotado. En móvil, una sola columna: texto arriba, espiral abajo.

- **Decisión: Contención del espiral.**
  El contenedor del espiral tendrá dimensiones acotadas (alto máximo y `overflow` controlado) para que en móvil quepa y no genere scroll horizontal.

- **Decisión: `prefers-reduced-motion`.**
  Si el componente no lo trae, pausar/reducir la animación bajo `prefers-reduced-motion` (prop del componente o CSS), mostrando las imágenes de forma estática o con movimiento mínimo.

- **Decisión: Eliminar modal y su código.**
  Quitar `#galeria-modal`, su `<style>` y `<script>`, y la grilla `#galeria-grid`. Se retiran los requisitos de modal de la spec `project-gallery`.

## Risks / Trade-offs

- [El componente puede requerir WebGL/librería pesada y sumar bundle notable] → Mitigación: hidratar solo esta sección (`client:visible`); evaluar tamaño al implementar.
- [Rendimiento en móviles gama baja con animación continua] → Mitigación: alto acotado, pocas imágenes visibles a la vez, y respeto a `prefers-reduced-motion`.
- [Accesibilidad: el efecto no reemplaza una galería navegable] → Mitigación: mantener `alt`; el contenido de proyectos sigue presente como imágenes con texto alternativo.
- [SSR: el componente hidratado puede no renderizar nada hasta hidratar (posible salto de layout)] → Mitigación: reservar el alto del contenedor para evitar CLS.

## Open Questions

- ¿El Infinite Spiral de React Bits expone props de autoplay/velocidad y de reduced-motion, o hay que envolverlo? Se resuelve al traer el componente (no cambia el alcance ni los specs).
