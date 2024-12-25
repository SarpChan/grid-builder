import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  GridComponent,
  SonnerComponent,
  TooltipButtonComponent,
} from '@grid-builder/components';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixPlus } from '@ng-icons/radix-icons';
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

export enum HowToTopics {
  TLDR = 'TLDR',
  INTERFACE = 'Interface',
  INTERACTABLES = 'Interactables',

  SELECTION = 'Selection',
  MEDIA_QUERIES = 'Mediaqueries',
  GRID = 'Grid',
  ALIGNMENT = 'Alignment',
  GAPS = 'Gaps',
  GLOBALS = 'Globals',
  ELEMENTS = 'Elements',
  AREAS = 'Areas',
}

@Component({
  selector: 'grid-builder-how-to',
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
  templateUrl: './how-to.component.html',
  styleUrl: './how-to.component.scss',
  providers: [
    provideIcons({
      radixPlus,
    }),
  ],
})
export class HowToComponent {
  activeId = signal(HowToTopics.INTERFACE);
  topics = HowToTopics;
}
