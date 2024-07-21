import { Component, computed, inject, Input, signal } from '@angular/core';
import { radixCheck } from '@ng-icons/radix-icons';
import { hlm } from '@spartan-ng/ui-core';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { ClassValue } from 'clsx';
import { BrnCheckboxComponent } from './brn-checkbox.component';

@Component({
  selector: 'hlm-checkbox-checkicon',
  standalone: true,
  imports: [HlmIconComponent],
  providers: [provideIcons({ radixCheck })],
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    <hlm-icon
      class="bg-accent dark:bg-blue-300 dark:text-slate-900"
      size="sm"
      name="radixCheck"
    />
  `,
})
export class HlmCheckboxCheckIconComponent {
  private _brnCheckbox = inject(BrnCheckboxComponent);
  protected _checked = this._brnCheckbox?.isChecked;
  private readonly _userCls = signal<ClassValue>('');
  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }

  protected _computedClass = computed(() => this._generateClass());
  private _generateClass() {
    return hlm(
      'h-4 w-4 leading-none group-data-[state=unchecked]:opacity-0',
      this._checked() === 'indeterminate' ? 'opacity-50' : '',
      this._userCls()
    );
  }
}
