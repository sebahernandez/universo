# Spec Delta

## Purpose

Define cómo se mueve y responde cada sección de la home: la entrada del Hero, los revelados al desplazar, la respuesta al puntero y las transiciones de los cambios de estado, de modo que la página comunique celebración y oficio artesanal.

## ADDED Requirements

### Requirement: Entrada orquestada del Hero
Al cargar la home con movimiento permitido, el distintivo, las tres líneas del título, el párrafo y los dos CTA del Hero SHALL entrar en secuencia, en ese orden, y la secuencia completa SHALL terminar en 1.6 segundos o menos desde el primer pintado. La entrada SHALL comenzar sin esperar a la descarga del código de movimiento.

#### Scenario: Carga inicial
- **WHEN** el usuario carga la home con el scroll en la parte superior
- **THEN** los elementos del Hero aparecen uno tras otro en el orden indicado y a los 1.6 segundos todos están en su posición final

#### Scenario: Conexión lenta
- **WHEN** el código de movimiento tarda en descargarse
- **THEN** la entrada del Hero ocurre igualmente y el título es legible dentro de los primeros 1.6 segundos

### Requirement: Profundidad del Hero
El Hero SHALL presentar profundidad: su imagen de fondo SHALL desplazarse más lento que el contenido al hacer scroll, y un conjunto de piezas de papel decorativas en la paleta del sitio SHALL flotar en capas. Las piezas SHALL no cubrir el título, el párrafo ni los CTA.

#### Scenario: Desplazamiento desde el Hero
- **WHEN** el usuario desplaza la página mientras el Hero es visible
- **THEN** la imagen de fondo se mueve a menor velocidad que el texto, sin dejar ver bordes vacíos

#### Scenario: Puntero sobre el Hero en escritorio
- **WHEN** el usuario mueve el ratón sobre el Hero
- **THEN** las piezas decorativas se desplazan levemente según su capa, las más cercanas más que las lejanas

#### Scenario: Legibilidad
- **WHEN** se observa el Hero en viewports de 375, 768 y 1440 px
- **THEN** ninguna pieza decorativa se superpone al título, al párrafo o a los CTA

### Requirement: Revelado de secciones al desplazar
Cada sección de la home posterior al Hero SHALL revelar su contenido la primera vez que entra en el viewport, y SHALL permanecer visible después. Los grupos de elementos repetidos (tarjetas, pasos, preguntas, enlaces de contacto) SHALL revelarse en cascada. El gesto de entrada SHALL variar entre secciones en lugar de repetir un único efecto.

#### Scenario: Primera entrada de una sección
- **WHEN** el usuario desplaza la página hasta que una sección entra en el viewport por primera vez
- **THEN** su título y su contenido se revelan, y los elementos repetidos aparecen uno tras otro

#### Scenario: Volver a una sección ya revelada
- **WHEN** el usuario vuelve a una sección que ya se reveló
- **THEN** su contenido ya está visible y no vuelve a animarse

#### Scenario: Llegada por ancla
- **WHEN** el usuario llega a una sección mediante un enlace de ancla del menú o desde otra página
- **THEN** la sección de destino se muestra completa, sin quedar oculta a la espera de un desplazamiento

### Requirement: Títulos de sección como sticker con trazo
Los títulos de sección SHALL entrar como una pieza completa, con un leve giro y rebote. En los títulos que ya tienen un tramo destacado en color, SHALL dibujarse un trazo de marcador bajo ese tramo al revelarse.

#### Scenario: Título con tramo destacado
- **WHEN** el título de «Por qué elegirnos» entra en el viewport
- **THEN** el título aparece con un giro leve que se asienta y a continuación se dibuja un trazo bajo el tramo en color

#### Scenario: Título sin tramo destacado
- **WHEN** un título sin tramo en color entra en el viewport
- **THEN** aparece con el mismo gesto, sin trazo

### Requirement: Tarjetas que responden al puntero
En escritorio, las tarjetas de beneficios y de productos SHALL inclinarse en perspectiva siguiendo la posición del puntero, con una inclinación máxima de 8 grados, y SHALL volver suavemente al reposo cuando el puntero sale.

#### Scenario: Puntero sobre una tarjeta
- **WHEN** el usuario mueve el ratón sobre una tarjeta de producto
- **THEN** la tarjeta se inclina hacia el puntero sin superar 8 grados y su imagen se acerca ligeramente

#### Scenario: Puntero sale de la tarjeta
- **WHEN** el puntero abandona la tarjeta
- **THEN** la tarjeta vuelve a su posición plana en menos de 600 ms

#### Scenario: Enlace de la tarjeta
- **WHEN** el usuario hace clic en una tarjeta de producto inclinada
- **THEN** navega al mismo destino de contacto que antes de este cambio

### Requirement: Texto de Nosotros iluminado por el scroll
Con movimiento permitido, el texto de la sección Nosotros SHALL pasar de atenuado a pleno contraste palabra a palabra conforme el usuario desplaza la sección por el viewport. En su estado atenuado el texto SHALL seguir siendo legible, y al completar el recorrido todo el texto SHALL quedar a pleno contraste.

#### Scenario: Recorrido de la sección
- **WHEN** el usuario desplaza la página a través de la sección Nosotros
- **THEN** las palabras alcanzan pleno contraste progresivamente, siguiendo el orden de lectura

#### Scenario: Lectura por tecnologías de asistencia
- **WHEN** un lector de pantalla lee la sección Nosotros
- **THEN** anuncia los párrafos completos como texto corrido, sin fragmentarlos palabra por palabra

### Requirement: Imagen de «Cada momento» con recorte y parallax
La imagen de la sección «Cada momento» SHALL descubrirse con un recorte progresivo al entrar en el viewport y SHALL desplazarse levemente dentro de su marco al hacer scroll, sin dejar ver bordes vacíos ni mover el texto superpuesto fuera de su zona legible.

#### Scenario: Entrada de la imagen
- **WHEN** la tarjeta de imagen entra en el viewport
- **THEN** la imagen se descubre progresivamente y el título, el párrafo y el CTA superpuestos aparecen a continuación

#### Scenario: Desplazamiento con la imagen visible
- **WHEN** el usuario desplaza la página con la tarjeta visible
- **THEN** la imagen se mueve dentro de su marco sin mostrar huecos en los bordes

### Requirement: Transición del carrusel de testimonios
Al cambiar de testimonio, el saliente y el entrante SHALL transicionar con un desplazamiento en la dirección de la navegación, en 500 ms o menos. Las estrellas del testimonio entrante SHALL rellenarse en secuencia. En táctil, deslizar horizontalmente sobre el carrusel SHALL cambiar de testimonio. Los botones anterior/siguiente y los puntos SHALL seguir funcionando igual.

#### Scenario: Botón siguiente
- **WHEN** el usuario pulsa «siguiente»
- **THEN** el testimonio actual sale hacia la izquierda, el siguiente entra desde la derecha y sus estrellas se rellenan una a una

#### Scenario: Deslizar en táctil
- **WHEN** el usuario desliza el dedo hacia la izquierda sobre el carrusel
- **THEN** se muestra el testimonio siguiente y el punto activo se actualiza

#### Scenario: Desplazamiento vertical sobre el carrusel
- **WHEN** el usuario desliza verticalmente sobre el carrusel para recorrer la página
- **THEN** la página se desplaza con normalidad y el testimonio no cambia

#### Scenario: Pulsaciones rápidas
- **WHEN** el usuario pulsa «siguiente» varias veces seguidas durante una transición
- **THEN** el carrusel termina mostrando un único testimonio, el correcto, sin láminas superpuestas

### Requirement: Transición del filtro de productos
Al cambiar de categoría, las tarjetas que dejan de coincidir SHALL desaparecer con animación, las que permanecen SHALL deslizarse hasta su nueva posición y las que aparecen SHALL entrar con animación, completándose todo en 600 ms o menos. El indicador de pestaña activa SHALL deslizarse de la pestaña anterior a la nueva. El conjunto de tarjetas visible al terminar SHALL ser el mismo que sin animación.

#### Scenario: Filtrar por una categoría
- **WHEN** el usuario pulsa la pestaña «Stickers» estando en «Todos»
- **THEN** las tarjetas de otras categorías desaparecen, las de Stickers se deslizan a sus nuevas posiciones y el indicador se desplaza hasta la pestaña pulsada

#### Scenario: Volver a todas
- **WHEN** el usuario vuelve a la pestaña que muestra todas las categorías
- **THEN** las tarjetas ocultas reaparecen con animación y las visibles se reacomodan

#### Scenario: Cambios rápidos de pestaña
- **WHEN** el usuario pulsa varias pestañas seguidas antes de que termine la animación
- **THEN** la cuadrícula termina mostrando exactamente las tarjetas de la última pestaña pulsada, sin huecos ni tarjetas superpuestas

#### Scenario: Estado accesible
- **WHEN** termina un cambio de categoría
- **THEN** la pestaña activa está marcada como pulsada y las tarjetas ocultas no son alcanzables con teclado ni anunciadas

### Requirement: Línea de corte en «Cómo comprar»
La sección «Cómo comprar» SHALL mostrar una línea punteada que conecta sus tres pasos, horizontal en escritorio y vertical en móvil, con una tijera que la recorre conforme el usuario desplaza la sección. Cada paso SHALL activarse visualmente cuando la tijera lo alcanza. La línea SHALL no pasar por encima del texto de los pasos.

#### Scenario: Recorrido en escritorio
- **WHEN** el usuario desplaza la sección por el viewport en escritorio
- **THEN** la línea se dibuja de izquierda a derecha con la tijera en su extremo, y los pasos 1, 2 y 3 se activan en ese orden

#### Scenario: Recorrido en móvil
- **WHEN** el usuario desplaza la sección en un viewport móvil
- **THEN** la línea se dibuja de arriba abajo junto a los pasos apilados y cada paso se activa al ser alcanzado

#### Scenario: Scroll hacia arriba
- **WHEN** el usuario retrocede en la sección
- **THEN** la tijera retrocede con el scroll y los pasos ya activados permanecen legibles

### Requirement: Sobre y formulario de Contacto con respuesta
El sobre decorativo de Contacto SHALL flotar suavemente mientras la sección es visible y, en escritorio, reaccionar a la cercanía del puntero. Los campos del formulario SHALL dar una respuesta visual al recibir el foco. Nada de esto SHALL alterar el envío del formulario ni su protección antispam.

#### Scenario: Sección visible
- **WHEN** la sección Contacto está en el viewport
- **THEN** el sobre flota con un movimiento suave y continuo

#### Scenario: Foco en un campo
- **WHEN** el usuario enfoca un campo del formulario
- **THEN** el campo y su etiqueta muestran una transición visible que indica el foco

#### Scenario: Envío del formulario
- **WHEN** el usuario completa y envía el formulario
- **THEN** el envío se procesa y redirige a `/gracias` igual que antes de este cambio

### Requirement: CTA principales magnéticos
En escritorio, los CTA principales de la home SHALL desplazarse levemente hacia el puntero cuando este se acerca, con un máximo de 8 px, y SHALL volver a su sitio al alejarse.

#### Scenario: Puntero cerca de un CTA
- **WHEN** el usuario acerca el ratón a un CTA principal
- **THEN** el botón se desplaza hacia el puntero sin superar 8 px y sigue siendo pulsable en toda su superficie

### Requirement: Guirnalda de banderines como progreso de lectura
Bajo la isla del menú SHALL colgar una guirnalda de banderines en la paleta del sitio que actúa como indicador de progreso: los banderines se colorean de izquierda a derecha de forma continua, del 0 % en la parte superior de la página al 100 % al final. La guirnalda SHALL no alterar el tamaño ni la posición del menú, SHALL no interceptar clics ni toques y SHALL no tapar texto ni controles del contenido.

#### Scenario: Desplazamiento por la home
- **WHEN** el usuario desplaza la página desde arriba hasta el final
- **THEN** los banderines se colorean progresivamente de izquierda a derecha hasta quedar todos coloreados

#### Scenario: Página corta
- **WHEN** la página no admite desplazamiento vertical
- **THEN** la guirnalda se muestra completa y coloreada, sin indicar progreso

#### Scenario: Contenido bajo la guirnalda
- **WHEN** un enlace o botón del contenido queda bajo la guirnalda al desplazar
- **THEN** el enlace o botón recibe el clic o toque

#### Scenario: Viewport móvil
- **WHEN** se observa el header en un viewport de 375 px, con el menú móvil cerrado y abierto
- **THEN** la guirnalda cuelga bajo la isla sin tapar el logo, el botón de menú ni los enlaces del menú abierto

### Requirement: La guirnalda se balancea con el desplazamiento
Con movimiento permitido, los banderines SHALL balancearse según la velocidad y la dirección del scroll y volver al reposo con un rebote amortiguado cuando el scroll se detiene. En escritorio, pasar el puntero por la isla SHALL provocar una ondulación de la guirnalda.

#### Scenario: Scroll rápido
- **WHEN** el usuario desplaza la página con rapidez
- **THEN** los banderines se inclinan en sentido contrario al desplazamiento, más cuanto mayor es la velocidad, sin superar 35 grados

#### Scenario: El scroll se detiene
- **WHEN** el usuario deja de desplazar
- **THEN** los banderines oscilan y quedan en reposo en menos de 1.5 segundos

#### Scenario: Movimiento reducido
- **WHEN** la preferencia de movimiento reducido está activa
- **THEN** la guirnalda se muestra quieta y completamente coloreada

### Requirement: Entrada de la isla del menú
Al cargar una página con movimiento permitido, la isla del menú SHALL entrar con una animación breve en la que cae y se asienta con rebote, seguida del despliegue de la guirnalda, completándose todo en 1.2 segundos o menos. El logo y los controles SHALL ser utilizables desde el primer momento.

#### Scenario: Carga de la home
- **WHEN** el usuario carga la home
- **THEN** la isla cae y se asienta, la guirnalda se despliega a continuación y a los 1.2 segundos ambos están en reposo

#### Scenario: Navegación entre páginas
- **WHEN** el usuario llega a una página mediante un enlace interno en un navegador con transición entre páginas
- **THEN** el menú permanece estable, sin repetir la animación de caída

### Requirement: Marcador de sección activa en el menú de escritorio
En escritorio, el menú SHALL señalar el enlace de la sección que el usuario está viendo en la home mediante un marcador con forma de sticker que se desliza de un enlace a otro. Al pasar el puntero por los enlaces, el marcador SHALL seguir al enlace bajo el puntero y volver al de la sección activa al salir. El texto de los enlaces SHALL mantener un contraste mínimo de 4.5:1 sobre el marcador.

#### Scenario: Cambio de sección al desplazar
- **WHEN** el usuario desplaza la home de la sección Productos a la sección Nosotros
- **THEN** el marcador se desliza del enlace «Productos» al enlace «Nosotros»

#### Scenario: Puntero sobre otro enlace
- **WHEN** el usuario pasa el ratón sobre un enlace distinto al de la sección activa y luego lo retira
- **THEN** el marcador se desliza hasta ese enlace y vuelve al de la sección activa al salir

#### Scenario: Estado accesible
- **WHEN** una sección de la home está activa
- **THEN** su enlace del menú está marcado como ubicación actual para tecnologías de asistencia

#### Scenario: Páginas sin secciones del menú
- **WHEN** el usuario está en una página legal o en la de preguntas frecuentes
- **THEN** el marcador solo aparece al pasar el puntero por un enlace

### Requirement: Aro de color en la isla ligado al scroll
La isla del menú SHALL mostrar en su borde un aro con degradado en la paleta del sitio cuyo giro avanza con el desplazamiento de la página y no por tiempo. El fondo de la isla SHALL seguir siendo blanco sólido y el logo, los enlaces y los iconos SHALL conservar su contraste.

#### Scenario: Desplazamiento
- **WHEN** el usuario desplaza la página
- **THEN** los colores del aro giran alrededor de la isla en proporción al desplazamiento

#### Scenario: Página en reposo
- **WHEN** el usuario no desplaza la página
- **THEN** el aro permanece quieto

### Requirement: Saludo del botón de WhatsApp
El botón flotante de WhatsApp SHALL realizar una única animación breve de saludo por sesión, pasados al menos 8 segundos desde la carga, si el usuario aún no lo ha abierto. No SHALL repetirse en bucle.

#### Scenario: Usuario que no ha abierto el chat
- **WHEN** pasan 8 segundos desde la carga sin que el usuario haya abierto el panel de WhatsApp
- **THEN** el botón realiza un saludo de menos de 1.5 segundos y vuelve a quedar quieto

#### Scenario: Segunda página de la misma sesión
- **WHEN** el usuario navega a otra página del sitio en la misma sesión después de haber visto el saludo
- **THEN** el botón no vuelve a saludar

### Requirement: Aparición animada del banner de cookies
El banner de cookies SHALL aparecer y desaparecer con una transición breve en lugar de hacerlo de golpe, sin cambiar su posición final, su contenido ni la lógica de consentimiento.

#### Scenario: Primera visita
- **WHEN** un usuario sin preferencia guardada carga el sitio
- **THEN** el banner entra con una transición de 400 ms o menos y queda en la misma posición que antes de este cambio

#### Scenario: Aceptar o rechazar
- **WHEN** el usuario pulsa Aceptar o Rechazar
- **THEN** la preferencia se guarda igual que antes y el banner sale con una transición breve, tras la cual deja de ser alcanzable con teclado
