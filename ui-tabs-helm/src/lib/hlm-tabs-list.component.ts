import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { radixChevronDown } from '@ng-icons/radix-icons';
import { hlm } from '@spartan-ng/ui-core';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { BrnTabsListDirective } from '@spartan-ng/ui-tabs-brain';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

export const listVariants = cva(
  'inline-flex dark:bg-neutral-900 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      orientation: {
        horizontal: 'flex w-full justify-between h-10 space-x-1',
        vertical: 'mt-2 flex-col h-fit space-y-1',
        preview:
          'bg-blue-50 dark:bg-neutral-900 shadow-sm shadow-gray-400 rounded-t-none flex justify-between w-full pr-3',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);
type ListVariants = VariantProps<typeof listVariants>;

@Component({
  selector: 'hlm-tabs-list',
  standalone: true,
  imports: [CommonModule, HlmIconComponent],
  providers: [provideIcons({ radixChevronDown })],
  hostDirectives: [BrnTabsListDirective],
  template: `
    <div [ngClass]="_computedClass()" (click)="togglePreviewTabList(false)">
      <ng-content />
    </div>
    @if (_orientation() === 'preview') {
    <button
      class="block bg-blue-50 dark:bg-neutral-900 dark:hover:bg-neutral-700 hover:bg-blue-100 shadow-sm shadow-gray-400 rounded-b-md ml-6 z-[90] w-min cursor-pointer"
      (click)="togglePreviewTabList(!_state())"
    >
      <span
        class="w-full h-full grid place-items-center text-nowrap p-2 select-none cursor-pointer"
      >
        <hlm-icon
          [ngClass]="{ 'rotate-180': _state() }"
          class="transition-transform"
          name="radixChevronDown"
        />
      </span>
    </button>
    }
  `,
  host: {
    '[class]':
      "_orientation() === 'preview' ? 'w-full block px-8 transition-[top] absolute z-[80] ' +  _computedHostClass() : 'w-full block'",
  },
})
export class HlmTabsListComponent {
  private readonly _userCls = signal<ClassValue>('');
  private readonly _userNGCls = signal<ClassValue>('');
  private readonly _hostCls = signal<ClassValue>('');
  readonly _state = signal<boolean>(false);

  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }

  @Input()
  set ngClass(userNGCls: ClassValue) {
    this._userNGCls.set(userNGCls);
  }

  @Input()
  set hostClass(hostCls: ClassValue) {
    this._hostCls.set(hostCls);
  }
  readonly _orientation = signal<ListVariants['orientation']>('horizontal');

  @Input()
  set orientation(value: ListVariants['orientation']) {
    this._orientation.set(value);
    this._state.set(false);
  }

  protected _computedClass = computed(() => this._generateClass());
  protected _computedHostClass = computed(() => this._generateHostClass());

  private _generateClass() {
    return hlm(
      listVariants({ orientation: this._orientation() }),
      this._userCls(),
      this._userNGCls()
    );
  }

  private _generateHostClass() {
    return hlm(this._hostCls, this._state() ? 'top-[0rem]' : '-top-[3rem]');
  }

  togglePreviewTabList(state: boolean) {
    this._state.set(state);
  }
}
