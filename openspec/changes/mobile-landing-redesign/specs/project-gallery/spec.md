# Spec Delta

## REMOVED Requirements

### Requirement: Presentación de proyectos como espiral auto-animado
**Reason**: El rediseño retira la galería en espiral; los productos se presentan en el nuevo catálogo por categorías.
**Migration**: Ver la capacidad `product-catalog`. Las imágenes de `galeria` se reutilizan como assets de las tarjetas de producto.

### Requirement: Disposición a dos columnas con adaptación móvil
**Reason**: La sección de proyectos en espiral deja de existir en la nueva arquitectura de la home.
**Migration**: La presentación de productos se define en `product-catalog` (grid de tarjetas con pestañas de categoría).

### Requirement: Accesibilidad y movimiento reducido
**Reason**: Al retirarse el espiral animado no hay animación de galería que gestionar.
**Migration**: Las tarjetas de `product-catalog` son estáticas; conservan texto alternativo en sus imágenes.
