# Design

## Context

Ver `proposal.md` — Why. Estado relevante:

- Los assets `proyecto-1`…`proyecto-12` en Cloudinary son 386×310 px (verificado con `fl_getinfo` y leyendo el PNG original).
- `src/lib/cloudinary.ts` inserta `f_auto,q_auto[,w_N,c_limit]` tras `/upload/`. `c_limit` no aumenta el tamaño más allá del original, por lo que pedir `w_1600` sobre un asset de 386px seguía devolviendo 386px.
- `src/components/Proyectos.astro`: la miniatura usa `cld(item.src, 386)` y el modal usa `data-full`/`data-srcset` que lee el script y asigna a `#modal-img` (mostrado a ~880px en un panel `max-w-4xl`, `object-cover`, `max-h-80vh`).

## Goals / Non-Goals

**Goals:**
- Modal nítido a su tamaño de despliegue, partiendo de un asset pequeño.
- No inflar el peso: entregar WebP/AVIF optimizado.

**Non-Goals:**
- Cambiar la miniatura, el layout del modal o los `alt`.
- Sustituir los assets por versiones de alta resolución (eso sería del lado del cliente).

## Decisions

- **Super-resolución con IA (`e_upscale`) solo en el modal.** Se añaden helpers `cldHiRes` / `cldHiResSrcset` que anteponen `e_upscale/` a la transformación base: `/upload/e_upscale/f_auto,q_auto,w_1600,c_limit/proyecto-N.png`. `e_upscale` sube el asset a ~1544×1240 real; luego `w_1600,c_limit` y `f_auto,q_auto` lo entregan como WebP (~90–112KB).
  - *Verificado:* `e_upscale` devuelve 200 en la cuenta para los 12 assets; el derivado se cachea en el CDN tras la primera petición.
  - *Alternativas descartadas:* `c_scale,w_1200` (escalado bicúbico → grande pero borroso); `e_gen_restore` (no aumenta resolución); subir el asset a mayor resolución (fuera de alcance, del lado del cliente).
- **La miniatura no se toca.** Se muestra pequeña; aplicarle `e_upscale` sería gasto sin beneficio visible.

## Risks / Trade-offs

- [`e_upscale` es un add-on con posible costo/uso por transformación] → Mitigación: se aplica solo al modal (12 imágenes × pocos anchos) y se cachea en el CDN; no se usa en miniaturas ni en cada request.
- [La super-resolución es una reconstrucción, no detalle real] → El resultado es nítido y agradable para estas ilustraciones pastel; si se quiere fidelidad máxima, subir originales de mayor resolución.

## Open Questions

- Ninguna. Si a futuro el cliente sube los `proyecto-N` en alta resolución, se puede quitar `e_upscale` del modal y volver a `cld`.
