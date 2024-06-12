import { Unit } from '@grid-builder/models';

export const unitToPreviewMapping = (unit: Unit) => {
  return innerUnitToPreviewMapping[unit] || unit;
};
const innerUnitToPreviewMapping: { [key in Unit]?: Unit } = {
  ['vw']: '%',
  ['vh']: '%',
  ['vmin']: '%',
  ['vmax']: '%',
  ['vb']: '%',
  ['vi']: '%',
  ['cqw']: '%',
  ['cqh']: '%',
  ['cqi']: '%',
  ['cqb']: '%',
  ['cqmin']: '%',
  ['cqmax']: '%',
  ['q']: 'px',
};
