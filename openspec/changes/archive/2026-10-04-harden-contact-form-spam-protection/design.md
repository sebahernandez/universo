# Design

## Context

El sitio es Astro estático (`output: 'static'`, sin SSR ni rutas `/api`). El formulario de contacto (`src/components/Contacto.astro`) hace un POST directo del navegador a `https://api.web3forms.com/submit`; no existe backend propio que pueda validar un CAPTCHA del lado del servidor. Cualquier protección anti-bot adicional debe apoyarse en lo que Web3Forms ya verifica en su propio backend, igual que hoy hace con el campo honeypot `botcheck`. Ver proposal.md - Why para la motivación completa.

## Goals / Non-Goals

**Goals:**
- Declarar el reply-to de forma explícita en el POST a Web3Forms.
- Añadir una verificación humana (CAPTCHA) que Web3Forms valide server-side antes de reenviar el correo, sin introducir un backend propio.
- Dejar un checklist de verificación manual de la cuenta Web3Forms (fuera de código) para reducir el riesgo de que el correo caiga en spam o que la access key sea abusada desde otro sitio.

**Non-Goals:**
- No se migra de proveedor de formularios (se mantiene Web3Forms).
- No se implementa verificación de CAPTCHA en un backend propio: se delega enteramente en la verificación server-side que hace Web3Forms con la respuesta de Turnstile.
- No se gestiona DNS/SPF/DKIM del dominio `universocrafter.cl` en este cambio: Web3Forms envía desde su propia infraestructura y eso queda fuera del alcance de este repo.

## Decisions

- **Reply-to explícito**: agregar `<input type="hidden" name="replyto" />` cuyo valor se sincroniza con el campo `email` del visitante (vía un pequeño script inline, igual patrón que el guard existente de `sessionStorage`). Alternativa descartada: seguir dependiendo del auto-detect de Web3Forms sobre el campo `email` — funciona hoy, pero no está garantizado por contrato y es más frágil ante cambios futuros del formulario (por ejemplo, si se renombra el campo).
- **Cloudflare Turnstile vía integración nativa de Web3Forms**: Web3Forms soporta Cloudflare Turnstile de forma nativa — un `<div class="cf-turnstile" data-sitekey="...">` más el script `https://challenges.cloudflare.com/turnstile/v0/api.js`, y Web3Forms valida la respuesta `cf-turnstile-response` en su propio backend al recibir el POST. Se prefiere sobre hCaptcha por decisión explícita del usuario y porque Turnstile puede operar en modo "managed" (a menudo sin interacción visible), lo que reduce la fricción frente al checkbox tradicional. Alternativa descartada: verificar el CAPTCHA en una función serverless propia — requeriría pasar de `output: 'static'` a un adaptador con SSR/funciones, cambio arquitectónico mayor que no se justifica solo para esto.
- **Nueva clave de configuración `site.turnstileSiteKey`** en `src/data/site.ts`, siguiendo el mismo patrón que `web3formsKey` (valor público, no secreto, pensado para vivir en el bundle del cliente).
- **Checklist de verificación manual de Web3Forms** (restricción de dominios permitidos para la access key, revisión de la dirección de envío/autenticación) se documenta como tarea de verificación en tasks.md, no como código, porque esos ajustes viven en el dashboard de Web3Forms y no son parte de este repositorio.

## Risks / Trade-offs

- [Turnstile añade una dependencia de carga de script de un tercero adicional (Cloudflare) al formulario] → Es asíncrono y no bloquea el render del resto de la página; se acepta como costo menor frente al beneficio anti-spam.
- [La site key de Turnstile queda en el bundle público, igual que la access key de Web3Forms] → Es el modelo esperado para site keys de CAPTCHA (están diseñadas para ser públicas); el secreto de verificación vive en el servidor del proveedor (Web3Forms/Cloudflare), no en este repo.
- [Verificación de la cuenta Web3Forms (dominio permitido, SPF/DKIM) no se puede validar automáticamente] → Se deja como paso manual explícito en tasks.md con instrucciones concretas de qué revisar en el dashboard, para que no se pierda de vista.

## Open Questions

- Ninguna: se resolvió explícitamente con el usuario usar Cloudflare Turnstile en vez de hCaptcha antes de implementar.
