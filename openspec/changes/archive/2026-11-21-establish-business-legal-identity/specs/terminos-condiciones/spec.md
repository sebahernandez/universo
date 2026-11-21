# Spec Delta

## MODIFIED Requirements

### Requirement: Identificación de la empresa

La página SHALL identificar de forma clara al vendedor: razón social "Universo Crafter SpA", su RUT "78.519.223-0", su condición de tienda online con base en Santiago, Región Metropolitana, y sus canales de contacto (correo, WhatsApp y redes sociales). La razón social y el RUT SHALL provenir de la fuente única de datos del sitio y NO SHALL mostrarse como `[PLACEHOLDER]`.

#### Scenario: Datos del vendedor visibles

- **WHEN** un visitante lee la sección de identificación
- **THEN** encuentra la razón social, el texto "RUT: 78.519.223-0", la modalidad de venta online y los canales de contacto oficiales

#### Scenario: Sin marcador pendiente para el RUT

- **WHEN** se revisa el contenido publicado de `/terminos-condiciones`
- **THEN** no aparece el texto `[PLACEHOLDER: RUT de la empresa]` ni ningún otro marcador en lugar del RUT
