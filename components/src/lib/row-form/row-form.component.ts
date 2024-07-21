import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Signal,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridsFacade } from '@grid-builder/state';
import { Row, Unit, units } from '@grid-builder/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { Ready } from '@grid-builder/utils';

@Component({
  selector: 'grid-builder-row-form',
  standalone: true,
  imports: [CommonModule, ValueUnitComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './row-form.component.html',
  styleUrl: './row-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RowFormComponent extends Ready {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);
  options = units;
  defaultUnit: Unit = 'px';
  oldId: string | undefined;

  id = input<string | undefined>();
  selected: Signal<Row | undefined> = this.facade.selectedRow$;
  gridId = this.facade.selectedId$;
  form = this.fb.group({});

  constructor() {
    super();
    effect(
      () => {
        if (this.ready()) {
          this.resetForm(this.id());
        }
      },
      { allowSignalWrites: true }
    );

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (this.ready()) {
        this.facade.updateRow(
          this.gridId() ?? '',
          this.selected()?.id ?? '',
          value
        );
      }
    });
  }

  delete() {
    this.facade.removeRow(this.gridId() ?? '', this.id() ?? '');
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
