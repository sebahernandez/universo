# project-gallery Specification

## Purpose
Define el comportamiento de la galería de proyectos y su modal, con foco en que el modal presente la imagen del proyecto en la máxima calidad posible respetando su tamaño, a partir de assets de origen pequeño.

## Requirements

### Requirement: Modal en máxima calidad respetando su tamaño

Al abrir el modal, el sistema SHALL mostrar la imagen del proyecto en la máxima calidad posible para el tamaño en que se muestra, aplicando super-resolución cuando el asset de origen es más pequeño que el área del modal, de modo que no se vea borrosa por escalado del navegador.

#### Scenario: Imagen de origen pequeña se muestra nítida

- **WHEN** el usuario abre el modal de un proyecto cuyo asset de origen es de baja resolución
- **THEN** el modal carga una versión de mayor resolución (super-resolución) servida al tamaño del modal, sin verse borrosa

#### Scenario: Entrega optimizada

- **WHEN** el navegador solicita la imagen del modal
- **THEN** se entrega en formato/calidad optimizados (`f_auto,q_auto`) y acotada por ancho, sin exceder innecesariamente el tamaño mostrado

### Requirement: La miniatura no aplica super-resolución

La miniatura de la grilla SHALL servirse a tamaño pequeño sin super-resolución, ya que se muestra en dimensiones reducidas.

#### Scenario: Miniatura liviana

- **WHEN** se renderiza la grilla de proyectos
- **THEN** cada miniatura se sirve a un ancho pequeño sin `e_upscale`

### Requirement: Fuente única por proyecto

La miniatura y el modal SHALL derivar del mismo `public_id` de proyecto; el modal solo añade la transformación de super-resolución.

#### Scenario: Correspondencia 1:1

- **WHEN** el usuario abre el modal de una miniatura
- **THEN** el modal muestra el mismo proyecto que la miniatura, nunca la imagen de otro proyecto
