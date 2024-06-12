import { Grid } from '../grid';

export const gridMock: Grid = {
  id: '615fcb76-a685-4538-b50c-18002286d1b3',
  name: 'Test Grid',
  rows: [
    {
      id: 'd698aa75-8e0b-49bf-aa5c-e86e12602f5e',
      height: { value: 1, unit: 'rem' },
    },
  ],
  columns: [
    {
      id: '19a74ea1-08c5-44a6-a520-5032aaa11b83',
      width: { value: 1, unit: 'rem' },
    },
  ],
  items: [
    {
      id: '2119167f-c2a4-4212-b63f-b0461a5ae939',
      areaId: '78fdf547-8ec0-45e4-9e91-897680db9324',
      name: 'Test Area Instance',
      colStart: 0,
      colEnd: 1,
      rowStart: 0,
      rowEnd: 1,
    },
  ],
  vGap: { value: 1, unit: 'rem' },
  hGap: { value: 1, unit: 'rem' },
  viewport: {
    mediaType: 'both',
    limiter: 'none',
    from: { value: 0, unit: 'rem' },
    to: { value: 0, unit: 'rem' },
  },
  shouldUseWidth: false,
  width: { value: 0, unit: 'rem' },
  shouldUseHeight: false,
  height: { value: 0, unit: 'rem' },
};
