// Helper para servir imágenes de Cloudinary optimizadas.
// Inserta transformaciones (formato/calidad automáticos + ancho) justo después
// de `/upload/`, respetando cualquier transformación o versión ya presente.

export const CLOUD_NAME = 'v5ovpy2d';

const DELIVERY = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
const BASE = 'f_auto,q_auto';

// Construye la URL base de entrega a partir del public_id (ej. 'proyecto-1.png').
export function cldSrc(publicId: string): string {
  return `${DELIVERY}/${publicId}`;
}

// Devuelve la URL con transformaciones. Acepta un public_id o una URL completa.
export function cld(input: string, width?: number): string {
  const url = input.includes('/upload/') ? input : cldSrc(input);
  const t = width ? `${BASE},w_${width},c_limit` : BASE;
  return url.replace('/upload/', `/upload/${t}/`);
}

// Genera el atributo srcset para imágenes responsivas.
export function cldSrcset(input: string, widths: number[]): string {
  return widths.map((w) => `${cld(input, w)} ${w}w`).join(', ');
}

// Igual que cld() pero aplica super-resolución con IA (e_upscale) ANTES de
// optimizar. Pensado para imágenes de origen pequeño que se muestran grandes
// (p. ej. el modal), donde el escalado del navegador se vería borroso.
export function cldHiRes(input: string, width?: number): string {
  const url = input.includes('/upload/') ? input : cldSrc(input);
  const t = width ? `${BASE},w_${width},c_limit` : BASE;
  return url.replace('/upload/', `/upload/e_upscale/${t}/`);
}

// srcset responsivo con super-resolución (para el modal).
export function cldHiResSrcset(input: string, widths: number[]): string {
  return widths.map((w) => `${cldHiRes(input, w)} ${w}w`).join(', ');
}
