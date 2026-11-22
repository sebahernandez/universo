# Spec Delta

## Purpose
Define un acordeón de preguntas frecuentes embebido en la home que reutiliza la fuente única de datos de FAQ del sitio, para que el visitante resuelva dudas comunes sin salir de la página principal.

## ADDED Requirements

### Requirement: Acordeón de FAQ en la home
La home SHALL mostrar una sección "Preguntas Frecuentes" con un conjunto de preguntas en formato acordeón, cada una expandible para revelar su respuesta. Las preguntas y respuestas SHALL provenir de la misma fuente de datos (`faq.ts`) que usa la página dedicada de preguntas frecuentes, sin duplicar ni contradecir su contenido.

#### Scenario: Expandir una pregunta
- **WHEN** el usuario activa una pregunta del acordeón en la home
- **THEN** se revela su respuesta asociada

#### Scenario: Fuente de datos única
- **WHEN** se renderiza la sección de FAQ en la home
- **THEN** las preguntas y respuestas coinciden con las definidas en la fuente de datos compartida, sin textos divergentes respecto a la página de preguntas frecuentes

#### Scenario: Operable por teclado y accesible
- **WHEN** el usuario navega el acordeón con el teclado
- **THEN** cada control de pregunta es enfocable, activable por teclado y comunica su estado expandido/colapsado mediante atributos accesibles
