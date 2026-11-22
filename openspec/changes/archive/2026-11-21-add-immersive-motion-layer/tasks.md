# Tasks

Verificación en navegador: `npm run dev` (o `npm run build && npm run preview`) en viewports de 375, 768 y 1440 px. «Movimiento reducido» se emula desde las herramientas de desarrollo (Rendering → `prefers-reduced-motion: reduce`).

## 1. Fundamentos de movimiento

- [x] 1.1 Añadir a `@theme` en `src/styles/global.css` los tokens `--ease-papel`, `--ease-pegar`, `--dur-micro`, `--dur-entrada` y `--stagger`, y `overflow-x: clip` en `html`; verificar que `npm run build` pasa y que en 320 px la home no admite scroll horizontal y los enlaces de ancla del menú siguen llegando bajo el header fijo.
- [x] 1.2 Añadir en el `<head>` de `src/layouts/Layout.astro` el script `is:inline` que pone la clase `motion-ok` en `<html>` solo con `prefers-reduced-motion: no-preference` y la retira a los 3 s si no existe `motion-ready`; verificar en el inspector que la clase aparece con movimiento permitido, no aparece con movimiento reducido ni con JavaScript desactivado.
- [x] 1.3 Crear `src/scripts/motion/index.ts` (registro de `ScrollTrigger`, contexto `gsap.matchMedia` para `no-preference`, puntero fino y `min-width: 64rem`, marca `motion-ready`, constantes de easing) e importarlo desde `Layout.astro`; verificar que `npm run build` pasa, que `motion-ready` aparece en `<html>` al cargar y que la consola no muestra errores en ninguna de las cinco páginas.
- [x] 1.4 Añadir en `global.css` los estados iniciales de los gestos (`pegar`, `subir`, `lateral`, `fundido`) bajo `.motion-ok [data-motion]` y crear `src/scripts/motion/reveal.ts` con revelado único por elemento, cascada por `data-motion-group` y finalización inmediata de los disparadores que ya quedaron por encima del viewport; verificar con un elemento de prueba que se revela una sola vez, que al cargar `/#contacto` directamente la sección de destino se ve completa y que bloqueando la petición del módulo (DevTools → bloquear URL) todo el contenido es visible a los 3 s.
- [x] 1.5 Hacer que los bucles continuos creados por la capa de movimiento se pausen fuera del viewport y con la pestaña oculta (utilidad compartida en `index.ts`); verificar en el panel de rendimiento que no hay fotogramas de animación propios con el elemento fuera de pantalla ni con la pestaña en segundo plano.

## 2. Hero

- [x] 2.1 Implementar en `Hero.astro` la entrada en secuencia con `@keyframes` CSS (distintivo, tres líneas del `h1`, párrafo, CTA) bajo `.motion-ok`, sin contenedores con `overflow: hidden` sobre el título; verificar que la secuencia termina en ≤ 1.6 s, que ocurre aunque se bloquee el módulo de movimiento, que ninguna tilde ni descendente del título se recorta y que con movimiento reducido el Hero aparece completo sin animar.
- [x] 2.2 Añadir el parallax de la imagen de fondo (escala de margen 1.12, móvil y escritorio) en `src/scripts/motion/hero.ts`; verificar al desplazar que el fondo se mueve más lento que el texto y que no aparecen bordes vacíos en 375 y 1440 px.
- [x] 2.3 Añadir las piezas de papel decorativas en tres capas (`aria-hidden`, `pointer-events: none`, colores `*-fuerte` del tema), con flotación continua y respuesta al puntero solo con puntero fino; verificar en 375/768/1440 que ninguna cubre título, párrafo ni CTA, que los CTA siguen siendo pulsables, que un lector de pantalla (o el árbol de accesibilidad) no las expone y que no hay scroll horizontal.
- [x] 2.4 Comprobar que la cinta `TextLoop` se ve y se comporta igual que antes (posición, pausa al pasar el ratón, estática con movimiento reducido); verificar comparando con `main` en 375 y 1440 px.

## 3. Header y progreso de lectura

- [x] 3.1 Crear `src/scripts/motion/header.ts` que gobierne `data-scrolled` con un `IntersectionObserver` sobre un centinela al inicio del documento; verificar que la sombra de la isla se intensifica al salir de la parte superior en la home y en `/terminos-condiciones`, que vuelve al subir y que con movimiento reducido el cambio ocurre sin transición.
- [x] 3.2 Añadir la barra de progreso de lectura dentro de la isla del header, animada con `scaleX`; verificar que avanza de vacío a completo al recorrer la home, que no cambia el tamaño ni la posición del menú, que no se muestra en una página sin scroll (`/gracias`) y que el menú móvil abre y cierra con botón, fondo, Escape y clic en enlace como antes.

## 4. Revelados y títulos por sección

- [x] 4.1 Añadir los atributos de revelado a `PorQueElegir`, `Nosotros`, `Productos`, `ComoComprar`, `FaqHome`, `Contacto` y `Footer` según el mapa de gestos de `design.md` (D13), con cascada en tarjetas, pasos, preguntas y enlaces de contacto; verificar recorriendo la home que cada sección se revela una sola vez, que los grupos entran en cascada y que el gesto difiere entre secciones contiguas.
- [x] 4.2 Implementar el gesto de sticker en los títulos de sección y el trazo de marcador SVG bajo los tramos destacados existentes; verificar que el trazo se dibuja tras asentarse el título, que queda alineado bajo el tramo en 375 y 1440 px, que no se recorta ningún glifo y que el trazo no aparece en el árbol de accesibilidad.
- [x] 4.3 Aplicar el revelado de solo título a `preguntas-frecuentes`, `politica-cookies` y `terminos-condiciones`; verificar que el resto del texto legal es visible de inmediato y que el acordeón `<details>` de la página de FAQ funciona igual.
- [x] 4.4 Verificar los fundamentos sobre lo construido hasta aquí: con JavaScript desactivado y con movimiento reducido la home muestra todas las secciones en estado final; con Lighthouse o el panel de rendimiento el CLS de la home no supera en más de 0.02 al de `main`.

## 5. Respuesta al puntero

- [x] 5.1 Crear `src/scripts/motion/tilt.ts` con la inclinación 3D (máx. 8°, retorno en < 600 ms) para `[data-tilt]` y aplicarla a las tarjetas de beneficios y de productos, con la perspectiva en el contenedor; verificar en escritorio que la tarjeta sigue al puntero y vuelve al reposo, que el `hover` de elevación y el anillo de foco se conservan, que el enlace de la tarjeta navega igual y que en emulación táctil ninguna tarjeta queda inclinada tras tocarla.
- [x] 5.2 Añadir el efecto magnético (máx. 8 px) para `[data-magnetic]` y marcar los CTA principales de Hero, Por qué elegirnos, Cada momento y Contacto; verificar que el botón se acerca al puntero, vuelve a su sitio, sigue siendo pulsable en toda su superficie y no se activa en táctil.

## 6. Nosotros y Cada momento

- [x] 6.1 Crear `src/scripts/motion/nosotros.ts` con la división en palabras (`SplitText`) y la opacidad ligada al scroll entre 0.35 y 1; verificar que las palabras se iluminan en orden de lectura, que al final todo el texto está a pleno contraste, que el estado atenuado cumple 4.5:1 sobre el fondo de la sección y que el árbol de accesibilidad expone los párrafos como texto corrido.
- [x] 6.2 Implementar en `CadaMomento.astro` el recorte de entrada de la imagen y su parallax interno; verificar que la imagen se descubre progresivamente, que no aparecen huecos en los bordes al desplazar y que título, párrafo y CTA superpuestos siguen legibles en 375 y 1440 px.
- [x] 6.3 Reescribir el script del carrusel de testimonios: láminas apiladas en una misma celda, transición direccional ≤ 500 ms, `hidden` aplicado al terminar, relleno secuencial de estrellas y protección ante pulsaciones rápidas; verificar con anterior/siguiente y con los puntos que se muestra siempre un único testimonio correcto, que `aria-current` se actualiza, que la altura del carrusel no salta y que con movimiento reducido el cambio es instantáneo.
- [x] 6.4 Añadir el gesto de deslizar al carrusel (umbral 40 px, `touch-action: pan-y`); verificar en emulación táctil que deslizar a izquierda/derecha cambia de testimonio y que deslizar en vertical desplaza la página sin cambiarlo.

## 7. Productos

- [x] 7.1 Reescribir el script de filtro de `Productos.astro` con `Flip` (estado final con `hidden` y `aria-pressed` como hoy, entrada/salida animadas, altura de la cuadrícula fijada durante la animación, cancelación de la animación en curso); verificar que cada pestaña muestra exactamente las mismas tarjetas que en `main`, que la animación completa en ≤ 600 ms, que pulsar pestañas rápidamente termina en el estado de la última, que las tarjetas ocultas no reciben foco y que con movimiento reducido el filtrado es instantáneo.
- [x] 7.2 Añadir el indicador deslizante de pestaña activa; verificar que se desplaza a la pestaña pulsada, que se recoloca al cambiar el ancho de la ventana y cuando las pestañas saltan de línea en 375 px, y que el texto de las pestañas mantiene contraste suficiente sobre el indicador.

## 8. Cómo comprar y Contacto

- [x] 8.1 Crear `src/scripts/motion/cut-line.ts` y el marcado de la línea punteada y la tijera en `ComoComprar.astro` (horizontal desde `lg`, vertical por debajo), con activación de cada paso al ser alcanzado; verificar que la tijera avanza y retrocede con el scroll, que los pasos se activan en orden 1-2-3, que la línea no pasa sobre el texto en 375 ni en 1440 px y que con movimiento reducido la línea se muestra completa y estática.
- [x] 8.2 Añadir parallax leve a las imágenes decorativas de los pasos; verificar que no generan scroll horizontal ni tapan el título o el texto del paso.
- [x] 8.3 Añadir en `Contacto.astro` la flotación del sobre (con reacción al puntero en escritorio) y la respuesta visual al foco en campos y etiquetas; verificar que el sobre se pausa fuera del viewport, que no tapa campos ni el widget de Turnstile, y que un envío de prueba del formulario llega a `/gracias` igual que antes.

## 9. Confeti

- [x] 9.1 Crear `src/scripts/motion/confetti.ts` (canvas fijo creado bajo demanda, partículas con los colores `*-fuerte` del tema, límite de 160/80 partículas vivas, retirada del canvas a los 3 s como máximo, sin efecto con movimiento reducido); verificar disparándolo desde la consola que el canvas desaparece del DOM al terminar, que no intercepta clics y que diez disparos seguidos no degradan la fluidez.
- [x] 9.2 Conectar la ráfaga por delegación de `click` a los CTA de contacto marcados con `data-confetti` (WhatsApp y enlaces a `#contacto`); verificar con ratón y con Enter que la ráfaga sale desde el botón, que el enlace abre WhatsApp o desplaza a Contacto sin demora y que con movimiento reducido no aparece confeti.
- [x] 9.3 Lanzar la celebración en `gracias.astro` después de superar la guarda de `sessionStorage`; verificar que tras un envío de prueba se lanza una sola vez, que la cuenta regresiva y la redirección funcionan igual, y que abrir `/gracias` directamente redirige a la home sin confeti.

## 10. Flotantes y transiciones entre páginas

- [x] 10.1 Añadir el saludo único del botón de WhatsApp (a los 8 s, una vez por sesión mediante `sessionStorage`, omitido si el panel ya se abrió); verificar que saluda una vez, que no se repite al navegar a otra página en la misma sesión y que el panel abre y cierra como antes.
- [x] 10.2 Animar la entrada y la salida del banner de cookies sin cambiar su lógica (`hidden` aplicado al terminar la salida); verificar en una ventana privada que el banner entra en ≤ 400 ms en la misma posición de antes, que Aceptar y Rechazar guardan `uc:consent` igual, que «Preferencias de cookies» del footer lo reabre y que tras cerrarse no recibe foco ni se solapa con el botón de WhatsApp en 375 px.
- [x] 10.3 Añadir en `global.css` la transición entre documentos (`@view-transition`, fundido de `root`, `view-transition-name` para el header) bajo `prefers-reduced-motion: no-preference`; verificar en Chrome que navegar entre home, legales y FAQ muestra el fundido con el header estable, que en Firefox la navegación funciona igual que antes, y que tras navegar funcionan el menú móvil, «Preferencias de cookies» y el enlace «Productos» desde `/preguntas-frecuentes`.

## 11. Integración

- [x] 11.1 Ejecutar `npm run build` y comparar el JavaScript de cliente de la home con `main`; verificar que el incremento no supera 45 KB gzip y que el build no emite advertencias nuevas.
- [x] 11.2 Recorrido completo de la home y las cuatro páginas restantes en 375, 768 y 1440 px; verificar que no hay scroll horizontal, ningún glifo recortado, ningún contenido oculto, el orden de tabulación coincide con el visual y todos los anillos de foco son visibles.
- [x] 11.3 Repetir el recorrido con movimiento reducido y con JavaScript desactivado; verificar que todo el contenido está en estado final, que no hay confeti ni transiciones y que filtro, carrusel, FAQ, menú y formulario funcionan (los que dependen de JavaScript, solo en el caso de movimiento reducido).
- [x] 11.4 Ejecutar `openspec validate add-immersive-motion-layer --strict`; verificar que no reporta errores ni advertencias.

## 12. Navbar con guirnalda

- [x] 12.1 Reemplazar la barra de progreso del header por la guirnalda de banderines (SVG decorativo bajo la isla, `aria-hidden`, `pointer-events: none`, colores `*-fuerte` del tema) que se colorea de izquierda a derecha con el progreso de scroll; verificar que avanza de 0 a 100 % al recorrer la home, que en una página sin scroll se muestra completa, que no cambia la geometría de la isla respecto de antes, que un enlace bajo la guirnalda recibe el clic y que en 375 px no tapa logo, botón de menú ni el menú abierto.
- [x] 12.2 Balancear los banderines con la velocidad del scroll (máx. 35°, reposo en < 1.5 s) y ondularlos al pasar el puntero por la isla en escritorio; verificar con números el ángulo máximo y el tiempo de reposo, y que con movimiento reducido la guirnalda queda quieta y coloreada.
- [x] 12.3 Añadir la entrada de la isla (caída con rebote y despliegue de la guirnalda, ≤ 1.2 s) aplicando la transformación a la isla y no a un ancestro del fondo fijo del menú móvil; verificar la duración, que el menú móvil abre y cierra con botón, fondo, Escape y enlace, que el fondo del menú móvil sigue cubriendo todo el viewport y que tras una navegación interna con transición entre páginas la caída no se repite.
- [x] 12.4 Añadir el marcador de sección activa en el menú de escritorio (seguimiento de la sección visible, deslizamiento entre enlaces, seguimiento del puntero, `aria-current` en el enlace activo); verificar que al recorrer la home el marcador pasa por los enlaces en orden, que vuelve al activo al retirar el puntero, que el contraste del texto sobre el marcador es ≥ 4.5:1 y que en las páginas legales solo aparece con el puntero.
- [x] 12.5 Añadir el aro de degradado en el borde de la isla con giro ligado al scroll, conservando el fondo blanco sólido y la intensificación de sombra existente; verificar que el aro gira solo al desplazar, que el fondo de la isla sigue siendo blanco opaco y que logo, enlaces e iconos conservan su contraste.
- [x] 12.6 Integración del navbar: `npm run build`, recorrido de las cinco páginas en 375, 768 y 1440 px con movimiento permitido, con movimiento reducido y con JavaScript desactivado; verificar que no hay scroll horizontal, que el menú es utilizable en los tres modos, que el incremento total de JavaScript de la home sigue dentro de 45 KB gzip respecto de `main` y que `openspec validate add-immersive-motion-layer --strict` pasa.

## 13. Ajustes tras la revisión

- [x] 13.1 Dejar las tarjetas de producto solo con la imagen a tamaño completo, conservando la inclinación 3D; verificado en 375 y 1440 px que la imagen llena la tarjeta y que el filtro muestra las mismas tarjetas.
- [x] 13.2 Eliminar la tarjeta «Papelería para cada momento» y su módulo de movimiento, y ubicar Productos bajo Nosotros con Testimonios a continuación; verificado el orden de secciones, el carrusel y el marcador del menú.
- [x] 13.3 Mostrar WhatsApp e Instagram en la barra móvil y añadir las redes con su cuenta al menú móvil; verificado sin desbordamiento en 320, 375 y 430 px.
- [x] 13.4 Rediseñar los chips de redes del header como discos pastel con icono oscuro de 20 px; verificado por captura en escritorio y móvil.
- [x] 13.5 Cambiar la tipografía de los títulos de sección a Fredoka manteniendo la manuscrita en el Hero; verificado que carga y que ningún título desborda en 375 y 1440 px.
- [x] 13.6 Retirar Facebook de componentes, datos, datos estructurados y textos; verificado que no queda ninguna mención en `src` ni en `dist`.

## Workflow follow-up

- Archivar primero `mobile-landing-redesign` (completo, 24/24) para que los specs principales reflejen la home actual antes de sincronizar este cambio.
- Archivar este cambio cuando la verificación esté completa y seguir la guía de publicación de `openspec/config.yaml` (confirmar commit, push y zip).
