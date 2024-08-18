import {
  computed,
  Directive,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { BrnAccordionDirective } from '@spartan-ng/ui-accordion-brain';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmAccordion]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [BrnAccordionDirective],
})
export class HlmAccordionDirective {
  private readonly _brn = inject(BrnAccordionDirective);

  private readonly _userCls = signal<ClassValue>('');
  private readonly _canBeOpened = signal<boolean>(true);

  protected readonly _computedClass = computed(() =>
    hlm(
      'flex',
      this._brn.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      this._userCls()
    )
  );

  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }

  @Input()
  set canBeOpened(open: boolean) {
    this._canBeOpened.set(open);
  }

  constructor() {
    effect(
      () => {
        const open = this._brn.openItemIds();
        if (open.length && !this._canBeOpened()) {
          open.forEach((id) => this._brn.toggleItem(id));
        }
      },
      { allowSignalWrites: true }
    );
  }
}
