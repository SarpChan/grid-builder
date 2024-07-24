import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Unit, autoFlowOptions } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { Ready } from '@grid-builder/utils';
import { ComboboxComponent } from '../combobox/combobox.component';
import { ToggleValueUnitComponent } from '../toggle-value-unit/toggle-value-unit.component';
import { ValueUnitComponent } from '../value-unit/value-unit.component';

type Option = { label: string; value: string | undefined; available?: boolean };

@Component({
  selector: 'grid-builder-grid-form',
  standalone: true,
  imports: [
    CommonModule,
    ValueUnitComponent,
    ToggleValueUnitComponent,
    FormsModule,
    ReactiveFormsModule,
    ComboboxComponent,
  ],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridFormComponent extends Ready implements OnInit {
  fb = inject(FormBuilder);
  controlContainer = inject(ControlContainer);

  facade = inject(GridsFacade);
  form!: FormGroup;

  currentGrid = this.facade.selectedGrid$;
  afOptions = autoFlowOptions.map(
    (option) =>
      ({
        label: option.charAt(0).toUpperCase() + option.slice(1),
        value: option,
        available: true,
      } as Option)
  );

  currentAutoFlow = signal<Option | undefined>(undefined);
  defaultUnit: Unit = 'px';

  constructor() {
    super();
    effect(
      () => {
        if (this.form && this.ready()) {
          const autoFlow = this.currentGrid()?.autoFlow || 'row';
          this.autoFlow?.setValue(autoFlow, {
            emitEvent: false,
          });
          this.currentAutoFlow.set({
            value: autoFlow,
            label: autoFlow.charAt(0).toUpperCase() + autoFlow.slice(1),
            available: true,
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.form = (
      this.controlContainer.formDirective as FormGroupDirective
    ).form;
    const autoFlow = this.currentGrid()?.autoFlow || 'row';
    this.form.addControl('autoFlow', this.fb.control(autoFlow), {
      emitEvent: false,
    });
    this.currentAutoFlow.set({
      value: autoFlow,
      label: autoFlow.charAt(0).toUpperCase() + autoFlow.slice(1),
      available: true,
    });
  }

  get autoFlow() {
    return this.form.get('autoFlow');
  }

  selectAutoFlow(option: Option) {
    if (option?.value) {
      this.autoFlow?.setValue(option.value);
      this.currentAutoFlow.set(option);
    }
  }
}
