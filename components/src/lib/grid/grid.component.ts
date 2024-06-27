import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Grid, Selectable, SelectionElement } from '@grid-builder/models';
import { AppSettingsFacade, GridsFacade } from '@grid-builder/state';
import { clamp } from '@grid-builder/utils';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { AreaInstanceComponent } from '../area-instance/area-instance.component';

@Component({
  selector: 'grid-builder-grid',
  standalone: true,
  imports: [
    CommonModule,
    AreaInstanceComponent,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    CdkDropList,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridComponent {
  grid = input.required<Grid>();

  gridsFacade = inject(GridsFacade);
  appSettingsFacade = inject(AppSettingsFacade);

  selected: Signal<SelectionElement | undefined> =
    this.gridsFacade.selectedElement$;
  areaInstances = this.gridsFacade.selectedGridAreaInstances$;
  selectable = Selectable;

  gridStyle = computed(() => {
    const rowText = this.grid()
      .rows.map((row) => row.height.value + row.height.unit)
      .join(' ');
    const columnText = this.grid()
      .columns.map((column) => column.width.value + column.width.unit)
      .join(' ');

    const vGap =
      this.grid().vGap?.value !== undefined
        ? `${this.grid().vGap?.value}${this.grid().vGap?.unit}`
        : '';

    const hGap =
      this.grid().hGap?.value !== undefined
        ? `${this.grid().hGap?.value}${this.grid().hGap?.unit}`
        : '';

    const width =
      this.grid()?.shouldUseWidth && this.grid().width
        ? clamp(`${this.grid()?.width?.value}${this.grid()?.width?.unit}`)
        : '';

    const height =
      this.grid()?.shouldUseHeight && this.grid().height
        ? clamp(`${this.grid()?.height?.value}${this.grid()?.height?.unit}`)
        : '';

    return {
      row: rowText,
      column: columnText,
      vGap,
      hGap,
      width,
      height,
    };
  });

  selectorStyle = signal<{
    colSelectionWidth: number;
    rowSelectionHeight: number;
  }>({ colSelectionWidth: 0, rowSelectionHeight: 0 });

  element = signal<ElementRef | undefined>(undefined);

  trackMouse = false;
  positionValues = signal<{
    top: number;
    left: number;
    bottom: number;
    right: number;
  }>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  first = signal<{
    top: number;
    left: number;
    bottom: number;
    right: number;
    row_i: number;
    col_i: number;
  }>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    row_i: 0,
    col_i: 0,
  });
  second = signal<{
    top: number;
    left: number;
    bottom: number;
    right: number;
    row_i: number;
    col_i: number;
  }>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    row_i: 0,
    col_i: 0,
  });

  @ViewChild('main')
  set mainElement(v: ElementRef | undefined) {
    setTimeout(() => {
      this.element.set(v);
      this.removeObserver();
      this.addObserver();
    }, 0);
  }

  select(id: string, selectedType: Selectable) {
    this.gridsFacade.selectElement({ id, selectedType });
  }

  private observer = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width ?? 0;
    const height = entries[0].contentRect.height ?? 0;

    this.selectorStyle.set({
      colSelectionWidth: width + 56,
      rowSelectionHeight: height + 56,
    });
  });

  addObserver() {
    this.observer.observe(this.element()?.nativeElement);
  }

  removeObserver() {
    this.observer.unobserve(this.element()?.nativeElement);
  }

  handleItemCreation(element: MouseEvent) {
    if (this.trackMouse) {
      this.gridsFacade.addItem(this.grid().id, {
        areaId: '',
        name: '',
        colStart: Math.min(this.first().col_i, this.second().col_i) + 1,
        colEnd: Math.max(this.first().col_i, this.second().col_i) + 2,
        rowStart: Math.min(this.first().row_i, this.second().row_i) + 1,
        rowEnd: Math.max(this.first().row_i, this.second().row_i) + 2,
      });
    } else {
      const target = (element.target as HTMLElement).getBoundingClientRect();
      const mainBox = this.element()?.nativeElement.getBoundingClientRect();
      const row_i =
        (element.target as HTMLElement).getAttribute('data-x') ?? '0';
      const col_i =
        (element.target as HTMLElement).getAttribute('data-y') ?? '0';
      this.positionValues.set({
        top: Math.max(target.y - mainBox.y, 0),
        left: Math.max(target.x - mainBox.x, 0),
        bottom: 0,
        right: 0,
      });
      this.positionValues.set({
        top: Math.max(target.y - mainBox.y, 0),
        left: Math.max(target.x - mainBox.x, 0),
        bottom: Math.max(target.bottom - mainBox.y, 0),
        right: Math.max(target.right - mainBox.x, 0),
      });
      this.first.set({
        ...this.positionValues(),
        row_i: +row_i,
        col_i: +col_i,
      });
      this.second.set({
        ...this.positionValues(),
        row_i: +row_i,
        col_i: +col_i,
      });
    }
    this.trackMouse = !this.trackMouse;
  }

  drop(event: CdkDragDrop<string>, id: string) {
    if (event?.item?.data) {
      const areaId = event.item.data;
      this.gridsFacade.connectAreaToInstance(areaId, id, this.grid().id);
    }
  }

  mouseEnter(event: MouseEvent) {
    if (this.trackMouse) {
      const mainBox = this.element()?.nativeElement.getBoundingClientRect();
      const target = (event.target as HTMLElement).getBoundingClientRect();

      const targetCoords = {
        top: Math.max(target.top - mainBox.y, 0),
        left: Math.max(target.left - mainBox.x, 0),
        right: Math.max(target.right - mainBox.x, 0),
        bottom: Math.max(target.bottom - mainBox.y, 0),
      };

      const row_i = (event.target as HTMLElement).getAttribute('data-x') ?? '0';
      const col_i = (event.target as HTMLElement).getAttribute('data-y') ?? '0';

      let newTop = 0;
      let newLeft = 0;
      let newRight = 0;
      let newBottom = 0;

      if (targetCoords.top <= this.first().top) {
        newTop = targetCoords.top;
        newBottom = this.first().bottom;
      } else {
        newTop = this.first().top;
        newBottom = targetCoords.bottom;
      }

      if (targetCoords.left <= this.first().left) {
        newLeft = targetCoords.left;
        newRight = this.first().right;
      } else {
        newLeft = this.first().left;
        newRight = targetCoords.right;
      }

      this.positionValues.set({
        left: newLeft,
        right: newRight,
        top: newTop,
        bottom: newBottom,
      });

      this.second.set({ ...targetCoords, row_i: +row_i, col_i: +col_i });
    }
  }
}
