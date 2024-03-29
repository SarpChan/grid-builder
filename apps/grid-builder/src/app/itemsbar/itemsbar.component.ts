import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsFacade } from '@grid-builder/state';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'grid-builder-itemsbar',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
  ],
  templateUrl: './itemsbar.component.html',
  styleUrl: './itemsbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ItemsbarComponent {
  facade = inject(ItemsFacade);
  items = this.facade.allItems$;

  addItem() {
    this.facade.add();
  }

  select(id: string) {
    this.facade.select(id);
  }
}
