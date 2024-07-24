import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { GridComponent, SonnerComponent } from '@grid-builder/components';
import { Grid } from '@grid-builder/models';
import { AppSettingsFacade, GridsFacade } from '@grid-builder/state';
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
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

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
    CommonModule,
    SonnerComponent,
    HlmButtonDirective,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  facade = inject(GridsFacade);
  store = inject(Store);
  appSettingsFacade = inject(AppSettingsFacade);

  activeId = this.facade.selectedId$;
  grids: Signal<Grid[]> = this.facade.allGrids$;

  select(id: string) {
    this.facade.select(id);
  }

  addNewGrid() {
    this.facade.add();
  }
}
