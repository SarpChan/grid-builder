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

export const removeArea = createAction(
  '[Area/API] Remove Area',
  props<{ id: string }>()
);
