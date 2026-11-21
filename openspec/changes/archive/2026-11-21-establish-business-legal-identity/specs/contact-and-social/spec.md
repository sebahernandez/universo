# Spec Delta

## ADDED Requirements

### Requirement: Fuente única de datos legales del negocio

Los datos legales del negocio —razón social "Universo Crafter SpA" y RUT "78.519.223-0"— SHALL definirse en el mismo módulo único de datos del sitio que los datos de contacto, y toda página o componente que los muestre SHALL leerlos de esa fuente, sin duplicar valores literales.

#### Scenario: Cambiar un dato legal en un solo lugar

- **WHEN** se actualiza la razón social o el RUT en el módulo de datos del sitio
- **THEN** el cambio se refleja en el footer, en los términos y condiciones, en la política de cookies y en los datos estructurados, sin editar cada archivo

#### Scenario: Sin valores literales duplicados

- **WHEN** se busca el texto "78.519.223-0" en el código fuente del sitio
- **THEN** aparece únicamente en el módulo de datos del sitio

### Requirement: Identificación legal en el footer

El footer SHALL mostrar, en todas las páginas del sitio, la razón social y el RUT del negocio con el formato `RUT: 78.519.223-0`, junto a la ubicación y el correo de contacto.

#### Scenario: Datos legales visibles en cualquier página

- **WHEN** un visitante llega al pie de cualquier página del sitio
- **THEN** ve la razón social "Universo Crafter SpA" y el texto "RUT: 78.519.223-0"

### Requirement: Identificación legal en los datos estructurados

Los datos estructurados del negocio SHALL incluir la razón social como `legalName` y el RUT como `taxID`, con los mismos valores que se muestran al visitante.

#### Scenario: Schema con razón social y RUT

- **WHEN** se genera el JSON-LD del negocio
- **THEN** incluye `legalName` con "Universo Crafter SpA" y `taxID` con "78.519.223-0"

#### Scenario: Consistencia entre lo visible y el schema

- **WHEN** se comparan la razón social y el RUT del footer con los del JSON-LD
- **THEN** ambos valores coinciden exactamente
