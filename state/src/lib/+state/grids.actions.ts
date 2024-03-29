import {
  AddAreaInstance,
  AddGrid,
  Area,
  AreaInstance,
  Column,
  Grid,
  ReferenceContainer,
  Row,
  SelectionElement,
  Viewport,
} from '@grid-builder/models';
import { createAction, props } from '@ngrx/store';

export const initGrids = createAction('[Grids Page] Init');

export const reset = createAction('[Grids] Reset');

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
  props<{ id: string; changes: Partial<Grid> }>()
);

export const addColumn = createAction(
  '[Grids/API] Add Column',
  props<{ id: string }>()
);

export const addRow = createAction(
  '[Grids/API] Add Row',
  props<{ id: string }>()
);

export const addAreaInstance = createAction(
  '[Grids/API] Add AreaInstance',
  props<{ id: string; item: AddAreaInstance }>()
);

export const addAreaInstanceSuccess = createAction(
  '[Grids/API] Add AreaInstance Success',
  props<{ id: string; item: AddAreaInstance }>()
);

export const removeColumn = createAction(
  '[Grids/API] Remove Column',
  props<{ gridId: string; columnId: string }>()
);

export const removeRow = createAction(
  '[Grids/API] Remove Row',
  props<{ gridId: string; rowId: string }>()
);

export const removeGrid = createAction(
  '[Grids/API] Remove Grid',
  props<{ id: string }>()
);

export const removeAreaInstance = createAction(
  '[Grids/API] Remove AreaInstance',
  props<{ gridId: string; itemId: string }>()
);

export const selectElement = createAction(
  '[Grids/API] Select Element',
  props<{ selection: SelectionElement }>()
);

export const updateRow = createAction(
  '[Grids/API] Update Row',
  props<{ id: string; rowId: string; changes: Partial<Row> }>()
);

export const updateColumn = createAction(
  '[Grids/API] Update Column',
  props<{ id: string; colId: string; changes: Partial<Column> }>()
);

export const updateAreaInstance = createAction(
  '[Grids/API] Update AreaInstance',
  props<{ id: string; itemId: string; changes: Partial<AreaInstance> }>()
);

export const updateViewport = createAction(
  '[Grids/API] Update Viewport',
  props<{ id: string; changes: Partial<Viewport> }>()
);

export const updateReferenceContainer = createAction(
  '[Grids/API] Update ReferenceContainer',
  props<{ referenceContainer: ReferenceContainer }>()
);

export const updateUseClassName = createAction(
  '[Grids/API] Update use ClassName',
  props<{ selection: boolean }>()
);

export const updateUseTailwind = createAction(
  '[Grids/API] Update use Tailwind',
  props<{ selection: boolean }>()
);

export const connectAreaToInstance = createAction(
  '[Grids/API] Connect Area to instance',
  props<{ areaId: string; areaInstanceId: string; gridId: string }>()
);

export const connectNewAreaToInstance = createAction(
  '[Grids/API] Connect New Area to instance',
  props<{ item: Omit<Area, 'id'>; areaInstanceId: string; gridId: string }>()
);

export const connectAreaToInstanceSuccess = createAction(
  '[Grids/API] Connect Area to instance success',
  props<{ areaId: string; areaInstanceId: string; gridId: string }>()
);

export const connectAreaToInstanceFailure = createAction(
  '[Grids/API] Connect Area to instance failed',
  props<{ error: string }>()
);

export const generate = createAction('[Grids/API] Generate Code');

export const generateSuccess = createAction(
  '[Grids/API] Generate Code Success',
  props<{ css: string | undefined; html: string }>()
);
export const generateFailure = createAction('[Grids/API] Generate Code Failed');

export const clearGenerated = createAction('[Grids/API] Clear Generated Code');
