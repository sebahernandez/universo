# Design

## Context

Ver `proposal.md` para la motivación y `specs/hero-text-loop/spec.md` para el comportamiento esperado.

El sitio genera HTML estático con Astro y ya integra React. `Hero.astro` termina en celeste y `QuienesSomos.astro` empieza en el mismo color. `.section-blend` concentra el fundido en los últimos 200 px de cada sección. La imagen del hero está en flujo en móvil y se centra absolutamente respecto de la sección completa en escritorio; añadir altura a esa sección cambiaría su centro.

`GradientText.tsx` resuelve los títulos existentes mediante CSS; `InfiniteSpiral.tsx` es una isla con `client:load`. No hay una suite de pruebas propia en el proyecto; `npm run build` y la inspección de la home constituyen las comprobaciones disponibles.

La [variante oficial TypeScript + CSS de Text Loop](https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/TextAnimations/TextLoop/TextLoop.tsx) usa SVG con `textPath`, medición después de cargar fuentes, GSAP, pausa con el puntero y una consulta inicial de movimiento reducido. Su [CSS](https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/TextAnimations/TextLoop/TextLoop.css) usa un SVG de ancho fluido. La adaptación añade actualización de la preferencia durante la visita y un mensaje completo antes de medir. Por petición del usuario, la cinta no presenta botón de pausa ni espacio reservado para ese control.

## Goals / Non-Goals

**Goals:**

- Integración local en el cierre de Inicio, reutilizando su fondo y los tokens de marca.
- Disposición estable antes y después de hidratar, con tamaño legible a 320 px y un centro de imagen independiente de la cinta.
- Animación con estados de pausa explícitos, degradación estática y limpieza al desmontar.

**Non-Goals:**

- Cambiar los títulos, el efecto Infinite Spiral, el resto de los fundidos, las rutas o el texto comercial existente.
- Crear un editor de efectos, importar toda la colección React Bits o agregar nuevas fuentes.
- Implementar o publicar durante esta propuesta.

## Decisions

### 1. Cinta dentro del fondo de Inicio

Añadir el bloque de cinta al final de `Hero.astro`, dentro de `section#inicio`, con un wrapper transparente en flujo normal. Mantener `.section-blend` y sus variables rosa/celeste. Reservar una banda contenida para la onda y espacio de fondo visible debajo antes del límite celeste. La trayectoria puede tener un trazo pastel, pero solo ese trazo lleva color; el wrapper, el SVG y los márgenes conservan transparencia.

Se descarta una sección independiente con fondo plano: introduciría una superficie nueva entre las secciones y complicaría la continuidad del fundido. También se descarta superponer la cinta con posición absoluta sobre ambos contenidos, porque dificulta mantener el espacio necesario en móvil.

### 2. Separar el encuadre de la imagen de la altura total

Organizar el contenido principal y la imagen en un wrapper de ancho completo y posición relativa dentro de Inicio. Mantener en su interior el contenedor máximo actual y centrar la imagen de escritorio respecto de ese wrapper, conservando su referencia al borde derecho. La cinta será su hermana posterior. El identificador `hero-img`, sus atributos de carga, sus fuentes y el comportamiento de parallax se conservan; los cambios de disposición se verifican en los breakpoints actuales.

Dejar la imagen centrada sobre la sección completa desplazaría su posición al incorporar la banda. Ajustar ese desplazamiento con una compensación fija por breakpoint sería más frágil que separar las dos regiones.

### 3. Adaptación local del componente oficial

Crear `src/components/reactbits/TextLoop.tsx` y `TextLoop.css`, siguiendo la organización existente. Instalar GSAP como dependencia directa y conservar la referencia de origen y los avisos de licencia correspondientes. Usar `client:load`, igual que la isla React existente, y limitar toda medición de SVG o acceso al navegador a efectos del cliente.

La instancia usa `shape="wave"`, dirección `forward`, texto «Papelería creativa ✦ Hecha para recordar», separador `✦` entre repeticiones y `uppercase={false}`. Como punto de partida, velocidad 60 unidades SVG/segundo, tipografía `Crafter Sans` con peso 700, texto `--color-tinta` y trazo `--color-lila-fuerte`. El contenedor parte de 160 px en móvil y 200 px en escritorio, con ajuste visual local si la geometría necesita más espacio. Las condiciones de la spec prevalecen sobre estos valores iniciales.

Adaptar el viewport y la onda al espacio de la banda; mantener un tamaño visible mínimo de 16 px y evitar deformación o recorte vertical. El `viewBox` original de 1200 × 520 no se debe simplemente escalar a 320 px, porque podría empequeñecer el texto. Recalcular geometría y mediciones con cambios de tamaño y con la carga de fuentes, manteniendo margen vertical para glifos y trazo. CSS y selectores se limitan al componente y a wrappers del hero.

Se conserva SVG + GSAP para mantener el comportamiento del efecto pedido. Una cinta recta basada solo en CSS cambiaría la trayectoria elegida; una importación completa de React Bits introduciría recursos innecesarios.

### 4. Presentación estática y accesibilidad

Renderizar desde servidor una frase completa y visible como fallback en la región de la cinta, con su altura reservada. Tras hidratar y medir con éxito, mostrar el SVG y convertir esa frase a texto solo para lector de pantalla. Ocultar el SVG repetido a tecnologías de asistencia y evitar regiones de anuncios automáticos. Si JavaScript no carga o la medición falla, mantener el fallback visible.

Con movimiento reducido, permitir la onda estática si está correctamente medida; de lo contrario, mantener el fallback. La onda ocupa toda la altura de la banda, sin control de pausa ni una franja adicional para ese control.

Copiar solo el SVG del ejemplo no garantiza una frase completa antes de medir y repetiría el mensaje si se combina con un fallback accesible sin ocultar las copias visuales.

### 5. Estados de movimiento y recursos

Mantener separados pausa temporal por puntero, movimiento reducido y visibilidad. La animación avanza solo cuando ninguna condición la pausa. Retirar el puntero no anula la preferencia del sistema. Escuchar cambios de `matchMedia` y pausar fuera de viewport o cuando el documento esté oculto; los eventos táctiles no activan hover.

Reanudar conservando el desplazamiento actual para evitar saltos. Limpiar tween, observadores y listeners al desmontar o reconfigurar la instancia. Conservar la pausa con puntero del original, sin estado ni control de pausa manual.

## Risks / Trade-offs

- [Costura nueva en el fondo] → Conservar el único fondo rosa/celeste y comparar capturas de la unión antes/después, en carga inicial y con animación.
- [Imagen de escritorio desplazada al crecer Inicio] → Centro referido al wrapper principal; verificar 768, 1024 y 1440 px y el flujo móvil.
- [Texto pequeño o glifos recortados] → Geometría responsive, medidas tras cargar fuentes y comprobación de tamaño visible, tildes y contraste.
- [Saltos durante hidratación o fuentes tardías] → Reservar la banda desde servidor y sustituir el fallback solo tras medir correctamente.
- [GSAP añade JavaScript] → Importación local a la isla, sin recursos remotos en ejecución, pausas por visibilidad y limpieza de recursos.

## Migration Plan

No hay migración de datos. Implementar el componente y sus estilos, integrar el bloque y añadir la dependencia local; verificar antes de publicar. Capturar primero la unión existente como referencia. Ejecutar build e inspección visual a 320, 375, 768, 1024 y 1440 px, incluyendo movimiento reducido, pausa temporal con puntero, interacción táctil y JavaScript deshabilitado. Para revertir, retirar la instancia y recuperar la disposición previa del hero; eliminar GSAP solo si ningún otro componente lo utiliza.
