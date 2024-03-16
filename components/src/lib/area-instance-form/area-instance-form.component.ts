import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Signal,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GridsFacade, ItemsFacade } from '@grid-builder/state';
import { AreaInstance, Unit, units } from '@grid-builder/models';
import {
  HlmInputDirective,
  HlmInputErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { Ready } from '@grid-builder/utils';
import { ComboboxComponent } from '../combobox/combobox.component';

type Option = { label: string; value: string | undefined };

@Component({
  selector: 'grid-builder-area-instance-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmInputErrorDirective,
    ComboboxComponent,
  ],
  templateUrl: './area-instance-form.component.html',
  styleUrl: './area-instance-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AreaInstanceFormComponent extends Ready {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);
  itemsFacade = inject(ItemsFacade);

  defaultUnit: Unit = '%';
  oldId: string | undefined;

  id = input<string | undefined>();
  selected: Signal<AreaInstance | undefined> = this.facade.selectedItem$;
  gridId = this.facade.selectedId$;

  areaOptions = this.itemsFacade.selectAreaOptions$;

  options = computed<Option[]>(() => {
    const options = this.areaOptions();
    const selected = this.selected();
    if (!options || !selected) return [];

    return options.map((option) => ({
      value: option.id,
      label: option.name,
      available: !option.connections.find(
        (connection) =>
          connection.areaInstanceId === this.id() ||
          connection.gridId === this.gridId()
      ),
    }));
  });

  currentOption = computed<Option | undefined>(() => {
    const selected = this.selected();

    if (!selected) return undefined;

    return this.options()?.find((option) => option.value === selected.areaId);
  });

  form = this.fb.nonNullable.group({
    name: [
      { value: this.selected()?.name, disabled: true },
      [Validators.required],
    ],
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
    areaId: [this.selected()?.areaId],
  });

  get name() {
    return this.form.get('name');
  }

  constructor() {
    super();
    effect(() => this.resetForm(this.id()), { allowSignalWrites: true });

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
        untracked(() => ({ ...this.selected() })),
        { emitEvent: this.form.pristine }
      );
    }

    this.oldId = id;
  }

  delete() {
    this.facade.removeItem(this.gridId() ?? '', this.id() ?? '');
  }

  select(option: Option) {
    const areaInstanceId = this.id();
    const gridId = this.gridId();
    const areaId = option.value;
    if (!areaInstanceId || !gridId || !areaId) return;

    this.facade.connectAreaToInstance(areaId, areaInstanceId, gridId);
  }
}
