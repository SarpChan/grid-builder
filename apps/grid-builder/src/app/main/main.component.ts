import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import { Grid } from '@grid-builder/models';
@Component({
  selector: 'grid-builder-main',
  standalone: true,
  imports: [],
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
    },
    {
      id: 'test2',
      name: 'Second',
    },
  ] as Grid[]);

  changeTab(e: unknown) {
    console.log(e);
  }
}
