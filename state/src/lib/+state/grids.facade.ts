import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Grid } from '@grid-builder/models';
import { Limiter } from 'models/src/lib/limiter';
import * as GridsActions from './grids.actions';
import * as GridsSelectors from './grids.selectors';
@Injectable()
export class GridsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.selectSignal(GridsSelectors.selectGridsLoaded);
  allGrids$ = this.store.selectSignal(GridsSelectors.selectAllGrids);
  selectedId$ = this.store.selectSignal(GridsSelectors.selectSelectedId);
  selectedGrid$ = this.store.selectSignal(GridsSelectors.selectEntity);
  styling$ = this.store.selectSignal(GridsSelectors.selectGridStyling);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(GridsActions.initGrids());
  }

  add() {
    this.store.dispatch(
      GridsActions.addGrid({
        grid: { ...grid },
      })
    );
  }

  update(grid: Grid, changes: Partial<Grid>) {
    this.store.dispatch(
      GridsActions.updateGrid({ grid: { ...grid, changes } })
    );
  }

  select(id: string) {
    this.store.dispatch(GridsActions.selectGrid({ id }));
  }
}

const grid = {
  name: 'Neu',
  rows: [
    {
      id: crypto.randomUUID(),
      height: { value: 1, unit: 'fr' },
    },
    {
      id: crypto.randomUUID(),
      height: { value: 1, unit: 'fr' },
    },
    {
      id: crypto.randomUUID(),
      height: { value: 1, unit: 'fr' },
    },
    {
      id: crypto.randomUUID(),
      height: { value: 1, unit: 'fr' },
    },
    {
      id: crypto.randomUUID(),
      height: { value: 1, unit: 'fr' },
    },
  ],
  columns: [
    {
      id: crypto.randomUUID(),
      width: { value: 1, unit: 'fr' },
    },
    {
      id: crypto.randomUUID(),
      width: { value: 1, unit: 'fr' },
    },
    {
      id: crypto.randomUUID(),
      width: { value: 1, unit: 'fr' },
    },
  ],
  vGap: { value: 1, unit: 'rem' },
  hGap: { value: 1, unit: 'rem' },
  viewport: {
    limiter: 'none' as Limiter,
    from: undefined,
    to: undefined,
  },
  shouldUseWidth: true,
  width: { value: 100, unit: 'vw' },
  shouldUseHeight: true,
  height: { value: 100, unit: 'vh' },
};
