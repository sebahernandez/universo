# Proposal

## Why

La landing actual (taller de impresión: "No sólo imprimimos", "¿Qué podemos hacer?", galería en espiral, "Cómo trabajamos", "Compras y envíos") no refleja la nueva propuesta de marca de la referencia de diseño: una tienda de papelería creativa, clara y moderna, pensada mobile-first, con catálogo de productos por categorías, pasos de compra, testimonios y CTAs. Se rehace la home completa para adoptar fielmente el diseño de la referencia en **todos los anchos** (móvil como la referencia; escritorio como expansión responsive del mismo diseño).

## What Changes

- **Rediseño completo de la home** en una sola versión responsive (sin duplicar JSX por breakpoint). El móvil replica la referencia; el escritorio es la misma estructura/contenido adaptada a grids más anchos.
- **Nueva arquitectura de secciones** (orden de la referencia):
  1. **Hero**: badge "PAPELERÍA CREATIVA", título "Ideas que hacen tu mundo más lindo" (con lettering en degradado), subtítulo, botones "Ver productos" y "Conócenos", imagen, y la cinta "Pequeños detalles, grandes historias".
  2. **¿Por qué elegir Universo Crafter?**: 4 tarjetas de beneficio con ícono en círculo (Diseños únicos, Calidad de papel, Envíos a todo Chile, Hecho con amor) + botón "Conoce más sobre nosotros".
  3. **Papelería para cada momento**: banner promocional con imagen + "Ver colección".
  4. **Lo que dicen nuestras clientas**: carrusel de testimonios (placeholder).
  5. **Nuestros Productos**: subtítulo + **tabs de categoría** (Todos, Papelería, Stickers, Accesorios) que **filtran** tarjetas de producto (Cuadernos, Stickers, Sets creativos, Accesorios) **sin precios**, cada una con imagen, nombre y categoría; botón "Ver todos los productos".
  6. **¿Cómo comprar?**: 3 pasos numerados (01/02/03) con ícono y color.
  7. **¿Tienes alguna duda?**: bloque CTA con botón "Contáctanos".
  8. **Contáctanos**: tarjetas de contacto (Correo, Instagram) + formulario (Nombre, Correo, Mensaje) — se conserva el envío Web3Forms + Turnstile.
  9. **Preguntas Frecuentes**: acordeón reutilizando `faq.ts`.
  10. **Únete a nuestra comunidad creativa**: CTA a Instagram con imagen.
  11. **Footer**: intacto.
- **Navbar con fondo blanco sólido** en móvil y escritorio. Enlaces de navegación actualizados a la nueva IA (Inicio, Productos, Nosotros, Contacto).
- **Secciones actuales retiradas** por no estar en la referencia: la **galería en espiral** (`InfiniteSpiral`), "¿Qué podemos hacer?" (servicios), "Cómo trabajamos" y "Compras y envíos" en su forma actual. Su contenido relevante se remapea a las nuevas secciones (p. ej. envíos → beneficio/CTA; pasos de compra → "¿Cómo comprar?").
- **No se renderiza "Nuestros Favoritos"**.
- **Catálogo sin precios**: el negocio es a pedido; las tarjetas muestran nombre/categoría y enlazan a contacto/WhatsApp, sin precios ni carrito.
- **React Bits intactos**: no se modifica la lógica/animación interna de `GradientText`, `TextLoop` ni `InfiniteSpiral`. `GradientText` y `TextLoop` se siguen usando (se actualiza solo el *texto* de la cinta). `InfiniteSpiral` deja de usarse.

Notas de decisión (ver `design.md`):
- Copys que implican carrito/checkout ("agrega al carrito", "pago seguro") se adaptan al flujo real basado en contacto/WhatsApp, manteniendo el espíritu de la referencia.
- Imágenes inexistentes se cubren con placeholders claros (se reutilizan las imágenes de Cloudinary existentes de `galeria`).

## Capabilities

### New Capabilities
- `landing-hero`: Encabezado principal de la home con badge, título en degradado, subtítulo, doble CTA (ver productos / conócenos) e imagen.
- `why-choose-us`: Sección de 4 beneficios de marca con ícono, título y texto, más un CTA a "sobre nosotros".
- `product-catalog`: Catálogo de productos por categorías con pestañas que filtran tarjetas (sin precios), cada tarjeta enlaza a contacto/WhatsApp.
- `purchase-steps`: Sección "¿Cómo comprar?" con 3 pasos numerados, cada uno con ícono, título y descripción.
- `home-testimonials`: Carrusel de testimonios de clientas con valoración y autoría (placeholder provisional).
- `home-faq`: Acordeón de preguntas frecuentes en la home reutilizando la fuente única `faq.ts`.
- `home-engagement-ctas`: Bloques de llamado a la acción de la home: banner "Papelería para cada momento" (→ colección) y "Únete a la comunidad" (→ Instagram), más el CTA "¿Tienes alguna duda?" (→ contacto).

### Modified Capabilities
- `site-navigation`: El header pasa a **fondo blanco sólido** por defecto en móvil y escritorio (en vez de la isla de vidrio semitransparente).
- `hero-text-loop`: La cinta del Hero muestra **"Pequeños detalles, grandes historias"** (en lugar de "Papelería creativa ✦ Hecha para recordar"), conservando su integración visual y comportamiento.

### Removed Capabilities
- `project-gallery`: Se retira la galería de proyectos en espiral (`InfiniteSpiral`); los productos pasan a presentarse en `product-catalog`.

## Impact

- **Código afectado:**
  - `src/pages/index.astro`: nueva composición de secciones.
  - `src/components/Header.astro`: navbar blanco; `src/data/site.ts`: `navLinks` a la nueva IA.
  - Nuevos componentes de sección: `Hero` (rediseño), `PorQueElegir.astro`, `Productos.astro` (con tabs), `ComoComprar.astro`, `Testimonios.astro`, `FaqHome.astro`, `PromoBanner.astro`, `ComunidadCTA.astro`, `DudasCTA.astro` (o equivalentes).
  - Nuevos datos: `src/data/` para beneficios, productos/categorías, pasos de compra y testimonios (placeholder).
  - `src/components/Contacto.astro`: ajuste de copy/estilo al diseño de la referencia (se conserva el formulario Web3Forms + Turnstile).
  - Se dejan de usar: `Servicios.astro`, `ComoTrabajamos.astro`, `Proyectos.astro` (espiral), `ComprasEnvios.astro`, `QuienesSomos.astro` (su contenido se remapea; archivos pueden eliminarse o quedar sin referenciar).
  - `src/styles/global.css`: reutilizar tokens; añadir utilidades solo si son imprescindibles.
- **No se modifica:** Footer (`Footer.astro`), ni la lógica/props internos de los componentes de React Bits.
- **Datos/recursos:** se reutilizan imágenes de Cloudinary (`galeria`, íconos) como placeholders donde la referencia no tenga asset propio.
- **Dependencias:** ninguna nueva.
- **SEO/estructura:** la FAQ en home usa la misma fuente que `/preguntas-frecuentes`; revisar que el JSON-LD del sitio siga coherente tras remapear secciones y anclas.
