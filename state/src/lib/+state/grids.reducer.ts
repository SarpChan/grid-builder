import { Grid } from '@grid-builder/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as GridsActions from './grids.actions';
import { SelectionElement } from '@grid-builder/models';

export const GRIDS_FEATURE_KEY = 'grids';

export interface GridsState extends EntityState<Grid> {
  selectedId?: string; // which Grids record has been selected
  loaded: boolean; // has the Grids list been loaded
  error?: string | null; // last known error (if any)

  selection?: SelectionElement | undefined;
  referenceContainer: 'viewport' | 'container';
}

export interface GridsPartialState {
  readonly [GRIDS_FEATURE_KEY]: GridsState;
}
export const selectId = ({ id }: Grid) => id;

export const gridsAdapter: EntityAdapter<Grid> = createEntityAdapter<Grid>({
  selectId,
});

const initialEntities = () => {
  const id = crypto.randomUUID();
  const initialGrid: Grid = {
    id,
    name: 'Desktop',
    items: [],
    rows: [
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
    ],
    columns: [
      {
        id: crypto.randomUUID(),
        width: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        width: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        width: { value: 1, unit: 'fr' },
      },
    ],
    vGap: { value: 1, unit: 'rem' },
    hGap: { value: 1, unit: 'rem' },
    viewport: {
      mediaType: 'both',
      limiter: 'none',
      from: { value: 100, unit: 'px' },
      to: { value: 100, unit: 'px' },
    },
    shouldUseWidth: true,
    width: { value: 100, unit: '%' },
    shouldUseHeight: true,
    height: { value: 100, unit: '%' },
  };

  const id2 = crypto.randomUUID();
  const initialGrid2: Grid = {
    id: id2,
    name: 'Mobile',
    items: [],
    rows: [
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        height: { value: 1, unit: 'fr' },
      },
    ],
    columns: [
      {
        id: crypto.randomUUID(),
        width: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        width: { value: 1, unit: 'fr' },
      },
      {
        id: crypto.randomUUID(),
        width: { value: 1, unit: 'fr' },
      },
    ],
    vGap: { value: 1, unit: 'rem' },
    hGap: { value: 1, unit: 'rem' },
    viewport: {
      mediaType: 'both',
      limiter: 'none',
      from: { value: 100, unit: 'px' },
      to: { value: 100, unit: 'px' },
    },
    shouldUseWidth: true,
    width: { value: 100, unit: '%' },
    shouldUseHeight: true,
    height: { value: 100, unit: '%' },
  };

  const entities = { [id]: initialGrid, [id2]: initialGrid2 };
  return { ids: [id, id2], entities, selectedId: id };
};

export const initialGridsState: GridsState = gridsAdapter.getInitialState({
  ...initialEntities(),
  loaded: false,
  mediaType: 'both',
  referenceContainer: 'viewport',
  error: null,
});

const reducer = createReducer(
  initialGridsState,
  on(GridsActions.initGrids, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GridsActions.loadGridsSuccess, (state, { grids }) =>
    gridsAdapter.setAll(grids, { ...state, loaded: true })
  ),
  on(GridsActions.loadGridsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(GridsActions.addGrid, (state, { grid }) => {
    const newGrid = { ...grid, id: crypto.randomUUID() };
    return gridsAdapter.addOne(newGrid, state);
  }),
  on(GridsActions.selectGrid, (state, { id }) => ({
    ...state,
    selectedId: id,
    selection: id === state.selectedId ? state.selection : undefined,
  })),
  on(GridsActions.updateGrid, (state, { id, changes }) => {
    return gridsAdapter.map((grid) => {
      if (grid.id !== id) return grid;

      return {
        ...grid,
        ...changes,
        id: grid.id,
      };
    }, state);
  }),
  on(GridsActions.updateViewport, (state, { id, changes }) => {
    return gridsAdapter.map((grid) => {
      if (grid.id !== id) return grid;

      return {
        ...grid,
        viewport: {
          ...grid.viewport,
          ...changes,
        },
      };
    }, state);
  }),
  on(GridsActions.addColumn, (state, { id }) => {
    const newState = gridsAdapter.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              columns: [
                ...item.columns,
                {
                  id: crypto.randomUUID(),
                  width: { value: 1, unit: 'fr' },
                },
              ],
            }
          : item,
      state
    );
    return newState;
  }),
  on(GridsActions.addRow, (state, { id }) => {
    return gridsAdapter.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              rows: [
                ...item.rows,
                {
                  id: crypto.randomUUID(),
                  height: { value: 1, unit: 'fr' },
                },
              ],
            }
          : item,
      state
    );
  }),
  on(GridsActions.updateRow, (state, { id, rowId, changes }) => {
    return gridsAdapter.map((grid) => {
      if (grid.id !== id) return grid;

      return {
        ...grid,
        rows: grid.rows.map((row) => {
          if (row.id !== rowId) return row;

          return {
            ...row,
            height: {
              ...row.height,
              ...changes.height,
            },
            id: row.id,
          };
        }),
      };
    }, state);
  }),
  on(GridsActions.updateColumn, (state, { id, colId, changes }) => {
    return gridsAdapter.map((grid) => {
      if (grid.id !== id) return grid;

      return {
        ...grid,
        columns: grid.columns.map((column) => {
          if (column.id !== colId) return column;

          return {
            ...column,
            width: {
              ...column.width,
              ...changes.width,
            },
            id: column.id,
          };
        }),
      };
    }, state);
  }),

  on(GridsActions.updateItem, (state, { id, itemId, changes }) => {
    return gridsAdapter.map((grid) => {
      if (grid.id !== id) return grid;

      return {
        ...grid,
        items: grid.items.map((item) => {
          if (item.id !== itemId) return item;

          return {
            ...item,
            ...changes,
            id: item.id,
          };
        }),
      };
    }, state);
  }),
  on(GridsActions.updateReferenceContainer, (state, { referenceContainer }) => {
    return { ...state, referenceContainer };
  }),
  on(GridsActions.addItemSuccess, (state, { id, item }) => {
    const newState = gridsAdapter.map(
      (entity) =>
        entity.id === id
          ? {
              ...entity,
              items: [
                ...entity.items,
                {
                  id: crypto.randomUUID(),
                  name: '',
                  ...item,
                },
              ],
            }
          : entity,
      state
    );
    return newState;
  }),
  on(GridsActions.removeColumn, (state, { gridId, columnId }) => {
    const isSelected = columnId === state.selection?.id;

    const newState = gridsAdapter.map(
      (item) =>
        item.id === gridId
          ? {
              ...item,
              columns: item.columns.filter((col) => col.id !== columnId),
            }
          : item,
      state
    );

    if (isSelected) {
      newState.selection = undefined;
    }
    return newState;
  }),
  on(GridsActions.removeRow, (state, { gridId, rowId }) => {
    const isSelected = rowId === state.selection?.id;

    const newState = gridsAdapter.map(
      (item) =>
        item.id === gridId
          ? {
              ...item,
              rows: item.rows.filter((col) => col.id !== rowId),
            }
          : item,
      state
    );

    if (isSelected) {
      newState.selection = undefined;
    }
    return newState;
  }),
  on(GridsActions.selectElement, (state, { selection }) => ({
    ...state,
    selection,
  }))
);

export function gridsReducer(state: GridsState | undefined, action: Action) {
  return reducer(state, action);
}
