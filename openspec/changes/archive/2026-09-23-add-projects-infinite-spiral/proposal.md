# Proposal

## Why

La sección de proyectos hoy es una grilla de miniaturas que abre un modal/lightbox al hacer clic. Se quiere una presentación más viva y automática: mostrar los proyectos siempre en movimiento con el efecto "Infinite Spiral" de React Bits, sin modales ni clics, junto a un bloque de texto de presentación.

## What Changes

- Rediseñar la sección `#proyectos` a dos columnas en escritorio: **izquierda** el texto ("Nuestros Proyectos" + subtítulo) y **derecha** el efecto Infinite Spiral con las imágenes de proyectos ciclando de forma continua.
- Integrar el componente **Infinite Spiral** de React Bits (componente animado; requiere JavaScript/hidratación y posiblemente una librería de animación/WebGL que declare React Bits).
- Alimentar el espiral con las imágenes actuales de `galeria` (data/content) servidas por Cloudinary.
- **Eliminar** la grilla de miniaturas y el modal/lightbox actuales (las imágenes ya no se abren en modal). **BREAKING** para el comportamiento previo de zoom.
- Adaptación responsive: en móvil las dos columnas se apilan (texto arriba, espiral abajo) con una altura contenida y sin desbordes horizontales.
- Respetar `prefers-reduced-motion` (reducir o pausar el movimiento) y mantener el texto alternativo de las imágenes.

## Capabilities

### New Capabilities
<!-- Ninguna. -->

### Modified Capabilities
- `project-gallery`: Se retira el comportamiento de galería con modal/super-resolución y se define la nueva presentación de proyectos como un carrusel espiral auto-animado (Infinite Spiral), con su disposición a dos columnas y su adaptación móvil.

## Impact

- `src/components/Proyectos.astro`: reescritura de la sección (layout dos columnas, quitar grilla + modal + su `<script>`/`<style>`).
- Nuevo componente React Bits en `src/components/reactbits/` (Infinite Spiral) + posibles dependencias que declare (p. ej. `gsap`/`ogl`).
- `src/data/content.ts`: se sigue usando `galeria` como fuente de imágenes.
- `src/data/gradients.ts` / `DisplayTitle`: el título de la columna izquierda reutiliza la tipografía y el degradado actuales.
- Aumento de bundle por el componente animado (isla hidratada solo en esta sección).
