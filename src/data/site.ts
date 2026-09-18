// Datos globales del sitio: identidad, contacto y navegación.

export const site = {
  name: 'Universo Crafter',
  tagline: 'Papelería creativa, impresión y proyectos hechos con cariño.',
  description:
    'Universo Crafter es un taller creativo chileno de papelería personalizada, impresión y proyectos en papel. Diseñamos e imprimimos recuerdos, invitaciones, fotografías y piezas únicas hechas para recordar.',
  email: 'hola@universocrafter.cl',
  // Formato internacional sin espacios para enlaces de WhatsApp.
  whatsapp: '56935536385',
  whatsappDisplay: '+56 9 3553 6385',
  instagram: 'https://www.instagram.com/universocrafter',
  instagramHandle: '@universocrafter',
  facebook: 'https://www.facebook.com/universocrafter',
  facebookHandle: 'Universo Crafter',
  // Reemplaza con tu Access Key real de https://web3forms.com (gratis).
  web3formsKey: '991a877a-a91b-4920-9f4e-21f61a9049d6',
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Hola Universo Crafter, me gustaría cotizar un proyecto ✨',
)}`;

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: '¿Quiénes somos?', href: '#quienes-somos' },
  { label: '¿Qué podemos hacer?', href: '#que-podemos-hacer' },
  { label: 'Compras y envíos', href: '#compras-envios' },
  { label: 'Contacto', href: '#contacto' },
] as const;
