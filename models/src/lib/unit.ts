export const units = [
  'px',
  '%',
  'em',
  'rem',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'cm',
  'mm',
  'in',
  'pt',
  'pc',
  'ex',
  'ch',
  'fr',
  'auto',
  'ic',
  'lh',
  'rlh',
  'vi',
  'vb',
  'cqw',
  'cqh',
  'cqi',
  'cqb',
  'cqmin',
  'cqmax',
  'q',
] as const;
export type Unit = (typeof units)[number];

export const font_units: Unit[] = ['em', 'rem', 'ch', 'ex', 'ic', 'lh', 'rlh'];

export const absolute_units: Unit[] = ['px', 'cm', 'mm', 'in', 'pt', 'pc'];

export const dynamic_units: Unit[] = ['fr', 'auto', '%'];

export const viewport_units = ['vw', 'vh', 'vmin', 'vmax', 'vb', 'vi'];

export const container_units = ['cqw', 'cqh', 'cqi', 'cqb', 'cqmin', 'cqmax'];

export function isUnit(unit: string | undefined): unit is Unit {
  return unit !== undefined && units.includes(unit as Unit);
}
