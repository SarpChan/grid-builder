import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  GenerationMode,
  ReferenceContainer,
  Unit,
  generationModes,
  isReferenceContainer,
  units,
} from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { TranslateModule } from '@ngx-translate/core';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  BrnRadioComponent,
  BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { ComboboxComponent } from '../combobox/combobox.component';
import { Option, toOption, toRepr } from '@grid-builder/utils';

@Component({
  selector: 'grid-builder-globals-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrnRadioComponent,
    BrnRadioGroupComponent,
    HlmRadioDirective,
    HlmRadioIndicatorComponent,
    HlmRadioGroupDirective,
    HlmLabelDirective,
    TranslateModule,
    ComboboxComponent,
  ],
  templateUrl: './globals-form.component.html',
  styleUrl: './globals-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalsFormComponent {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);
  cdr = inject(ChangeDetectorRef);

  options = units;
  defaultUnit: Unit = 'px';
  referenceContainerValue: ReferenceContainer = 'viewport';
  twValue = 'false';
  generationMode: GenerationMode = 'Tailwind v3';
  currentGenerationMode = signal<Option | undefined>(undefined);
  classNameValue = 'false';
  ready = signal(false);

  form = this.fb.group({
    generationMode: [this.generationMode, [Validators.required]],
    referenceContainer: ['viewport', [Validators.required]],
    useTailwind: [false, [Validators.required]],
    useClassname: [false, [Validators.required]],
  });

  generationOptions = generationModes.map(toOption);

  constructor() {
    effect(
      () => {
        const globals = this.facade.selectGlobals$();
        this.referenceContainerValue = globals.referenceContainer;
        this.twValue = globals.useTailwind ? 'true' : 'false';
        this.generationMode = globals.generationMode;
        this.classNameValue = globals.useClassName ? 'true' : 'false';

        this.currentGenerationMode.set(toRepr(globals.generationMode));
        this.form.setValue({
          generationMode: this.generationMode,
          referenceContainer: this.referenceContainerValue,
          useTailwind: globals.useTailwind,
          useClassname: globals.useClassName,
        });
        this.cdr.markForCheck();
      },
      { allowSignalWrites: true }
    );
  }

  selectRf(rf: string) {
    if (isReferenceContainer(rf)) {
      this.referenceContainerValue = rf;
      this.facade.updateReferenceContainer(rf);
    }
  }

  selectGenerationMode(option: Option) {
    if (option?.value) {
      this.currentGenerationMode.set(option);
      this.facade.updateGenerationMode(option.value as GenerationMode);
    }
  }

  selectTW(selection: boolean) {
    this.twValue = selection ? 'true' : 'false';
    this.facade.updateUseTailwind(selection);
  }

  selectClass(selection: boolean) {
    this.classNameValue = selection ? 'true' : 'false';
    this.facade.updateUseClassName(selection);
  }
}
