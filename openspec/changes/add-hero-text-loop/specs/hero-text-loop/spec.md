# Spec Delta

## Purpose

Define la cinta de texto ondulada que cierra el bloque Inicio de Universo Crafter, preservando el fundido hacia Quiénes somos y una experiencia legible con o sin animación.

## ADDED Requirements

### Requirement: Cinta ondulada al cierre de Inicio

La home SHALL mostrar una única cinta con «Papelería creativa ✦ Hecha para recordar» al final de Inicio, después de su contenido e imagen y antes de Quiénes somos. El texto SHALL repetirse sobre una trayectoria ondulada con movimiento continuo cuando el movimiento esté permitido.

#### Scenario: Ubicación y contenido

- **WHEN** el usuario recorre la home desde Inicio hacia Quiénes somos
- **THEN** encuentra una única cinta ondulada con el texto acordado entre ambos contenidos y conserva el título, el lema, la descripción y los botones existentes

#### Scenario: Repetición continua

- **WHEN** la cinta está visible y el movimiento está permitido
- **THEN** el texto avanza suavemente por la onda y cada repetición enlaza con la siguiente sin saltos ni interrupciones perceptibles

### Requirement: Continuidad del degradado entre secciones

La cinta SHALL integrarse sobre el fundido rosa → celeste existente de Inicio. Su contenedor y el espacio alrededor de la trayectoria SHALL dejar visible ese fondo; el borde inferior de Inicio SHALL conservar el mismo celeste que el inicio de Quiénes somos.

#### Scenario: Fondo visible alrededor de la onda

- **WHEN** el usuario observa la cinta y sus espacios superiores e inferiores
- **THEN** el fundido rosa → celeste sigue siendo visible y ninguna superficie rectangular nueva lo sustituye u oculta

#### Scenario: Unión sin costura

- **WHEN** se inspecciona el límite entre Inicio y Quiénes somos en móvil y escritorio
- **THEN** el fondo llega de forma continua al celeste de Quiénes somos, sin línea de corte, cambio brusco de color ni hueco con otro fondo

### Requirement: Disposición sin superposiciones

La cinta SHALL disponer de espacio propio, mantenerse separada de la imagen y de los controles de Inicio, y conservar el acceso al contenido de Quiénes somos. Añadirla SHALL mantener la composición de la imagen respecto del contenido principal del hero.

#### Scenario: Imagen y botones en escritorio

- **WHEN** la cinta se presenta bajo el contenido principal en un viewport de escritorio
- **THEN** la imagen mantiene su alineación con el bloque principal y la cinta no cubre la imagen, el texto o los botones

#### Scenario: Secuencia en móvil

- **WHEN** la home se muestra en un viewport móvil
- **THEN** el contenido principal, su imagen, la cinta y Quiénes somos aparecen en ese orden, sin superposiciones y con enlaces utilizables

### Requirement: Presentación responsive y legible

La cinta SHALL adaptarse al ancho disponible sin causar scroll horizontal en la página. El texto visible SHALL tener un tamaño equivalente de al menos 16 píxeles CSS, contraste mínimo de 4.5:1 sobre la cinta y glifos completos; su diseño SHALL usar la paleta pastel y la tipografía sans del sitio.

#### Scenario: Anchos representativos

- **WHEN** la home se muestra a 320, 375, 768, 1024 y 1440 píxeles de ancho
- **THEN** la cinta cabe en la página, mantiene legibilidad y no produce desbordamiento horizontal

#### Scenario: Tildes y bordes de la trayectoria

- **WHEN** el texto se desplaza a lo largo de la onda
- **THEN** las tildes y los glifos visibles se muestran completos; solo la entrada y salida lateral del texto pueden quedar fuera del área visible como parte del bucle

### Requirement: Movimiento reducido

La cinta SHALL presentarse de forma estática y legible cuando esté activa la preferencia de movimiento reducido. Cambiar esa preferencia mientras la página está abierta SHALL detener o permitir el movimiento, respetando la pausa temporal con puntero y la visibilidad.

#### Scenario: Preferencia activa al cargar

- **WHEN** el usuario carga la home con movimiento reducido
- **THEN** la cinta conserva su texto y apariencia ondulada sin desplazamiento automático

#### Scenario: Preferencia modificada durante la visita

- **WHEN** el usuario activa o desactiva movimiento reducido mientras la home permanece abierta
- **THEN** el movimiento se actualiza sin recargar y solo se reanuda si la cinta está visible y el puntero no la mantiene pausada

### Requirement: Pausa temporal sin controles visibles

La cinta SHALL presentarse sin botón de pausa o reanudación ni espacio reservado para ese control. Mientras el puntero del ratón esté sobre la cinta SHALL pausarse temporalmente; retirarlo SHALL respetar el movimiento reducido y la visibilidad. La interacción táctil SHALL evitar una pausa persistente por hover.

#### Scenario: Presentación sin botón

- **WHEN** la cinta se muestra en móvil o escritorio, con movimiento permitido o reducido
- **THEN** no existe un botón de pausa o reanudación ni una franja reservada para ese botón

#### Scenario: Pausa temporal con el puntero

- **WHEN** el usuario coloca y retira el puntero sobre la cinta
- **THEN** el movimiento se pausa mientras permanece encima y solo se reanuda si ninguna otra condición lo mantiene detenido

#### Scenario: Interacción táctil

- **WHEN** el usuario toca la cinta en una pantalla táctil con movimiento permitido
- **THEN** la animación no queda pausada por un estado de hover persistente

### Requirement: Contenido disponible sin JavaScript

La home SHALL mostrar una versión estática legible del mensaje cuando JavaScript esté deshabilitado o la animación no se inicialice. El texto repetido SHALL anunciarse una sola vez a tecnologías de asistencia, sin anuncios continuos de sus desplazamientos.

#### Scenario: Carga sin JavaScript

- **WHEN** el usuario carga la home sin JavaScript
- **THEN** el mensaje permanece visible en el espacio de la cinta y el degradado y los enlaces siguen disponibles

#### Scenario: Lectura con tecnología de asistencia

- **WHEN** se recorre la cinta con un lector de pantalla
- **THEN** el mensaje se anuncia una sola vez y las repeticiones visuales no se duplican en la lectura

### Requirement: Conservación de los títulos existentes

La incorporación de la cinta SHALL conservar en los títulos existentes la tipografía manuscrita, los colores y la animación de sus degradados, el espaciado y los glifos completos definidos para esos títulos.

#### Scenario: Comparación antes y después

- **WHEN** se comparan los títulos de Inicio y Quiénes somos antes y después de incorporar la cinta
- **THEN** mantienen su presentación y comportamiento existentes, incluyendo sus degradados estáticos cuando se solicita movimiento reducido
