import {
  AddGrid,
  AddItem,
  AddItemSuccess,
  Column,
  Grid,
  Item,
  ReferenceContainer,
  Row,
  SelectionElement,
  Viewport,
} from '@grid-builder/models';
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

export const addItem = createAction(
  '[Grids/API] Add Item',
  props<{ id: string; item: AddItem }>()
);

export const addItemSuccess = createAction(
  '[Grids/API] Add Item Success',
  props<{ id: string; item: AddItemSuccess }>()
);

export const removeColumn = createAction(
  '[Grids/API] Remove Column',
  props<{ gridId: string; columnId: string }>()
);

export const removeRow = createAction(
  '[Grids/API] Remove Row',
  props<{ gridId: string; rowId: string }>()
);

export const removeItem = createAction(
  '[Grids/API] Remove Item',
  props<{ gridId: string; itemId: string }>()
);

export const selectElement = createAction(
  '[Grids/API] Select Item',
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

export const updateItem = createAction(
  '[Grids/API] Update Item',
  props<{ id: string; itemId: string; changes: Partial<Item> }>()
);

export const updateViewport = createAction(
  '[Grids/API] Update Viewport',
  props<{ id: string; changes: Partial<Viewport> }>()
);

export const updateReferenceContainer = createAction(
  '[Grids/API] Update ReferenceContainer',
  props<{ referenceContainer: ReferenceContainer }>()
);
