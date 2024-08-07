export const gridsDoNotFulfillEveryViewport =
  'warnings.grid.not_all_media_queries_covered';
export const lowerBoundaryZero = 'warnings.grid.lower_boundary_zero';
export const overLappingMediaQueries =
  'warnings.grid.overlapping_media_queries';

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
