import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Signal,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GridsFacade } from '@grid-builder/state';
import { Item, Unit, units } from '@grid-builder/models';
import {
  HlmInputDirective,
  HlmInputErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'grid-builder-element-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmInputErrorDirective,
  ],
  templateUrl: './element-form.component.html',
  styleUrl: './element-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ElementFormComponent implements AfterViewInit {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);

  options = units;
  defaultUnit: Unit = '%';
  oldId: string | undefined;

  id = input<string | undefined>();
  selected: Signal<Item | undefined> = this.facade.selectedItem$;
  gridId = this.facade.selectedId$;

  form = this.fb.nonNullable.group({
    name: [this.selected()?.name, [Validators.required]],
    colStart: [
      this.selected()?.colStart ?? 1,
      [Validators.required, Validators.min(0)],
    ],
    colEnd: [
      this.selected()?.colEnd ?? 1,
      [Validators.required, Validators.min(0)],
    ],
    rowStart: [
      this.selected()?.rowStart ?? 1,
      [Validators.required, Validators.min(0)],
    ],
    rowEnd: [
      this.selected()?.rowEnd ?? 1,
      [Validators.required, Validators.min(0)],
    ],
    color: [this.selected()?.color ?? '#000000', Validators.required],
  });
  ready = signal(false);

  get name() {
    return this.form.get('name');
  }

  constructor() {
    effect(
      () => {
        this.resetForm(this.id());
      },
      { allowSignalWrites: true }
    );

    this.form.valueChanges
      .pipe(debounceTime(100), takeUntilDestroyed())
      .subscribe((value) => {
        if (this.ready()) {
          this.facade.updateItem(
            this.gridId() ?? '',
            this.selected()?.id ?? '',
            value
          );
        }
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

  ngAfterViewInit(): void {
    this.ready.set(true);
  }

  delete() {
    this.facade.removeItem(this.gridId() ?? '', this.id() ?? '');
  }

  throwsEvent(e: Event) {
    e.stopPropagation();
    console.log(e);
  }
}
