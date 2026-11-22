# Spec Delta

## MODIFIED Requirements

### Requirement: Catálogo de tarjetas de producto sin precios
La home SHALL mostrar una sección "Nuestros Productos" con tarjetas de producto; cada tarjeta SHALL consistir únicamente en una imagen que ocupa toda la tarjeta, con texto alternativo que identifica el producto, y NO SHALL mostrar nombre, categoría, botones ni precios visibles.

#### Scenario: Visualización de las tarjetas
- **WHEN** el usuario llega a la sección de productos
- **THEN** ve las tarjetas como imágenes a tamaño completo, sin texto, botones ni precios visibles

#### Scenario: Nombre accesible
- **WHEN** un lector de pantalla enfoca una tarjeta de producto
- **THEN** anuncia el texto alternativo de su imagen como nombre del enlace
