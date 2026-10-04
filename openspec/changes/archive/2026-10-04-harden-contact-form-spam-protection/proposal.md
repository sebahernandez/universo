# Proposal

## Why

Una auditoría del formulario de contacto (`Contacto.astro`, que envía via Web3Forms) encontró tres puntos débiles para la entrega y el anti-spam: el reply-to del correo depende de un comportamiento implícito de Web3Forms en vez de declararse explícitamente, la única defensa anti-bot es un honeypot (sin CAPTCHA), y no existe ningún registro de que la cuenta de Web3Forms tenga activada la restricción de dominio ni de qué dirección de envío/autenticación (SPF/DKIM) usa para entregar los correos a `hola@universocrafter.cl`. Sin corregir esto, el formulario corre riesgo de que mensajes legítimos terminen en spam o de que bots abusen de la access key pública para enviar correos basura.

## What Changes

- Agregar un campo oculto `replyto` explícito en el formulario, mapeado al email ingresado por el visitante, en vez de depender del auto-detect de Web3Forms.
- Integrar Cloudflare Turnstile (plan gratuito) en el formulario de contacto como segunda barrera anti-bot, además del honeypot existente.
- Documentar y dejar como tarea de verificación manual (no de código) la revisión de los ajustes de la cuenta de Web3Forms: restricción de dominios permitidos para la access key y configuración de dirección/dominio de envío (SPF/DKIM) si el plan lo permite.

## Capabilities

### Modified Capabilities
- `contact-and-social`: el requisito "Formulario de contacto" se amplía para exigir reply-to explícito y una segunda capa de protección anti-bot (CAPTCHA) además del honeypot.

## Impact

- Código: `src/components/Contacto.astro` (nuevos campos del formulario, carga del script de Turnstile), `src/data/site.ts` (nueva clave de configuración para la site key de Turnstile).
- Dependencias: ninguna nueva de npm (Turnstile se integra vía `<script>` + widget HTML, igual que Web3Forms).
- Cuentas externas: requiere una cuenta de Cloudflare (gratuita) con un sitio de Turnstile configurado para obtener una site key; requiere revisar (no cambiar vía código) la configuración de la cuenta Web3Forms existente.
- No se modifica el flujo de redirección a `/gracias` ni la guarda de sessionStorage existente.
