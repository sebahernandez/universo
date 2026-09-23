# cookie-consent Specification

## Purpose
Define el banner de consentimiento de cookies del sitio: su presentación responsive y su convivencia con otros elementos flotantes fijos, como el botón de WhatsApp, sin solaparse.

## Requirements

### Requirement: El banner no se solapa con elementos flotantes en móvil

En viewports móviles, el banner de cookies SHALL mostrarse sin superponerse al botón flotante de WhatsApp ni a otros elementos fijos de la esquina inferior. Los botones Aceptar y Rechazar del banner y el botón flotante de WhatsApp SHALL quedar completamente visibles y ser tocables al mismo tiempo mientras el banner está presente.

#### Scenario: Banner visible junto al botón de WhatsApp en móvil

- **WHEN** un usuario en un dispositivo móvil visita el sitio por primera vez (sin decisión de cookies guardada) y ambos, el banner y el botón de WhatsApp, están presentes
- **THEN** el banner y el botón de WhatsApp se muestran sin superponerse, y sus áreas interactivas no se tapan entre sí

#### Scenario: Los botones del banner son tocables en móvil

- **WHEN** el banner está visible en móvil
- **THEN** los botones Aceptar y Rechazar reciben el tap y ningún otro elemento flotante intercepta esos toques

### Requirement: El layout de escritorio se conserva

En pantallas anchas, el banner de cookies SHALL conservar su posición habitual (esquina inferior) coexistiendo con el botón de WhatsApp sin cambios visibles respecto al comportamiento previo a este arreglo.

#### Scenario: Escritorio sin cambios de posición

- **WHEN** un usuario en escritorio ve el banner de cookies y el botón de WhatsApp
- **THEN** ambos aparecen en sus posiciones habituales de la esquina inferior sin solaparse

### Requirement: La lógica de consentimiento no cambia

El arreglo de posicionamiento SHALL preservar el comportamiento de consentimiento existente: al aceptar o rechazar se persiste la decisión, el banner se oculta, y el enforcement de scripts y el Google Consent Mode se actualizan igual que antes.

#### Scenario: Aceptar oculta el banner y aplica el consentimiento

- **WHEN** el usuario pulsa Aceptar en el banner (en móvil o escritorio)
- **THEN** el banner se oculta, la decisión queda persistida y el consentimiento se aplica como antes del arreglo
