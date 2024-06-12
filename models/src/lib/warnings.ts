export const gridsDoNotFulfillEveryViewport =
  'Grids do not fulfill every viewport';
export const lowerBoundaryZero =
  'A grid defines 0 as its lower boundary. Consider not using a MediaQuery at all';
export const overLappingMediaQueries = 'Overlapping media queries';

export enum WarningCode {
  NOT_EVERY_VIEWPORT_FULFILLED = 'W-001',
  LOWER_BOUNDARY_IS_ZERO = 'W-002',
  OVERLAPPING_MEDIA_QUERIES = 'W-003',
}

const codeToMessage = new Map<WarningCode, string>([
  [WarningCode.NOT_EVERY_VIEWPORT_FULFILLED, gridsDoNotFulfillEveryViewport],
  [WarningCode.LOWER_BOUNDARY_IS_ZERO, lowerBoundaryZero],
  [WarningCode.OVERLAPPING_MEDIA_QUERIES, overLappingMediaQueries],
]);

export const getWarningMessage = (key: WarningCode) => codeToMessage.get(key);
