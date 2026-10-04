# Spec Delta

## Purpose

Proveer una página de preguntas frecuentes que resuelva las dudas más comunes de compra, personalización, envíos y pagos de Universo Crafter, reduciendo consultas repetidas y aumentando la confianza de compra en una tienda 100% online.

## ADDED Requirements

### Requirement: Página de preguntas frecuentes accesible

El sitio SHALL exponer una página dedicada de preguntas frecuentes en la ruta `/preguntas-frecuentes`, indexable por buscadores, que reutilice el encabezado y pie de página del sitio y sea accesible desde el footer.

#### Scenario: Acceso directo por URL

- **WHEN** un visitante navega a `/preguntas-frecuentes`
- **THEN** la página carga con estado HTTP 200, muestra el `Header` y `Footer` del sitio y un título principal identificable como "Preguntas frecuentes"

#### Scenario: Acceso desde el footer

- **WHEN** un visitante hace clic en "Preguntas frecuentes" en la sección "Ayuda" del footer
- **THEN** el navegador carga la página `/preguntas-frecuentes`

#### Scenario: Indexable para SEO

- **WHEN** un rastreador accede a la página
- **THEN** la página NO incluye `noindex`, tiene `<title>` y `meta description` propios y aparece en el `sitemap`

### Requirement: Contenido de preguntas y respuestas

La página SHALL presentar entre 8 y 10 pares de pregunta y respuesta que cubran, como mínimo: qué productos se ofrecen y su nivel de personalización, cómo comprar (RRSS/WhatsApp/formulario), plazos de producción, formas y costos de envío (Bluexpress por pagar y retiro en taller), medios de pago, y política de cambios o correcciones. Las respuestas SHALL ser coherentes con la información ya publicada en la sección "Compras y Envíos".

#### Scenario: Cobertura mínima de temas

- **WHEN** un visitante lee la FAQ
- **THEN** encuentra respuestas sobre productos/personalización, cómo comprar, plazos, envíos, pagos y cambios, con datos consistentes con el resto del sitio (envío Bluexpress por pagar, retiro en taller sin costo)

#### Scenario: Dato no confirmado marcado como placeholder

- **WHEN** una respuesta depende de un dato que el negocio aún no confirmó (por ejemplo, plazo exacto de producción o medios de pago aceptados)
- **THEN** ese dato se muestra como marcador identificable (`[PLACEHOLDER]`) para ser reemplazado antes de publicar, sin inventar cifras vinculantes

### Requirement: Llamado a la acción de contacto

La página SHALL ofrecer una vía de contacto directa para dudas no cubiertas, reutilizando los canales existentes (WhatsApp y/o el formulario de contacto de la home).

#### Scenario: Duda no resuelta

- **WHEN** el visitante no encuentra su respuesta en la FAQ
- **THEN** la página ofrece un enlace o botón hacia WhatsApp o hacia `/#contacto` para escribir al equipo

### Requirement: Datos estructurados FAQPage

La página SHALL incluir datos estructurados JSON-LD de tipo `FAQPage` cuyo contenido coincida exactamente con las preguntas y respuestas visibles.

#### Scenario: Validación de rich results

- **WHEN** se valida la página con una herramienta de resultados enriquecidos
- **THEN** detecta un bloque `FAQPage` válido con cada pregunta (`Question`) y su respuesta (`acceptedAnswer`) correspondiente al texto visible

### Requirement: Accesibilidad y navegación de la FAQ

Si las preguntas se presentan en formato expandible (acordeón), el mecanismo SHALL ser operable por teclado y comunicar su estado a tecnologías de asistencia. La navegación del menú SHALL funcionar desde esta página interna.

#### Scenario: Operación por teclado del acordeón

- **WHEN** un usuario navega con teclado y activa una pregunta con Enter o Espacio
- **THEN** la respuesta se expande o colapsa y el estado se refleja para lectores de pantalla (por ejemplo, mediante `<details>`/`<summary>` o `aria-expanded`)

#### Scenario: Menú operativo desde la página interna

- **WHEN** el usuario usa el menú de navegación estando en `/preguntas-frecuentes`
- **THEN** los enlaces de sección lo llevan a la home y hacen scroll a la sección correspondiente (anclas absolutas `/#seccion`)
