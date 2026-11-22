# contact-and-social Specification

## Purpose
Define los canales de contacto (formulario, WhatsApp, email) y los perfiles de redes sociales del sitio, cómo se presentan al visitante y cómo se reflejan en los datos estructurados de SEO, representando al negocio como tienda online.

## Requirements

### Requirement: Fuente única de datos de contacto y redes

Los datos de contacto y redes sociales (email, WhatsApp, Instagram y ubicación) SHALL definirse en un único módulo de datos del sitio, y todos los componentes que los muestran SHALL leer de esa fuente, sin duplicar valores literales.

#### Scenario: Cambiar un dato en un solo lugar

- **WHEN** se actualiza un número de WhatsApp, email o URL de red social en el módulo de datos del sitio
- **THEN** el cambio se refleja en el footer, la sección de contacto, el widget de WhatsApp y los datos estructurados, sin editar cada componente

### Requirement: Canal de WhatsApp

El sitio SHALL ofrecer contacto por WhatsApp mediante un enlace `wa.me` con el número en formato internacional y un mensaje inicial pre-cargado, disponible al menos en un widget flotante y en la sección de contacto.

#### Scenario: Abrir WhatsApp con mensaje pre-cargado

- **WHEN** el visitante activa un enlace de WhatsApp
- **THEN** se abre WhatsApp en una pestaña nueva con el número del sitio y un mensaje inicial pre-cargado

#### Scenario: Widget flotante accesible

- **WHEN** el visitante abre el widget flotante de WhatsApp
- **THEN** se muestra un panel con un CTA hacia WhatsApp, se puede cerrar con Escape o haciendo clic fuera, y el botón refleja su estado (`aria-expanded`)

### Requirement: Formulario de contacto

El sitio SHALL ofrecer un formulario de contacto con campos requeridos (nombre, email, mensaje) que se envía a un proveedor externo de formularios, con protección anti-spam en dos capas (honeypot y CAPTCHA), con reply-to explícito al email del visitante, y que tras un envío exitoso redirige a la página de agradecimiento.

#### Scenario: Envío exitoso

- **WHEN** el visitante completa los campos requeridos y envía el formulario
- **THEN** el mensaje se envía al proveedor y el visitante es redirigido a `/gracias`

#### Scenario: Campos requeridos

- **WHEN** el visitante intenta enviar el formulario con un campo requerido vacío
- **THEN** el envío no se realiza y el navegador indica el campo faltante

#### Scenario: Acceso autorizado a la página de gracias

- **WHEN** el formulario se envía correctamente
- **THEN** se marca una autorización de sesión que permite mostrar `/gracias`, evitando el acceso directo sin haber enviado el formulario

#### Scenario: Reply-to explícito

- **WHEN** el visitante envía el formulario con su email
- **THEN** la solicitud al proveedor incluye un campo de reply-to con ese mismo email, de modo que responder al correo recibido llegue directo al visitante

#### Scenario: Verificación humana antes de enviar

- **WHEN** el visitante no ha resuelto el desafío de CAPTCHA
- **THEN** el formulario no se envía correctamente y se le indica que complete la verificación

#### Scenario: Envío bloqueado por bot

- **WHEN** un envío llega sin resolver el CAPTCHA o con el campo honeypot relleno
- **THEN** el proveedor rechaza el envío y no se genera un correo hacia la bandeja de contacto

### Requirement: Email de contacto

El sitio SHALL exponer un email de contacto como enlace `mailto:` en el footer.

#### Scenario: Enlace mailto

- **WHEN** el visitante activa el email del footer
- **THEN** se abre el cliente de correo con la dirección del sitio como destinatario

### Requirement: Perfiles de redes sociales

El sitio SHALL mostrar su perfil de Instagram en el footer ("Síguenos"), en la sección de contacto y en el menú de navegación (en la barra y dentro del menú móvil, junto con WhatsApp); los enlaces externos SHALL abrir en una pestaña nueva con `rel="noopener"`. El sitio NO SHALL enlazar ni mencionar un perfil de Facebook.

#### Scenario: Enlaces sociales seguros en pestaña nueva

- **WHEN** el visitante activa un enlace a Instagram
- **THEN** el perfil se abre en una pestaña nueva con `rel="noopener"`

#### Scenario: Acceso directo en móvil

- **WHEN** el visitante ve el menú de navegación en un viewport móvil sin abrir el menú
- **THEN** los accesos a WhatsApp e Instagram están visibles en la barra

#### Scenario: Sin Facebook

- **WHEN** se busca "Facebook" en el contenido y en los datos estructurados de cualquier página del sitio
- **THEN** no aparece ninguna mención ni enlace

### Requirement: Representación como tienda online en SEO

Los datos estructurados del negocio SHALL representarlo como **tienda online** con área de servicio Chile, incluyendo `email`, `telephone` (WhatsApp) y `sameAs` con los perfiles sociales; y NO SHALL exponer una dirección de calle física que contradiga la presentación de tienda online. La ubicación mostrada al usuario y la de los datos estructurados SHALL ser consistentes (Santiago, Región Metropolitana; tienda online).

#### Scenario: Schema sin dirección física contradictoria

- **WHEN** se genera el JSON-LD del negocio
- **THEN** incluye `sameAs` (Instagram), `telephone` (WhatsApp), `email` y área de servicio Chile, sin una dirección de calle física de un local no público

#### Scenario: Consistencia footer ↔ schema

- **WHEN** se comparan la ubicación del footer y la de los datos estructurados
- **THEN** ambas describen al negocio como tienda online en Santiago, Región Metropolitana, sin contradicción de dirección

### Requirement: Fuente única de datos legales del negocio

Los datos legales del negocio —razón social "Universo Crafter SpA" y RUT "78.519.223-0"— SHALL definirse en el mismo módulo único de datos del sitio que los datos de contacto, y toda página o componente que los muestre SHALL leerlos de esa fuente, sin duplicar valores literales.

#### Scenario: Cambiar un dato legal en un solo lugar

- **WHEN** se actualiza la razón social o el RUT en el módulo de datos del sitio
- **THEN** el cambio se refleja en el footer, en los términos y condiciones, en la política de cookies y en los datos estructurados, sin editar cada archivo

#### Scenario: Sin valores literales duplicados

- **WHEN** se busca el texto "78.519.223-0" en el código fuente del sitio
- **THEN** aparece únicamente en el módulo de datos del sitio

### Requirement: Identificación legal en el footer

El footer SHALL mostrar, en todas las páginas del sitio, la razón social y el RUT del negocio con el formato `RUT: 78.519.223-0`, junto a la ubicación y el correo de contacto.

#### Scenario: Datos legales visibles en cualquier página

- **WHEN** un visitante llega al pie de cualquier página del sitio
- **THEN** ve la razón social "Universo Crafter SpA" y el texto "RUT: 78.519.223-0"

### Requirement: Identificación legal en los datos estructurados

Los datos estructurados del negocio SHALL incluir la razón social como `legalName` y el RUT como `taxID`, con los mismos valores que se muestran al visitante.

#### Scenario: Schema con razón social y RUT

- **WHEN** se genera el JSON-LD del negocio
- **THEN** incluye `legalName` con "Universo Crafter SpA" y `taxID` con "78.519.223-0"

#### Scenario: Consistencia entre lo visible y el schema

- **WHEN** se comparan la razón social y el RUT del footer con los del JSON-LD
- **THEN** ambos valores coinciden exactamente
