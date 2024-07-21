export const alignmentContentOptions = [
  'normal',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'flex-start',
  'flex-end',
] as const;

export type AlignmentContentOptions = (typeof alignmentContentOptions)[number];
