import { CommonModule, NgForOf } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  radixCaretSort,
  radixCheck,
  radixMagnifyingGlass,
} from '@ng-icons/radix-icons';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';

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
    TranslateModule,
  ],
  providers: [
    provideIcons({ radixCaretSort, radixMagnifyingGlass, radixCheck }),
  ],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class ComboboxComponent<
  T extends {
    value: string | undefined;
    label: string;
    available?: boolean | undefined;
  }
> {
  public options = input<T[] | undefined>();

  public currentOption = input<T | undefined>(undefined);
  public state = signal<'closed' | 'open'>('closed');
  public placeholder = input<string>('forms.unit');
  public label = input<string>('forms.unit');
  public hideLabel = input<boolean>(false);
  public hideBackground = input<boolean>(false);

  selectOption = output<T>();

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  select(option: T) {
    this.state.set('closed');
    this.selectOption.emit(option);
  }
}
