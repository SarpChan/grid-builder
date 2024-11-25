import {
  Grid,
  IValidationModel,
  Selectable,
  SelectionElement,
} from '@grid-builder/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ItemsActions from '../+item-state/items.actions';
import * as GridsActions from './grids.actions';

export const GRIDS_FEATURE_KEY = 'grids';

export interface GridsState extends EntityState<Grid> {
  selectedId?: string; // which Grids record has been selected
  loaded: boolean; // has the Grids list been loaded
  error?: string | null; // last known error (if any)
  generated?: { css: string | undefined; html: string } | undefined;
  order: string[];
  selection?: SelectionElement | undefined;
  referenceContainer: 'viewport' | 'container';
  useTailwind: boolean;
  useClassName: boolean;
  warnings: IValidationModel[];
  errors: IValidationModel[];
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
    autoFlow: 'row',
    shouldUseWidth: true,
    width: { value: 100, unit: '%' },
    shouldUseHeight: true,
    height: { value: 100, unit: '%' },
    alignItems: 'start',
    justifyItems: 'start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
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
    autoFlow: 'row',
    shouldUseWidth: true,
    width: { value: 100, unit: '%' },
    shouldUseHeight: true,
    height: { value: 100, unit: '%' },
    alignItems: 'start',
    justifyItems: 'start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  };

  const entities = { [id]: initialGrid, [id2]: initialGrid2 };
  return { ids: [id, id2], entities, selectedId: id, order: [id, id2] };
};

export const initialGridsState: GridsState = gridsAdapter.getInitialState({
  ...initialEntities(),
  loaded: false,
  mediaType: 'both',
  referenceContainer: 'viewport',
  error: null,
  useTailwind: false,
  useClassName: false,
  warnings: [],
  errors: [],
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
    const newState = gridsAdapter.addOne(newGrid, state);
    newState.order = [...newState.order, newGrid.id];
    return newState;
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
  on(GridsActions.updateOrder, (state, { order }) => ({ ...state, order })),
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
  on(GridsActions.generateSuccess, (state, { css, html }) => ({
    ...state,
    generated: { css, html },
  })),
  on(GridsActions.validationResults, (state, { warnings, errors }) => ({
    ...state,
    warnings,
    errors,
  })),
  on(GridsActions.clearGenerated, (state) => ({
    ...state,
    generated: undefined,
  })),
  on(GridsActions.addColumn, (state, { id }) => {
    const columnId = crypto.randomUUID();
    const selection = {
      id: columnId,
      selectedType: Selectable.COLUMN,
    };
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
    return { ...newState, selection };
  }),
  on(GridsActions.addRow, (state, { id }) => {
    const rowId = crypto.randomUUID();
    const selection = {
      id: rowId,
      selectedType: Selectable.ROW,
    };
    const newState = gridsAdapter.map(
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

    return { ...newState, selection };
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
  on(GridsActions.updateAreaInstance, (state, { id, itemId, changes }) => {
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
  on(
    GridsActions.connectAreaToInstanceSuccess,
    (state, { areaId, areaInstanceId, gridId }) => {
      return gridsAdapter.map((grid) => {
        if (grid.id !== gridId) return grid;

        return {
          ...grid,
          items: grid.items.map((item) => {
            if (item.id !== areaInstanceId) return item;

            return {
              ...item,
              areaId,
              id: item.id,
            };
          }),
        };
      }, state);
    }
  ),
  on(GridsActions.updateReferenceContainer, (state, { referenceContainer }) => {
    return { ...state, referenceContainer };
  }),
  on(GridsActions.updateUseTailwind, (state, { selection }) => {
    return { ...state, useTailwind: selection };
  }),
  on(GridsActions.updateUseClassName, (state, { selection }) => {
    return { ...state, useClassName: selection };
  }),
  on(GridsActions.addAreaInstanceSuccess, (state, { id, item }) => {
    const itemId = crypto.randomUUID();
    const selection = {
      id: itemId,
      selectedType: Selectable.AREA_INSTANCE,
    };
    const newState = gridsAdapter.map(
      (entity) =>
        entity.id === id
          ? {
              ...entity,
              items: [
                ...entity.items,
                {
                  ...item,
                  id: itemId,
                },
              ],
            }
          : entity,
      state
    );

    return { ...newState, selection };
  }),
  on(GridsActions.removeColumn, (state, { gridId, columnId }) => {
    const isSelected = columnId === state.selection?.id;

    const newState = gridsAdapter.map((grid) => {
      if (grid.id === gridId) {
        let items = grid.items;
        if (grid.columns?.length && grid.columns.length > 1) {
          const colIndex = grid.columns.findIndex((col) => col.id === columnId);

          items = grid.items.map((item) => {
            const tempItem = { ...item };
            if (colIndex < tempItem.colStart) {
              tempItem.colStart = tempItem.colStart - 1;
              tempItem.colEnd = tempItem.colEnd - 1;
            } else if (
              (colIndex > tempItem.colEnd ||
                tempItem.colEnd > grid.columns.length) &&
              tempItem.colEnd - tempItem.colStart > 1
            ) {
              tempItem.colEnd = tempItem.colEnd - 1;
            }

            return tempItem;
          });
        }
        return {
          ...grid,
          items,
          columns: grid.columns.filter((col) => col.id !== columnId),
        };
      }
      return grid;
    }, state);

    if (isSelected) {
      newState.selection = undefined;
    }
    return newState;
  }),
  on(GridsActions.removeRow, (state, { gridId, rowId }) => {
    const isSelected = rowId === state.selection?.id;

    const newState = gridsAdapter.map((grid) => {
      if (grid.id === gridId) {
        let items = grid.items;
        if (grid.rows?.length && grid.rows.length > 1) {
          const rowIndex = grid.rows.findIndex((row) => row.id === rowId);

          items = grid.items.map((item) => {
            const tempItem = { ...item };
            if (rowIndex < tempItem.rowStart) {
              tempItem.rowStart = tempItem.rowStart - 1;
              tempItem.rowEnd = tempItem.rowEnd - 1;
            } else if (
              (rowIndex > tempItem.rowEnd ||
                tempItem.rowEnd > grid.rows.length) &&
              tempItem.rowEnd - tempItem.rowStart > 1
            ) {
              tempItem.rowEnd = tempItem.rowEnd - 1;
            }

            return tempItem;
          });
        }
        return {
          ...grid,
          items,
          rows: grid.rows.filter((row) => row.id !== rowId),
        };
      }
      return grid;
    }, state);

    if (isSelected) {
      newState.selection = undefined;
    }
    return newState;
  }),
  on(GridsActions.removeAreaInstance, (state, { gridId, itemId }) => {
    const isSelected = itemId === state.selection?.id;

    const newState = gridsAdapter.map(
      (grid) =>
        grid.id === gridId
          ? {
              ...grid,
              items: grid.items.filter((item) => item.id !== itemId),
            }
          : grid,
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
  })),
  on(ItemsActions.removeConnection, (state, { areaId, gridId }) =>
    gridsAdapter.map((grid) => {
      if (grid.id !== gridId) return grid;

      return {
        ...grid,
        items: grid.items.map((areaInstance) => {
          if (areaInstance.areaId !== areaId) return areaInstance;

          return {
            ...areaInstance,
            areaId: undefined,
          };
        }),
      };
    }, state)
  ),
  on(ItemsActions.removeArea, (state, { id }) => ({
    ...state,
    selection: state.selection?.id === id ? undefined : state.selection,
  })),
  on(ItemsActions.addAreaSuccess, (state, { item }) => {
    return {
      ...state,
      selection: { id: item.id, selectedType: Selectable.AREA },
    };
  }),
  on(GridsActions.removeGrid, (state, { id }) => ({
    ...gridsAdapter.removeOne(id, state),
    order: state.order.filter((gridId) => gridId !== id),
    selectedId:
      state.ids.length > 1
        ? `${state.ids.find((gridId) => gridId !== id)}`
        : undefined,
  })),
  on(GridsActions.setPreset, (state, { preset }) => {
    const entities = Object.assign(
      {},
      ...preset.grids.map((grid) => ({ [grid.id]: grid }))
    );

    return {
      ...state,
      entities,
      error: null,
      loaded: true,
      ids: Object.keys(entities),
      selectedId: preset.grids[0].id,
      useClassName: preset.globals.useClassName,
      useTailwind: preset.globals.useTailwind,
      mediaType: preset.globals.mediaType,
      referenceContainer: preset.globals.referenceContainer,
      generated: undefined,
      selection: undefined,
    };
  }),
  on(GridsActions.reset, () => initialGridsState),

  on(GridsActions.loadFileSuccess, (state, { grids, globals }) => {
    const entities = Object.assign(
      {},
      ...(grids?.map((grid) => ({ [grid.id]: grid })) ?? [])
    );
    return {
      ...state,
      entities,
      error: null,
      loaded: true,
      ids: entities ? Object.keys(entities) : [],
      selectedId: grids[0].id,
      generated: undefined,
      selection: undefined,
      useClassName: globals?.useClassName ?? initialGridsState.useClassName,
      useTailwind: globals?.useTailwind ?? initialGridsState.useTailwind,
      referenceContainer:
        globals?.referenceContainer ?? initialGridsState.referenceContainer,
    };
  })
);
export function gridsReducer(state: GridsState | undefined, action: Action) {
  return reducer(state, action);
}
