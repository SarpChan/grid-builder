export const alignmentItemsOptions = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
] as const;

export type AlignmentItemsOptions = (typeof alignmentItemsOptions)[number];
