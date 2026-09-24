# Spec Delta

## ADDED Requirements

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
