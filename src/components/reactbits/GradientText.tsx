// GradientText — componente de React Bits (https://reactbits.dev/text-animations/gradient-text)
// adaptado para los títulos display de Universo Crafter: se renderiza en línea
// (para convivir con el ajuste de una sola línea) y toma sus colores/dirección
// desde src/data/gradients.ts. El efecto (degradado en flujo recortado al texto)
// es CSS: ver .animated-gradient-text / .text-content en src/styles/global.css.
import type { ReactNode, HTMLAttributes } from 'react';

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Stops de color del degradado. */
  colors: string[];
  /** Duración de un ciclo de la animación, en segundos. */
  animationSpeed?: number;
  /** Dirección del degradado (por defecto la del original: "to right"). */
  direction?: string;
}

export default function GradientText({
  children,
  className = '',
  colors,
  animationSpeed = 7,
  direction = 'to right',
  ...rest
}: GradientTextProps) {
  const style = {
    backgroundImage: `linear-gradient(${direction}, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span className={`animated-gradient-text ${className}`.trim()} {...rest}>
      <span className="text-content" style={style}>
        {children}
      </span>
    </span>
  );
}
