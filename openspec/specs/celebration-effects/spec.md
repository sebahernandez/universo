# celebration-effects Specification

## Purpose
Define las ráfagas de confeti con las que el sitio celebra las acciones de contacto, como gesto propio de un negocio de cotillón, y los límites que las mantienen breves y no intrusivas.

## Requirements

### Requirement: Ráfaga de confeti en los CTA de contacto
Al pulsar un CTA principal de contacto (WhatsApp o ir al formulario) con movimiento permitido, el sitio SHALL lanzar una ráfaga breve de confeti desde la posición del botón, en los colores de la paleta del sitio. La ráfaga SHALL no retrasar ni impedir la acción del botón.

#### Scenario: Clic en un CTA de contacto
- **WHEN** el usuario pulsa un CTA principal de contacto
- **THEN** sale una ráfaga de confeti desde el botón y la acción del botón (abrir WhatsApp o ir a la sección de contacto) ocurre sin demora

#### Scenario: Activación con teclado
- **WHEN** el usuario activa el CTA con Enter estando enfocado
- **THEN** la ráfaga sale desde el botón igual que con un clic

### Requirement: Celebración al confirmar el envío del formulario
Al mostrarse la página `/gracias` tras un envío válido del formulario, el sitio SHALL lanzar una celebración de confeti más amplia que la ráfaga de los CTA. La celebración SHALL no interferir con la cuenta regresiva ni con la redirección existentes.

#### Scenario: Llegada tras enviar el formulario
- **WHEN** el usuario llega a `/gracias` después de enviar el formulario
- **THEN** se lanza una celebración de confeti una sola vez y la cuenta regresiva y la redirección funcionan igual que antes

#### Scenario: Acceso directo sin envío
- **WHEN** alguien abre `/gracias` sin haber enviado el formulario
- **THEN** es redirigido a la home como antes y no se lanza confeti

### Requirement: El confeti es breve y no intrusivo
Cada ráfaga SHALL terminar y retirarse por completo en 3 segundos o menos. El confeti SHALL dibujarse por encima del contenido sin interceptar clics, toques ni foco, y SHALL no ocultar de forma persistente ningún texto o control.

#### Scenario: Fin de una ráfaga
- **WHEN** pasan 3 segundos desde el inicio de una ráfaga
- **THEN** no queda ninguna partícula en pantalla ni ningún elemento residual en la página

#### Scenario: Interacción durante la ráfaga
- **WHEN** el usuario pulsa un enlace o botón mientras cae confeti
- **THEN** el enlace o botón responde con normalidad

#### Scenario: Pulsaciones repetidas
- **WHEN** el usuario pulsa varias veces seguidas un CTA
- **THEN** la cantidad de partículas simultáneas permanece acotada y la página sigue respondiendo con fluidez

### Requirement: Sin confeti con movimiento reducido
Con `prefers-reduced-motion: reduce` activo, el sitio SHALL no lanzar confeti en ninguna circunstancia y las acciones asociadas SHALL funcionar igual.

#### Scenario: CTA con movimiento reducido
- **WHEN** con movimiento reducido activo el usuario pulsa un CTA de contacto
- **THEN** la acción del botón ocurre y no aparece confeti

#### Scenario: Gracias con movimiento reducido
- **WHEN** con movimiento reducido activo el usuario llega a `/gracias` tras enviar el formulario
- **THEN** la página se muestra sin confeti y con su mensaje y cuenta regresiva habituales
