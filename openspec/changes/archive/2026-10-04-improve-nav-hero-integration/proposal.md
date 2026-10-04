# Proposal

## Why

El header actual (`src/components/Header.astro`) usa un degradado propio y fijo (`90deg, #fdf0f5 → … → #ece4fb`) con un `border-b border-white/40` que no coincide con el color inicial del Hero (`--color-rosa` `#fce4ec`). Esto crea una costura visible entre el menú y el fondo del Hero justo en el punto donde más impacto tiene la primera impresión del sitio, y el menú se percibe como un elemento "pegado" en vez de parte del diseño. El pedido es que el menú se sienta más integrado con el fondo del Hero y más atractivo/profesional, tanto en móvil como en desktop.

## What Changes

- El header pasa a ser una **isla flotante estilo glass**: fondo blanco semi-transparente + `backdrop-filter` blur + sombra suave + borde sutil, con esquinas redondeadas, que abarca sólo el menú (no una barra de borde a borde). El degradado del Hero se percibe por detrás y alrededor de la isla. Al desplazarse fuera del Hero, la isla se intensifica (algo más opaca y con más sombra), con transición animada que respeta `prefers-reduced-motion`. Incluye fallback para navegadores sin `backdrop-filter`.
- El menú queda **fijo (fuera del flujo)** para que el Hero quede a tope arriba, sin franja vacía por encima; el contenido del Hero recibe espacio superior para no quedar tapado por la isla.
- Las **páginas sin Hero** (contenido/legales) reservan espacio superior para que sus encabezados no queden ocultos tras el menú fijo, y los saltos por anclas posicionan el destino por debajo del menú.
- El **logo se reduce** para mantener el menú compacto (no demasiado alto).
- Los **iconos de redes** del header pasan a ser chips circulares de vidrio acordes a la isla, con leve elevación y color de marca al hover, foco visible y respeto a `prefers-reduced-motion`; se ocultan en pantallas pequeñas (las redes quedan en el menú móvil).
- Los **enlaces de escritorio** se muestran en negrita (peso 700) y color de tinta fuerte, con subrayado animado en hover/foco.
- El menú móvil desplegable se presenta como isla redondeada acorde al tema, conservando su comportamiento (abrir/cerrar con el botón, backdrop, Escape, clic en enlace, clic fuera) sin regresiones.
- No se modifican los enlaces de navegación, su orden, ni los canales de contacto (WhatsApp/redes) ya definidos en `contact-and-social`.

## Capabilities

### New Capabilities
- `site-navigation`: comportamiento visual e interactivo del menú de navegación principal (header), incluyendo su integración con el fondo del Hero, el cambio de apariencia al hacer scroll, y el menú desplegable en móvil.

### Modified Capabilities
_Ninguna. `contact-and-social` no cambia sus requisitos; el header sigue mostrando los mismos canales que ya define esa spec._

## Impact

- **Código afectado**:
  - `src/components/Header.astro` (markup de la isla, estilos `<style>` y script de estado de scroll; logo, chips de redes, enlaces en negrita).
  - `src/components/Hero.astro` (espacio superior del contenido para no quedar bajo la isla; el fondo queda a tope arriba porque el header es fijo).
  - `src/pages/preguntas-frecuentes.astro`, `src/pages/politica-cookies.astro`, `src/pages/terminos-condiciones.astro` (espacio superior para no quedar bajo el menú fijo).
  - `src/styles/global.css` (`scroll-padding-top` para que las anclas caigan bajo el menú).
- **Sin cambios de dependencias**: se implementa con CSS/Tailwind y JS vanilla, consistente con el resto del sitio (no se introduce una librería nueva).
- **Accesibilidad**: se preserva el contraste de texto/iconos sobre la isla de vidrio, el foco de teclado visible (enlaces y chips) y el soporte de `prefers-reduced-motion`.
- **No afecta**: la estructura de `navLinks` ni los canales de contacto en `src/data/site.ts`, ni el contenido/degradado `section-blend` del Hero (sólo su espaciado superior).
