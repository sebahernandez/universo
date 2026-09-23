# Spec Delta

## ADDED Requirements

### Requirement: Los controles del banner no son interceptados por otros flotantes

En móvil, los controles interactivos del banner de cookies (botones Aceptar y Rechazar y el enlace "Más información") SHALL recibir la interacción del usuario aunque otro elemento flotante (por ejemplo el widget de WhatsApp) se solape visualmente con el área del banner. Ningún elemento flotante SHALL interceptar los taps destinados a esos controles mediante su caja invisible o su `z-index`.

#### Scenario: Aceptar cierra el banner y aplica el consentimiento en móvil

- **WHEN** en un dispositivo móvil el usuario pulsa "Aceptar" en el banner de cookies
- **THEN** el banner se cierra y se ejecutan las funciones de consentimiento de aceptación (se persiste la decisión, se actualiza Google Consent Mode a "granted" y se activan los scripts de tracking previamente bloqueados)

#### Scenario: Rechazar cierra el banner y aplica el consentimiento en móvil

- **WHEN** en un dispositivo móvil el usuario pulsa "Rechazar" en el banner de cookies
- **THEN** el banner se cierra y se ejecutan las funciones de consentimiento de rechazo (se persiste la decisión, se mantiene Google Consent Mode en "denied" y no se activan los scripts de tracking)

#### Scenario: El tap llega al botón aunque un flotante se solape

- **WHEN** el widget de WhatsApp se solapa visualmente con la zona de los botones del banner en móvil
- **THEN** el tap sobre Aceptar o Rechazar llega al botón del banner y no lo intercepta el widget de WhatsApp
