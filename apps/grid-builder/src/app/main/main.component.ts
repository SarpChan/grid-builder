import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import {
  GridComponent,
  SonnerComponent,
  TooltipButtonComponent,
} from '@grid-builder/components';
import { Grid } from '@grid-builder/models';
import { AppSettingsFacade, GridsFacade } from '@grid-builder/state';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  radixExclamationTriangle,
  radixCrossCircled,
  radixSun,
  radixMoon,
  radixClipboardCopy,
  radixDownload,
  radixUpload,
  radixPlus,
} from '@ng-icons/radix-icons';
import { Store } from '@ngrx/store';

import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  BrnTabsContentDirective,
  BrnTabsDirective,
  BrnTabsListDirective,
  BrnTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-brain';
import {
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';

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
    CdkDropList,
    CdkDrag,
    CommonModule,
    SonnerComponent,
    HlmButtonDirective,
    TranslateModule,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    TooltipButtonComponent,
    NgIconComponent,
    HlmIconComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [
    provideIcons({
      radixPlus,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  facade = inject(GridsFacade);
  store = inject(Store);
  appSettingsFacade = inject(AppSettingsFacade);

  activeId = this.facade.selectedId$;
  grids: Signal<Grid[]> = this.facade.selectOrderedGrids$;
  order: Signal<string[]> = this.facade.selectOrder$;
  select(id: string) {
    this.facade.select(id);
  }

  addNewGrid() {
    this.facade.add();
  }

  drop(event: CdkDragDrop<string, string>) {
    this.moveElement(event.previousIndex, event.currentIndex);
  }

  moveElement(fromIndex: number, toIndex: number): void {
    const arr = [...(this.order() ?? [])];
    if (
      fromIndex < 0 ||
      fromIndex >= arr.length ||
      toIndex < 0 ||
      toIndex >= arr.length
    ) {
      return;
    }

    const [element] = arr.splice(fromIndex, 1);

    arr.splice(toIndex, 0, element);
    this.facade.updateOrder(arr);
  }
}
