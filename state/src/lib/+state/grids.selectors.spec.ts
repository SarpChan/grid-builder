import { GridsEntity } from './grids.models';
import {
  gridsAdapter,
  GridsPartialState,
  initialGridsState,
} from './grids.reducer';
import * as GridsSelectors from './grids.selectors';

describe('Grids Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGridsId = (it: GridsEntity) => it.id;
  const createGridsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GridsEntity);

  let state: GridsPartialState;

  beforeEach(() => {
    state = {
      grids: gridsAdapter.setAll(
        [
          createGridsEntity('PRODUCT-AAA'),
          createGridsEntity('PRODUCT-BBB'),
          createGridsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialGridsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Grids Selectors', () => {
    it('selectAllGrids() should return the list of Grids', () => {
      const results = GridsSelectors.selectAllGrids(state);
      const selId = getGridsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = GridsSelectors.selectEntity(state) as GridsEntity;
      const selId = getGridsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectGridsLoaded() should return the current "loaded" status', () => {
      const result = GridsSelectors.selectGridsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectGridsError() should return the current "error" state', () => {
      const result = GridsSelectors.selectGridsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
