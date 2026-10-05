// Testimonios de clientas para la home.
// ⚠️ CONTENIDO PLACEHOLDER PROVISIONAL: estas reseñas son de ejemplo y deben
// reemplazarse por testimonios reales (con autorización) antes de publicar.
// No representan opiniones verificadas de clientes reales.

export type Testimonio = {
  texto: string;
  autora: string;
  estrellas: number; // 1 a 5
  // ⚠️ Avatares de un servicio gratuito (randomuser.me). Reemplazar por fotos
  // reales de las clientas (con autorización) antes de publicar.
  avatar: string;
};

export const testimonios: Testimonio[] = [
  {
    texto:
      'La calidad es increíble, los diseños son hermosos y la atención siempre es muy amable. ¡100% recomendado!',
    autora: 'Camila R.',
    estrellas: 5,
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    texto:
      'Pedí una papelería personalizada para un cumpleaños y quedó preciosa. El cuidado por los detalles se nota en todo.',
    autora: 'Valentina M.',
    estrellas: 5,
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    texto:
      'Me encantó poder crear algo único junto al equipo. Cercanos, rápidos y con un resultado hermoso.',
    autora: 'Fernanda S.',
    estrellas: 5,
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
];
