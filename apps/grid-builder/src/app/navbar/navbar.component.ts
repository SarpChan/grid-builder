import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridsFacade } from '@grid-builder/state';
import { HighlightModule } from 'ngx-highlightjs';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';

import {
  BrnMenuItemDirective,
  BrnMenuTriggerDirective,
} from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { presetOptions } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HighlightModule,
    HlmButtonDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetFooterComponent,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    BrnMenuTriggerDirective,
    BrnMenuItemDirective,
    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuGroupComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {
  facade = inject(GridsFacade);
  generated = this.facade.selectGenerated$;
  presets = presetOptions;

  generate() {
    this.facade.generate();
  }

  clickedClose() {
    this.facade.clearGenerated();
  }

  select(id: string) {
    this.facade.selectPreset(id);
  }
}
