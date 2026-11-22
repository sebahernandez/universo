# Spec Delta

## Purpose

Define las reglas transversales que cumple toda animación e interacción con movimiento del sitio, para que la capa de movimiento nunca comprometa el acceso al contenido, la accesibilidad ni la estabilidad visual.

## ADDED Requirements

### Requirement: Contenido disponible sin JavaScript
Todo el contenido del sitio SHALL permanecer visible y utilizable cuando JavaScript esté deshabilitado o cuando la capa de movimiento no llegue a inicializarse. Ningún texto, imagen, enlace o control SHALL depender de una animación para hacerse visible.

#### Scenario: JavaScript deshabilitado
- **WHEN** el usuario carga cualquier página del sitio con JavaScript deshabilitado
- **THEN** todas las secciones, textos, imágenes y enlaces se muestran en su estado final, sin elementos ocultos ni desplazados

#### Scenario: La capa de movimiento no se inicializa
- **WHEN** JavaScript está habilitado pero el código de movimiento no se descarga o falla al iniciar
- **THEN** en un máximo de 3 segundos desde la carga todo el contenido queda visible en su estado final

### Requirement: Respeto a la preferencia de movimiento reducido
Cuando el usuario indique `prefers-reduced-motion: reduce`, el sitio SHALL mostrar todo el contenido en su estado final sin animaciones de entrada, parallax, inclinación, confeti, bucles decorativos ni transiciones entre páginas. Los cambios de estado funcionales (filtrar, cambiar de testimonio, abrir un panel) SHALL seguir funcionando de forma instantánea.

#### Scenario: Carga con movimiento reducido activo
- **WHEN** el usuario carga la home con la preferencia de movimiento reducido activa
- **THEN** todas las secciones se muestran completas desde el primer momento y ningún elemento se mueve al desplazar la página o mover el puntero

#### Scenario: Función sin animación
- **WHEN** con movimiento reducido activo el usuario cambia de categoría en Productos o de testimonio en el carrusel
- **THEN** el contenido cambia de inmediato, sin transición, y el resultado es el mismo que con movimiento permitido

#### Scenario: Cambio de preferencia con la página abierta
- **WHEN** el usuario activa la preferencia de movimiento reducido mientras la página está abierta
- **THEN** las animaciones en curso se detienen y el contenido queda en su estado final

### Requirement: Adaptación a dispositivos táctiles
Los efectos que dependen de la posición del puntero (inclinación de tarjetas, botones magnéticos, capas que siguen al cursor) SHALL activarse solo en dispositivos con puntero fino y capacidad de `hover`. En dispositivos táctiles el resto de la capa de movimiento SHALL seguir disponible.

#### Scenario: Dispositivo táctil
- **WHEN** el usuario navega la home desde un teléfono
- **THEN** las secciones se revelan al desplazar, pero ninguna tarjeta ni botón queda inclinado o desplazado tras tocarlo

#### Scenario: Escritorio con ratón
- **WHEN** el usuario mueve el ratón sobre una tarjeta o un CTA principal en escritorio
- **THEN** el elemento responde a la posición del puntero y vuelve a su posición de reposo al retirarlo

### Requirement: Sin desbordamiento horizontal
Ninguna animación, capa decorativa o elemento desplazado SHALL provocar scroll horizontal en la página, en ningún ancho de viewport entre 320 px y 1920 px.

#### Scenario: Viewport móvil estrecho
- **WHEN** el usuario recorre la home completa en un viewport de 320 px de ancho, incluidas las animaciones en curso
- **THEN** la página no admite desplazamiento horizontal en ningún momento

### Requirement: Estabilidad del layout
Las animaciones SHALL no desplazar el contenido circundante ni cambiar el espacio que ocupa un elemento en el flujo. El desplazamiento acumulado de layout atribuible a la capa de movimiento SHALL ser inferior a 0.02 (CLS).

#### Scenario: Entrada de una sección
- **WHEN** una sección se revela al entrar en el viewport
- **THEN** los elementos que la rodean no cambian de posición ni de tamaño

#### Scenario: Respuesta al puntero
- **WHEN** una tarjeta se inclina o un botón se desplaza siguiendo al puntero
- **THEN** los elementos vecinos permanecen en su sitio

### Requirement: Glifos y foco sin recortes
Las animaciones de texto SHALL mostrar los glifos completos (ascendentes, descendentes y tildes de la tipografía manuscrita) durante toda la animación y en su estado final. Los anillos de foco visibles SHALL conservarse en los elementos interactivos animados.

#### Scenario: Título manuscrito animado
- **WHEN** un título en tipografía manuscrita entra con su animación
- **THEN** ninguna letra, tilde o descendente aparece cortada en ningún fotograma ni al finalizar

#### Scenario: Navegación con teclado
- **WHEN** el usuario recorre con Tab los CTA, tarjetas y controles animados
- **THEN** cada uno muestra su anillo de foco completo y el orden de tabulación coincide con el orden visual

### Requirement: Las animaciones en bucle se detienen fuera de pantalla
Las animaciones continuas decorativas SHALL pausarse cuando su elemento esté fuera del viewport o cuando la pestaña no esté visible.

#### Scenario: Elemento fuera del viewport
- **WHEN** el usuario desplaza la página hasta que un elemento con animación continua sale del viewport
- **THEN** esa animación se pausa y se reanuda al volver a entrar

#### Scenario: Pestaña en segundo plano
- **WHEN** el usuario cambia a otra pestaña del navegador
- **THEN** las animaciones continuas del sitio se pausan hasta que la pestaña vuelve a estar visible

### Requirement: Los elementos decorativos son invisibles para tecnologías de asistencia
Las piezas añadidas únicamente como decoración animada (papeles flotantes, trazos, tijera, lienzo de confeti) SHALL estar ocultas para tecnologías de asistencia y SHALL no interceptar clics, toques ni el foco.

#### Scenario: Lector de pantalla
- **WHEN** un lector de pantalla recorre la home
- **THEN** anuncia el mismo contenido que antes de este cambio, sin elementos decorativos nuevos

#### Scenario: Decoración sobre un control
- **WHEN** una pieza decorativa pasa por encima de un botón o enlace
- **THEN** el control sigue recibiendo el clic o toque
