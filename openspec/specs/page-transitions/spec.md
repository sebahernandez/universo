# page-transitions Specification

## Purpose
Define la transición visual al navegar entre las páginas del sitio, para que el cambio de página se perciba continuo sin alterar el comportamiento de carga de cada una.

## Requirements

### Requirement: Transición entre páginas del sitio
Al navegar entre páginas del mismo sitio, en los navegadores que lo admitan, la página saliente y la entrante SHALL enlazarse con una transición visual de 400 ms o menos, y el menú superior SHALL permanecer estable durante la transición en lugar de parpadear.

#### Scenario: De la home a una página legal
- **WHEN** el usuario pulsa en el footer el enlace a Términos y condiciones
- **THEN** el contenido cambia con una transición breve y el menú superior se mantiene en su sitio

#### Scenario: Volver con el botón atrás
- **WHEN** el usuario vuelve a la página anterior con el botón atrás del navegador
- **THEN** la página anterior se muestra con la misma transición y en la posición de scroll que restaura el navegador

### Requirement: Navegación intacta sin soporte de transiciones
En navegadores sin soporte para transiciones entre documentos, la navegación SHALL funcionar exactamente como antes de este cambio.

#### Scenario: Navegador sin soporte
- **WHEN** el usuario navega entre páginas en un navegador sin soporte
- **THEN** la página de destino carga de forma normal, sin errores ni contenido oculto

### Requirement: Las páginas conservan su comportamiento de carga
La transición SHALL no alterar lo que cada página hace al cargar: el banner de cookies, el botón de WhatsApp, el menú móvil, el formulario de contacto, la verificación antispam y la redirección de `/gracias` SHALL comportarse igual que tras una carga completa.

#### Scenario: Menú móvil tras navegar
- **WHEN** el usuario llega a una página mediante un enlace interno y abre el menú móvil
- **THEN** el menú abre y cierra con el botón, el fondo, Escape y al pulsar un enlace

#### Scenario: Preferencias de cookies tras navegar
- **WHEN** el usuario llega a una página mediante un enlace interno y pulsa «Preferencias de cookies»
- **THEN** el banner de cookies se abre

#### Scenario: Enlace con ancla desde otra página
- **WHEN** el usuario pulsa «Productos» en el menú estando en la página de preguntas frecuentes
- **THEN** llega a la home con la sección Productos visible bajo el menú fijo
