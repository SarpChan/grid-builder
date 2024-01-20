import { NgFor } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { GridComponent } from '@grid-builder/components';
import { Grid } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { Store } from '@ngrx/store';

import {
  BrnTabsDirective,
  BrnTabsContentDirective,
  BrnTabsListDirective,
  BrnTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-brain';
import {
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';

@Component({
  selector: 'grid-builder-main',
  standalone: true,
  imports: [
    GridComponent,
    NgFor,
    BrnTabsDirective,
    BrnTabsContentDirective,
    BrnTabsListDirective,
    BrnTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  facade = inject(GridsFacade);
  store = inject(Store);

  activeId = this.facade.selectedId$;
  grids: Signal<Grid[]> = this.facade.allGrids$;

  select(id: string) {
    this.facade.select(id);
  }

  addNewGrid() {
    this.facade.add();
  }
}
