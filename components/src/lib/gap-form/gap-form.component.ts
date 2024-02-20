import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import {
  ControlContainer,
  FormBuilder,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Unit } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-gap-form',
  standalone: true,
  imports: [CommonModule, ValueUnitComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './gap-form.component.html',
  styleUrl: './gap-form.component.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GapFormComponent {
  fb = inject(FormBuilder);
  parentForm = inject(FormGroupDirective);
  defaultUnit: Unit = 'px';
}
