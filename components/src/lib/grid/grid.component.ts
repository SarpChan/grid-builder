import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grid } from '@grid-builder/models';
import { ElementComponent } from '../element/element.component';
@Component({
  selector: 'grid-builder-grid',
  standalone: true,
  imports: [CommonModule, ElementComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridComponent {
  grid = input.required<Grid>();
  gridStyle = computed(() => {
    const rowText = this.grid()
      .rows.map((row) => row.height.value + row.height.unit)
      .join(' ');
    const columnText = this.grid()
      .columns.map((column) => column.width.value + column.width.unit)
      .join(' ');

    return {
      row: rowText,
      column: columnText,
    };
  });
  selectColumn(index: number) {}
}
