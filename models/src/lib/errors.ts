export const gridEmptyName = 'errors.grid.empty_name';
export const areaEmptyName = 'errors.area.empty_name';
export const multipleGridsWithoutMediaQuery =
  'errors.grid.multiple_without_media_query';
export const multipleGridsWithSameMediaQuery =
  'errors.grid.multiple_with_same_media_query';
export const noGrids = 'errors.grid.empty';
export const noRows = 'errors.grid.no_rows';
export const noColumns = 'errors.grid.no_columns';
export const upperBoundaryUndefined = 'errors.grid.upper_boundary_undefined';
export const bothBoundariesSame = 'errors.grid.boundaries_are_equal';

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
