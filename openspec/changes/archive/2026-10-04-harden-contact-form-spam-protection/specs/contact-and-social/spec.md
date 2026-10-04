# Spec Delta

## MODIFIED Requirements

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
