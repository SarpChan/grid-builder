import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unit, units } from '@grid-builder/models';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleValueUnitComponent } from '../toggle-value-unit/toggle-value-unit.component';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

@Component({
  selector: 'grid-builder-grid-form',
  standalone: true,
  imports: [
    CommonModule,
    ValueUnitComponent,
    ToggleValueUnitComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridFormComponent {
  fb = inject(FormBuilder);
  options = units;
  defaultUnit = Unit.PX;
  form = this.fb.group({});
}
