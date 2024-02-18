import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  InputSignal,
  OnInit,
  inject,
  input,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Unit, units } from '@grid-builder/models';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

import {
  HlmCheckboxCheckIconComponent,
  HlmCheckboxComponent,
} from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'grid-builder-toggle-value-unit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValueUnitComponent,
    HlmCheckboxComponent,
    HlmCheckboxCheckIconComponent,
    HlmLabelDirective,
  ],
  templateUrl: './toggle-value-unit.component.html',
  styleUrl: './toggle-value-unit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToggleValueUnitComponent implements OnInit {
  checkboxLabel = input('Enable');

  valueLabel = input('Value');
  defaultValue = input(1);

  unitLabel = input('Unit');
  defaultUnit = input.required<Unit>();
  options: InputSignal<Unit[]> = input([...units] as Unit[]);

  disabled = input(false);

  controlName = input('use');
  toggleName = input('toggle');

  active = false;
  form!: FormGroup;

  controlContainer = inject(ControlContainer);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = (
      this.controlContainer.formDirective as FormGroupDirective
    ).form;

    this.form.addControl(this.toggleName(), this.fb.control(this.active));
  }

  get toggleControl() {
    return this.form.get(this.toggleName());
  }

  toggleActive(): void {
    const newValue = !this.toggleControl?.value;

    this.toggleControl?.setValue(newValue);
  }
}
