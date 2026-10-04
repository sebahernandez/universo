# Design

## Context

`Header.astro` se renderiza como hermano de `<main>` (ver `src/pages/index.astro`) y las páginas de contenido (`preguntas-frecuentes`, `politica-cookies`, `terminos-condiciones`) lo incluyen antes de un `<main>` de texto. El Hero (`<section id="inicio" class="section-blend …">`) es el primer bloque de `main` en la home; su color superior es `--color-rosa` y funde hacia `--color-celeste` (`.section-blend` en `global.css`). El resto de secciones usan `section-blend` con otras combinaciones, así que la isla debe ser legible sobre cualquier fondo, no sólo sobre el Hero.

El sitio no usa framework de estado (Astro + islas React puntuales + JS vanilla). El patrón del header es un `<script>` inline con listeners de DOM directos. Ver `proposal.md` - Why/What Changes para la motivación y alcance.

## Goals / Non-Goals

**Goals:**
- Presentar el menú como una isla flotante de vidrio (glass) que sólo abarca al menú, dejando ver el Hero por detrás, y que el Hero quede a tope arriba sin franja vacía.
- Mantener la legibilidad del logo, los enlaces, el botón de menú y los iconos de redes en todos los estados y sobre todas las secciones.
- Expresar el estado visual en CSS (controlado por un atributo), con transición animable que respete `prefers-reduced-motion`.

**Non-Goals:**
- No se rediseña el contenido del Hero ni su `section-blend` (sólo su espaciado superior).
- No se introduce una librería de scroll/animación nueva; se reutiliza el enfoque vanilla del componente.
- No se cambian los enlaces de navegación, su orden, ni los canales de contacto.
- No se implementa resaltado de "sección actual" (scroll-spy); sólo hover/foco en los enlaces.

## Decisions

### Menú fijo (fuera de flujo) para que el Hero quede a tope arriba
El header es `fixed` en la parte superior, fuera del flujo del documento. Así el Hero (primer elemento de `main`) sube hasta `top:0` y su degradado llega al borde superior, por detrás de la isla; no queda franja vacía.

- **Por qué**: cumple el requisito de "Hero a tope arriba" de forma robusta, sin márgenes negativos frágiles que deban igualar exactamente la altura del header.
- **Consecuencia**: el contenido que iría bajo el menú debe reservar espacio superior propio (ver siguiente decisión).
- **Alternativa considerada**: header `sticky` (en flujo) + margen negativo en el Hero para subirlo tras el menú. Se descarta porque el margen negativo depende de igualar la altura real del header por breakpoint (frágil).

### Reserva de espacio superior por página en vez de un spacer global
El contenido del Hero recibe `padding-top` suficiente para quedar bajo la isla; las páginas sin Hero añaden `padding-top` a su `<main>`; y `scroll-padding-top` en `global.css` hace que las anclas caigan bajo el menú.

- **Por qué**: con el header fijo, cada página reserva su propio espacio. La home mantiene el fondo del Hero a tope (sólo su contenido se desplaza), y las páginas de texto evitan que su encabezado quede tapado. Sobre-reservar es inocuo; igualar exacto no es necesario.
- **Alternativa considerada**: `padding-top` global en `main`. Se descarta porque la home necesita el Hero a tope (sin padding) mientras las páginas de texto sí lo necesitan; un único valor global no sirve para ambos.

### Detección del umbral con IntersectionObserver
Un `IntersectionObserver` sobre `#inicio` conmuta `data-scrolled` en el `<header>` según si el Hero está o no en la parte superior; el `rootMargin` se calcula con la altura real del header (`offsetHeight`). En páginas sin `#inicio` el observer no actúa y la isla permanece en su estado base.

- **Por qué**: la altura del Hero varía por breakpoint/contenido; un umbral en píxeles quedaría descalibrado. El observer evita trabajo por frame para un estado binario.
- **Alternativa considerada**: listener de `scroll` con `getBoundingClientRect()` (como el parallax del Hero). Viable pero corre por frame; se prefiere el observer y no acoplar ambos componentes.

### Estado visual como atributo de datos + CSS
El header expone `data-scrolled="true|false"` y toda la apariencia de la isla (fondo, blur, sombra, borde) se define en el `<style>` del componente con `transition`, igual que el patrón `data-open`/`aria-expanded` ya presente.

- **Por qué**: coherente con las convenciones del archivo; la lógica visual vive en CSS y la detección en JS mínima.

### Isla glass con `backdrop-filter` y fallback
La isla usa fondo blanco semi-transparente + `backdrop-filter: blur(...)`; al pasar el umbral de scroll sube un poco su opacidad y su sombra. Una regla `@supports not (backdrop-filter: blur(1px))` sube la opacidad base para no depender del blur.

- **Por qué**: el efecto vidrio da una sensación más profesional y se integra con el Hero; el fallback preserva contraste donde no hay soporte.
- **Nota**: la isla es glass siempre (no transparente total al tope); el estado de scroll sólo la intensifica.

### Iconos de redes como chips de vidrio
Los enlaces de redes del header se estilan como chips circulares (`.social-chip`) acordes a la isla: fondo translúcido, borde sutil, blur, con leve elevación y color de marca al hover, y foco visible. Se ocultan bajo el breakpoint `sm` (las redes quedan en el CTA del menú móvil).

- **Por qué**: los iconos sueltos se veían pobres; los chips se integran con la isla y dan un acabado más pulido sin librerías.

### Enlaces de escritorio en negrita + subrayado animado; logo compacto
Los enlaces usan peso 700 y color de tinta fuerte, con subrayado animado (`::after` + `scaleX`) en hover/foco. El logo se reduce (`h-12 md:h-14`) para mantener la isla compacta.

- **Por qué**: responde a los ajustes pedidos (enlaces en negrita, navbar menos alto) manteniendo la indicación animada ya existente.

## Risks / Trade-offs

- **[Riesgo]** El `rootMargin` del observer usa `header.offsetHeight`; si la altura del header cambiara dinámicamente podría desalinearse el umbral. → **Mitigación**: el panel móvil está `absolute`/fuera de flujo y no altera `offsetHeight`; se verifica en implementación.
- **[Riesgo]** Con el header fijo, páginas nuevas deben recordar reservar espacio superior o su encabezado quedará tapado. → **Mitigación**: queda como requisito explícito en la spec (páginas sin Hero reservan espacio) para futuros cambios.
- **[Trade-off]** El fallback sin `backdrop-filter` (fondo más opaco) se ve distinto al vidrio. → **Mitigación**: degradación progresiva aceptable; prioridad en contraste/legibilidad.
- **[Trade-off]** Asumir que los fondos bajo la isla son claros evita contraste dinámico. → **Mitigación**: documentado; si una sección pasa a fondo oscuro, revisar la legibilidad de la isla.
