import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TooltipButtonComponent } from '@grid-builder/components';
import { ItemsFacade } from '@grid-builder/state';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixPlus } from '@ng-icons/radix-icons';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'grid-builder-itemsbar',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    HlmButtonDirective,
    TranslateModule,
    TooltipButtonComponent,
    NgIconComponent,
    HlmIconComponent,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
  ],
  templateUrl: './itemsbar.component.html',
  styleUrl: './itemsbar.component.scss',
  providers: [
    provideIcons({
      radixPlus,
    }),
  ],
})
export class ItemsbarComponent {
  facade = inject(ItemsFacade);
  items = this.facade.allItems$;

  addItem() {
    this.facade.add();
  }

  select(id: string) {
    this.facade.select(id);
  }
}
