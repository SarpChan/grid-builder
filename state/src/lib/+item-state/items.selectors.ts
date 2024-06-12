import { Area } from '@grid-builder/models';
import { validate } from '@grid-builder/utils';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorCode, getErrorMessage } from 'models/src/lib/errors';
import { WarningCode, getWarningMessage } from 'models/src/lib/warnings';
import {
  selectAllGrids,
  selectEntity,
  selectGridsEntities,
  selectSelectedAreaInstance,
  selectSelectedElement,
} from '../+state/grids.selectors';
import { ITEM_FEATURE_KEY, ItemState, itemsAdapter } from './items.reducer';

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

export const selectValidation = createSelector(
  selectAllGrids,
  selectAllItems,
  (grids, areas) => validate(grids, areas)
);
export const selectWarnings = createSelector(selectValidation, (result) =>
  Array.from(result?.warnings ?? [])
    .map((e) =>
      (Object.values(WarningCode) as unknown[]).includes(e.code)
        ? getWarningMessage(e.code as WarningCode)
        : undefined
    )
    .filter(Boolean)
);

export const selectErrors = createSelector(selectValidation, (result) =>
  Array.from(result?.errors ?? [])
    .map((e) =>
      (Object.values(ErrorCode) as unknown[]).includes(e.code)
        ? getErrorMessage(e.code as ErrorCode)
        : undefined
    )
    .filter(Boolean)
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
          color: area ? area.color : '#016bc4',
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
