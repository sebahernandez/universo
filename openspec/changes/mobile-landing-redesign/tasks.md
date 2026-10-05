# Tasks

## 1. Base: navbar, navegación y datos

- [x] 1.1 En `Header.astro`, cambiar `.site-nav` a **fondo blanco sólido** en móvil y escritorio (al hacer scroll solo intensifica la sombra), conservando la lógica JS del menú; verificar navbar blanco y menú móvil funcional sin errores en consola.
- [x] 1.2 En `site.ts`, actualizar `navLinks` a la nueva IA (Inicio `/#inicio`, Productos `/#productos`, Nosotros `/#nosotros`, Contacto `/#contacto`); verificar que los enlaces del header saltan a las secciones correctas.
- [x] 1.3 Crear datos tipados: `beneficios.ts` (4), `productos.ts` (nombre, categoría, imagen; sin precio), `pasosCompra.ts` (3), y actualizar `testimonios.ts` (placeholder marcado); verificar que cada archivo exporta un array tipado y compila (`npm run build`).

## 2. Hero

- [x] 2.1 Rediseñar `Hero.astro` según la referencia: badge "PAPELERÍA CREATIVA", título "Ideas que hacen tu mundo más lindo" (con `GradientText`), subtítulo, botones "Ver productos" (→ `#productos`) y "Conócenos" (→ `#nosotros`), e imagen visible en móvil y escritorio; verificar en 320/375/390/430 px sin overflow y botones en una fila sin corte de texto.
- [x] 2.2 Actualizar el texto de la cinta `TextLoop` a "Pequeños detalles, grandes historias" (solo la prop de texto, sin tocar el `.tsx`); verificar que la cinta se muestra con el nuevo texto y sigue animando.

## 3. ¿Por qué elegir? y Nosotros

- [x] 3.1 Crear `PorQueElegir.astro` consumiendo `beneficios.ts`: 4 tarjetas con ícono en círculo, título y texto, más botón "Conoce más sobre nosotros" (→ `#nosotros`); verificar 4 tarjetas legibles (grid 2×2 en móvil, fila/grid más ancho en escritorio) sin corte de texto.
- [x] 3.2 Crear `Nosotros.astro` (ancla `#nosotros`) con el copy remapeado de la actual `QuienesSomos`, reestilizado al nuevo diseño; verificar que el ancla existe y los CTAs "Conócenos"/"Conoce más sobre nosotros" llegan a esta sección.

## 4. Banner promocional

- [x] 4.1 Crear `PromoBanner.astro` ("Papelería para cada momento" + texto + imagen de marca de Cloudinary + botón "Ver colección" → `#productos`); verificar imagen con alt y proporción, CTA navega a productos, sin overflow en móvil.

## 5. Testimonios

- [x] 5.1 Crear `Testimonios.astro` ("Lo que dicen nuestras clientas") consumiendo `testimonios.ts`, con valoración (estrellas), autoría, y navegación anterior/siguiente + indicadores operables por teclado y con etiquetas accesibles; verificar que muestra una reseña, se navega entre varias y no hay scroll horizontal.

## 6. Productos (catálogo con tabs)

- [x] 6.1 Crear `Productos.astro` consumiendo `productos.ts`: subtítulo + grid de tarjetas (imagen con alt, nombre, categoría, **sin precios**), cada tarjeta y "Ver todos los productos" enlazan a `#contacto`/WhatsApp; verificar que no aparece ningún precio y los enlaces llevan a contacto.
- [x] 6.2 Implementar las **pestañas de categoría** (Todos, Papelería, Stickers, Accesorios) con filtrado client-side (vanilla JS, `data-categoria`), botones con estado `aria` operables por teclado; verificar que seleccionar una categoría filtra las tarjetas, "Todos" las muestra todas, y el estado activo se comunica de forma accesible.

## 7. ¿Cómo comprar?

- [x] 7.1 Crear `ComoComprar.astro` consumiendo `pasosCompra.ts`: 3 pasos numerados (01/02/03) con número destacado, ícono, título y descripción **coherente con el flujo real** (sin carrito ni pago en línea); verificar los 3 pasos legibles en móvil y escritorio.

## 8. CTA de dudas

- [x] 8.1 Crear `DudasCTA.astro` ("¿Tienes alguna duda?" + "Estamos para ayudarte" + botón "Contáctanos" → `#contacto`); verificar que el botón navega a la sección de contacto.

## 9. Contacto

- [x] 9.1 Reestilizar `Contacto.astro` al diseño de la referencia: subtítulo, tarjetas de contacto (Correo `mailto:` + Instagram) y formulario (Nombre, Correo, Mensaje, "Enviar mensaje") **conservando** el envío Web3Forms + Turnstile y el honeypot/replyto; verificar que el formulario valida campos requeridos y conserva su lógica, sin overflow en móvil.

## 10. FAQ en la home

- [x] 10.1 Crear `FaqHome.astro` (acordeón accesible, p. ej. `<details>`/`<summary>`) reutilizando `faq.ts` (fuente única; subconjunto admisible) con enlace a `/preguntas-frecuentes`; verificar expandir/colapsar por teclado, estado comunicado, textos coincidentes con la página y sin tocar el JSON-LD existente.

## 11. Comunidad

- [x] 11.1 Crear `ComunidadCTA.astro` ("Únete a nuestra comunidad creativa" + imagen + botón "Síguenos en Instagram") usando `site.instagram` con `target="_blank"` y `rel="noopener"`; verificar que abre el perfil correcto en pestaña nueva.

## 12. Composición de la home y retiro de secciones

- [x] 12.1 Reescribir `index.astro` con el orden de la referencia: Hero → PorQueElegir → PromoBanner → Testimonios → Productos → ComoComprar → DudasCTA → Contacto → FaqHome → ComunidadCTA → Footer; incluir `Nosotros` como destino de `#nosotros`; verificar que la home renderiza todas las secciones en orden.
- [x] 12.2 Dejar de importar/renderizar `Servicios`, `ComoTrabajamos`, `Proyectos` (espiral), `ComprasEnvios` y `QuienesSomos`; conservar `id` equivalentes donde el Footer intacto los necesite (`#quienes-somos`→Nosotros, `#proyectos`→Productos) para no romper sus enlaces; verificar que los enlaces del Footer siguen saltando a una sección existente.

## 13. Integración y validación final

- [x] 13.1 Confirmar que el **Footer** (`Footer.astro`) no fue modificado (`git diff` vacío en ese archivo).
- [x] 13.2 Confirmar que **no** existe ni se renderiza la sección "Nuestros Favoritos"; verificar ausencia en `index.astro` y componentes.
- [x] 13.3 Verificar ausencia de overflow horizontal y textos cortados en 320/375/390/430 px en toda la home.
- [x] 13.4 Verificar la presentación responsive en escritorio (≥1024 px): los grids se expanden correctamente y el diseño se ve coherente con la referencia.
- [x] 13.5 Confirmar que la lógica/animaciones/props internos de React Bits (`GradientText`, `TextLoop`) no se modificaron (solo se cambió el texto pasado a `TextLoop`) y que `InfiniteSpiral` ya no se importa.
- [x] 13.6 Ejecutar `npm run build` y confirmar que compila sin errores de Astro/TypeScript/JS.
