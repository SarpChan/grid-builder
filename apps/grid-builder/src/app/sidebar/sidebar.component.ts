import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Signal,
  effect,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlignmentFormComponent,
  GapFormComponent,
  GlobalsFormComponent,
  GridFormComponent,
  SelectableFormComponent,
  TooltipButtonComponent,
  TooltipTitleComponent,
  ViewportFormComponent,
} from '@grid-builder/components';
import { GridsFacade } from '@grid-builder/state';
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import {
  HlmAccordionContentDirective,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import {
  HlmInputDirective,
  HlmInputErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

import { Grid } from '@grid-builder/models';
import { Ready } from '@grid-builder/utils';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent } from '@ng-icons/core';
import { radixMinus, radixPlus } from '@ng-icons/radix-icons';

@Component({
  selector: 'grid-builder-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    GapFormComponent,
    GridFormComponent,
    ViewportFormComponent,
    GlobalsFormComponent,
    FormsModule,
    ReactiveFormsModule,
    TooltipTitleComponent,
    SelectableFormComponent,
    AlignmentFormComponent,
    HlmInputDirective,
    HlmLabelDirective,
    HlmInputErrorDirective,
    BrnAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentDirective,
    HlmAccordionIconDirective,
    HlmIconComponent,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    HlmButtonDirective,
    TranslateModule,
    TooltipButtonComponent,
    NgIconComponent,
    HlmIconComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [
    provideIcons({
      radixPlus,
      radixMinus,
    }),
  ],
})
export class SidebarComponent extends Ready {
  facade = inject(GridsFacade);
  fb = inject(FormBuilder);
  grid: Signal<Grid | undefined> = this.facade.selectedGrid$;
  selected = this.facade.selectedId$;
  selectedElement = this.facade.selectedElement$;
  form: FormGroup;
  oldId: string | undefined;

  get name() {
    return this.form.get('name');
  }

  selectionElement = viewChild<ElementRef>('selection');

  constructor() {
    super();
    this.form = this.fb.group({
      name: [undefined, Validators.required],
    });

    effect(
      () => {
        this.resetForm(this.selected());
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        const selectionElement = this.selectionElement()?.nativeElement;
        const isOpen = selectionElement?.getAttribute('data-state');
        if (selectionElement?.id) {
          if (this.selectedElement() && isOpen && isOpen !== 'open') {
            // Queue Task so that disabled state is cleared
            setTimeout(() => selectionElement.click(), 0);
          }
        } else if (isOpen === 'open') {
          selectionElement.click();
        }
      },
      { allowSignalWrites: true }
    );

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const grid = this.grid();
      if (grid && this.ready()) {
        this.facade.update(grid.id, value);
      }
    });
  }

  resetForm(id: string | undefined) {
    if (id && this.oldId !== id) {
      this.form.reset(untracked(() => this.grid()));
    }
    this.oldId = id;
  }

  addCol(): void {
    const id = this.selected();
    if (id) {
      this.facade.addColumn(id);
    }
  }

  addRow(): void {
    const id = this.selected();
    if (id) {
      this.facade.addRow(id);
    }
  }

  removeRow() {
    const grid = this.grid();
    if (grid?.rows.length && grid.rows.length > 1) {
      const rowId = grid.rows.at(-1)?.id;
      if (rowId) {
        this.facade.removeRow(grid.id, rowId);
      }
    }
  }

  removeCol() {
    const grid = this.grid();
    if (grid?.columns.length && grid.columns.length > 1) {
      const colId = grid.columns.at(-1)?.id;
      if (colId) {
        this.facade.removeColumn(grid.id, colId);
      }
    }
  }

  removeGrid() {
    const grid = this.grid();

    if (!grid) return;

    this.facade.removeGrid(grid.id);
  }

  reset() {
    this.facade.reset();
  }
}
