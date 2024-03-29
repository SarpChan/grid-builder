import { Area } from '@grid-builder/models';

export const generateAreaHtml = (area: Area, classText: string): string[] => {
  return [`<div ${classText}="${area.name.toLowerCase()}"></div>`];
};
