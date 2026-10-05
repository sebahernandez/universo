// Sección "¿Cómo comprar?" — 3 pasos.
// Copy adaptado al flujo REAL (a pedido vía contacto/WhatsApp): sin carrito ni
// pago en línea. `icon` es una clave de ícono (SVG inline en ComoComprar.astro).

export type PasoCompra = {
  num: string;
  title: string;
  text: string;
  // `icon` es una clave de SVG inline (ComoComprar.astro). Si se define `img`,
  // se usa esa imagen (sin círculo de fondo) en lugar del SVG.
  icon: 'sparkles' | 'chat' | 'truck';
  img?: string;
  color: 'rosa' | 'amarillo' | 'celeste';
};

export const pasosCompra: PasoCompra[] = [
  {
    num: 'Paso 1',
    title: 'Elige tus productos',
    text: 'Explora nuestras colecciones y cuéntanos qué te gustaría.',
    icon: 'sparkles',
    img: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695381/disenamos.png',
    color: 'rosa',
  },
  {
    num: 'Paso 2',
    title: 'Coordina tu compra',
    text: 'Te respondemos para confirmar tu pedido y coordinar el pago.',
    icon: 'chat',
    img: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695385/whatsapp.png',
    color: 'amarillo',
  },
  {
    num: 'Paso 3',
    title: 'Recibe en casa',
    text: 'Enviamos a todo Chile o retiras en nuestro taller.',
    icon: 'truck',
    img: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695381/entregamos.png',
    color: 'celeste',
  },
];
