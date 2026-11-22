# Spec Delta

## RENAMED Requirements

- FROM: `### Requirement: Iconos de redes sociales como chips de vidrio`
- TO: `### Requirement: Accesos a redes sociales como discos de color en el header`

## MODIFIED Requirements

### Requirement: Enlaces de escritorio en negrita con indicación animada
En viewports de escritorio, cada enlace de navegación SHALL mostrarse en negrita (peso 700) y en el color de tinta fuerte, y SHALL mostrar una indicación visual animada al pasar el cursor (hover) y al tener el foco de teclado, más allá de un simple cambio de color. Con la capa de movimiento activa la indicación es el marcador de sección; sin JavaScript, un subrayado.

#### Scenario: Aspecto en reposo
- **WHEN** se observan los enlaces de navegación en escritorio
- **THEN** se muestran en negrita y en el color de tinta fuerte

#### Scenario: Hover sobre un enlace
- **WHEN** el usuario pasa el cursor sobre un enlace de navegación en escritorio
- **THEN** el marcador se desliza hasta el enlace y el texto conserva su color de tinta

#### Scenario: Hover sin JavaScript
- **WHEN** JavaScript está deshabilitado y el usuario pasa el cursor sobre un enlace
- **THEN** el enlace muestra un subrayado animado

#### Scenario: Foco de teclado sobre un enlace
- **WHEN** el usuario navega con el teclado (Tab) hasta un enlace de navegación
- **THEN** el enlace muestra un indicador de foco visible y con contraste suficiente, consistente con el estilo de hover

### Requirement: Accesos a redes sociales como discos de color en el header
Los enlaces de redes sociales en el header SHALL presentarse como discos circulares rellenos con un color pastel propio de cada red y un icono en color de tinta de al menos 20 px, con contraste mínimo de 3:1 entre icono y disco, una leve elevación al pasar el cursor, foco de teclado visible, y respetando `prefers-reduced-motion`. SHALL mostrarse en la barra en todos los anchos de viewport, sin provocar desbordamiento, y las redes SHALL ofrecerse además dentro del menú móvil con su nombre de cuenta.

#### Scenario: Chips en escritorio
- **WHEN** se observa el header en un viewport amplio
- **THEN** cada red social aparece como un disco de color con su icono oscuro, y al pasar el cursor se eleva levemente

#### Scenario: Foco de teclado en un chip
- **WHEN** el usuario enfoca un acceso de red social con el teclado
- **THEN** se muestra un indicador de foco visible

#### Scenario: Pantallas pequeñas
- **WHEN** se observa el header en un viewport de 320 px de ancho
- **THEN** los discos de redes se muestran en la barra junto al logo y al botón de menú, sin scroll horizontal, y las redes aparecen también dentro del menú móvil
