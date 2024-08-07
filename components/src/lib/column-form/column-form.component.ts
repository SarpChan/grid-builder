import { CommonModule } from '@angular/common';
import {
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
import { Ready } from '@grid-builder/utils';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { TooltipButtonComponent } from '../tooltip-button/tooltip-button.component';

@Component({
  selector: 'grid-builder-column-form',
  standalone: true,
  imports: [
    CommonModule,
    ValueUnitComponent,
    HlmButtonDirective,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TooltipButtonComponent,
  ],
  templateUrl: './column-form.component.html',
  styleUrl: './column-form.component.scss',
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
