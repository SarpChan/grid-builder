import { createAction, props } from '@ngrx/store';
import { ItemEntity } from './items.reducer';

export const addItem = createAction(
  '[Item/API] Add Item',
  props<{ item: Omit<ItemEntity, 'id'> }>()
);

export const addItemSuccess = createAction(
  '[Item/API] Add Item Success',
  props<{ item: ItemEntity }>()
);

export const removeItem = createAction(
  '[Item/API] Remove Item',
  props<{ id: string }>()
);
