# Tasks

## 1. Helpers de super-resolución

- [x] 1.1 En `src/lib/cloudinary.ts` añadir `cldHiRes(input, width?)` y `cldHiResSrcset(input, widths)` que antepongan `e_upscale/` a la transformación base (`f_auto,q_auto,w_N,c_limit`). Verificar que la URL generada contiene `/upload/e_upscale/`.

## 2. Modal en máxima calidad

- [x] 2.1 En `src/components/Proyectos.astro` hacer que `data-full`/`data-srcset` del modal usen `cldHiRes`/`cldHiResSrcset(item.src, [900,1200,1600])`. La miniatura sigue con `cld`. Verificar en el HTML que `data-full` del modal lleva `e_upscale`.
- [x] 2.2 Conservar la presentación del modal (tamaño del panel, `object-cover`, reveal on-load). Verificar que la imagen respeta el tamaño del modal.

## 3. Verificación

- [x] 3.1 Verificar por red que los 12 `proyecto-N` con `e_upscale` devuelven 200 y suben la resolución real (386×310 → ~1544×1240), entregándose como WebP optimizado (~90–112KB a w_1600).
- [x] 3.2 Ejecutar `npm run build`: OK. La miniatura se mantiene liviana (~22KB) y sin `e_upscale`.
- [ ] 3.3 (Revisión visual del usuario) Abrir el modal en `npm run preview` y confirmar que se ve nítido a tamaño de modal.
