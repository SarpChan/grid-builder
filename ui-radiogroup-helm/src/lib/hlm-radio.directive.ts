import { Directive, Input, computed, signal } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Directive({
	selector: 'brn-radio[hlm],[hlmRadio]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmRadioDirective {
	private readonly _userCls = signal<ClassValue>('');
	@Input()
	set class(userCls: ClassValue) {
		this._userCls.set(userCls);
	}

	protected _computedClass = computed(() => this._generateClass());
	private _generateClass() {
		return hlm('group [&.brn-radio-disabled]:text-muted-foreground flex items-center space-x-2', this._userCls());
	}
}
