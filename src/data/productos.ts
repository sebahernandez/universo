// Catálogo de la sección "Nuestros Productos".
// Negocio a pedido: SIN precios ni stock. Cada tarjeta enlaza a contacto/WhatsApp.
// Las imágenes (`src`) son public_id de Cloudinary reutilizados de la galería
// como PLACEHOLDER representativo; reemplazar por fotos reales de producto.

export type Categoria = 'Papelería' | 'Stickers' | 'Accesorios';

export type Producto = {
  nombre: string;
  categoria: Categoria;
  src: string;
  alt: string;
};

// Categorías disponibles para las pestañas (el filtro añade "Todos" al inicio).
export const categorias: Categoria[] = ['Papelería', 'Stickers', 'Accesorios'];

export const productos: Producto[] = [
  {
    nombre: 'Cuadernos',
    categoria: 'Papelería',
    src: 'proyecto-1.png',
    alt: 'Cuaderno pastel con diseño de corazones',
  },
  {
    nombre: 'Agendas',
    categoria: 'Papelería',
    src: 'proyecto-7.png',
    alt: 'Agenda personalizada con tapa ilustrada en tonos pastel',
  },
  {
    nombre: 'Stickers kawaii',
    categoria: 'Stickers',
    src: 'proyecto-2.png',
    alt: 'Plancha de stickers kawaii con gatitos, soles y corazones',
  },
  {
    nombre: 'Sets de stickers',
    categoria: 'Stickers',
    src: 'proyecto-6.png',
    alt: 'Caja de regalo con tarjeta y stickers',
  },
  {
    nombre: 'Sets creativos',
    categoria: 'Accesorios',
    src: 'proyecto-9.png',
    alt: 'Cajitas decoradas con flores para celebración',
  },
  {
    nombre: 'Toppers y detalles',
    categoria: 'Accesorios',
    src: 'proyecto-5.png',
    alt: 'Topper de torta con arcoíris y sol en tonos pastel',
  },
];
