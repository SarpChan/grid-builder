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
  selectGridsForArea$ = this.store.selectSignal(
    ItemsSelectors.selectGridsForArea
  );
  selectAreaOptions$ = this.store.selectSignal(
    ItemsSelectors.selectAreaOptions
  );

  add() {
    this.store.dispatch(
      ItemsActions.addArea({
        item: { ...item, color: getRandomColor() },
      })
    );
  }

  connectNewAreaToInstance(areaInstanceId: string, gridId: string) {
    this.store.dispatch(
      GridsActions.connectNewAreaToInstance({
        item: { ...item, color: getRandomColor() },
        areaInstanceId,
        gridId,
      })
    );
  }

  updateArea(id: string | undefined, changes: Partial<Area>) {
    if (!id || !changes) return;

    this.store.dispatch(ItemsActions.updateArea({ id, changes }));
  }

  remove(id: string | undefined) {
    if (!id) return;

    this.store.dispatch(ItemsActions.removeArea({ id }));
  }

  removeConnection(areaId: string, gridId: string) {
    this.store.dispatch(ItemsActions.removeConnection({ areaId, gridId }));
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
