// Sección "¿Por qué elegir Universo Crafter?" — 4 beneficios de marca.
// `icon` es una clave de ícono (SVG inline en PorQueElegir.astro) y `color` un
// token pastel de la marca para el círculo del ícono.

export type Beneficio = {
  title: string;
  text: string;
  icon: 'heart' | 'leaf' | 'truck' | 'star';
  color: 'rosa' | 'menta' | 'celeste' | 'amarillo';
  // Si se define, se usa esta imagen en lugar del ícono SVG.
  image?: string;
};

export const beneficios: Beneficio[] = [
  {
    title: 'Diseños únicos',
    text: 'Productos originales y llenos de color.',
    icon: 'heart',
    color: 'rosa',
    image: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695381/diseno.png',
  },
  {
    title: 'Calidad de papel',
    text: 'Materiales de gran calidad.',
    icon: 'leaf',
    color: 'menta',
    image: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695385/seleccionamos.png',
  },
  {
    title: 'Envíos a todo Chile',
    text: 'Recibe en la comodidad de tu casa.',
    icon: 'truck',
    color: 'celeste',
    image: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695380/despacho-o-reparto.png',
  },
  {
    title: 'Hecho con amor',
    text: 'Apoyas un proyecto creativo e independiente.',
    icon: 'star',
    color: 'amarillo',
    image: 'https://res.cloudinary.com/v5ovpy2d/image/upload/v1789695380/creamos.png',
  },
];
