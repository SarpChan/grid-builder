import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppSettingsFacade, GridsFacade } from '@grid-builder/state';
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
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  radixClipboardCopy,
  radixCrossCircled,
  radixDownload,
  radixExclamationTriangle,
  radixMoon,
  radixSun,
  radixUpload,
} from '@ng-icons/radix-icons';

import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
} from '@spartan-ng/ui-popover-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';

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
    NgIconComponent,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideIcons({
      radixExclamationTriangle,
      radixCrossCircled,
      radixSun,
      radixMoon,
      radixClipboardCopy,
      radixDownload,
      radixUpload,
    }),
  ],
})
export class NavbarComponent {
  gridsFacade = inject(GridsFacade);
  appSettingsFacade = inject(AppSettingsFacade);
  presets = presetOptions;

  generate() {
    this.gridsFacade.generate();
  }

  clickedClose() {
    this.gridsFacade.clearGenerated();
  }

  select(id: string) {
    this.gridsFacade.selectPreset(id);
  }

  async copy(toCopy: 'html' | 'css') {
    const generated = this.gridsFacade.selectGenerated$();
    const { css, html } = generated || { css: undefined, html: undefined };
    const text = toCopy === 'html' ? html : css;

    if (text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        console.error('Failed to copy');
      }
    }
  }

  save() {
    this.gridsFacade.saveFile();
  }

  onFileSelected(event: Event) {
    const target = event?.target as HTMLInputElement;
    const files = target?.files as FileList;
    if (files?.length === 1) {
      const file: File = files[0];
      if (file && file.type === 'application/json') {
        this.gridsFacade.loadFile(file);
      }
    }
  }
}
