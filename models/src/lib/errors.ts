export const gridEmptyName = 'A grid is missing a name';
export const areaEmptyName = 'An area is missing a name';
export const multipleGridsWithoutMediaQuery =
  'Multiple grids define no media query';
export const multipleGridsWithSameMediaQuery =
  'Multiple grids define the exact same media query values';
export const noGrids = 'No grids defined';
export const noRows = 'No rows defined';
export const noColumns = 'No columns defined';
export const upperBoundaryUndefined =
  'A Grid defines an upper boundary that is zero. It will never render';
export const bothBoundariesSame =
  ' A grid defines both its lower and upper boundary as the same value. It will almost certainly never render';

export enum ErrorCode {
  GRID_MISSING_NAME = 'E-001',
  AREA_MISSING_NAME = 'E-002',
  MEDIA_QUERY_MISSING_FOR_MULTIPLE_GRIDS = 'E-003',
  MEDIA_QUERY_EQUAL_FOR_MULTIPLE_GRIDS = 'E-004',
  NO_GRIDS_DEFINED = 'E-005',
  NO_ROWS_DEFINED = 'E-006',
  NO_COLUMNS_DEFINED = 'E-007',
  UPPER_BOUNDARY_IS_ZERO = 'E-008',
  EQUAL_BOUNDARIES = 'E-009',
  GRIDS_WITH_SAME_NAME = 'E-010',
  AREAS_WITH_SAME_NAME = 'E-011',
}

const codeToMessage = new Map<ErrorCode, string>([
  [ErrorCode.GRID_MISSING_NAME, gridEmptyName],
  [ErrorCode.AREA_MISSING_NAME, areaEmptyName],
  [
    ErrorCode.MEDIA_QUERY_MISSING_FOR_MULTIPLE_GRIDS,
    multipleGridsWithoutMediaQuery,
  ],
  [
    ErrorCode.MEDIA_QUERY_EQUAL_FOR_MULTIPLE_GRIDS,
    multipleGridsWithSameMediaQuery,
  ],
  [ErrorCode.NO_GRIDS_DEFINED, noGrids],
  [ErrorCode.NO_ROWS_DEFINED, noRows],
  [ErrorCode.NO_COLUMNS_DEFINED, noColumns],
  [ErrorCode.UPPER_BOUNDARY_IS_ZERO, upperBoundaryUndefined],
  [ErrorCode.EQUAL_BOUNDARIES, bothBoundariesSame],
]);

export const getErrorMessage = (key: ErrorCode) => codeToMessage.get(key);
