# Spec Delta

## ADDED Requirements

### Requirement: Presentación de proyectos como espiral auto-animado

La sección de proyectos SHALL presentar las imágenes de proyectos con un efecto de carrusel en espiral (Infinite Spiral) que las cicla de forma continua y automática, sin abrir modales ni requerir clic del usuario para verlas.

#### Scenario: Las imágenes ciclan solas

- **WHEN** el usuario ve la sección de proyectos
- **THEN** las imágenes de proyecto se muestran pasando de forma continua en el efecto espiral, sin intervención del usuario

#### Scenario: Sin modal

- **WHEN** el usuario interactúa con la sección de proyectos
- **THEN** no se abre ningún modal/lightbox; la sección solo muestra el espiral animado y el texto

### Requirement: Disposición a dos columnas con adaptación móvil

En escritorio, la sección SHALL disponer el texto de presentación ("Nuestros Proyectos" + subtítulo) en la columna izquierda y el efecto espiral en la columna derecha. En móvil, ambas partes SHALL apilarse (texto arriba, espiral abajo) con una altura contenida y sin provocar desbordes horizontales.

#### Scenario: Dos columnas en escritorio

- **WHEN** se ve la sección en un viewport ancho
- **THEN** el texto aparece a la izquierda y el espiral a la derecha

#### Scenario: Apilado en móvil

- **WHEN** se ve la sección en un viewport móvil
- **THEN** el texto y el espiral se apilan verticalmente, el espiral cabe en pantalla y no hay scroll horizontal

### Requirement: Accesibilidad y movimiento reducido

Las imágenes del espiral SHALL conservar texto alternativo. Cuando el usuario indica `prefers-reduced-motion: reduce`, la animación del espiral SHALL reducirse o pausarse.

#### Scenario: Movimiento reducido

- **WHEN** el usuario tiene activada la preferencia de movimiento reducido
- **THEN** el espiral no gira de forma continua (se pausa o reduce su movimiento)

## REMOVED Requirements

### Requirement: Modal en máxima calidad respetando su tamaño

**Reason**: Se elimina el modal/lightbox de proyectos; la presentación pasa a ser el espiral auto-animado sin modal.
**Migration**: Ya no hay vista ampliada por proyecto. Las imágenes se muestran dentro del efecto espiral; si en el futuro se necesita ver una imagen en grande, se planificará como un cambio aparte.

### Requirement: La miniatura no aplica super-resolución

**Reason**: Ya no existe la grilla de miniaturas; las imágenes se sirven para el espiral.
**Migration**: El dimensionado/optimización de imágenes se define para el contexto del espiral (Cloudinary `f_auto,q_auto` al tamaño mostrado).

### Requirement: Fuente única por proyecto

**Reason**: El requisito describía la correspondencia miniatura↔modal, que desaparece al quitar el modal.
**Migration**: Cada imagen del espiral proviene de su `public_id` de proyecto en `galeria`; no hay miniatura ni modal que emparejar.
