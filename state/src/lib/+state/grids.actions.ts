import { AddGrid, Grid } from '@grid-builder/models';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const initGrids = createAction('[Grids Page] Init');

export const loadGridsSuccess = createAction(
  '[Grids/API] Load Grids Success',
  props<{ grids: Grid[] }>()
);

export const loadGridsFailure = createAction(
  '[Grids/API] Load Grids Failure',
  props<{ error: string }>()
);

export const addGrid = createAction(
  '[Grids/API] Add Grid',
  props<{ grid: AddGrid }>()
);

export const selectGrid = createAction(
  '[Grids/API] Select Grid',
  props<{ id: string }>()
);
export const updateGrid = createAction(
  '[Grids/API] Update Grid',
  props<{ grid: Update<Grid> }>()
);
