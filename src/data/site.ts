// Datos globales del sitio: identidad, contacto y navegación.

export const site = {
  name: 'Universo Crafter',
  tagline: 'Papelería creativa, impresión y proyectos hechos con cariño.',
  description:
    'Papelería creativa personalizada: invitaciones, recuerdos, fotografías y proyectos impresos a medida. Taller chileno con envíos a todo Chile. Cotiza por WhatsApp.',
  email: 'hola@universocrafter.cl',
  // Dirección física del taller (NAP para SEO local).
  address: {
    street: 'Sergio Lemus Olea 1108',
    locality: 'Talagante',
    region: 'Región Metropolitana',
    postalCode: '',
    country: 'CL',
    display: 'Sergio Lemus Olea 1108, Talagante, Región Metropolitana, Chile',
  },
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
