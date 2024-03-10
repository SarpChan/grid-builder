import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ItemsActions from './items.actions';
import { Area } from '@grid-builder/models';
export const ITEM_FEATURE_KEY = 'items';

export interface ItemState extends EntityState<Area> {}

export interface ItemsPartialState {
  readonly [ITEM_FEATURE_KEY]: ItemState;
}
export const selectItemId = ({ id }: Area) => id;

export const itemsAdapter: EntityAdapter<Area> = createEntityAdapter<Area>({
  selectId: selectItemId,
});

export const initialItemState: ItemState = itemsAdapter.getInitialState({});

const reducer = createReducer(
  initialItemState,
  on(ItemsActions.addArea, (state, { item }) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    return itemsAdapter.addOne(newItem, state);
  })
);

export function itemsReducer(state: ItemState | undefined, action: Action) {
  return reducer(state, action);
}
