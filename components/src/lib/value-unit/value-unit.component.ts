import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlContainer,
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Unit, isUnit, units } from '@grid-builder/models';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { ComboboxComponent } from '../combobox/combobox.component';

export type Option = { label: string; value: Unit | undefined };

@Component({
  selector: 'grid-builder-value-unit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmInputDirective,
    ComboboxComponent,
    HlmLabelDirective,
  ],
  templateUrl: './value-unit.component.html',
  styleUrl: './value-unit.component.scss',
})
export class ValueUnitComponent implements OnInit {
  valueLabel = input('Value');
  unitLabel = input('Unit');

  options = input<Unit[] | undefined>([...units]);

  actualOptions = computed<Option[]>(() => {
    const options = this.options();
    if (options) {
      return options.map((unit) => ({ value: unit, label: unit }));
    }

    return [];
  });

  formName = input('value-unit');

  defaultValue = input<number>(1);
  defaultUnit = input<Unit>('px' as Unit);

  id = input<string | undefined>();

  currentValue = signal<number | undefined>(undefined);
  currentOption = signal<Option | undefined>(undefined);

  _disabled = false;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledStatus(value);
  }

  get disabled() {
    return this._disabled;
  }

  selected = computed<Option | undefined>(() =>
    this.defaultUnit()
      ? {
          value: this.defaultUnit(),
          label: this.defaultUnit()?.toString() ?? '',
        }
      : undefined
  );
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    value: [this.defaultValue(), [Validators.min(0)]],
    unit: [this.defaultUnit(), [Validators.required]],
  });

  controlContainer = inject(ControlContainer);

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((changed) => {
      if (changed.unit === undefined || changed.unit === null) {
        this.currentOption.set({
          value: this.defaultUnit(),
          label: this.defaultUnit() ?? '',
        });
        this.form.get('unit')?.setValue(this.defaultUnit());
      }
      this.currentValue.set(changed.value);
      const unit = changed.unit;
      if (isUnit(unit)) {
        this.currentOption.set({ value: unit, label: unit });
      }
    });

    effect(
      () => {
        if (this.form && this.id()) {
          this.currentValue.set(this.form.value.value);
          const unit = this.form.value.unit;
          if (isUnit(unit)) {
            this.currentOption.set({ value: unit, label: unit });
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.currentValue.set(this.form.value.value);
    const unit = this.form.value.unit;
    if (isUnit(unit)) {
      this.currentOption.set({ value: unit, label: unit });
    }

    const parent = (this.controlContainer.formDirective as FormGroupDirective)
      .form;
    parent.addControl(this.formName(), this.form, {
      emitEvent: false,
    });
  }

  select(option: Option): void {
    const unit = option.value;

    if (isUnit(unit)) {
      this.form?.get('unit')?.setValue(unit);
    }
  }

  setDisabledStatus(toggle: boolean, shouldEmit = false) {
    if (toggle) {
      this.form?.get('value')?.disable({ emitEvent: shouldEmit });
      this.form?.get('unit')?.disable({ emitEvent: shouldEmit });
    } else {
      this.form?.get('value')?.enable({ emitEvent: shouldEmit });
      this.form?.get('unit')?.enable({ emitEvent: shouldEmit });
    }
  }
}
