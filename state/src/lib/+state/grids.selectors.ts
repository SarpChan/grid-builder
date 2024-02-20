import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GRIDS_FEATURE_KEY, GridsState, gridsAdapter } from './grids.reducer';

export const selectGridsState =
  createFeatureSelector<GridsState>(GRIDS_FEATURE_KEY);

const { selectAll, selectEntities } = gridsAdapter.getSelectors();

export const selectGridsLoaded = createSelector(
  selectGridsState,
  (state: GridsState) => state.loaded
);

export const selectGridsError = createSelector(
  selectGridsState,
  (state: GridsState) => state.error
);

export const selectAllGrids = createSelector(
  selectGridsState,
  (state: GridsState) => selectAll(state)
);

export const selectGridsEntities = createSelector(
  selectGridsState,
  (state: GridsState) => (state ? selectEntities(state) : undefined)
);

export const selectSelectedId = createSelector(
  selectGridsState,
  (state: GridsState) => {
    return state?.selectedId;
  }
);

export const selectSelectedElement = createSelector(
  selectGridsState,
  (state: GridsState) => state.selection
);

export const selectEntity = createSelector(
  selectGridsEntities,
  selectSelectedId,
  (entities, selectedId) =>
    selectedId && entities ? entities[selectedId] : undefined
);

export const selectGridStyling = createSelector(selectEntity, (entity) => {
  if (!entity) return;

  const rowText = `grid-template-rows: ${entity.rows
    .map((row) => row.height.value + row.height.unit)
    .join(', ')}`;
  const columnText = `grid-template-columns: ${entity.columns
    .map((column) => column.width.value + column.width.unit)
    .join(', ')}`;

  return { row: rowText, column: columnText };
});

export const selectSelectedColumn = createSelector(
  selectSelectedElement,
  selectEntity,
  (selection, grid) => {
    const id = selection?.id;
    return grid?.columns.find((c) => c.id === id);
  }
);

export const selectSelectedRow = createSelector(
  selectSelectedElement,
  selectEntity,
  (selection, grid) => {
    const id = selection?.id;
    return grid?.rows.find((r) => r.id === id);
  }
);

export const selectSelectedItem = createSelector(
  selectSelectedElement,
  selectEntity,
  (selection, grid) => {
    const id = selection?.id;
    return grid?.items.find((i) => i.id === id);
  }
);

export const selectViewport = createSelector(
  selectEntity,
  (grid) => grid?.viewport
);