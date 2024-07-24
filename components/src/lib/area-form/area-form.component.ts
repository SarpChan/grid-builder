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
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Area } from '@grid-builder/models';
import { ItemsFacade } from '@grid-builder/state';
import { Ready } from '@grid-builder/utils';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmInputDirective,
  HlmInputErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'grid-builder-area-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmInputErrorDirective,
    HlmLabelDirective,
    HlmButtonDirective,
  ],
  templateUrl: './area-form.component.html',
  styleUrl: './area-form.component.scss',
})
export class AreaFormComponent extends Ready {
  facade = inject(ItemsFacade);
  fb = inject(FormBuilder);

  id = input<string | undefined>();
  selected: Signal<Area | undefined> = this.facade.selected$;
  grids = this.facade.selectGridsForArea$;
  oldId: string | undefined;

  form = this.fb.nonNullable.group({
    name: [this.selected()?.name, [Validators.required]],
    color: [this.selected()?.color ?? '#000', [Validators.required]],
  });

  constructor() {
    super();
    effect(() => this.resetForm(this.id()));

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (!this.ready()) return;

      this.facade.updateArea(this.id(), value);
    });
  }

  resetForm(id: string | undefined) {
    if (id && this.oldId !== id) {
      this.form.reset(
        untracked(() => {
          const selected = { ...this.selected() };

          if (selected?.color?.startsWith('#')) {
            return selected;
          }

          if (selected?.color) {
            selected.color = `#${selected.color}`;
          }
          return selected;
        }),
        { emitEvent: this.form.pristine }
      );
    }

    this.oldId = id;
  }

  delete() {
    this.facade.remove(this.id());
  }

  removeConnection(gridId: string) {
    const id = this.id();

    if (!id) return;

    this.facade.removeConnection(id, gridId);
  }
}
