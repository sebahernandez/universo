// Contenido de las secciones (texto extraído del diseño).
// Los `icon` y `src` son public_id de Cloudinary (cloud: ver src/lib/cloudinary.ts).

export type Feature = {
  title: string;
  text: string;
  icon: string;
};

// Sección "No sólo imprimimos" — 4 tarjetas
export const features: Feature[] = [
  {
    title: 'Diseño pensado para ti',
    text: 'Cada pieza nace desde tu idea, necesidad y estilo.',
    icon: 'diseno.png',
  },
  {
    title: 'Producción cuidada',
    text: 'Revisamos papeles, impresión, terminaciones y presentación.',
    icon: 'produccion.png',
  },
  {
    title: 'Tirajes pequeños',
    text: 'No necesitas producir cientos de unidades para hacer algo especial.',
    icon: 'tirajes.png',
  },
  {
    title: 'Atención personalizada',
    text: 'Hablas directamente con quienes diseñan y producen tu proyecto.',
    icon: 'atencion.png',
  },
];

export type Servicio = {
  num: string;
  title: string;
  text: string;
  color: 'rosa' | 'amarillo' | 'celeste';
};

// Sección "¿Qué podemos hacer?" — 3 bloques numerados
export const servicios: Servicio[] = [
  {
    num: '01',
    title: 'Papelería Personalizada',
    text: 'Agendas, invitaciones, tarjetas, recuerdos y piezas hechas para momentos especiales.',
    color: 'rosa',
  },
  {
    num: '02',
    title: 'Fotografía e Impresión',
    text: 'Fotos, láminas, recuerdos y piezas impresas con terminaciones cuidadas.',
    color: 'amarillo',
  },
  {
    num: '03',
    title: 'Proyectos Especiales',
    text: 'Packaging, letterpress, colecciones y trabajos desarrollados a medida.',
    color: 'celeste',
  },
];

export type Paso = {
  title: string;
  text: string;
  icon: string;
};

// Sección "Cómo Trabajamos" — 4 pasos
export const pasos: Paso[] = [
  {
    title: 'Seleccionamos',
    text: 'Elegimos cuidadosamente los mejores materiales e insumos para que cada proyecto tenga una terminación de calidad.',
    icon: 'seleccionamos.png',
  },
  {
    title: 'Diseñamos',
    text: 'Desarrollamos profesionalmente cada detalle, adaptando el diseño a tu idea, estilo y necesidad.',
    icon: 'disenamos.png',
  },
  {
    title: 'Creamos',
    text: 'Llevamos el proyecto a producción, cuidando la impresión, armado y terminaciones en cada pieza.',
    icon: 'creamos.png',
  },
  {
    title: 'Entregamos',
    text: 'Una vez listo, puedes recibir tu pedido mediante despacho o coordinar retiro directamente con nosotros.',
    icon: 'entregamos.png',
  },
];

export type CompraCard = {
  title: string;
  text: string;
  icon: string;
};

// Sección "Compras y Envíos" — panel "Cómo comprar"
export const comoComprar: CompraCard[] = [
  {
    title: 'Compra por RRSS',
    text: 'Escríbenos por WhatsApp, Instagram o Facebook y cuéntanos qué te gustaría que creáramos para ti o esa celebración especial.',
    icon: 'compra-por-rrss.png',
  },
  {
    title: 'Compra por formulario',
    text: 'Completa el formulario de contacto y te responderemos para coordinar tu pedido.',
    icon: 'compra-por-formulario.png',
  },
];

// Sección "Compras y Envíos" — panel "Cómo recibes tu pedido"
export const comoRecibes: CompraCard[] = [
  {
    title: 'Despacho o reparto',
    text: 'Enviamos tus pedidos por Bluexpress o el medio de transporte que más te acomode, por pagar según tu comuna o ciudad.',
    icon: 'despacho-o-reparto.png',
  },
  {
    title: 'Retiro en Taller',
    text: 'Si prefieres, puedes coordinar el retiro directamente en nuestro taller con costo $0.',
    icon: 'retiro-en-taller.png',
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
};

// Sección "Nuestros Proyectos" — 12 imágenes (2×6).
export const galeria: GalleryItem[] = [
  { src: 'proyecto-1.png', alt: 'Set de papelería pastel con caja de regalo y stickers de arcoíris' },
  { src: 'proyecto-2.png', alt: 'Plancha de stickers kawaii con gatitos, soles y corazones' },
  { src: 'proyecto-3.png', alt: 'Guirnalda de banderines personalizada con el nombre Sofía' },
  { src: 'proyecto-4.png', alt: 'Piñata artesanal de unicornio para cumpleaños' },
  { src: 'proyecto-5.png', alt: 'Topper de torta de primer cumpleaños con arcoíris y sol' },
  { src: 'proyecto-6.png', alt: 'Caja de regalo kraft con tarjeta de agradecimiento y stickers' },
  { src: 'proyecto-7.png', alt: 'Agenda personalizada con tapa ilustrada en tonos pastel' },
  { src: 'proyecto-8.png', alt: 'Lámina de concierto Starlight Tour impresa en papel' },
  { src: 'proyecto-9.png', alt: 'Cajitas de dulces decoradas con flores para celebración' },
  { src: 'proyecto-10.png', alt: 'Invitación temática de dinosaurios para quinto cumpleaños' },
  { src: 'proyecto-11.png', alt: 'Invitación de sirena Magical Birthday con RSVP' },
  { src: 'proyecto-12.png', alt: 'Torta y cupcakes con topper personalizado del nombre Martina' },
];
