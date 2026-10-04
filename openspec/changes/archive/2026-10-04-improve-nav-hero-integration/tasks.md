# Tasks

## 1. Detección de estado de scroll

- [x] 1.1 En el `<script>` de `Header.astro`, agregar un `IntersectionObserver` sobre `#inicio` que fije `data-scrolled="true"/"false"` en el `<header>` según si el Hero está o no en la parte superior; verificar el atributo en devtools al cargar (`false`) y al desplazarse más allá del Hero (`true`).
- [x] 1.2 Calcular el `rootMargin` del observer con la altura real del header (`offsetHeight`) y recomputar en `resize`; en páginas sin `#inicio` el observer no actúa; verificar que el cambio de estado coincide con el borde inferior del Hero en desktop y móvil.
- [x] 1.3 Verificar que abrir/cerrar el menú móvil no altera `header.offsetHeight` ni dispara cambios espurios de `data-scrolled` (el panel está `absolute`/fuera de flujo).

## 2. Menú fijo e isla glass

- [x] 2.1 Hacer el `<header>` `fixed` (fuera de flujo) de modo que el Hero quede a tope arriba sin franja vacía; verificar que el fondo del Hero empieza en `top:0` por detrás de la isla en desktop y móvil.
- [x] 2.2 Estilar el `<nav>` como isla de vidrio (`.site-nav`): fondo blanco semi-transparente + `backdrop-filter` blur + sombra suave + borde sutil + esquinas redondeadas, abarcando sólo el menú (no barra de borde a borde); verificar visualmente en ambos breakpoints.
- [x] 2.3 Intensificar la isla al salir del Hero (más opacidad y sombra con `data-scrolled="true"`) con transición animada envuelta en `prefers-reduced-motion`; verificar con y sin esa preferencia.
- [x] 2.4 Agregar fallback `@supports not (backdrop-filter: blur(1px))` que suba la opacidad para no perder contraste sin blur; verificar deshabilitando `backdrop-filter` en devtools.
- [x] 2.5 Presentar el panel del menú móvil como isla redondeada acorde al tema (márgenes laterales, esquinas redondeadas); verificar que se integra con la isla superior.

## 3. Espacio para el contenido bajo el menú fijo

- [x] 3.1 Añadir espacio superior al contenido del Hero (`Hero.astro`) para que el título no quede bajo la isla; verificar que el título queda por debajo del menú en desktop y móvil.
- [x] 3.2 Añadir espacio superior al `<main>` de las páginas sin Hero (`preguntas-frecuentes`, `politica-cookies`, `terminos-condiciones`) para que su encabezado no quede tapado; verificar en cada página.
- [x] 3.3 Ajustar `scroll-padding-top` en `global.css` para que los saltos por ancla caigan por debajo del menú; verificar navegando a una ancla de sección.

## 4. Logo, enlaces e iconos de redes

- [x] 4.1 Reducir el logo (`h-12 md:h-14`) para mantener la isla compacta; verificar que el logo sigue legible y la altura del menú es contenida.
- [x] 4.2 Mostrar los enlaces de escritorio en negrita (peso 700) y color de tinta fuerte, conservando el subrayado animado (`::after` + `scaleX`) en hover y `:focus-visible`; verificar con mouse y con Tab.
- [x] 4.3 Estilar los iconos de redes del header como chips circulares de vidrio (`.social-chip`) con leve elevación y color de marca al hover, foco visible y respeto a `prefers-reduced-motion`; se ocultan bajo `sm` (redes quedan en el menú móvil); verificar hover, foco y visibilidad por breakpoint.

## 5. Legibilidad y regresiones

- [x] 5.1 Verificar el contraste del logo y el botón de hamburguesa sobre la isla de vidrio en ambos estados y breakpoints.
- [x] 5.2 Probar que el menú móvil sigue abriendo/cerrando con el botón, backdrop, Escape, selección de enlace y clic fuera del header, sin regresiones.
- [x] 5.3 Ejecutar `npm run build` y verificar que compila sin errores con todos los cambios.
