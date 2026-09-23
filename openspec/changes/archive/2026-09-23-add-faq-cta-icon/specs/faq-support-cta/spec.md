# Spec Delta

## Purpose

Define la caja de contacto de cierre ("¿No resolvimos tu duda?") en la página de preguntas frecuentes, incluida su presentación visual y sus acciones de contacto hacia el usuario.

## ADDED Requirements

### Requirement: Ícono decorativo en la caja de contacto

La caja "¿No resolvimos tu duda?" SHALL mostrar un ícono de interrogación en su esquina superior derecha. El ícono es decorativo y SHALL marcarse como tal para tecnologías de asistencia (por ejemplo `alt` vacío o `aria-hidden`), de modo que no altere la lectura del contenido de la caja.

#### Scenario: El ícono se muestra en la caja

- **WHEN** el usuario visita la página de preguntas frecuentes y ve la caja "¿No resolvimos tu duda?"
- **THEN** se muestra un ícono de interrogación en la esquina superior derecha de la caja

#### Scenario: El ícono no interfiere con el contenido

- **WHEN** se renderiza la caja con su título, texto y botones de contacto
- **THEN** el ícono se posiciona en la esquina superior derecha sin superponerse al texto ni a los botones, y en pantallas angostas el contenido permanece legible

#### Scenario: El ícono es decorativo para lectores de pantalla

- **WHEN** un lector de pantalla recorre la caja de contacto
- **THEN** el ícono no se anuncia como contenido informativo

### Requirement: Acciones de contacto de la caja

La caja "¿No resolvimos tu duda?" SHALL ofrecer al usuario al menos una vía para contactar al equipo, incluyendo un enlace a WhatsApp y un enlace al formulario de contacto del sitio.

#### Scenario: Enlaces de contacto disponibles

- **WHEN** el usuario ve la caja de contacto
- **THEN** puede iniciar una conversación por WhatsApp y también acceder al formulario de contacto del sitio
