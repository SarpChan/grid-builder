import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  AddAreaInstance,
  AddGrid,
  AreaInstance,
  Column,
  Grid,
  ReferenceContainer,
  Row,
  SelectionElement,
  Viewport,
  presets,
} from '@grid-builder/models';
import * as ItemsSelectors from '../+item-state/items.selectors';
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
  selectedId$ = this.store.selectSignal(GridsSelectors.selectSelectedId, {
    equal: (a, b) => {
      return a === b;
    },
  });
  selectedGrid$ = this.store.selectSignal(GridsSelectors.selectEntity);
  selectedGridAreaInstances$ = this.store.selectSignal(
    ItemsSelectors.selectAreaInstancesOfSelectedGrid
  );
  styling$ = this.store.selectSignal(GridsSelectors.selectGridStyling);
  selectedElement$ = this.store.selectSignal(
    GridsSelectors.selectSelectedElement
  );
  selectedColumn$ = this.store.selectSignal(
    GridsSelectors.selectSelectedColumn
  );
  selectedRow$ = this.store.selectSignal(GridsSelectors.selectSelectedRow);
  selectedItem$ = this.store.selectSignal(
    ItemsSelectors.selectAreaInstanceOfSelectedGrid
  );
  selectViewport$ = this.store.selectSignal(GridsSelectors.selectViewport);
  selectGenerated$ = this.store.selectSignal(
    GridsSelectors.selectGeneratedCode
  );
  selectWarnings$ = this.store.selectSignal(ItemsSelectors.selectWarnings);
  selectErrors$ = this.store.selectSignal(ItemsSelectors.selectErrors);
  selectGlobals$ = this.store.selectSignal(GridsSelectors.selectGlobals);
  selectOrder$ = this.store.selectSignal(GridsSelectors.selectOrder);
  selectOrderedGrids$ = this.store.selectSignal(
    GridsSelectors.selectOrderedGrids
  );

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

  update(id: string, changes: Partial<Grid>) {
    this.store.dispatch(GridsActions.updateGrid({ id, changes }));
  }

  updateRow(id: string, rowId: string, changes: Partial<Row>) {
    this.store.dispatch(GridsActions.updateRow({ id, rowId, changes }));
  }

  updateColumn(id: string, colId: string, changes: Partial<Column>) {
    this.store.dispatch(GridsActions.updateColumn({ id, colId, changes }));
  }

  updateItem(id: string, itemId: string, changes: Partial<AreaInstance>) {
    this.store.dispatch(
      GridsActions.updateAreaInstance({ id, itemId, changes })
    );
  }

  updateViewport(id: string, changes: Partial<Viewport>) {
    this.store.dispatch(GridsActions.updateViewport({ id, changes }));
  }

  updateReferenceContainer(referenceContainer: ReferenceContainer) {
    this.store.dispatch(
      GridsActions.updateReferenceContainer({ referenceContainer })
    );
  }

  updateUseTailwind(selection: boolean) {
    this.store.dispatch(GridsActions.updateUseTailwind({ selection }));
  }

  updateUseClassName(selection: boolean) {
    this.store.dispatch(GridsActions.updateUseClassName({ selection }));
  }

  select(id: string) {
    this.store.dispatch(GridsActions.selectGrid({ id }));
  }

  selectElement(selection: SelectionElement) {
    this.store.dispatch(GridsActions.selectElement({ selection }));
  }

  addColumn(id: string) {
    this.store.dispatch(GridsActions.addColumn({ id }));
  }

  addRow(id: string) {
    this.store.dispatch(GridsActions.addRow({ id }));
  }

  addItem(id: string, item: AddAreaInstance) {
    this.store.dispatch(GridsActions.addAreaInstance({ id, item }));
  }

  removeColumn(gridId: string, columnId: string) {
    this.store.dispatch(GridsActions.removeColumn({ gridId, columnId }));
  }

  removeRow(gridId: string, rowId: string) {
    this.store.dispatch(GridsActions.removeRow({ gridId, rowId }));
  }

  removeGrid(id: string) {
    this.store.dispatch(GridsActions.removeGrid({ id }));
  }

  removeItem(gridId: string, itemId: string) {
    this.store.dispatch(GridsActions.removeAreaInstance({ gridId, itemId }));
  }

  connectAreaToInstance(
    areaId: string,
    areaInstanceId: string,
    gridId: string
  ) {
    this.store.dispatch(
      GridsActions.connectAreaToInstance({ areaId, areaInstanceId, gridId })
    );
  }

  reset() {
    this.store.dispatch(GridsActions.reset());
  }

  generate() {
    this.store.dispatch(GridsActions.generate());
  }

  clearGenerated() {
    this.store.dispatch(GridsActions.clearGenerated());
  }

  selectPreset(id: string) {
    const preset = presets.find((p) => p.id === id);
    if (preset) {
      this.store.dispatch(GridsActions.setPreset({ preset }));
    }
  }

  saveFile() {
    this.store.dispatch(GridsActions.saveFile());
  }

  loadFile(file: File) {
    this.store.dispatch(GridsActions.loadFile({ file }));
  }

  updateOrder(order: string[]) {
    this.store.dispatch(GridsActions.updateOrder({ order }));
  }
}

const grid: AddGrid = {
  name: 'Neu',
  items: [],
  autoFlow: 'row',
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
    mediaType: 'both',
    limiter: 'none',
    from: { value: 100, unit: 'px' },
    to: { value: 100, unit: 'px' },
  },
  shouldUseWidth: true,
  width: { value: 100, unit: '%' },
  shouldUseHeight: true,
  height: { value: 100, unit: '%' },
  alignItems: 'start',
  justifyItems: 'start',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
};
