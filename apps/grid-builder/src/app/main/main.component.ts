import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { GridComponent } from '@grid-builder/components';
import { Element, Grid, Unit } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-main',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent {
  activeId = signal('test');

  grids: WritableSignal<Grid[]> = signal([
    {
      id: 'test',
      name: 'First',
      cols: [
        {
          value: 40,
          unit: Unit.PX,
        },
        {
          value: 40,
          unit: Unit.PX,
        },
        {
          value: 40,
          unit: Unit.PX,
        },
        {
          value: 40,
          unit: Unit.PX,
        },
      ],
      rows: [
        {
          value: 40,
          unit: Unit.PX,
        },
        {
          value: 40,
          unit: Unit.PX,
        },
        {
          value: 40,
          unit: Unit.PX,
        },
        {
          value: 40,
          unit: Unit.PX,
        },
      ],
    },
    {
      id: 'test2',
      name: 'Second',
    },
  ] as Grid[]);

  changeTab(e: unknown) {
    console.log(e);
  }

  addNewGrid() {
    console.log('adding new grid');
  }
}
