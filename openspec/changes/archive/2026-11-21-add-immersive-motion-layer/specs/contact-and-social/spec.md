# Spec Delta

## MODIFIED Requirements

### Requirement: Fuente única de datos de contacto y redes

Los datos de contacto y redes sociales (email, WhatsApp, Instagram y ubicación) SHALL definirse en un único módulo de datos del sitio, y todos los componentes que los muestran SHALL leer de esa fuente, sin duplicar valores literales.

#### Scenario: Cambiar un dato en un solo lugar

- **WHEN** se actualiza un número de WhatsApp, email o URL de red social en el módulo de datos del sitio
- **THEN** el cambio se refleja en el footer, la sección de contacto, el widget de WhatsApp y los datos estructurados, sin editar cada componente

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
