import {
  Limiter,
  MediaType,
  ReferenceContainer,
  Viewport,
} from '@grid-builder/models';

export const generateMediaQuery = (
  mediaType: ReferenceContainer,
  viewport: Viewport,
  children: string[],
  isLast: boolean
) => {
  const lines = [
    `@${mediaType === 'viewport' ? 'media' : 'container'} ${generateMediaType(
      viewport.mediaType,
      viewport.limiter
    )} ${generateMinMax(viewport)}{`,
    ...children,
    `}`,
  ];
  if (!isLast) {
    lines.push('');
  }
  return lines;
};

const generateMediaType = (mediaType: MediaType, limiter: Limiter) => {
  const mediaTypeString = mediaType === 'both' ? 'screen,print' : mediaType;
  return limiter !== 'none' ? `${mediaTypeString} and` : mediaTypeString;
};

const generateMinMax = (viewport: Viewport) => {
  if (viewport.limiter === 'to') {
    return `(width <= ${viewport.to.value}${viewport.to.unit})`;
  }

  if (viewport.limiter === 'from') {
    return `(width >= ${viewport.from.value}${viewport.from.unit})`;
  }

  if (viewport.limiter === 'from_to') {
    return `(${viewport.from.value}${viewport.from.unit}) <= width <= ${viewport.to.value}${viewport.to.unit})`;
  }

  return '';
};
