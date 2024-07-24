import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Unit } from '@grid-builder/models';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

@Component({
  selector: 'grid-builder-gap-form',
  standalone: true,
  imports: [CommonModule, ValueUnitComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './gap-form.component.html',
  styleUrl: './gap-form.component.scss',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class GapFormComponent {
  fb = inject(FormBuilder);
  parentForm = inject(FormGroupDirective);
  defaultUnit: Unit = 'px';
}
