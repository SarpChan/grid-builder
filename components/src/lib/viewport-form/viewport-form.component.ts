import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit, units } from '@grid-builder/models';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

@Component({
  selector: 'grid-builder-viewport-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValueUnitComponent],
  templateUrl: './viewport-form.component.html',
  styleUrl: './viewport-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewportFormComponent {
  fb = inject(FormBuilder);
  options = units;
  defaultUnit = Unit.PX;
  mediaDimension = MediaDimension;
  selected = MediaDimension.NONE;
  form = this.fb.group({
    mediaDimension: [this.selected, [Validators.required]],
  });

  select(dimension: MediaDimension) {
    this.form.get('mediaDimension')?.setValue(dimension);
    this.selected = dimension;
  }
}

enum MediaDimension {
  NONE = 'NONE',
  FROM = 'FROM',
  TO = 'TO',
  FROM_TO = 'FROM_TO',
}
