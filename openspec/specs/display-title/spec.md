# display-title Specification

## Purpose
Define cómo se presentan los títulos display bicolor (hero y secciones): la separación entre la palabra inicial y la de acento debe ser uniforme y sin duplicarse, y todos los glifos deben renderizarse completos sin recortes.

## Requirements

### Requirement: Separación uniforme entre palabras del título

El título display SHALL separar la palabra inicial y la palabra de acento mediante un único mecanismo de espaciado, de modo que el hueco entre ambas equivalga a un espacio normal y nunca combine dos fuentes de separación (por ejemplo, margen más espacio literal).

#### Scenario: Sin espacio duplicado en el hero

- **WHEN** se renderiza el título del hero ("Papeleria Creativa")
- **THEN** existe exactamente un espacio visual entre "Papeleria" y "Creativa", sin hueco extra acumulado por margen y espacio literal a la vez

#### Scenario: Espaciado consistente entre títulos

- **WHEN** se renderizan el título del hero y un título de sección (`DisplayTitle`)
- **THEN** la separación entre la palabra inicial y la de acento es la misma en ambos y no aparecen espacios dobles ni triples

### Requirement: Glifos del título sin recortes

El título display SHALL mostrar cada glifo completo —incluyendo ascendentes, descendentes, tildes y remates de la tipografía manuscrita— sin que el recorte de degradado, el line-height ni el `overflow` de un contenedor corten parte alguna de las letras.

#### Scenario: Ascendentes y tildes visibles

- **WHEN** el título contiene letras altas o acentuadas (por ejemplo "P", "l", "í")
- **THEN** la parte superior de esos glifos se ve completa, sin corte en el borde superior

#### Scenario: Descendentes visibles

- **WHEN** el título contiene descendentes (por ejemplo "p", "g")
- **THEN** la parte inferior de esos glifos se ve completa, sin corte en el borde inferior

#### Scenario: El contenedor no recorta el título

- **WHEN** el título se ajusta en una sola línea dentro de su sección
- **THEN** ningún `overflow` de contenedor recorta los glifos del título

### Requirement: Animación de gradiente en flujo en los títulos

Los títulos display (hero y de sección) SHALL mostrar su degradado con una animación en bucle que desplaza el gradiente a lo largo del texto (efecto "gradient text" en flujo), conservando exactamente los mismos colores de gradiente y la misma tipografía manuscrita actuales. La animación NO SHALL alterar el recorte del degradado al texto ni provocar recortes de glifos.

#### Scenario: El gradiente fluye en el hero y las secciones

- **WHEN** se renderiza el título del hero y un título de sección (`DisplayTitle`) en un dispositivo con movimiento permitido
- **THEN** el degradado se desplaza suavemente y en bucle a lo largo de cada título, usando los mismos colores actuales

#### Scenario: Colores y tipografía sin cambios

- **WHEN** se compara un título animado con el diseño actual
- **THEN** los colores del degradado (cool y warm) y la tipografía display son los mismos; solo cambia que el degradado ahora se mueve

### Requirement: Respeto a la preferencia de movimiento reducido

Cuando el usuario indica `prefers-reduced-motion: reduce`, los títulos display SHALL mostrar el degradado de forma estática (sin animación), equivalente a la presentación actual.

#### Scenario: Movimiento reducido desactiva la animación

- **WHEN** el usuario tiene activada la preferencia de movimiento reducido
- **THEN** el degradado de los títulos no se anima y se ve estático, con los mismos colores y tipografía
