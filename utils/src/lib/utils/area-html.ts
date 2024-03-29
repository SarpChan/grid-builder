import { Area } from '@grid-builder/models';

export const generateAreaHtml = (area: Area): string[] => {
  return [`<div class="${area.name.toLowerCase()}"></div>`];
};
