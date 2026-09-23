# Spec Delta

## Purpose

Documentar y formalizar la página de política de cookies y su relación con el mecanismo de consentimiento del sitio, dejando por escrito qué se almacena en el navegador, con qué finalidad y cómo el usuario acepta, rechaza o revoca ese consentimiento.

## ADDED Requirements

### Requirement: Página de política de cookies accesible

El sitio SHALL exponer una página dedicada en la ruta `/politica-cookies`, indexable, que reutilice el `Header` y `Footer` del sitio y sea accesible desde la sección "Ayuda" del footer.

#### Scenario: Acceso directo por URL

- **WHEN** un visitante navega a `/politica-cookies`
- **THEN** la página carga con estado HTTP 200, muestra encabezado y pie del sitio y un título identificable como "Política de cookies"

#### Scenario: Acceso desde el footer y desde el banner

- **WHEN** un visitante hace clic en "Política de cookies" en el footer, o en "Más información" dentro del banner de cookies
- **THEN** el navegador carga la página `/politica-cookies`

### Requirement: Divulgación del almacenamiento utilizado

La página SHALL declarar de forma veraz qué cookies y almacenamiento del navegador utiliza el sitio, indicando para cada elemento su nombre, tipo, finalidad y duración. La divulgación SHALL reflejar el estado real: hoy el sitio NO usa rastreadores de terceros y solo emplea almacenamiento propio funcional (`uc:consent` de consentimiento y `uc:form-enviado` del flujo de contacto).

#### Scenario: Inventario de almacenamiento visible

- **WHEN** un visitante lee la política
- **THEN** ve un listado o tabla con `uc:consent` (necesaria, recuerda la decisión de consentimiento) y `uc:form-enviado` (necesaria, valida el acceso a la página de agradecimiento), y una declaración de que no se usan rastreadores de terceros mientras no existan

#### Scenario: Coherencia con lo realmente cargado

- **WHEN** se agrega o elimina en el futuro una herramienta que use cookies (por ejemplo, analítica)
- **THEN** el inventario de esta página debe actualizarse para reflejarlo, de modo que la política nunca describa cookies que no se cargan ni omita las que sí

### Requirement: Explicación de categorías y base de consentimiento

La página SHALL explicar las categorías de cookies (necesarias, analíticas y de marketing) e indicar que las categorías no necesarias solo se activan tras el consentimiento explícito del usuario.

#### Scenario: Categorías descritas

- **WHEN** un visitante lee la sección de categorías
- **THEN** entiende que las cookies necesarias están siempre activas y que las analíticas o de marketing solo se cargan después de que las acepta

### Requirement: Gestión y revocación del consentimiento

La página SHALL permitir al usuario cambiar o revocar su consentimiento en cualquier momento, integrándose con el gestor de consentimiento del sitio (`window.ucConsent`).

#### Scenario: Reabrir preferencias

- **WHEN** el usuario pulsa el control "Cambiar mis preferencias" en la página
- **THEN** se reabre el banner de consentimiento para que elija nuevamente (invocando `window.ucConsent.open()`)

#### Scenario: Rechazo directo

- **WHEN** el usuario pulsa "Rechazar cookies" en la página
- **THEN** se registra el rechazo y cualquier cookie no necesaria queda bloqueada (invocando `window.ucConsent.reject()`)

#### Scenario: Instrucciones del navegador

- **WHEN** el usuario quiere borrar o bloquear cookies por su cuenta
- **THEN** la página indica que puede hacerlo desde la configuración de su navegador y advierte que, al borrar el almacenamiento del sitio, volverá a aparecer el aviso de cookies

### Requirement: Información de vigencia y contacto

La página SHALL indicar la fecha de última actualización y una vía de contacto para dudas sobre la política.

#### Scenario: Vigencia y contacto presentes

- **WHEN** un visitante revisa el pie de la política
- **THEN** encuentra la fecha de última actualización y un medio de contacto (correo del sitio) para consultas sobre privacidad/cookies
