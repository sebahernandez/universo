# Design

## Context

Motivación y alcance: ver `proposal.md`. Requisitos: ver `specs/`.

Estado actual relevante para el enfoque:

- Astro 7 estático, Tailwind v4 con `@theme` en `src/styles/global.css` (sin archivo de configuración), una única isla React (`TextLoop`, `client:load`) que es hoy el único consumidor de `gsap` 3.15. El paquete instalado ya incluye `ScrollTrigger`, `Flip`, `SplitText`, `MotionPathPlugin` y `DrawSVGPlugin`.
- La home son ocho componentes `.astro` sin props; cada uno trae su propio `<script>` que consulta el DOM una sola vez. `CookieConsent` es un IIFE `is:inline` que expone `window.ucConsent`.
- No hay `<ClientRouter />`: cada navegación es una carga completa. Los enlaces del menú son anclas `/#seccion`, usadas también desde otras páginas, con `scroll-behavior: smooth` y `scroll-padding-top: 8rem` nativos.
- Los cambios de estado usan `hidden` (filtro de productos, láminas del carrusel) o la clase `.hidden` (banner de cookies).
- Muchos CTA y tarjetas ya usan `hover:-translate-y-0.5`. En Tailwind v4 eso escribe la propiedad `translate`, independiente de `transform`.
- No existe recorte global de `overflow-x`. El Hero y las tarjetas de imagen son `overflow-hidden`; el sobre de Contacto y las imágenes de «Cómo comprar» sobresalen con offsets negativos.
- Los títulos usan una tipografía manuscrita cuyos glifos se recortan con facilidad; `display-title` prohíbe ese recorte.
- `Header.astro` declara `data-scrolled="false"` y la regla CSS para `true`, pero ningún script lo actualiza.
- No hay pruebas, linter ni `astro check`. La única verificación automática es `npm run build`.

## Goals / Non-Goals

**Goals:**

- Un único lenguaje de movimiento («Papel vivo») con cuatro gestos reutilizables: *pegar* (entrada con giro y rebote), *recortar* (línea que se dibuja), *flotar* (capas con profundidad) y *celebrar* (confeti).
- Mejora progresiva estricta: el HTML servido es el estado final; el movimiento se añade encima.
- Un solo punto de entrada de movimiento, declarativo por atributos `data-*`, sin nuevas islas React ni dependencias.
- Coste acotado: sin CLS añadido, animaciones solo sobre `transform`, `opacity` y `clip-path`.

**Non-Goals:**

- Cambiar copy, imágenes, orden de secciones, paleta o tipografías.
- Tocar `TextLoop` o su spec (`hero-text-loop`).
- Scroll suavizado por JavaScript, scroll-jacking o secciones fijadas (*pinning*).
- Cursor personalizado, sonido, WebGL/3D.
- Reproducción automática del carrusel de testimonios (exigiría un control de pausa visible para cumplir WCAG 2.2.2).
- Reactivar los componentes huérfanos (`Features`, `InfiniteSpiral`, `DisplayTitle`) o limpiar `content.ts`.
- Introducir un framework de pruebas.

## Decisions

### D1. GSAP + ScrollTrigger para lo ligado al scroll y al puntero; CSS para la entrada del Hero

`gsap` ya está en el bundle de la home. Se añaden `ScrollTrigger` (revelados, parallax, texto de Nosotros, línea de corte), `Flip` (filtro de productos) y `SplitText` (palabras de Nosotros, con su manejo de `aria` integrado).

La entrada del Hero se hace con `@keyframes` CSS y `animation-delay` escalonado, porque debe arrancar en el primer pintado sin esperar al módulo (requisito «Entrada orquestada del Hero») y porque el `h1` es candidato a LCP: una animación CSS que parte de `opacity: 0` y termina sola no depende de la red.

Alternativas consideradas:
- *Animaciones CSS ligadas al scroll (`animation-timeline: view()`)*: cero JavaScript, pero sin soporte en Firefox y sin equivalente para `Flip` ni para la inclinación; obligaría a mantener dos implementaciones.
- *Motion (antes Framer Motion)*: dependencia nueva y orientada a React; aquí los componentes son `.astro`.
- *`IntersectionObserver` + CSS a mano*: suficiente para los revelados, pero no para los efectos ligados al progreso del scroll ni para el reordenamiento de la cuadrícula.

### D2. Un módulo de movimiento, activado por atributos

```
src/scripts/motion/
  index.ts        arranque: registra plugins, gsap.matchMedia, llama a cada módulo
  reveal.ts       gestos de entrada por data-motion
  hero.ts         parallax del fondo y capas de papel
  tilt.ts         inclinación y botones magnéticos (solo puntero fino)
  nosotros.ts     texto iluminado por scroll
  cut-line.ts     línea de corte y tijera
  header.ts       data-scrolled y progreso de lectura
  confetti.ts     motor de confeti sobre canvas (sin gsap)
```

`Layout.astro` importa `index.ts` en un `<script>` procesado por Astro (módulo diferido, empaquetado y compartido con el chunk de `gsap` que ya usa `TextLoop`). Cada componente declara intención con atributos, por ejemplo `data-motion="pegar"`, `data-motion-group`, `data-tilt`, `data-magnetic`, `data-confetti`. Los módulos no conocen componentes concretos.

Los scripts de `Productos.astro` y `CadaMomento.astro` siguen viviendo en su componente (poseen el estado funcional) e importan `gsap`/`Flip` directamente para animar su propio cambio de estado.

Alternativa descartada: scripts de animación dentro de cada componente. Repartiría el registro de plugins, las guardas de movimiento reducido y los *breakpoints* en ocho archivos.

### D3. Estado inicial oculto solo bajo una clase que pone JavaScript, con salvavidas

Un script `is:inline` mínimo en el `<head>` añade `motion-ok` a `<html>` únicamente si `matchMedia('(prefers-reduced-motion: no-preference)')` coincide. Todo el CSS que oculta o desplaza elementos a la espera de animación cuelga de `.motion-ok [data-motion]`. El mismo script programa un temporizador de 3 s que retira `motion-ok` si el módulo no ha marcado `motion-ready`; al retirarla, el contenido queda en su estado final.

Consecuencias:
- Sin JavaScript no existe `motion-ok`: no hay nada oculto.
- Con movimiento reducido no existe `motion-ok`: no hay nada oculto y el módulo no crea animaciones.
- Si el módulo falla, el salvavidas revela todo.

Dentro del módulo, `gsap.matchMedia()` agrupa las animaciones por condición (`no-preference`, `(hover: hover) and (pointer: fine)`, `min-width: 64rem`), de modo que un cambio de preferencia en caliente las revierte solas.

Llegada por ancla: tras crear los `ScrollTrigger`, se llama a `ScrollTrigger.refresh()` y todo disparador cuyo inicio ya quedó por encima del viewport se completa de inmediato (`once` + comprobación de `progress`), para que una sección de destino nunca quede oculta.

### D4. La transformación animada va en un elemento distinto al que ya tiene `hover`

Para no pelear con `hover:-translate-y-0.5` ni con los anillos de foco:
- Inclinación 3D: la perspectiva se pone en el contenedor de la cuadrícula y la rotación (`rotateX/rotateY`, máx. 8°) en la tarjeta mediante `transform`; el `hover` existente sigue usando `translate`.
- Botón magnético: el desplazamiento (máx. 8 px) se aplica con `gsap.quickTo` sobre `x`/`y`. El área pulsable no cambia porque se desplaza el botón entero.
- Ningún ancestro de `Header`, `WhatsAppWidget` ni `CookieConsent` recibe `transform` o `filter`, para no romper su `position: fixed`.

### D5. Títulos sin máscaras

Los títulos manuscritos entran como bloque completo (opacidad, `translateY`, rotación de −3° a 0 con rebote). No se dividen en letras ni se envuelven en contenedores con `overflow: hidden`, que es lo que recortaría los glifos. El trazo de marcador es un SVG posicionado bajo el tramo destacado ya existente, dibujado con `stroke-dashoffset`, `aria-hidden` y `pointer-events: none`.

La excepción de división de texto es Nosotros: son párrafos en la tipografía sans, se dividen en palabras con `SplitText` (que conserva el texto completo para tecnologías de asistencia) y solo se anima `opacity` entre 0.66 y 1 (0.35 daba un contraste de 2:1), con contraste suficiente en el estado atenuado.

### D6. Filtro de productos con Flip, conservando `hidden` como estado final

Secuencia al pulsar una pestaña: `Flip.getState(cards)` → aplicar el estado final (`hidden` + `aria-pressed`, igual que hoy) → `Flip.from(state, { absolute: true, onEnter, onLeave })`. `onLeave` anima a escala 0.9 y opacidad 0; `onEnter` desde ahí. Antes de cada cambio se mata la animación Flip en curso, de modo que las pulsaciones rápidas siempre parten del DOM real. Con movimiento reducido se salta Flip y queda el comportamiento actual.

El indicador de pestaña activa es un elemento absoluto dentro del grupo de pestañas que se mueve a las coordenadas del botón pulsado; los botones conservan `aria-pressed` y sus estilos de texto.

El contenedor de la cuadrícula fija su altura durante la animación (`Flip` con `absolute: true` saca las tarjetas del flujo) y la libera al terminar, para cumplir «Estabilidad del layout».

### D7. Carrusel: transición sobre las láminas, `hidden` solo al terminar

Las láminas pasan a apilarse en la misma celda de una cuadrícula (`grid-area: 1 / 1`), con lo que la altura del carrusel es la de la lámina más alta y no salta al cambiar. `show(n)` anima saliente y entrante con `x` y `opacity` según la dirección y aplica `hidden` al saliente al completar. Un indicador `isAnimating` hace que una nueva petición complete al instante la transición en curso antes de iniciar la siguiente.

Deslizar: `pointerdown/move/up` con umbral de 40 px y descarte si el desplazamiento vertical supera al horizontal; `touch-action: pan-y` en el carrusel para no bloquear el scroll de la página.

### D8. Línea de corte sin rutas complejas

Los tres pasos están en fila (escritorio) o columna (móvil), así que la línea es recta: un elemento con borde punteado posicionado en el hueco entre tarjetas, revelado con `clip-path: inset()` ligado al scroll (`scrub`), y una tijera SVG cuya `x` o `y` sigue el mismo progreso. `gsap.matchMedia` elige el eje. Cada paso recibe una clase de activo cuando el progreso cruza su umbral (0, 0.5, 1). No se usa `MotionPathPlugin`.

### D9. Confeti propio sobre `<canvas>`

Un módulo de ~150 líneas: crea bajo demanda un `<canvas>` fijo a pantalla completa (`pointer-events: none`, `aria-hidden`), simula partículas (rectángulos, círculos y serpentinas con rotación, gravedad y arrastre) en los colores `*-fuerte` del tema leídos de las variables CSS, y elimina el canvas cuando no quedan partículas o a los 3 s. Límite global de partículas vivas (160 en escritorio, 80 en móvil); las ráfagas adicionales se recortan a lo que quede disponible.

Disparadores: `click` delegado sobre `[data-confetti]` (el evento `click` cubre también Enter y Espacio) sin `preventDefault`, de modo que la navegación del enlace no se retrasa; y en `/gracias`, tras pasar la guarda existente de `sessionStorage`.

Alternativa descartada: `canvas-confetti` (dependencia nueva para algo pequeño y que conviene ajustar a la paleta y a las formas de papel).

### D10. Transiciones entre páginas con la API nativa entre documentos, no con `ClientRouter`

Se añade `@view-transition { navigation: auto; }` en `global.css`, un fundido corto para `root` y `view-transition-name` en el header para que no parpadee, todo bajo `@media (prefers-reduced-motion: no-preference)`.

Por qué no `<ClientRouter />`: convertiría el sitio en navegación de cliente, y todos los scripts actuales (menú, carrusel, filtro, FAQ, WhatsApp, el IIFE de cookies, Turnstile, la guarda de `/gracias`) asumen una carga completa por página. Habría que reescribirlos sobre `astro:page-load` con riesgo real de regresión en consentimiento y formulario. La API nativa mantiene cargas completas: nada se reinicializa distinto. El coste es que los navegadores sin soporte (Firefox, a la fecha) navegan como hoy, lo que el spec acepta explícitamente.

### D11. Header: observador en lugar de escucha de scroll para el estado, ScrollTrigger para el progreso

`data-scrolled` se gobierna con un `IntersectionObserver` sobre un centinela de 1 px al inicio del documento (funciona en páginas con y sin Hero). El progreso de lectura es una barra dentro de la isla animada con `scaleX` desde un único `ScrollTrigger` de documento completo; se oculta si `scrollHeight <= innerHeight`. `header.ts` no depende de `motion-ok`: el estado de sombra es funcional (lo exige `site-navigation`) y con movimiento reducido cambia sin transición, como ya contempla el CSS del header.

### D12. Tokens de movimiento en el tema

Se añaden a `@theme` en `global.css`:

| Token | Valor | Uso |
|---|---|---|
| `--ease-papel` | `cubic-bezier(.22, 1, .36, 1)` | entradas y salidas generales |
| `--ease-pegar` | `cubic-bezier(.34, 1.56, .64, 1)` | gesto de sticker con rebote |
| `--dur-micro` | `200ms` | foco, hover |
| `--dur-entrada` | `700ms` | revelados |
| `--stagger` | `80ms` | cascadas |

Los equivalentes en GSAP (`power3.out`, `back.out(1.6)`) se centralizan en `index.ts`.

También se añade `overflow-x: clip` en `html` para garantizar «Sin desbordamiento horizontal» frente a capas decorativas y desplazamientos de entrada. Se usa `clip` y no `hidden` porque `hidden` crearía un contenedor de scroll y rompería `position: sticky` y el scroll por anclas.

### D13. Mapa de gestos por sección

| Sección | Entrada | Interacción |
|---|---|---|
| Hero | secuencia CSS: distintivo → 3 líneas → párrafo → CTA | parallax del fondo (escala 1.12 para tener margen), 6–8 piezas de papel en 3 capas, CTA magnéticos, confeti en CTA |
| Por qué elegirnos | título sticker + trazo; tarjetas *pegar* en cascada con giros alternos | inclinación 3D |
| Nosotros | título sticker | palabras iluminadas por scroll |
| Testimonios | título sticker | carrusel con transición, deslizar y estrellas |
| Productos | título, pestañas y tarjetas en cascada | Flip al filtrar, indicador deslizante, inclinación |
| Cómo comprar | tarjetas en cascada | línea de corte con tijera ligada al scroll; imágenes decorativas con parallax leve |
| FAQ | preguntas en cascada (deslizamiento lateral corto) | acordeón existente, sin cambios |
| Contacto | enlaces en cascada; panel del formulario *pegar* | sobre flotante, foco en campos, CTA magnético + confeti |
| Footer | columnas con fundido | ninguna |
| Páginas legales y FAQ | solo título | header y transición entre páginas |

En móvil se conservan entradas, Flip, carrusel, línea de corte (vertical) y confeti; se omiten inclinación, magnetismo y seguimiento del puntero, y el parallax usa la mitad de amplitud.

### D14. Navbar: la guirnalda como firma

El navbar concentra el gesto más reconocible del sitio: una guirnalda de banderines de cotillón colgada bajo la isla. Sustituye a la barra de progreso de D11 y cumple su función.

- **Guirnalda**: un SVG absoluto bajo la isla, con un cordel en curva suave y banderines triangulares (unos 14 en escritorio, 8 en móvil, ~16 px de alto). Cada banderín tiene una capa gris muy clara y otra de color; el progreso de scroll revela el color con un recorte continuo de izquierda a derecha, de modo que el avance no va a saltos.
- **Balanceo**: un único resorte amortiguado (posición y velocidad integradas en el `ticker` de `gsap`, activo solo mientras hay energía) alimentado por la velocidad de scroll de `ScrollTrigger`. Cada banderín rota alrededor de su punto de cuelgue con un pequeño desfase por índice, lo que produce la onda. Límite de 35°. El paso del puntero inyecta un impulso.
- **Entrada**: la caída con rebote se aplica a `.site-nav` (la isla), nunca a `.site-header`, porque este contiene el fondo fijo del menú móvil y un `transform` en un ancestro rompería su `position: fixed`. Es una animación CSS bajo `.motion-ok`, como la del Hero. Para no repetirse con la transición entre páginas, se omite cuando la navegación llega con transición activa (evento `pagereveal` con `viewTransition`).
- **Marcador de sección**: un elemento absoluto dentro de la lista de enlaces de escritorio, con fondo pastel y un giro leve de sticker, movido a las coordenadas del enlace activo. La sección activa se determina con `IntersectionObserver` sobre las secciones enlazadas por `navLinks`; el enlace activo recibe `aria-current="location"`. El subrayado `::after` existente se retira en favor del marcador para no duplicar la señal.
- **Aro**: `conic-gradient` en un pseudo-elemento detrás de la isla, visible como borde de 2 px, cuyo ángulo es una propiedad registrada (`@property`) escrita desde el progreso de scroll. No es un bucle temporal, así que no entra en la regla de pausar bucles.
- Con movimiento reducido: guirnalda quieta y coloreada, sin caída, aro quieto, marcador sin deslizamiento.

Alternativas descartadas: ocultar el menú al bajar y mostrarlo al subir (contradice «El menú permanece visible al desplazar» de `site-navigation`); fondo de vidrio con desenfoque (el spec vigente exige blanco sólido); aro con giro continuo por tiempo (bucle permanente siempre en pantalla).

### D15. Ajustes posteriores a la implementación

Cambios pedidos tras revisar el sitio en el navegador; prevalecen sobre lo anterior donde difieren.

- **Home**: se eliminó la tarjeta «Papelería para cada momento» (y su módulo de recorte y parallax). El orden queda Hero, Por qué elegirnos, Nosotros, Productos, Testimonios, Cómo comprar, FAQ, Contacto. El componente pasó a llamarse `Testimonios.astro`.
- **Tarjetas de producto**: solo imagen, sin nombre, categoría ni flecha, porque la inclinación 3D se lee mejor así. El nombre accesible sale del texto alternativo. La imagen mide 110 % del alto de la tarjeta para recortar la banda clara del borde inferior de las fotos.
- **Tipografía**: los títulos de sección usan Fredoka variable alojada en el sitio (`--font-titulo`); la manuscrita queda solo en el título del Hero.
- **Redes**: Facebook se retiró de todo el sitio. Los accesos a WhatsApp e Instagram son discos pastel con icono oscuro de 20 px, visibles en la barra también en móvil; el menú móvil abierto muestra Instagram con su cuenta.
- **Línea de corte**: pasa a horizontal desde `md` (48rem), donde la cuadrícula ya tiene tres columnas, no desde `lg`.
- **Guirnalda**: tres ondas (dos en móvil) con un resorte por banderín; se oculta con el menú móvil abierto y, sin JavaScript, es un patrón CSS estático. Pasa sobre el contenido al desplazar, sin interceptar clics.
- **Progreso con movimiento reducido**: la guirnalda se muestra coloreada y quieta, sin indicar avance.
- **Inclinación y magnetismo**: escriben propiedades CSS (`--rx/--ry`, `--mx/--my`) en lugar de `transform` en línea, porque `gsap` anulaba el `translate` del `hover`.

## Risks / Trade-offs

- **Más JavaScript en la home** (`ScrollTrigger`, `Flip`, `SplitText` y el módulo propio; el núcleo de `gsap` ya se descarga) → carga diferida como módulo, sin bloquear el pintado; la entrada del Hero no depende de él; presupuesto: no más de 45 KB gzip añadidos, comprobado en la salida de `npm run build`.
- **Contenido oculto si algo falla** → clase `motion-ok` puesta solo por JavaScript, salvavidas de 3 s y finalización inmediata de disparadores ya superados (D3).
- **Regresión en filtro o carrusel al reescribir sus scripts** → el estado final sigue expresándose con `hidden`, `aria-pressed` y `aria-current`, igual que hoy; la ruta de movimiento reducido es literalmente el comportamiento actual.
- **`Flip` con `absolute: true` colapsa la cuadrícula durante la animación** → altura fijada mientras dura (D6).
- **Exceso de movimiento** (las guías de UX advierten contra animarlo todo) → las entradas ocurren una sola vez; solo hay tres bucles continuos (cinta existente, piezas del Hero, sobre de Contacto) y se pausan fuera de pantalla; nada se fija ni secuestra el scroll.
- **Rendimiento en móviles modestos** → solo `transform`/`opacity`/`clip-path`; sin `will-change` permanente; menos partículas y sin efectos de puntero en táctil.
- **Piezas decorativas tapando texto del Hero** → posiciones definidas por *breakpoint* en zonas libres y comprobación explícita en 375/768/1440.
- **Transiciones entre páginas sin soporte universal** → mejora progresiva; sin soporte no cambia nada.
- **Sin pruebas automatizadas** → cada tarea indica su comprobación manual en navegador; se asume como límite conocido del proyecto.
- **Specs principales desactualizados** (`mobile-landing-redesign` completo sin archivar) → este cambio solo añade capacidades nuevas; se recomienda archivar aquel antes para que la sincronización de specs no mezcle estados.

## Migration Plan

Sitio estático sin datos: el despliegue es el habitual (push a `main` → build → rsync). Reversión: revertir el commit; no hay estado persistente nuevo salvo una marca en `sessionStorage` para el saludo de WhatsApp, inofensiva si queda huérfana.

## Open Questions

- Cantidad y forma exactas de las piezas de papel del Hero: se ajustan a ojo durante la implementación, dentro de lo que fija el spec (no cubrir texto ni CTA).
