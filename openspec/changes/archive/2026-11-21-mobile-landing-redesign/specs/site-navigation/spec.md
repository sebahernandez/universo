# Spec Delta

## MODIFIED Requirements

### Requirement: Menú flotante estilo glass (isla)
El header SHALL presentarse como una isla flotante con **fondo blanco sólido (opaco)** tanto en móvil como en escritorio, con esquinas claramente redondeadas, sombra suave y borde sutil, que abarca únicamente el menú y NO SHALL ocupar todo el ancho como una barra de borde a borde. El fondo blanco SHALL mantenerse tanto en la carga inicial sobre el Hero como en el resto de las secciones, conservando contraste suficiente del logo, los enlaces y los iconos sin depender de `backdrop-filter`.

#### Scenario: Carga inicial de la página
- **WHEN** el usuario carga o recarga una página con Hero y la posición de scroll está en la parte superior
- **THEN** el menú se muestra como una isla con fondo blanco sólido y esquinas redondeadas, y el degradado del Hero es visible alrededor de la isla pero no a través de ella

#### Scenario: La isla no ocupa todo el ancho
- **WHEN** se observa el header en cualquier viewport
- **THEN** la isla tiene márgenes respecto a los bordes y envuelve sólo el contenido del menú, sin dibujarse como una barra de borde a borde

#### Scenario: Fondo blanco en móvil y escritorio
- **WHEN** se observa el header en un viewport móvil (320–430 px) o de escritorio
- **THEN** el fondo del navbar es blanco sólido en ambos casos, y el logo, los enlaces y el botón de menú se leen con contraste suficiente

#### Scenario: Navegador sin backdrop-filter
- **WHEN** el navegador no soporta `backdrop-filter`
- **THEN** la isla mantiene su fondo blanco sólido sin cambios, de modo que el logo, los enlaces y los iconos siguen siendo legibles

### Requirement: La isla se intensifica al desplazarse fuera del Hero
Cuando el usuario desplaza la página más allá de la sección Hero, la isla SHALL reforzar su sombra (manteniendo el fondo blanco sólido), para separarse visualmente del contenido y reforzar la legibilidad sobre el resto de secciones del sitio.

#### Scenario: Scroll más allá del Hero
- **WHEN** el usuario desplaza la página hasta que la sección Hero deja de estar en la parte superior del viewport
- **THEN** la isla intensifica su sombra manteniendo el fondo blanco, y el logo, los enlaces y el botón de menú mantienen contraste suficiente

#### Scenario: El menú permanece visible al desplazar
- **WHEN** el usuario continúa desplazándose por cualquier sección posterior al Hero
- **THEN** la isla permanece fija y visible en la parte superior de la ventana
