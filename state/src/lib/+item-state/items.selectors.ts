import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITEM_FEATURE_KEY, ItemState, itemsAdapter } from './items.reducer';
import {
  selectSelectedElement,
  selectEntity,
  selectSelectedAreaInstance,
  selectGridsEntities,
} from '../+state/grids.selectors';
import { Area } from '@grid-builder/models';

export const selectItemState =
  createFeatureSelector<ItemState>(ITEM_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = itemsAdapter.getSelectors();

export const selectAllItems = createSelector(
  selectItemState,
  (state: ItemState) => selectAll(state)
);

export const selectAreaEntities = createSelector(
  selectItemState,
  (state: ItemState) => (state ? selectEntities(state) : undefined)
);

export const selectItemIds = createSelector(
  selectItemState,
  (state: ItemState) => (state ? selectIds(state) : undefined)
);

export const selectAreaOptions = createSelector(
  selectAllItems,
  (areas: Area[]) =>
    areas?.map((area) => ({
      id: area.id,
      name: area.name || area.color,
      connections: area.connections,
    }))
);

export const selectSelectedArea = createSelector(
  selectSelectedElement,
  selectAreaEntities,
  (selection, entities) =>
    selection?.id && entities ? entities[selection.id] : undefined
);

export const selectGridsForArea = createSelector(
  selectSelectedArea,
  selectGridsEntities,
  (area, grids) => {
    if (!area || !grids) return [];

    const connections = area.connections;

    return connections.map((connection) => ({
      gridId: connection.gridId,
      name: grids[connection.gridId]?.name,
    }));
  }
);

export const selectAreaInstancesOfSelectedGrid = createSelector(
  selectEntity,
  selectAreaEntities,
  (grid, areas) => {
    return (
      grid?.items?.map((item) => {
        const area = areas && item.areaId ? areas[item.areaId] : undefined;

        return {
          ...item,
          name: area ? area.name : 'Not assigned to Area yet',
          color: area ? area.color : '#FF0000',
        };
      }) ?? []
    );
  }
);

export const selectAreaInstanceOfSelectedGrid = createSelector(
  selectSelectedAreaInstance,
  selectAreaEntities,
  (areaInstance, areas) => {
    if (!areaInstance || !areas) return;

    const area = areaInstance.areaId ? areas[areaInstance.areaId] : undefined;

    return {
      ...areaInstance,
      name: area ? area.name : 'Not assigned to Area yet',
      color: area ? area.color : '#FF0000',
    };
  }
);
