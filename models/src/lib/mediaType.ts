export const mediaTypes = ['screen', 'print', 'both'] as const;
export type MediaType = (typeof mediaTypes)[number];

export function isMediaType(
  mediaType: string | undefined
): mediaType is MediaType {
  return mediaType !== undefined && mediaTypes.includes(mediaType as MediaType);
}
