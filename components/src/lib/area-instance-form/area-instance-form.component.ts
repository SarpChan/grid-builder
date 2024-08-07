import { CommonModule } from '@angular/common';
import {
  Component,
  Signal,
  computed,
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
import { AreaInstance, Unit } from '@grid-builder/models';
import { GridsFacade, ItemsFacade } from '@grid-builder/state';
import { Ready } from '@grid-builder/utils';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmInputDirective,
  HlmInputErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { debounceTime } from 'rxjs';
import { ComboboxComponent } from '../combobox/combobox.component';
import { TooltipButtonComponent } from '../tooltip-button/tooltip-button.component';

type Option = { label: string; value: string | undefined; available?: boolean };

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
    HlmButtonDirective,
    TranslateModule,
    TooltipButtonComponent,
  ],
  templateUrl: './area-instance-form.component.html',
  styleUrl: './area-instance-form.component.scss',
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

    const mappedOptions: Option[] = options.map((option) => ({
      value: option.id,
      label: option.name,
      available: !option.connections.find(
        (connection) =>
          connection.areaInstanceId === this.id() ||
          connection.gridId === this.gridId()
      ),
    }));

    mappedOptions.push({
      value: '+',
      label: 'Add new area',
      available: true,
    });

    return mappedOptions;
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
    if (areaId === '+') {
      this.itemsFacade.connectNewAreaToInstance(areaInstanceId, gridId);
      return;
    }
    this.facade.connectAreaToInstance(areaId, areaInstanceId, gridId);
  }

  addArea() {
    this.itemsFacade.add();
  }
}
