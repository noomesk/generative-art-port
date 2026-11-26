import { useRef, useCallback } from 'react';

// Efecto de tilt 3D tipo ENDModa: la tarjeta se inclina siguiendo el cursor.
// Se aplica sobre un contenedor interno (no sobre el motion.div de la tarjeta)
// para no chocar con las animaciones de framer-motion.
export const useTilt = (maxDeg = 10) => {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxDeg;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxDeg;
    el.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, [maxDeg]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};
