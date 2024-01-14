import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { Unit, units } from '@grid-builder/models';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'grid-builder-gap-form',
  standalone: true,
  imports: [CommonModule, ValueUnitComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './gap-form.component.html',
  styleUrl: './gap-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GapFormComponent {
  fb = inject(FormBuilder);
  options = units;
  defaultUnit = Unit.PX;

  form = this.fb.group({});
}
