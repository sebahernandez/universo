# Spec Delta

## Purpose
Define los bloques de llamado a la acción de la home que invitan a explorar la colección, a contactar ante dudas y a seguir la comunidad en Instagram, reforzando la conversión y la relación con la marca.

## ADDED Requirements

### Requirement: Banner promocional de colección
La home SHALL mostrar un banner "Papelería para cada momento" con una imagen de marca (con texto alternativo), un texto breve y un botón "Ver colección" que dirige a la sección de productos.

#### Scenario: Interacción con el banner de colección
- **WHEN** el usuario activa el botón "Ver colección"
- **THEN** es dirigido a la sección de productos, y la imagen del banner conserva su proporción sin provocar scroll horizontal

### Requirement: CTA de dudas hacia contacto
La home SHALL mostrar un bloque "¿Tienes alguna duda?" con un botón "Contáctanos" que dirige a la sección de contacto.

#### Scenario: Interacción con el CTA de dudas
- **WHEN** el usuario activa el botón "Contáctanos"
- **THEN** es dirigido a la sección de contacto de la home

### Requirement: CTA de comunidad en Instagram
La home SHALL mostrar un bloque "Únete a nuestra comunidad creativa" con un botón/enlace que abre el perfil de Instagram del negocio en una pestaña nueva de forma segura, usando el enlace definido en los datos del sitio.

#### Scenario: Interacción con el CTA de comunidad
- **WHEN** el usuario activa el botón de comunidad
- **THEN** se abre el perfil de Instagram del negocio en una pestaña nueva con `rel` seguro, usando el mismo perfil definido en los datos del sitio
