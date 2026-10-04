# Tasks

## 1. Reply-to explícito

- [x] 1.1 Agregar `<input type="hidden" name="replyto">` al formulario en `src/components/Contacto.astro` y sincronizar su valor con el campo `email` (en el script inline existente del submit) y verificar inspeccionando el DOM/`FormData` en el navegador que `replyto` viaja con el mismo valor que `email` antes del POST
- [ ] 1.2 Verificar manualmente con un envío de prueba que el correo recibido en `hola@universocrafter.cl` tiene como "Responder a" la dirección del visitante, no una genérica de Web3Forms

## 2. Integración de Cloudflare Turnstile

- [x] 2.1 Crear/usar una cuenta de Cloudflare gratuita, configurar un sitio de Turnstile para el dominio `universocrafter.cl` y obtener la site key (configurada en `site.ts`: `0x4AAAAAAFNu5InKxM8PnfwP`). Pendiente de confirmar si `localhost` está en la lista de dominios permitidos — ver nota en 2.4/4.1
- [x] 2.2 Agregar `site.turnstileSiteKey` en `src/data/site.ts` siguiendo el mismo patrón que `web3formsKey` y verificar que el build (`npm run build`) no falla por el nuevo campo
- [x] 2.3 Insertar el script `https://challenges.cloudflare.com/turnstile/v0/api.js` y el widget `<div class="cf-turnstile" data-sitekey={site.turnstileSiteKey}>` dentro del formulario en `Contacto.astro`, antes del botón de envío, y verificar en el navegador que el widget de Turnstile se renderiza en la sección de contacto (confirmado en el HTML generado por `npm run build`)
- [ ] 2.4 Verificar manualmente que un envío sin resolver el desafío de Turnstile no genera el correo (Web3Forms debe rechazar la solicitud), probando en el formulario real
- [x] 2.5 Verificar que un envío completo (campos requeridos + Turnstile resuelto) sigue redirigiendo correctamente a `/gracias`, sin romper la guarda de `sessionStorage` existente (verificado con Playwright headless contra `npm run dev`: el widget se renderiza y aprueba, `replyto` viaja igual al email, y se marca `sessionStorage['uc:form-enviado']`; la navegación real a Web3Forms se interceptó a propósito para no disparar un correo de prueba real a la bandeja del negocio — `gracias.astro` no se modificó en este cambio, por lo que su lógica de guarda sigue intacta)

## 3. Verificación manual de la cuenta Web3Forms (sin cambios de código)

- [ ] 3.1 Revisar en el dashboard de Web3Forms si la access key actual tiene activada la restricción de "dominios permitidos"; si no, activarla para `universocrafter.cl` y documentar el resultado en la descripción del PR
- [ ] 3.2 Revisar en el dashboard de Web3Forms la dirección/dominio de envío configurado para esta access key y confirmar si el plan permite autenticación (SPF/DKIM) con dominio propio; documentar el hallazgo (no requiere cambios DNS en este cambio salvo que el usuario lo pida explícitamente)

## 4. Verificación final

- [ ] 4.1 Probar el flujo completo del formulario en `npm run dev` (nombre, email, mensaje, CAPTCHA) de principio a fin y confirmar que: (a) el honeypot sigue oculto, (b) el reply-to viaja correcto, (c) el CAPTCHA bloquea el envío si no se resuelve, (d) el envío exitoso redirige a `/gracias`
