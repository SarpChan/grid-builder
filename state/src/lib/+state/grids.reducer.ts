import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Grid } from '@grid-builder/models';
import * as GridsActions from './grids.actions';

export const GRIDS_FEATURE_KEY = 'grids';

export interface GridsState extends EntityState<Grid> {
  selectedId?: string; // which Grids record has been selected
  selectedType?: 'grid' | 'row' | 'column' | 'cell';
  loaded: boolean; // has the Grids list been loaded
  error?: string | null; // last known error (if any)

  mediaType: 'screen' | 'print' | 'both';
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
      limiter: 'none',
      from: undefined,
      to: undefined,
    },
    shouldUseWidth: true,
    width: { value: 100, unit: 'vw' },
    shouldUseHeight: true,
    height: { value: 100, unit: 'vh' },
  };

  const id2 = crypto.randomUUID();
  const initialGrid2: Grid = {
    id: id2,
    name: 'Mobile',
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
      limiter: 'none',
      from: undefined,
      to: undefined,
    },
    shouldUseWidth: true,
    width: { value: 100, unit: 'vw' },
    shouldUseHeight: true,
    height: { value: 100, unit: 'vh' },
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
  })),
  on(GridsActions.updateGrid, (state, { grid }) =>
    gridsAdapter.updateOne(grid, state)
  )
);

export function gridsReducer(state: GridsState | undefined, action: Action) {
  return reducer(state, action);
}
