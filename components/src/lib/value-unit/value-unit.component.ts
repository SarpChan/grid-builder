import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Unit, units } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-value-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './value-unit.component.html',
  styleUrl: './value-unit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ValueUnitComponent implements OnInit {
  @Input()
  valueLabel = 'Value';

  @Input()
  defaultValue = 1;

  @Input()
  unitLabel = 'Unit';

  @Input()
  defaultUnit?: Unit | string;

  @Input()
  options = units;

  _disabled = false;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.toggleForm(value);
  }

  get disabled() {
    return this._disabled;
  }

  selected?: string;
  form!: FormGroup;

  controlContainer = inject(ControlContainer);
  fb = inject(FormBuilder);

  ngOnInit() {
    this.selected = this.defaultUnit;
    const parent = (this.controlContainer.formDirective as FormGroupDirective)
      .form;

    this.form = this.fb.group({
      value: [this.defaultValue, [Validators.min(0)]],
      unit: [this.defaultUnit, [Validators.required]],
    });

    parent.addControl('horizontal', this.form);
    this.toggleForm(this._disabled);
  }

  select(option: string): void {
    this.selected = option;
    this.form?.get('unit')?.setValue(option);
  }

  toggleForm(toggle: boolean) {
    if (toggle) {
      this.form?.get('value')?.disable();
      this.form?.get('unit')?.disable();
    } else {
      this.form?.get('value')?.enable();
      this.form?.get('unit')?.enable();
    }
  }
}
