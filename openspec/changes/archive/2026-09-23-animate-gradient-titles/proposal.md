# Proposal

## Why

Los títulos display (hero y secciones) usan hoy gradientes bicolor **estáticos** recortados al texto. Se quiere el efecto "Gradient Text" de React Bits (un gradiente que fluye a lo largo del texto) para darle vida a los títulos. Para lograr el efecto con máxima fidelidad al original, se usará el **componente de la librería React Bits** (no una réplica en CSS), manteniendo la misma tipografía manuscrita y los mismos colores de gradiente actuales.

## What Changes

- Integrar React en el proyecto Astro (`@astrojs/react` + `react` + `react-dom`) para poder usar componentes de React Bits como islas.
- Incorporar el componente `GradientText` de React Bits (instalado/copiado desde reactbits.dev) al proyecto.
- Reemplazar el render de los títulos display para que la palabra inicial y la de acento usen `GradientText`, pasándole los colores de gradiente actuales (cool y warm) y la tipografía display actual; el gradiente fluye en bucle.
- Mantener el comportamiento existente de los títulos: ajuste de tamaño en móvil (`data-fit-title`), una sola línea con separación uniforme, glifos completos sin recortes, y el texto accesible del hero (`sr-only`).
- Respetar `prefers-reduced-motion`: si el usuario reduce el movimiento, el gradiente queda estático.

## Capabilities

### New Capabilities
<!-- Ninguna. -->

### Modified Capabilities
- `display-title`: Se añade el comportamiento de animación del degradado de los títulos display (gradiente en flujo, mismos colores/tipografía, con respeto a `prefers-reduced-motion`), sin alterar los requisitos vigentes de espaciado uniforme y glifos completos.

## Impact

- `package.json`: nuevas dependencias `@astrojs/react`, `react`, `react-dom` (y tipos si aplica).
- `astro.config.mjs`: añadir la integración `react()`.
- Nuevo componente de React Bits en el proyecto (por ejemplo `src/components/reactbits/GradientText.tsx` + su CSS).
- `src/components/Hero.astro` y `src/components/DisplayTitle.astro`: usar `GradientText` para las palabras del título (como isla hidratada), preservando `data-fit-title`, el layout en línea y el `sr-only`.
- `src/styles/global.css`: regla `prefers-reduced-motion` para desactivar la animación; posible limpieza de `.text-grad-*` si dejan de usarse.
- Aumento de bundle por el runtime de React (islas hidratadas solo en los títulos).
