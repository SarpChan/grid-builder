import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ItemsSelectors from './items.selectors';
import * as ItemsActions from './items.actions';
import * as GridsActions from '../+state/grids.actions';
import { Area, Selectable } from '@grid-builder/models';
import { getRandomColor } from '@grid-builder/utils';

@Injectable()
export class ItemsFacade {
  private readonly store = inject(Store);

  allItems$ = this.store.selectSignal(ItemsSelectors.selectAllItems);
  selected$ = this.store.selectSignal(ItemsSelectors.selectSelectedArea);

  add() {
    this.store.dispatch(
      ItemsActions.addArea({
        item: { ...item, color: getRandomColor() },
      })
    );
  }

  remove(id: string | undefined) {
    if (!id) return;

    this.store.dispatch(ItemsActions.removeArea({ id }));
  }

  select(id: string) {
    this.store.dispatch(
      GridsActions.selectElement({
        selection: { id, selectedType: Selectable.AREA },
      })
    );
  }
}

const item: Omit<Area, 'id' | 'color'> = {
  name: '',
  connections: [],
};
