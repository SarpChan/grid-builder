export const autoFlowOptions = [
  'row',
  'column',
  'row dense',
  'column dense',
] as const;

export type AutoFlowOptions = (typeof autoFlowOptions)[number];
