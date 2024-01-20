import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as GridsActions from './grids.actions';
import { GridsEffects } from './grids.effects';
import { GridsFacade } from './grids.facade';
import { GridsEntity } from './grids.models';
import {
  GRIDS_FEATURE_KEY,
  GridsState,
  initialGridsState,
  gridsReducer,
} from './grids.reducer';
import * as GridsSelectors from './grids.selectors';

interface TestSchema {
  grids: GridsState;
}

describe('GridsFacade', () => {
  let facade: GridsFacade;
  let store: Store<TestSchema>;
  const createGridsEntity = (id: string, name = ''): GridsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GRIDS_FEATURE_KEY, gridsReducer),
          EffectsModule.forFeature([GridsEffects]),
        ],
        providers: [GridsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GridsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGrids$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGrids$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGridsSuccess` to manually update list
     */
    it('allGrids$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGrids$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GridsActions.loadGridsSuccess({
          grids: [createGridsEntity('AAA'), createGridsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allGrids$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
