import {
  booleanAttribute,
  computed,
  Directive,
  Input,
  signal,
} from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { BrnMenuItemCheckboxDirective } from '@spartan-ng/ui-menu-brain';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmMenuItemCheckbox]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [
    {
      directive: BrnMenuItemCheckboxDirective,
      inputs: ['disabled: disabled', 'checked: checked'],
      outputs: ['triggered: triggered'],
    },
  ],
})
export class HlmMenuItemCheckboxDirective {
  private readonly _inset = signal<ClassValue>(false);

  private readonly _userCls = signal<ClassValue>('');
  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }
  @Input({ transform: booleanAttribute })
  set inset(value: boolean) {
    this._inset.set(value);
  }

  protected _computedClass = computed(() => this._generateClass());
  private _generateClass() {
    return hlm(
      'group w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-white focus-visible:bg-accent focus-visible:text-white disabled:pointer-events-none disabled:opacity-50',
      this._inset() && 'pl-10',
      this._userCls()
    );
  }
}
