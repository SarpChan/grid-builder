import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const ITEM_FEATURE_KEY = 'items';

export interface ItemEntity {
  id: string;
  name: string;
  color: string;
  connections: string[];
}

export interface ItemState extends EntityState<ItemEntity> {}

export interface ItemsPartialState {
  readonly [ITEM_FEATURE_KEY]: ItemState;
}
export const selectId = ({ id }: ItemEntity) => id;

export const itemsAdapter: EntityAdapter<ItemEntity> =
  createEntityAdapter<ItemEntity>({
    selectId,
  });

export const initialItemState: ItemState = itemsAdapter.getInitialState({});

const reducer = createReducer(initialItemState);

export function itemsReducer(state: ItemState | undefined, action: Action) {
  return reducer(state, action);
}
