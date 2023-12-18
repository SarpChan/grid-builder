import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
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
  @Input()
  grid?: Grid;

  selectColumn(index: number) {
    console.log('selected:', index);
  }
}
