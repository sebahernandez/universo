// Preguntas frecuentes. Este mismo array alimenta el render visible y el
// JSON-LD FAQPage, de modo que ambos coincidan siempre.
// NOTA: los textos con [PLACEHOLDER: ...] deben confirmarse con el negocio
// antes de publicar (plazos exactos, medios de pago, etc.).

export type FaqItem = {
  pregunta: string;
  // Respuesta en texto plano (sin HTML) para poder reutilizarla en el JSON-LD.
  respuesta: string;
};

export const faq: FaqItem[] = [
  {
    pregunta: '¿Qué productos hacen?',
    respuesta:
      'Papelería creativa personalizada: invitaciones, recuerdos, stickers, toppers, piñatas, agendas, láminas y más. Cada pieza nace desde tu idea, necesidad y estilo.',
  },
  {
    pregunta: '¿Los productos son personalizados?',
    respuesta:
      'Sí. Todo se hace a pedido según lo que necesites: colores, nombres, temática y formato. No trabajamos con stock genérico, sino con proyectos hechos a tu medida.',
  },
  {
    pregunta: '¿Cómo hago mi compra?',
    respuesta:
      'Puedes escribirnos por WhatsApp, Instagram o Facebook, o completar el formulario de contacto del sitio. Te responderemos para coordinar tu pedido y resolver tus dudas.',
  },
  {
    pregunta: '¿Puedo pedir un diseño 100% a medida?',
    respuesta:
      'Claro. Cuéntanos tu idea o esa celebración especial y la creamos contigo, desde cero si lo prefieres.',
  },
  {
    pregunta: '¿Cuánto demora mi pedido?',
    respuesta:
      'El plazo depende del tipo de proyecto y se confirma al momento de cotizar. [PLACEHOLDER: plazo de producción estándar, ej. "entre X y Y días hábiles"].',
  },
  {
    pregunta: '¿Hacen envíos a todo Chile?',
    respuesta:
      'Sí, llegamos a todo Chile. Enviamos por Bluexpress o el medio de transporte que más te acomode, o puedes retirar directamente en nuestro taller.',
  },
  {
    pregunta: '¿Cuánto cuesta el envío?',
    respuesta:
      'El despacho es por pagar, según tu comuna o ciudad (lo paga quien recibe). Si prefieres retirar en el taller, el costo es $0.',
  },
  {
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta:
      'Coordinamos el pago al confirmar tu pedido. [PLACEHOLDER: medios de pago aceptados, ej. transferencia, débito/crédito, etc.].',
  },
  {
    pregunta: '¿Puedo pedir cambios en el diseño?',
    respuesta:
      'Sí. Trabajamos con aprobación previa: te mostramos una propuesta y ajustamos hasta que estés conforme. Una vez aprobado e impreso, cambios posteriores pueden tener costo; las correcciones por un error nuestro no tienen costo.',
  },
  {
    pregunta: '¿Tienen local físico?',
    respuesta:
      'Somos una tienda online con base en Santiago, Región Metropolitana. Puedes coordinar el retiro de tu pedido en nuestro taller sin costo.',
  },
];
