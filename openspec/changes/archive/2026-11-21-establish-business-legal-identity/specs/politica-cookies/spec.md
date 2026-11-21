# Spec Delta

## ADDED Requirements

### Requirement: Identificación del responsable del sitio

La página SHALL identificar a la persona jurídica responsable del sitio y del almacenamiento descrito en la política: razón social "Universo Crafter SpA", RUT "78.519.223-0", ubicación (Santiago, Región Metropolitana, Chile) y correo de contacto. La razón social y el RUT SHALL provenir de la fuente única de datos del sitio.

#### Scenario: Responsable identificado

- **WHEN** un visitante lee la política de cookies
- **THEN** encuentra una sección que indica quién es el responsable del sitio, con la razón social "Universo Crafter SpA" y el texto "RUT: 78.519.223-0"

#### Scenario: Consistencia con los términos y condiciones

- **WHEN** se comparan la razón social y el RUT de `/politica-cookies` con los de `/terminos-condiciones`
- **THEN** ambos valores coinciden exactamente
