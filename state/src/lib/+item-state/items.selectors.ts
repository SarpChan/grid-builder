import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITEM_FEATURE_KEY, ItemState, itemsAdapter } from './items.reducer';
import { selectSelectedElement } from '../+state/grids.selectors';

export const selectItemState =
  createFeatureSelector<ItemState>(ITEM_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = itemsAdapter.getSelectors();

export const selectAllItems = createSelector(
  selectItemState,
  (state: ItemState) => selectAll(state)
);

export const selectItemEntities = createSelector(
  selectItemState,
  (state: ItemState) => (state ? selectEntities(state) : undefined)
);

export const selectItemIds = createSelector(
  selectItemState,
  (state: ItemState) => (state ? selectIds(state) : undefined)
);

export const selectSelectedArea = createSelector(
  selectSelectedElement,
  selectItemEntities,
  (selection, entities) =>
    selection?.id && entities ? entities[selection.id] : undefined
);
