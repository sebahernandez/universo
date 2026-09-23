# Design

## Context

Ver `proposal.md` — Why. Estado actual relevante:

- `Hero.astro:17` y `DisplayTitle.astro:17` separan la palabra inicial y la de acento con **dos** mecanismos a la vez: la palabra inicial lleva `mr-[0.3em]` / `mr-[0.25em]` **y** entre los `<span>` hay un espacio literal `{' '}`. El hueco visible es margen + espacio → separación mayor y distinta entre ambos títulos.
- Los `<span>` usan `.text-grad-cool` / `.text-grad-warm` (`global.css:112`) con `-webkit-background-clip: text; color: transparent` y solo `padding-bottom: 0.08em`. Los `<h1>`/`<h2>` usan `leading-[1.02]`. Esa combinación recorta la parte superior/inferior de la tipografía manuscrita (Lemonilla), que tiene ascendentes, remates y tildes marcados.
- El hero está dentro de `.section-blend ... overflow-hidden` (`Hero.astro:8`), por lo que un glifo que sobresalga puede recortarse en el borde de la sección.

## Goals / Non-Goals

**Goals:**
- Un único mecanismo de espaciado entre palabras, con el mismo valor en hero y `DisplayTitle`.
- Glifos completos (arriba y abajo) en todos los tamaños/breakpoints.

**Non-Goals:**
- Cambiar la tipografía, los degradados de color o el copy de los títulos.
- Rediseñar el layout del hero o el script `data-fit-title` de ajuste móvil.

## Decisions

- **Un solo separador = espacio natural entre palabras.** Se elimina el margen `mr-[…em]` y se conserva el espacio literal `{' '}` (o viceversa, pero uno solo). Se prefiere quitar el margen porque el espacio natural de la fuente es coherente con cualquier tamaño y con el ajuste móvil; el margen en `em` sumaba un hueco fijo adicional que producía el "espacio de más".
  - *Alternativa descartada:* conservar el margen y quitar el espacio — daría el mismo resultado visual, pero el `sr-only`/lectura y el reflow del script quedan más simples con el espacio natural.
  - Ambos títulos usan exactamente el mismo markup de separación para que el hueco sea idéntico.
- **Anti-recorte en las clases de degradado.** En `.text-grad-cool` / `.text-grad-warm` se aumenta el colchón vertical (padding superior e inferior en `em`) y se relaja el `line-height` del título lo justo para que el clip-text no corte ascendentes/descendentes. El valor se ajusta observando la fuente real (Lemonilla), no a ciegas.
  - *Alternativa descartada:* pintar el degradado con `background` sobre el texto sin `clip` — cambiaría el aspecto (perdería el recorte al glifo), fuera de alcance.
- **El contenedor no debe recortar el título.** Se verifica que el `overflow-hidden` de la sección no corte los glifos ya con el colchón anterior; si aún recortara, se aísla el padding en el propio título en lugar de tocar el `overflow` de la sección (que existe por el parallax de la imagen).

## Risks / Trade-offs

- [Relajar `line-height` puede alterar el alto del bloque del título] → Ajuste mínimo y verificación visual en móvil, sm y desktop; el script `data-fit-title` sigue gobernando el tamaño en móvil.
- [Padding vertical extra podría acercar el título al subtítulo/imagen] → Usar valores en `em` pequeños y revisar el espaciado con `mt-*` existente.
