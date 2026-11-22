# Spec Delta

## Purpose
Define la sección "¿Cómo comprar?" que explica el proceso de compra en pasos numerados simples, alineados con un negocio a pedido basado en contacto directo.

## ADDED Requirements

### Requirement: Pasos de compra numerados
La home SHALL mostrar una sección "¿Cómo comprar?" con tres pasos numerados (01, 02, 03), cada uno con un número destacado, un ícono, un título y una descripción breve (elegir productos, realizar la compra/consulta, recibir el pedido).

#### Scenario: Visualización de los pasos
- **WHEN** el usuario llega a la sección "¿Cómo comprar?"
- **THEN** ve tres pasos numerados en orden, cada uno con su ícono, título y descripción, legibles en móvil y escritorio

### Requirement: Descripción coherente con el flujo real
Las descripciones de los pasos SHALL ser coherentes con el flujo real del negocio (compra a pedido vía contacto/WhatsApp), sin prometer funcionalidades inexistentes como un carrito o un checkout de pago en línea.

#### Scenario: Sin funcionalidades inexistentes
- **WHEN** el usuario lee los pasos de compra
- **THEN** la redacción describe elegir/consultar, coordinar la compra y recibir el pedido, sin referirse a un carrito ni a un pago en línea que el sitio no ofrece
