# Spec Delta

## Purpose
Define la sección de testimonios de clientas en la home, que muestra reseñas con valoración y autoría para aportar confianza social, de forma accesible y sin bloquear la lectura si no hay JavaScript.

## ADDED Requirements

### Requirement: Sección de testimonios en la home
La home SHALL mostrar una sección "Lo que dicen nuestras clientas" con al menos un testimonio que incluya el texto de la reseña, el nombre de la autora y una valoración (p. ej. estrellas). Mientras no exista contenido real, los testimonios SHALL ser datos placeholder claramente identificables como provisionales.

#### Scenario: Visualización de un testimonio
- **WHEN** el usuario llega a la sección de testimonios en la home
- **THEN** se muestra al menos una reseña con su texto, la valoración y el nombre de la autora

#### Scenario: Contenido placeholder provisional
- **WHEN** la sección se renderiza sin datos de reseñas reales
- **THEN** los testimonios usan contenido placeholder identificable como provisional, sin presentarse como reseñas verificadas de clientes reales

### Requirement: Navegación del carrusel de testimonios
Cuando haya más de un testimonio, la sección SHALL permitir navegar entre ellos (controles anterior/siguiente y/o indicadores), y los controles SHALL ser operables por teclado y tener etiquetas accesibles.

#### Scenario: Navegar entre testimonios
- **WHEN** existe más de un testimonio y el usuario activa el control "siguiente" o "anterior"
- **THEN** se muestra el testimonio correspondiente sin provocar scroll horizontal en la página

#### Scenario: Operable por teclado
- **WHEN** el usuario enfoca los controles del carrusel con el teclado
- **THEN** los controles exponen etiquetas accesibles y pueden activarse con el teclado
