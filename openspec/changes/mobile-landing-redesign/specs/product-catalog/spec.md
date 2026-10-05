# Spec Delta

## Purpose
Define el catálogo de productos de la home: tarjetas por categoría con filtrado por pestañas, pensado para mostrar la oferta creativa (papelería, stickers, accesorios) y dirigir cada consulta al canal de contacto, sin exponer precios.

## ADDED Requirements

### Requirement: Catálogo de tarjetas de producto sin precios
La home SHALL mostrar una sección "Nuestros Productos" con tarjetas de producto; cada tarjeta SHALL incluir una imagen con texto alternativo, el nombre del producto y su categoría, y NO SHALL mostrar precios.

#### Scenario: Visualización de las tarjetas
- **WHEN** el usuario llega a la sección de productos
- **THEN** ve las tarjetas con imagen, nombre y categoría, sin ningún precio visible

### Requirement: Filtrado por pestañas de categoría
La sección de productos SHALL ofrecer pestañas de categoría (Todos, Papelería, Stickers, Accesorios). Al seleccionar una pestaña, SHALL mostrarse únicamente las tarjetas de esa categoría; "Todos" SHALL mostrar todas. Las pestañas SHALL ser operables por teclado con estado seleccionado perceptible.

#### Scenario: Seleccionar una categoría
- **WHEN** el usuario selecciona la pestaña "Stickers"
- **THEN** solo se muestran las tarjetas de la categoría Stickers y la pestaña activa queda indicada

#### Scenario: Ver todas las categorías
- **WHEN** el usuario selecciona la pestaña "Todos"
- **THEN** se muestran las tarjetas de todas las categorías

#### Scenario: Operable por teclado
- **WHEN** el usuario enfoca las pestañas con el teclado
- **THEN** puede cambiar de categoría con el teclado y el estado seleccionado se comunica de forma accesible

### Requirement: Cada tarjeta dirige al contacto
Cada tarjeta de producto y el botón "Ver todos los productos" SHALL dirigir al usuario a un canal de contacto/consulta (sección de contacto o WhatsApp), coherente con un negocio a pedido sin carrito de compra.

#### Scenario: Consulta desde una tarjeta
- **WHEN** el usuario activa una tarjeta de producto o "Ver todos los productos"
- **THEN** es dirigido a la sección de contacto o a WhatsApp para consultar, sin pasar por un carrito o checkout
