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
} from '@angular/forms';
import { Unit, units } from '@grid-builder/models';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

@Component({
  selector: 'grid-builder-toggle-value-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValueUnitComponent],
  templateUrl: './toggle-value-unit.component.html',
  styleUrl: './toggle-value-unit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToggleValueUnitComponent implements OnInit {
  @Input()
  checkboxLabel = 'Enable';

  @Input()
  valueLabel = 'Value';

  @Input()
  defaultValue = 1;

  active = false;

  @Input()
  unitLabel = 'Unit';

  @Input()
  defaultUnit?: Unit | string;

  @Input()
  options = units;

  @Input()
  disabled = false;

  form!: FormGroup;

  controlContainer = inject(ControlContainer);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = (
      this.controlContainer.formDirective as FormGroupDirective
    ).form;

    this.form.addControl('useHorizontal', this.fb.control(this.active));
  }

  toggleActive(): void {
    this.active = !this.active;
    this.form.get('useHorizontal')?.setValue(this.active);
  }
}
