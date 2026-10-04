# Proposal

## Why

El proyecto usa sintaxis de valor arbitrario de Tailwind (`clase-[valor]`) en 66 lugares. Una auditoría verificada contra la documentación oficial de Tailwind CSS v4 encontró que, de esos 66 casos, 20 corresponden a valores px/rem/porcentaje que son múltiplos exactos de la escala de espaciado de Tailwind v4 (`calc(var(--spacing) * N)`, con `--spacing: 0.25rem` por defecto) o a un breakpoint personalizado repetido (`min-[1440px]:`), y por lo tanto tienen una utilidad con nombre equivalente, sin corchetes y sin ningún cambio visual. El resto (46 casos: gradientes, sombras, `calc()`, unidades `vw`, porcentajes decorativos, tamaño de fuente/tracking/leading/radio/blur) no tiene equivalente en la escala por defecto y la sintaxis de corchetes es, según la propia documentación de Tailwind, la forma correcta de expresarlos — esos quedan fuera de este cambio.

## What Changes

- Reemplazar 15 clases con valor arbitrario px/rem (en utilidades de espaciado/tamaño: `min-h`, `max-w`, `h`, `w`, `min-w`) por su utilidad numérica exacta de Tailwind (ej. `min-h-[560px]` → `min-h-140`), sin cambio visual.
- Agregar el token de breakpoint personalizado `--breakpoint-3xl: 90rem` al bloque `@theme` de `src/styles/global.css` y reemplazar las 4 apariciones del variante arbitrario `min-[1440px]:` por `3xl:` (mecanismo documentado oficialmente por Tailwind para este caso).
- Reemplazar `rounded-[2rem]` en `src/components/Contacto.astro` por `rounded-panel`, que ya es un token existente del proyecto (`--radius-panel: 2rem`) usado en otros componentes.
- No se toca ninguno de los 46 valores arbitrarios restantes (gradientes, sombras, `calc()`, `vw`, porcentajes decorativos, tamaño de fuente/tracking/leading/radio/blur): no tienen equivalente en la escala de Tailwind y la sintaxis de corchetes es el uso correcto documentado.

## Capabilities

Este cambio es un refactor de clases CSS sin ningún cambio de comportamiento observable (el objetivo explícito es cero cambio visual/funcional). No declara capabilities nuevas ni modifica requisitos de ninguna capability existente; `skip_specs: true` está declarado en `.openspec.yaml`.

### New Capabilities
(ninguna)

### Modified Capabilities
(ninguna — cambio puramente de implementación, sin impacto en comportamiento observable)

## Impact

- Código: `src/styles/global.css` (nuevo token `--breakpoint-3xl`), `src/components/Hero.astro`, `src/components/Proyectos.astro`, `src/components/WhatsAppWidget.astro`, `src/components/Header.astro`, `src/pages/politica-cookies.astro`, `src/components/Contacto.astro`, `src/components/DisplayTitle.astro`.
- Sin dependencias nuevas, sin cambios de API, sin cambios de comportamiento observable para el usuario final.
- Riesgo: bajo — cada reemplazo es una equivalencia matemática exacta (verificada con la fórmula real de Tailwind v4), no una aproximación.
