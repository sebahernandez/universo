# Proposal

## Why

Universo Crafter quiere añadir la animación Text Loop de React Bits como una cinta ondulada al final del bloque inicial. Su integración debe conservar el fundido rosa → celeste entre Inicio y Quiénes somos, evitando que el nuevo elemento genere una franja rectangular, una costura visible o superposiciones con el contenido.

## What Changes

- Incorporar una única cinta Text Loop en la home, al final de Inicio y antes de Quiénes somos, con el texto «Papelería creativa ✦ Hecha para recordar» repetido sobre una trayectoria ondulada.
- Integrar el efecto sobre un contenedor transparente dentro del fondo existente, manteniendo visible el degradado alrededor de la cinta y la continuidad celeste en la unión de las secciones.
- Adaptar su tamaño, espacio y legibilidad a móvil y escritorio, conservando separados el texto, los botones, la imagen del hero y el contenido de la siguiente sección.
- Mantener una presentación estática con movimiento reducido o sin JavaScript y una pausa temporal al pasar el puntero sobre la cinta, sin botón de pausa.

## Capabilities

### New Capabilities

- `hero-text-loop`: cinta de texto ondulada en el cierre de Inicio, incluyendo animación, integración con el fundido entre secciones, adaptación responsive y acceso sin movimiento.

### Modified Capabilities

Ninguna. `display-title` conserva sus requisitos de degradado, tipografía, espaciado y glifos completos; `project-gallery` conserva su espiral existente.

## Impact

- Integración localizada en `src/components/Hero.astro`, con una isla React y sus estilos en `src/components/reactbits/TextLoop.tsx` y `TextLoop.css`.
- `package.json` y `package-lock.json`: añadir GSAP, utilizado por la variante oficial TypeScript + CSS de Text Loop; Astro ya tiene React configurado.
- Estilos de integración limitados al hero; conservar `.section-blend` en `src/styles/global.css`, el orden de secciones en `src/pages/index.astro` y el inicio celeste de `src/components/QuienesSomos.astro`.
- Verificación visual de la unión entre secciones, legibilidad, disposición, pausa, movimiento reducido y carga estática. No hay cambios de rutas ni de datos comerciales.

Referencia del componente: [React Bits — Text Loop](https://reactbits.dev/text-animations/text-loop).
