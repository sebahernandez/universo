# Spec Delta

## Purpose
Define el encabezado principal de la home: una presentación clara de la marca con badge, título destacado, subtítulo, doble llamado a la acción e imagen, que orienta al visitante hacia los productos y hacia conocer el negocio.

## ADDED Requirements

### Requirement: Encabezado principal con marca y doble CTA
El Hero SHALL mostrar un badge de categoría ("PAPELERÍA CREATIVA"), un título destacado ("Ideas que hacen tu mundo más lindo") con lettering en degradado, un subtítulo descriptivo y dos botones: uno primario "Ver productos" que lleva al catálogo y uno secundario "Conócenos" que lleva a la sección sobre el negocio.

#### Scenario: Visualización y navegación del Hero
- **WHEN** el usuario abre la home
- **THEN** ve el badge, el título, el subtítulo y los dos botones; "Ver productos" ancla a la sección de productos y "Conócenos" a la sección sobre el negocio

#### Scenario: Botones en una sola fila sin desbordar en móvil
- **WHEN** la home se muestra en viewports de 320–430 px
- **THEN** los dos botones se presentan sin provocar scroll horizontal y su texto no se corta

### Requirement: Imagen del Hero
El Hero SHALL mostrar una imagen de marca con texto alternativo, visible tanto en móvil como en escritorio, que mantenga su proporción y no provoque desbordamiento horizontal.

#### Scenario: Imagen visible y proporcional
- **WHEN** el usuario ve el Hero en móvil o escritorio
- **THEN** la imagen se muestra con su proporción conservada, con texto alternativo, sin recortes que la deformen ni scroll horizontal
