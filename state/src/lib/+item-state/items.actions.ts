import { createAction, props } from '@ngrx/store';
import { Area } from '@grid-builder/models';

export const addArea = createAction(
  '[Area/API] Add Area',
  props<{ item: Omit<Area, 'id'> }>()
);

export const addAreaSuccess = createAction(
  '[Area/API] Add Area Success',
  props<{ item: Area }>()
);

export const updateArea = createAction(
  '[Area/API] Update Area',
  props<{ id: string; changes: Partial<Area> }>()
);

export const removeArea = createAction(
  '[Area/API] Remove Area',
  props<{ id: string }>()
);

export const removeConnection = createAction(
  '[Area/API] Remove connection between Area and Grid',
  props<{ areaId: string; gridId: string }>()
);
