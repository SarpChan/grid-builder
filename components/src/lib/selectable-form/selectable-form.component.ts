import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Selectable, SelectionElement, units } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { AreaFormComponent } from '../area-form/area-form.component';
import { AreaInstanceFormComponent } from '../area-instance-form/area-instance-form.component';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { RowFormComponent } from '../row-form/row-form.component';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

@Component({
  selector: 'grid-builder-selectable-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValueUnitComponent,
    ColumnFormComponent,
    RowFormComponent,
    AreaInstanceFormComponent,
    AreaFormComponent,
  ],
  templateUrl: './selectable-form.component.html',
  styleUrl: './selectable-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableFormComponent {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);
  options = units;
  defaultUnit = 'px';

  selected: Signal<SelectionElement | undefined> = this.facade.selectedElement$;
  selectable = Selectable;

  form = this.fb.group({});
}
