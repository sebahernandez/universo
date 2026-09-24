# Design

## Context

Ver proposal.md - Why. Estado actual:
- `src/styles/global.css` → `.text-grad-cool` / `.text-grad-warm`: `display:inline-block`, padding/margen de colchón (para no recortar glifos), `background-clip: text`, `color: transparent`, `background-image: linear-gradient(100deg, …)` estático.
  - cool: `#b9a7f0 0%, #9fd8f2 50%, #8fe0c4 100%`
  - warm: `#f7a8c4 0%, #f7b58a 55%, #f6d36b 100%`
- `Hero.astro` (`<h1 data-fit-title>`): `<span class="sr-only">Papelería Creativa</span>` + dos `<span aria-hidden>` (cool/warm).
- `DisplayTitle.astro` (`<h2 data-fit-title>`): `<span class="text-grad-cool">{lead}</span>{' '}<span class="text-grad-warm">{accent}</span>`, con script que en móvil mide y escala el `font-size` de `[data-fit-title]` para caber en una línea.
- Proyecto Astro 7 estático, sin React. Tailwind 4, npm.

El componente `GradientText` de React Bits recibe `colors` (array), `animationSpeed`, `showBorder`, `className`, y anima el degradado recortado al texto.

## Goals / Non-Goals

- **Goal**: Usar el componente de React Bits para el efecto (fidelidad al original), con los mismos colores y tipografía.
- **Goal**: Conservar `data-fit-title` (ajuste móvil), layout en una línea, glifos completos y `sr-only`.
- **Goal**: Respetar `prefers-reduced-motion`.
- **Non-Goal**: Cambiar colores, tipografía o tamaños.
- **Non-Goal**: Convertir el sitio a SSR; se mantiene `output: 'static'` con islas.

## Decisions

- **Decisión: Integrar React Bits (librería) en vez de replicar en CSS.**
  A petición del usuario, para igualar el efecto original con exactitud. Se añade `@astrojs/react` + `react` + `react-dom` y la integración `react()` en `astro.config.mjs`.
  - Trade-off aceptado: runtime de React y peso extra en las páginas con títulos.

- **Decisión: Instalar/copiar el componente `GradientText` al repo.**
  Traer el componente desde reactbits.dev (CLI de React Bits o copia manual del `.tsx` + CSS) a `src/components/reactbits/`. Mantener su API (`colors`, `animationSpeed`).

- **Decisión: Dos instancias por título (bicolor).**
  El diseño usa dos degradados: palabra inicial (cool) y de acento (warm). Se renderizan dos `GradientText`: uno con los colores cool y otro con los warm, con `className="font-display"`, en línea y separados por un único espacio (respetando el requisito de espaciado uniforme).

- **Decisión (revisada en implementación): Render estático, SIN directiva `client:`.**
  El componente `GradientText` no tiene interactividad; su efecto es CSS. Renderizándolo con el renderer de React en build (sin `client:load`/`client:visible`) el degradado animado sale ya en el HTML y NO se envía runtime de React al navegador. Se comprobó que ninguna página carga JS externo ni hidrata islas. Mejora sobre la idea original de hidratar (que no aportaba nada visual y sumaba peso).

- **Decisión: `data-fit-title` se mantiene en el `<h1>/<h2>`.**
  El script sigue midiendo el elemento contenedor. Los `GradientText` deben renderizarse **en línea** (no como bloque) para que el texto quede en una sola línea y la medición `inline-block + nowrap` sobre el título siga siendo válida.

- **Decisión: Ángulo/dirección del gradiente.**
  Si el componente usa `to right` (~90°) y se quiere replicar el `100deg` actual, se ajustará la dirección del degradado del componente (o se acepta la mínima diferencia). Se decide en implementación validando contra el diseño vigente.

- **Decisión: `prefers-reduced-motion`.**
  Añadir en `global.css` una regla que desactive la animación del componente cuando el usuario reduce el movimiento (el componente de React Bits no lo trae por defecto).

## Risks / Trade-offs

- [La estructura del componente (div) puede romper el layout en línea y la medición de `data-fit-title`] → Mitigación: forzar `display:inline`/inline-block en el wrapper del componente y validar el ajuste móvil.
- [Añadir React aumenta el bundle y suma hidratación a un sitio hoy 100% estático] → Mitigación: hidratar solo los títulos (`client:visible` donde se pueda); aceptado por decisión del usuario.
- [El `sr-only` del hero y el `aria-hidden` de los degradados deben preservarse] → Mitigación: mantener el texto accesible y marcar los `GradientText` como decorativos donde corresponda.
- [Colores "estirados" por el `background-size` animado del componente] → Mitigación: pasar los stops actuales y ajustar tamaño/velocidad validando contra el diseño.

## Open Questions

- ¿Se instala vía CLI de React Bits o se copia el componente manualmente? (No cambia el resultado; se resuelve en implementación según disponibilidad de la CLI.)
