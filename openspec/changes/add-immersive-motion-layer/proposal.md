# Proposal

## Why

La home de Universo Crafter se percibe estática: fuera de la cinta ondulada del Hero y de algunos `hover` de 2 px, ninguna sección reacciona al scroll, al puntero ni al tacto, y los cambios de estado (filtro de productos, carrusel de testimonios, navegación entre páginas) ocurren de golpe. Para un negocio de cotillón y creaciones personalizadas, cuyo producto es justamente la celebración, la página no transmite fiesta ni oficio. Este cambio añade una capa de movimiento e interacción sobre el contenido que ya existe, sin tocar textos, datos ni estructura de secciones.

## What Changes

Dirección creativa: **«Papel vivo»**. Todo lo que se mueve se comporta como papel, stickers y confeti: las piezas se *pegan* con un leve giro y rebote, las líneas se *recortan* con una tijera, los fondos *flotan* en capas y los momentos importantes se *celebran* con confeti en la paleta pastel del sitio.

- **Hero con entrada orquestada**: las tres líneas del título, el distintivo, el párrafo y los dos CTA entran en secuencia al cargar; la imagen de fondo tiene parallax al desplazar y piezas de papel decorativas flotan en capas que responden al puntero.
- **Revelado al scroll por sección**, cada una con su gesto propio en lugar de un mismo fade repetido:
  - *Por qué elegirnos*: las cuatro tarjetas se pegan como stickers, en cascada, y se inclinan en 3D siguiendo el puntero.
  - *Nosotros*: el texto se ilumina palabra a palabra acompañando el scroll.
  - *Cada momento*: la imagen se descubre con un recorte y parallax interno; el carrusel de testimonios pasa a tener transición entre láminas, gesto de deslizar y estrellas que se rellenan una a una.
  - *Productos*: al filtrar, las tarjetas se reordenan con animación (las que salen se encogen, las que quedan se deslizan a su nuevo lugar) y el indicador de pestaña activa se desliza; las tarjetas reaccionan al puntero.
  - *Cómo comprar*: una línea de corte punteada con una tijera recorre los tres pasos al desplazar, y cada paso se activa cuando la tijera llega.
  - *Preguntas frecuentes* y *Contacto*: entrada en cascada; el sobre decorativo flota y reacciona al puntero; los campos del formulario responden al foco.
- **Títulos de sección**: entran como sticker y, donde ya hay un tramo destacado en color, se dibuja debajo un trazo de marcador.
- **Confeti como firma**: ráfaga breve desde el botón al pulsar los CTA principales de contacto y una celebración completa al llegar a `/gracias` tras enviar el formulario.
- **Header**: se implementa la intensificación de sombra al salir del Hero (hoy el atributo `data-scrolled` existe pero ningún script lo actualiza) y se añade un indicador de progreso de lectura.
- **Transiciones entre páginas**: fundido cruzado al navegar entre la home, las páginas legales, la FAQ y `/gracias`.
- **Microinteracciones**: CTA principales magnéticos, saludo único del botón flotante de WhatsApp, aparición animada del banner de cookies.
- **Fundamentos transversales**: todo el contenido sigue visible sin JavaScript; `prefers-reduced-motion` desactiva el movimiento sin ocultar nada; en táctil se omiten los efectos que dependen del puntero; no se introduce scroll horizontal ni saltos de layout.

No cambia: textos, imágenes, orden de secciones, datos (`src/data/*`), formulario y su protección antispam, lógica de consentimiento de cookies, la cinta ondulada `TextLoop`, paleta ni tipografías.

## Capabilities

### New Capabilities

- `motion-foundations`: reglas transversales que cumple cualquier animación del sitio (movimiento reducido, contenido disponible sin JavaScript, adaptación a táctil, ausencia de scroll horizontal y de saltos de layout, pausa fuera de pantalla).
- `home-motion`: coreografía de la home sección por sección (entrada del Hero, revelados al scroll, respuesta al puntero, transición del filtro de productos y del carrusel de testimonios, línea de corte de los pasos, progreso de lectura).
- `celebration-effects`: ráfagas de confeti asociadas a acciones de contacto y a la confirmación de envío del formulario.
- `page-transitions`: transición visual al navegar entre las páginas del sitio.

### Modified Capabilities

Ninguna. La intensificación del header al desplazarse ya está exigida por `site-navigation` («La isla se intensifica al desplazarse fuera del Hero»); este cambio la implementa sin alterar el requisito. Las interacciones funcionales del carrusel y del filtro definidas por `mobile-landing-redesign` se conservan; aquí solo se añade cómo transicionan.

## Impact

- **Código**: nuevo módulo de movimiento en `src/scripts/motion/`; tokens y estados iniciales en `src/styles/global.css`; atributos declarativos y pequeños ajustes de marcado en `Hero`, `PorQueElegir`, `Nosotros`, `CadaMomento`, `Productos`, `ComoComprar`, `FaqHome`, `Contacto`, `Header`, `Footer`, `WhatsAppWidget`, `CookieConsent`; `Layout.astro` (script de arranque y transición entre páginas); `gracias.astro` (celebración). Los scripts de filtro (`Productos`) y carrusel (`CadaMomento`) se reescriben para animar el cambio de estado.
- **Dependencias**: ninguna nueva. Se usa `gsap` (ya instalado, hoy solo lo consume `TextLoop`) con sus plugins incluidos `ScrollTrigger`, `Flip` y `SplitText`. El confeti se implementa propio sobre `<canvas>`.
- **Rendimiento**: aumenta el JavaScript de cliente de la home (núcleo de `gsap` ya se descarga hoy; se suman los plugins y el módulo propio). Presupuesto y mitigaciones en `design.md`.
- **Specs existentes**: los specs principales de `site-navigation`, `hero-text-loop` y `project-gallery` siguen desactualizados porque `mobile-landing-redesign` está completo (24/24) pero sin archivar. Este cambio no depende de ellos, pero conviene archivar aquel antes de archivar este.
- **Verificación**: el proyecto no tiene pruebas ni linter; la verificación es `npm run build` más comprobación en navegador (viewports 375/768/1440, movimiento reducido emulado, JavaScript desactivado).
