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
import { Row, Unit, units } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { Ready } from '@grid-builder/utils';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { TooltipButtonComponent } from '../tooltip-button/tooltip-button.component';

@Component({
  selector: 'grid-builder-row-form',
  standalone: true,
  imports: [
    CommonModule,
    ValueUnitComponent,
    FormsModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    TranslateModule,
    TooltipButtonComponent,
  ],
  templateUrl: './row-form.component.html',
  styleUrl: './row-form.component.scss',
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
