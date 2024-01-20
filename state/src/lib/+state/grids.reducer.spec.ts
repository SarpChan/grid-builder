import { Action } from '@ngrx/store';

import * as GridsActions from './grids.actions';
import { GridsEntity } from './grids.models';
import { GridsState, initialGridsState, gridsReducer } from './grids.reducer';

describe('Grids Reducer', () => {
  const createGridsEntity = (id: string, name = ''): GridsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Grids actions', () => {
    it('loadGridsSuccess should return the list of known Grids', () => {
      const grids = [
        createGridsEntity('PRODUCT-AAA'),
        createGridsEntity('PRODUCT-zzz'),
      ];
      const action = GridsActions.loadGridsSuccess({ grids });

      const result: GridsState = gridsReducer(initialGridsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = gridsReducer(initialGridsState, action);

      expect(result).toBe(initialGridsState);
    });
  });
});
