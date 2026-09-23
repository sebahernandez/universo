# Proposal

## Why

Los títulos display bicolor (hero "Papeleria Creativa" y los títulos de sección) muestran un espacio de más entre la palabra inicial y la de acento, y ese hueco no es consistente entre títulos. Además, la tipografía manuscrita se recorta (ascendentes, tildes y remates) por el line-height muy ajustado combinado con el recorte de degradado sobre el texto. El resultado se ve descuidado en la portada, que es lo primero que ve el visitante.

## What Changes

- Unificar el espaciado entre la palabra inicial y la de acento a un único mecanismo, eliminando la doble separación (margen `mr-[…em]` **más** el espacio literal `{' '}`) que hoy produce el hueco extra.
- Aplicar el mismo valor de separación en todos los títulos display (hero y `DisplayTitle`), de modo que el espacio entre palabras sea idéntico en todo el sitio y nunca se acumule (dobles/triples).
- Ajustar el recorte vertical de los `<span>` con degradado (line-height y padding de seguridad) para que ninguna letra —tildes, ascendentes como "P/l/t", descendentes como "p/g" y remates de la tipografía manuscrita— quede cortada.
- Asegurar que ningún `overflow` de contenedor recorte los glifos del título.

## Capabilities

### New Capabilities
- `display-title`: Comportamiento de presentación de los títulos display bicolor (hero y secciones): separación uniforme entre palabras y renderizado completo de los glifos sin recortes.

### Modified Capabilities
<!-- Ninguna: no existen specs previas. -->

## Impact

- `src/components/Hero.astro` (título `<h1>`).
- `src/components/DisplayTitle.astro` (título `<h2>` reutilizable de secciones).
- `src/styles/global.css` (clases `.text-grad-cool` / `.text-grad-warm`).
- Sin impacto en datos, APIs ni dependencias; es un ajuste de presentación (CSS/markup).
