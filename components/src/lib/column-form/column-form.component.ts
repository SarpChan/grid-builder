import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Signal,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Column, Unit, units } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { Ready } from '@grid-builder/utils';

@Component({
  selector: 'grid-builder-column-form',
  standalone: true,
  imports: [CommonModule, ValueUnitComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './column-form.component.html',
  styleUrl: './column-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColumnFormComponent extends Ready {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);
  options = units;
  defaultUnit: Unit = 'px';
  oldId: string | undefined;

  id = input<string | undefined>();
  selected: Signal<Column | undefined> = this.facade.selectedColumn$;
  gridId = this.facade.selectedId$;
  form = this.fb.group({});

  constructor() {
    super();
    effect(
      () => {
        this.resetForm(this.id());
      },
      { allowSignalWrites: true }
    );

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (this.ready()) {
        this.facade.updateColumn(
          this.gridId() ?? '',
          this.selected()?.id ?? '',
          value
        );
      }
    });
  }

  delete() {
    this.facade.removeColumn(this.gridId() ?? '', this.id() ?? '');
  }

  resetForm(id: string | undefined) {
    if (id && this.oldId !== id) {
      this.form.reset(
        untracked(() => this.selected()),
        { emitEvent: this.form.pristine }
      );
    }
    this.oldId = id;
  }
}
