# Proposal

## Why

Los assets de la galería en Cloudinary (`proyecto-1`…`proyecto-12`) son de baja resolución (386×310 px). En la grilla se ven bien porque son pequeños, pero al abrir el modal la imagen se muestra a ~880px o más y el navegador la escala ~2.3×, viéndose borrosa. El modal debe mostrar la imagen en la máxima calidad posible, respetando el tamaño del modal.

## What Changes

- El **modal** carga la imagen del proyecto con **super-resolución por IA de Cloudinary** (`e_upscale`), que aumenta la resolución real del asset (386×310 → ~1544×1240) antes de optimizar formato/calidad/ancho.
- La imagen del modal se sirve como WebP/AVIF optimizado (`f_auto,q_auto`) acotada por ancho (`w_1600,c_limit`), respetando el tamaño del modal y quedando nítida en pantallas normales y retina.
- La **miniatura** de la grilla no cambia: sigue usando el asset a tamaño pequeño (no necesita super-resolución).
- La galería sigue usando una única fuente por proyecto (`proyecto-N`); miniatura y modal derivan del mismo `item.src`.

## Capabilities

### New Capabilities
- `project-gallery`: Comportamiento de la galería de proyectos y su modal, incluyendo la calidad con que el modal presenta la imagen del proyecto.

### Modified Capabilities
<!-- Ninguna: no existe spec previa para la galería. -->

## Impact

- `src/lib/cloudinary.ts` (helpers `cldHiRes` / `cldHiResSrcset` que anteponen `e_upscale`).
- `src/components/Proyectos.astro` (`data-full` / `data-srcset` del modal usan la variante con super-resolución).
- Dependencia de Cloudinary: usa el add-on de super-resolución (`e_upscale`), verificado como disponible en la cuenta. Cada derivado se cachea en el CDN tras la primera petición.
