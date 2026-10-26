// Enlaces internos (#seccion) hacen scroll en la misma página; los externos abren pestaña nueva.
export const linkProps = (href) =>
  href?.startsWith('#')
    ? { href }
    : { href, target: '_blank', rel: 'noopener noreferrer' };
