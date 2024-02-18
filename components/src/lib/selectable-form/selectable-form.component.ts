import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { Selectable, SelectionElement, units } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { RowFormComponent } from '../row-form/row-form.component';
import { ElementFormComponent } from '../element-form/element-form.component';

@Component({
  selector: 'grid-builder-selectable-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValueUnitComponent,
    ColumnFormComponent,
    RowFormComponent,
    ElementFormComponent,
  ],
  templateUrl: './selectable-form.component.html',
  styleUrl: './selectable-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
