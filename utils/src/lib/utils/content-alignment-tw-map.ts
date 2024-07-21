import { AlignmentContentOptions } from '@grid-builder/models';

export const contentAlignmentToTailwindMapping = (
  contentOption: AlignmentContentOptions
) => {
  return innerContentAlignmentToTailwindMapping[contentOption] || contentOption;
};
const innerContentAlignmentToTailwindMapping: {
  [key in AlignmentContentOptions]?: string;
} = {
  ['normal']: 'normal',
  ['center']: 'center',
  ['space-between']: 'between',
  ['space-around']: 'around',
  ['space-evenly']: 'evenly',
  ['stretch']: 'stretch',
  ['flex-start']: 'start',
  ['flex-end']: 'end',
};
