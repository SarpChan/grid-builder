import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { Selectable, Unit, units } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-selectable-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValueUnitComponent],
  templateUrl: './selectable-form.component.html',
  styleUrl: './selectable-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableFormComponent {
  fb = inject(FormBuilder);

  options = units;
  defaultUnit = Unit.PX;

  selected = Selectable.COLUMN;
  selectable = Selectable;

  form = this.fb.group({});

  delete(id: string) {
    console.log('deleting type', this.selected, 'with id', id);
  }
}
