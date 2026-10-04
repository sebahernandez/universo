# Spec Delta

## Purpose

Define el comportamiento visual e interactivo del menú de navegación principal del sitio (header), presentado como una isla flotante estilo glass integrada con el fondo del Hero, incluyendo cómo se comporta al desplazarse por la página, en escritorio y en móvil.

## ADDED Requirements

### Requirement: Menú flotante estilo glass (isla)
El header SHALL presentarse como una isla flotante de vidrio esmerilado (fondo blanco semi-transparente + `backdrop-filter` blur + sombra suave + borde sutil) con esquinas claramente redondeadas, que abarca únicamente el menú y NO SHALL ocupar todo el ancho como una barra sólida. El degradado del Hero SHALL percibirse por detrás y alrededor de la isla. Donde `backdrop-filter` no tenga soporte, la opacidad del fondo SHALL subir para preservar la legibilidad.

#### Scenario: Carga inicial de la página
- **WHEN** el usuario carga o recarga una página con Hero y la posición de scroll está en la parte superior
- **THEN** el menú se muestra como una isla de vidrio esmerilado con esquinas redondeadas, y el degradado del Hero es visible por detrás y a los lados de la isla

#### Scenario: La isla no ocupa todo el ancho
- **WHEN** se observa el header en cualquier viewport
- **THEN** la isla tiene márgenes respecto a los bordes y envuelve sólo el contenido del menú, sin dibujarse como una barra de borde a borde

#### Scenario: Navegador sin backdrop-filter
- **WHEN** el navegador no soporta `backdrop-filter`
- **THEN** la isla usa un fondo más opaco de modo que el logo, los enlaces y los iconos siguen siendo legibles

### Requirement: La isla se intensifica al desplazarse fuera del Hero
Cuando el usuario desplaza la página más allá de la sección Hero, la isla SHALL volverse algo más opaca y con una sombra más marcada (manteniendo el estilo glass), para reforzar la legibilidad sobre el resto de secciones del sitio.

#### Scenario: Scroll más allá del Hero
- **WHEN** el usuario desplaza la página hasta que la sección Hero deja de estar en la parte superior del viewport
- **THEN** la isla aumenta su opacidad y su sombra, y el logo, los enlaces y el botón de menú mantienen contraste suficiente

#### Scenario: El menú permanece visible al desplazar
- **WHEN** el usuario continúa desplazándose por cualquier sección posterior al Hero
- **THEN** la isla permanece fija y visible en la parte superior de la ventana

### Requirement: Hero a tope arriba sin espacio vacío
El menú SHALL estar posicionado fuera del flujo del documento (fijo) de modo que el Hero quede a tope en la parte superior de la ventana, sin una franja vacía por encima; el fondo del Hero SHALL llegar hasta el borde superior, por detrás de la isla flotante.

#### Scenario: Hero al tope de la página
- **WHEN** se carga una página cuyo primer contenido es el Hero
- **THEN** el fondo del Hero empieza en el borde superior de la ventana (sin banda vacía) y la isla del menú flota por encima de él

#### Scenario: El contenido del Hero no queda tapado
- **WHEN** el Hero se muestra bajo la isla flotante
- **THEN** el título y el contenido del Hero quedan por debajo de la isla, sin ser ocultados por ella

### Requirement: Páginas sin Hero reservan espacio bajo el menú fijo
En páginas sin Hero (contenido o legales), el contenido principal SHALL reservar suficiente espacio superior para que sus encabezados no queden ocultos tras el menú fijo, y los saltos por anclas SHALL posicionar el destino por debajo del menú.

#### Scenario: Encabezado de una página de contenido
- **WHEN** el usuario abre una página sin Hero (p. ej. preguntas frecuentes, política de cookies, términos)
- **THEN** su encabezado principal es completamente visible por debajo del menú flotante, sin quedar tapado

#### Scenario: Salto por ancla
- **WHEN** el usuario navega a un enlace con ancla a una sección
- **THEN** el inicio de la sección destino queda por debajo del menú flotante, no oculto tras él

### Requirement: Navbar compacto
El logo SHALL dimensionarse de modo que la altura del menú se mantenga compacta y no resulte demasiado alta, conservando la legibilidad del logo en móvil y escritorio.

#### Scenario: Altura del menú
- **WHEN** se observa el menú en escritorio o móvil
- **THEN** la isla tiene una altura contenida (el logo no la hace excesivamente alta) y el logo sigue siendo legible

### Requirement: Transición animada al cambiar de estado
El cambio de apariencia de la isla (opacidad/sombra al entrar y salir del Hero) SHALL animarse de forma suave, sin saltos abruptos, y SHALL respetar la preferencia del sistema `prefers-reduced-motion` reduciendo o eliminando la animación cuando está activa.

#### Scenario: Transición suave por defecto
- **WHEN** el usuario cruza el umbral de scroll que separa los estados de la isla
- **THEN** el cambio de fondo y sombra ocurre mediante una transición animada perceptible, no instantánea

#### Scenario: Movimiento reducido
- **WHEN** el usuario tiene activada la preferencia `prefers-reduced-motion: reduce`
- **THEN** el cambio de estado ocurre sin animación de movimiento o con una duración mínima imperceptible

### Requirement: Legibilidad del botón de menú y logo
El botón de menú (hamburguesa) en móvil y el logo SHALL mantener suficiente contraste frente a su fondo tanto cuando la isla flota sobre el Hero como cuando está en su estado intensificado tras hacer scroll.

#### Scenario: Botón de menú sobre el Hero
- **WHEN** la isla flota sobre el Hero
- **THEN** el botón de menú y su ícono son claramente distinguibles

#### Scenario: Botón de menú tras hacer scroll
- **WHEN** la isla está en su estado intensificado tras hacer scroll
- **THEN** el botón de menú y su ícono mantienen el mismo nivel de contraste y reconocibilidad

### Requirement: Enlaces de escritorio en negrita con indicación animada
En viewports de escritorio, cada enlace de navegación SHALL mostrarse en negrita (peso 700) y en el color de tinta fuerte, y SHALL mostrar una indicación visual animada (p. ej. subrayado) al pasar el cursor (hover) y al tener el foco de teclado, más allá de un simple cambio de color.

#### Scenario: Aspecto en reposo
- **WHEN** se observan los enlaces de navegación en escritorio
- **THEN** se muestran en negrita y en el color de tinta fuerte

#### Scenario: Hover sobre un enlace
- **WHEN** el usuario pasa el cursor sobre un enlace de navegación en escritorio
- **THEN** el enlace muestra una indicación visual animada (p. ej. subrayado) además del cambio de color

#### Scenario: Foco de teclado sobre un enlace
- **WHEN** el usuario navega con el teclado (Tab) hasta un enlace de navegación
- **THEN** el enlace muestra un indicador de foco visible y con contraste suficiente, consistente con el estilo de hover

### Requirement: Iconos de redes sociales como chips de vidrio
Los enlaces de redes sociales en el header SHALL presentarse como chips circulares de vidrio acordes a la isla, con una leve elevación y color de marca al pasar el cursor, foco de teclado visible, y respetando `prefers-reduced-motion`. En pantallas pequeñas SHALL ocultarse, donde las redes se ofrecen dentro del menú móvil.

#### Scenario: Chips en escritorio
- **WHEN** se observa el header en un viewport amplio
- **THEN** cada red social aparece como un chip circular de vidrio, y al pasar el cursor se eleva levemente y toma su color de marca

#### Scenario: Foco de teclado en un chip
- **WHEN** el usuario enfoca un chip de red social con el teclado
- **THEN** se muestra un indicador de foco visible

#### Scenario: Pantallas pequeñas
- **WHEN** se observa el header en un viewport angosto (móvil)
- **THEN** los chips de redes no se muestran en la barra y las redes quedan disponibles dentro del menú móvil

### Requirement: Interacción del menú móvil se preserva
El comportamiento de apertura, cierre y navegación del menú móvil desplegable SHALL mantenerse sin regresiones: abrir/cerrar con el botón de hamburguesa, cerrar al tocar el fondo oscurecido, cerrar al presionar Escape, cerrar al seleccionar un enlace, y cerrar al tocar fuera del header.

#### Scenario: Apertura y cierre con el botón
- **WHEN** el usuario toca el botón de menú en móvil
- **THEN** el panel del menú se despliega, y al tocarlo de nuevo se cierra

#### Scenario: Cierre por Escape, backdrop, enlace o clic externo
- **WHEN** el menú móvil está abierto y el usuario presiona Escape, toca el fondo oscurecido, selecciona un enlace, o hace clic fuera del header
- **THEN** el menú móvil se cierra en cada uno de esos casos
