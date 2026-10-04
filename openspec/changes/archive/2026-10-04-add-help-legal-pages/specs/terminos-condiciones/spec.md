# Spec Delta

## Purpose

Establecer por escrito las condiciones de venta de Universo Crafter SpA para productos de papelería personalizada vendidos de forma online, dando transparencia y respaldo legal a la relación con el comprador conforme a la normativa chilena de protección al consumidor.

## ADDED Requirements

### Requirement: Página de términos y condiciones accesible

El sitio SHALL exponer una página dedicada en la ruta `/terminos-condiciones`, indexable, que reutilice el `Header` y `Footer` del sitio y sea accesible desde la sección "Ayuda" del footer.

#### Scenario: Acceso directo por URL

- **WHEN** un visitante navega a `/terminos-condiciones`
- **THEN** la página carga con estado HTTP 200, muestra encabezado y pie del sitio y un título identificable como "Términos y condiciones"

#### Scenario: Acceso desde el footer

- **WHEN** un visitante hace clic en "Términos y condiciones" en el footer
- **THEN** el navegador carga la página `/terminos-condiciones`

### Requirement: Identificación de la empresa

La página SHALL identificar de forma clara al vendedor: razón social "Universo Crafter SpA", su condición de tienda online con base en Santiago, Región Metropolitana, y sus canales de contacto (correo, WhatsApp y redes sociales). Los datos que el negocio deba confirmar (por ejemplo, RUT) SHALL marcarse como `[PLACEHOLDER]`.

#### Scenario: Datos del vendedor visibles

- **WHEN** un visitante lee la sección de identificación
- **THEN** encuentra la razón social, la modalidad de venta online y los canales de contacto oficiales, con `[PLACEHOLDER]` en los datos aún no confirmados

### Requirement: Proceso de pedido, precios y pagos

La página SHALL describir cómo se realiza y confirma un pedido, cómo se comunican los precios (moneda CLP, si incluyen o no impuestos, validez de cotizaciones) y los medios de pago aceptados. Cualquier medio de pago o condición no confirmada SHALL marcarse como `[PLACEHOLDER]`.

#### Scenario: Condiciones comerciales descritas

- **WHEN** un visitante revisa la sección comercial
- **THEN** entiende cómo se cotiza y confirma un pedido, en qué moneda se expresan los precios y qué medios de pago se aceptan (o el marcador correspondiente si falta el dato)

### Requirement: Producción, envíos y entregas

La página SHALL establecer que los productos son personalizados y hechos a pedido, los plazos de producción, y las condiciones de envío coherentes con el sitio: despacho por Bluexpress (u otro transporte) con costo por pagar según comuna/ciudad, y retiro en taller sin costo. Los plazos exactos SHALL marcarse como `[PLACEHOLDER]` si no están confirmados.

#### Scenario: Condiciones de entrega descritas

- **WHEN** un visitante revisa la sección de envíos
- **THEN** encuentra que los productos son a pedido, el plazo de producción (o `[PLACEHOLDER]`), y las opciones de envío/retiro consistentes con la sección "Compras y Envíos"

### Requirement: Cambios, devoluciones y derecho del consumidor

La página SHALL informar la política de cambios y devoluciones distinguiendo los productos personalizados (hechos a medida) de eventuales productos estándar, y SHALL respetar los derechos que la Ley N° 19.496 de Protección de los Derechos de los Consumidores otorga por productos con fallas o no conformes. No SHALL presentar como "sin devolución" aquello que la ley protege (garantía legal por defectos).

#### Scenario: Producto con falla

- **WHEN** un cliente recibe un producto con defecto de fabricación o distinto a lo acordado
- **THEN** la política reconoce su derecho a cambio, reparación o devolución conforme a la garantía legal chilena, e indica el plazo y el canal para gestionarlo (`[PLACEHOLDER]` si el plazo específico no está definido)

#### Scenario: Producto personalizado sin defecto

- **WHEN** un cliente solicita anular un pedido personalizado ya aprobado por él, sin que exista falla
- **THEN** la política explica de forma clara y lícita las limitaciones aplicables a productos hechos a medida, sin negar los derechos legales por fallas

### Requirement: Propiedad intelectual y uso de contenidos

La página SHALL declarar la titularidad de los diseños, imágenes y contenidos del sitio, y las condiciones sobre materiales o textos que el cliente aporta para su pedido.

#### Scenario: Diseños del sitio y del cliente

- **WHEN** un visitante lee la sección de propiedad intelectual
- **THEN** entiende que los diseños y contenidos propios de Universo Crafter están protegidos, y que el cliente declara tener derecho a usar los materiales/textos que entrega para personalizar su pedido

### Requirement: Vigencia, modificaciones y ley aplicable

La página SHALL indicar la fecha de última actualización, que las condiciones pueden modificarse, y que se rigen por la legislación chilena.

#### Scenario: Vigencia y jurisdicción

- **WHEN** un visitante revisa el cierre de los términos
- **THEN** encuentra la fecha de última actualización, la mención de que las condiciones pueden actualizarse, y que se rigen por las leyes de Chile
