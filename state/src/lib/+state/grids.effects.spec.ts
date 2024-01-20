import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GridsActions from './grids.actions';
import { GridsEffects } from './grids.effects';

describe('GridsEffects', () => {
  let actions: Observable<Action>;
  let effects: GridsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GridsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GridsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GridsActions.initGrids() });

      const expected = hot('-a-|', {
        a: GridsActions.loadGridsSuccess({ grids: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
