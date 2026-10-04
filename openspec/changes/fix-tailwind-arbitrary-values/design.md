# Design

## Context

Tailwind v4 deriva las utilidades alineadas a espaciado (`w`, `h`, `min-w`, `min-h`, `max-w`, `max-h`, `size`, `p`, `m`, `gap`, `inset`/`top`/`right`/`bottom`/`left`, `translate-x`/`translate-y`) de una única variable de tema `--spacing` (por defecto `0.25rem` = 4px) mediante la fórmula `calc(var(--spacing) * N)` para cualquier entero positivo `N`. Esto es distinto de Tailwind v3, donde la escala era una lista fija de pasos curados. El tema del proyecto (`src/styles/global.css`, bloque `@theme`) no redefine `--spacing`, así que sigue en `0.25rem`. Tamaño de fuente (`--text-*`), tracking (`--tracking-*`), radio (`--radius-*`) y blur (`--blur-*`) son escalas curadas **separadas** que no siguen esta fórmula. Ver proposal.md - Why para el detalle completo de la auditoría.

## Goals / Non-Goals

**Goals:**
- Reemplazar únicamente los valores arbitrarios que tienen una equivalencia matemática exacta (división entera sin resto) en la fórmula de espaciado de Tailwind v4, o que coinciden con un token ya existente del proyecto.
- Documentar el cálculo de cada reemplazo para que sea verificable (no una aproximación).

**Non-Goals:**
- No se añaden nuevos tokens de tema para tamaño de fuente, tracking, leading, radio o blur (esas escalas son curadas, no fórmula abierta; "calcular a un valor permitido" no aplica ahí sin decidir un nuevo paso de diseño, lo cual está fuera de alcance de este fix).
- No se tocan los valores arbitrarios que son gradientes, sombras, `calc()`, unidades `vw`, o porcentajes decorativos que no coinciden con una fracción limpia (1/2, 1/3, 2/3, 1/4, 3/4) — esos no tienen equivalente en la escala y la sintaxis de corchetes es correcta ahí.

## Decisions

- **Fórmula de conversión para utilidades de espaciado**: para cada valor `Npx` donde `N % 4 === 0`, el reemplazo es `utilidad-{N/4}` (ej. `min-h-[560px]` → `min-h-140`, porque 560÷4=140). Para valores en `rem`, se divide por `0.25` (ej. `w-[19rem]` → `w-76`, porque 19÷0.25=76). Alternativa descartada: redondear al "paso nombrado más cercano" de Tailwind v3 (ej. `min-h-96`) — esto cambiaría visualmente el diseño y fue explícitamente descartado tras la primera auditoría (incorrecta) de este cambio.
- **Breakpoint personalizado `--breakpoint-3xl: 90rem`**: Tailwind documenta esto como el mecanismo oficial para reemplazar un variante arbitrario de breakpoint de un solo uso (`min-[1440px]:`). Se agrega al `@theme` existente en `global.css`, junto a los demás tokens custom del proyecto (radios, sombras, container). Alternativa descartada: dejar `min-[1440px]:` tal cual — es válido pero es exactamente el tipo de "corchete evitable" que motivó este cambio, y se repite idéntico en 4 archivos.
- **Swap a token existente para `rounded-[2rem]`**: ya existe `--radius-panel: 2rem` y la utilidad `rounded-panel`, usada en otros componentes (`WhatsAppWidget.astro`). Usar el token existente en vez de duplicar el valor es consistente con el patrón ya establecido en el proyecto.
- **Los 46 casos no convertibles no se tocan**: confirmado contra la documentación oficial de Tailwind que la sintaxis de corchetes es "oficialmente soportada y documentada" para exactamente estos casos (valores que exceden o no encajan en el conjunto de tokens de diseño). Forzar una conversión ahí sería o bien imposible (gradientes/sombras/calc) o visualmente destructivo (porcentajes/tamaños que no caen en un paso exacto).

## Risks / Trade-offs

- [Un error de aritmética al convertir produciría un cambio visual silencioso] → Mitigado: cada conversión en tasks.md incluye el cálculo exacto (N÷4 o N÷0.25) y debe verificarse con `npm run build` + inspección visual antes de dar la tarea por completada.
- [Agregar `--breakpoint-3xl` podría chocar con un uso futuro no relacionado de `3xl:`] → Es un breakpoint nuevo, no existe ningún uso previo de `3xl:` en el proyecto (confirmado en la auditoría); riesgo nulo hoy.
- [El reemplazo de `min-h-13`/`w-13`/etc. (números poco comunes como 13, 76, 84, 110, 115, 128, 140, 160, 170) puede verse "raro" a simple vista en el código comparado con los pasos tradicionales de v3 (12, 14, 16...)] → Es el comportamiento esperado y documentado de la fórmula abierta de Tailwind v4; no es un error, es cómo v4 expresa valores custom sin corchetes.

## Migration Plan

Cambio de solo-frontend, sin datos ni migraciones. Pasos: editar las clases y el `@theme`, correr `npm run build` para confirmar que compila, y hacer una verificación visual rápida (dev server) de las secciones tocadas (Hero, Proyectos, WhatsApp widget, Header, página de cookies, Contacto, títulos) para confirmar cero cambio visual. Rollback: revertir el commit, ya que son cambios de clases puros sin efectos colaterales.
