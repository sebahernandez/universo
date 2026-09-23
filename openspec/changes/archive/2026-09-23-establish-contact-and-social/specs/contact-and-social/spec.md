# Spec Delta

## Purpose

Define los canales de contacto (formulario, WhatsApp, email) y los perfiles de redes sociales del sitio, cómo se presentan al visitante y cómo se reflejan en los datos estructurados de SEO, representando al negocio como tienda online.

## ADDED Requirements

### Requirement: Fuente única de datos de contacto y redes

Los datos de contacto y redes sociales (email, WhatsApp, Instagram, Facebook y ubicación) SHALL definirse en un único módulo de datos del sitio, y todos los componentes que los muestran SHALL leer de esa fuente, sin duplicar valores literales.

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

El sitio SHALL ofrecer un formulario de contacto con campos requeridos (nombre, email, mensaje) que se envía a un proveedor externo de formularios, con protección anti-spam (honeypot), y que tras un envío exitoso redirige a la página de agradecimiento.

#### Scenario: Envío exitoso

- **WHEN** el visitante completa los campos requeridos y envía el formulario
- **THEN** el mensaje se envía al proveedor y el visitante es redirigido a `/gracias`

#### Scenario: Campos requeridos

- **WHEN** el visitante intenta enviar el formulario con un campo requerido vacío
- **THEN** el envío no se realiza y el navegador indica el campo faltante

#### Scenario: Acceso autorizado a la página de gracias

- **WHEN** el formulario se envía correctamente
- **THEN** se marca una autorización de sesión que permite mostrar `/gracias`, evitando el acceso directo sin haber enviado el formulario

### Requirement: Email de contacto

El sitio SHALL exponer un email de contacto como enlace `mailto:` en el footer.

#### Scenario: Enlace mailto

- **WHEN** el visitante activa el email del footer
- **THEN** se abre el cliente de correo con la dirección del sitio como destinatario

### Requirement: Perfiles de redes sociales

El sitio SHALL mostrar sus perfiles de Instagram y Facebook en el footer ("Síguenos") y en la sección de contacto; los enlaces externos SHALL abrir en una pestaña nueva con `rel="noopener"`.

#### Scenario: Enlaces sociales seguros en pestaña nueva

- **WHEN** el visitante activa un enlace a Instagram o Facebook
- **THEN** el perfil se abre en una pestaña nueva con `rel="noopener"`

### Requirement: Representación como tienda online en SEO

Los datos estructurados del negocio SHALL representarlo como **tienda online** con área de servicio Chile, incluyendo `email`, `telephone` (WhatsApp) y `sameAs` con los perfiles sociales; y NO SHALL exponer una dirección de calle física que contradiga la presentación de tienda online. La ubicación mostrada al usuario y la de los datos estructurados SHALL ser consistentes (Santiago, Región Metropolitana; tienda online).

#### Scenario: Schema sin dirección física contradictoria

- **WHEN** se genera el JSON-LD del negocio
- **THEN** incluye `sameAs` (Instagram, Facebook), `telephone` (WhatsApp), `email` y área de servicio Chile, sin una dirección de calle física de un local no público

#### Scenario: Consistencia footer ↔ schema

- **WHEN** se comparan la ubicación del footer y la de los datos estructurados
- **THEN** ambas describen al negocio como tienda online en Santiago, Región Metropolitana, sin contradicción de dirección
