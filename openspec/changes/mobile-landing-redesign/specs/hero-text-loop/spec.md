# Spec Delta

## MODIFIED Requirements

### Requirement: Cinta ondulada al cierre de Inicio

La home SHALL mostrar una única cinta con «Pequeños detalles, grandes historias» al final de Inicio, después de su contenido e imagen y antes de la siguiente sección. El texto SHALL repetirse sobre una trayectoria ondulada con movimiento continuo cuando el movimiento esté permitido.

#### Scenario: Ubicación y contenido

- **WHEN** el usuario recorre la home desde Inicio hacia la siguiente sección
- **THEN** encuentra una única cinta ondulada con el texto acordado entre ambos contenidos y conserva el título, el subtítulo y los botones del Hero rediseñado

#### Scenario: Repetición continua

- **WHEN** la cinta está visible y el movimiento está permitido
- **THEN** el texto avanza suavemente por la onda y cada repetición enlaza con la siguiente sin saltos ni interrupciones perceptibles
