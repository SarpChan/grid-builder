import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Unit } from '@grid-builder/models';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { provideIcons } from '@ng-icons/core';
import {
  radixCaretSort,
  radixCheck,
  radixMagnifyingGlass,
} from '@ng-icons/radix-icons';

@Component({
  selector: 'grid-builder-combobox',
  standalone: true,
  imports: [
    CommonModule,
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    NgForOf,
  ],
  providers: [
    provideIcons({ radixCaretSort, radixMagnifyingGlass, radixCheck }),
  ],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class ComboboxComponent<
  T extends { value: string; label: string; available?: boolean }
> {
  public options = input<T[] | undefined>();

  public currentOption = input<T | undefined>(undefined);
  public state = signal<'closed' | 'open'>('closed');
  public placeholder = input<string>('Unit');
  @Output()
  selectOption = new EventEmitter<T>();

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  select(option: T) {
    this.state.set('closed');
    this.selectOption.emit(option);
  }
}
