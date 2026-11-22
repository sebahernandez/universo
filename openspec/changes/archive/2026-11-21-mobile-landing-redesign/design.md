# Design

## Context

Ver `proposal.md` (Why/What). Stack: Astro + Tailwind v4 (`@theme` en `src/styles/global.css`), componentes `.astro` compuestos en `src/pages/index.astro`, y 3 componentes React Bits (`GradientText`, `TextLoop`, `InfiniteSpiral`). Tokens de marca (colores pastel, radios, sombras, `max-w-sitio`, breakpoint `3xl`) ya existen. El negocio es **a pedido, sin stock ni precios**. Datos de contacto/FAQ ya existen (`site.ts`, `faq.ts`). La home actual (imprenta) se reemplaza por completo.

Decisión del usuario: **rehacer todo el sitio** con el diseño de la referencia en todos los anchos (móvil = referencia, escritorio = expansión responsive), **catálogo con tabs sin precios**, navbar blanco. Restricciones que se mantienen: **Footer intacto**, **no modificar la lógica/animaciones/props internos de React Bits**, **no renderizar "Nuestros Favoritos"**.

## Goals / Non-Goals

**Goals:**
- Reproducir con alta fidelidad visual el diseño de la referencia en móvil (estilo de tarjetas, badges, colores, espaciados compactos, jerarquía).
- Una sola versión responsive por sección (sin duplicar JSX por breakpoint); en escritorio, grids más anchos del mismo diseño.
- Catálogo de productos con pestañas que filtran, sin precios; cada consulta va a contacto/WhatsApp.

**Non-Goals:**
- No se implementa carrito, checkout ni pasarela de pago.
- No se muestran precios ni stock.
- No se modifica el Footer ni la lógica interna de React Bits.
- No se construye la sección "Nuestros Favoritos".

## Decisions

### D1 — Una sola versión responsive (sin duplicar JSX)
Cada sección se construye mobile-first con utilidades base y se expande con `md:`/`lg:` (grids multicolumna, tamaños mayores). El móvil es la referencia; el escritorio es la misma estructura/contenido en anchos mayores. Alternativa descartada: dos versiones por breakpoint (`lg:hidden` / `hidden lg:block`) — más código y riesgo de divergencia; el usuario pidió una sola versión.

### D2 — Nueva arquitectura de componentes
Se crean componentes de sección nuevos y se retiran los que no están en la referencia:
- Nuevos: `Hero` (rediseño), `PorQueElegir.astro`, `Nosotros.astro` (compacto), `PromoBanner.astro`, `Testimonios.astro`, `Productos.astro` (tabs+cards), `ComoComprar.astro`, `DudasCTA.astro`, `Contacto` (reestilizado), `FaqHome.astro`, `ComunidadCTA.astro`.
- Retirados (dejan de referenciarse; pueden eliminarse): `Servicios.astro`, `ComoTrabajamos.astro`, `Proyectos.astro` (espiral), `ComprasEnvios.astro`, `QuienesSomos.astro` (su copy se remapea a `Nosotros.astro`).
- `InfiniteSpiral` deja de usarse (archivo se conserva en el repo, sin importar; no se borra para no tocar React Bits).

### D3 — Datos en `src/data/`
Contenido en archivos de datos tipados para mantener el JSX limpio y reutilizable:
- `beneficios.ts` (4 beneficios: título, texto, ícono/color).
- `productos.ts` (nombre, categoría ∈ Papelería|Stickers|Accesorios, imagen) — sin precio.
- `pasosCompra.ts` (3 pasos: número, título, texto, ícono/color).
- `testimonios.ts` (reseña, autora, estrellas) — **placeholder provisional** marcado en el archivo.
Se reutilizan `site.ts` (contacto/redes) y `faq.ts` (FAQ, fuente única).

### D4 — Catálogo con pestañas (filtrado client-side, sin framework)
Las tarjetas se renderizan todas en el HTML con `data-categoria`. Un script vanilla (como el patrón de `Header.astro`) muestra/oculta según la pestaña activa y gestiona el estado accesible (botones con `aria-selected`/`aria-controls` o `aria-pressed`, operables por teclado). No se usa React para esto (sin dependencia nueva, sin tocar React Bits).

### D5 — Sin precios; CTAs a contacto/WhatsApp
Las tarjetas de producto y "Ver todos los productos" enlazan a `#contacto` o `whatsappLink`. Los pasos de "¿Cómo comprar?" se redactan según el flujo real (elegir/consultar → coordinar compra → recibir), evitando "agrega al carrito"/"pago en línea" de la referencia.

### D6 — Destino de "Conócenos"/"Conoce más sobre nosotros"
Se añade una sección compacta `Nosotros.astro` (ancla `#nosotros`, reutilizando el copy de la actual `QuienesSomos`) como destino de esos CTAs y del enlace de navegación "Nosotros". No aparece explícita en los mockups de la referencia pero es el destino lógico de sus CTAs.

### D7 — Navbar blanco e IA de navegación
`.site-nav` pasa a fondo blanco sólido en ambos breakpoints (solo se intensifica la sombra al hacer scroll). `navLinks` se actualiza a Inicio / Productos / Nosotros / Contacto (anclas `/#inicio`, `/#productos`, `/#nosotros`, `/#contacto`). La lógica JS del menú móvil se conserva.

### D8 — React Bits conservados
`GradientText` se sigue usando para los títulos en degradado. `TextLoop` se conserva; solo cambia el **texto** que se le pasa ("Pequeños detalles, grandes historias"). No se edita ningún `.tsx` de React Bits.

### D9 — Continuidad de color entre secciones
Se reutiliza `.section-blend` con `--sec-from`/`--sec-to` encadenando cada sección con la siguiente para fundidos sin costura. El bloque final (Contacto → FAQ → Comunidad → Footer) comparte el gradiente horizontal del Footer para fluir hasta él sin modificarlo.

## Risks / Trade-offs

- **Alcance grande (reescritura de la home)** → Mitigación: construir sección por sección con verificación por tarea; reutilizar tokens/datos/imágenes existentes.
- **Fidelidad visual a la referencia** (fue el principal reparo) → Mitigación: respetar badges/pills, colores por tarjeta, números grandes, íconos en círculo y espaciados compactos del mockup; revisar cada sección contra la referencia.
- **Precios en la referencia vs. negocio sin precios** → Mitigación: catálogo sin precios; CTAs a contacto; copy de pasos adaptado.
- **Imágenes inexistentes** (productos, washi, etc.) → Mitigación: reutilizar `galeria` (proyecto-1..12) como placeholders identificables; marcar para reemplazo.
- **Tabs accesibles** → Mitigación: botones nativos con estado `aria`, operables por teclado; filtrado solo muestra/oculta nodos ya presentes (funciona sin reflow de datos).
- **Overflow horizontal 320–430 px** → Mitigación: `max-width:100%`, `min-w-0`, imágenes `object-cover/contain`, prueba en los 4 anchos.
- **Retirar secciones puede dejar anclas/links rotos** (footer y SEO apuntan a `#que-podemos-hacer`, `#compras-envios`, `#proyectos`) → Mitigación: el Footer queda intacto por requisito; revisar que sus anclas tengan destino o se mapeen (p. ej. `#proyectos` → `#productos`) sin editar el Footer si es posible; si un ancla del Footer quedara sin destino, se documenta como seguimiento (no se modifica el Footer en este cambio).

## Open Questions

- **Anclas del Footer intacto**: el Footer enlaza a `#que-podemos-hacer`, `#proyectos`, `#quienes-somos`, `#compras-envios`. Al retirar esas secciones, esos enlaces podrían no tener destino. Como el Footer no se toca, se puede (a) conservar esos `id` en las nuevas secciones equivalentes donde tenga sentido (`#quienes-somos`→Nosotros, `#proyectos`→Productos) para que sigan funcionando, o (b) aceptar que algunos no salten. Se resolverá al implementar conservando los `id` equivalentes siempre que sea posible; no cambia specs ni el enfoque.
