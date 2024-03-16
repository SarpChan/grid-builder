import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ItemsActions from './items.actions';
import * as GridsActions from '../+state/grids.actions';
import { Area } from '@grid-builder/models';
import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';
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
  on(ItemsActions.addArea, (state, { item }) =>
    itemsAdapter.addOne(
      {
        ...item,
        id: crypto.randomUUID(),
        name: `Area-${Math.floor(Math.random() * 10000)}`,
      },
      state
    )
  ),
  on(ItemsActions.updateArea, (state, { id, changes }) =>
    itemsAdapter.map((area) => {
      if (area.id !== id) return area;

      return {
        ...area,
        ...changes,
        id: area.id,
      };
    }, state)
  ),
  on(
    GridsActions.connectAreaToInstanceSuccess,
    (state, { areaId, areaInstanceId, gridId }) =>
      itemsAdapter.map((area) => {
        const hasConnectionToAreaInstance = area.connections.find(
          (connection) =>
            connection.gridId === gridId &&
            connection.areaInstanceId === areaInstanceId
        );
        if (hasConnectionToAreaInstance) {
          return {
            ...area,
            connections: area.connections.filter(
              (connection) =>
                connection.gridId !== gridId &&
                connection.areaInstanceId !== areaInstanceId
            ),
          };
        }

        if (area.id !== areaId) return area;

        return {
          ...area,
          connections: [...area.connections, { areaInstanceId, gridId }],
        };
      }, state)
  ),
  on(ItemsActions.removeConnection, (state, { areaId, gridId }) =>
    itemsAdapter.map((area) => {
      if (area.id !== areaId) return area;

      return {
        ...area,
        connections: area.connections.filter(
          (connection) => connection.gridId !== gridId
        ),
      };
    }, state)
  ),
  on(ItemsActions.removeArea, (state, { id }) =>
    itemsAdapter.removeOne(id, state)
  ),
  on(GridsActions.removeGrid, (state, { id }) =>
    itemsAdapter.map(
      (area) => ({
        ...area,
        connections: area.connections.filter(
          (connection) => connection.gridId !== id
        ),
      }),
      state
    )
  ),
  on(GridsActions.removeAreaInstance, (state, { itemId }) =>
    itemsAdapter.map(
      (area) => ({
        ...area,
        connections: area.connections.filter(
          (connection) => connection.areaInstanceId !== itemId
        ),
      }),
      state
    )
  ),
  on(GridsActions.reset, () => initialItemState)
);

export function itemsReducer(state: ItemState | undefined, action: Action) {
  return reducer(state, action);
}
