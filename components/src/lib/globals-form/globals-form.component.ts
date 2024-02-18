import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ReferenceContainer,
  Unit,
  isReferenceContainer,
  units,
} from '@grid-builder/models';
import {
  BrnRadioComponent,
  BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { GridsFacade } from '@grid-builder/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './globals-form.component.html',
  styleUrl: './globals-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalsFormComponent {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);

  options = units;
  defaultUnit: Unit = 'px';
  referenceContainerValue: ReferenceContainer = 'viewport';
  ready = signal(false);

  form = this.fb.group({
    referenceContainer: ['viewport', [Validators.required]],
  });

  select(rf: string) {
    if (isReferenceContainer(rf)) {
      this.referenceContainerValue = rf;
      this.facade.updateReferenceContainer(rf);
    }
  }
}
