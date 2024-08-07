import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Limiter,
  MediaType,
  Unit,
  isLimiter,
  isMediaType,
  units,
} from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { Ready } from '@grid-builder/utils';
import {
  BrnRadioComponent,
  BrnRadioGroupComponent,
} from '@spartan-ng/ui-radiogroup-brain';
import {
  HlmRadioDirective,
  HlmRadioGroupDirective,
  HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { ValueUnitComponent } from '../value-unit/value-unit.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'grid-builder-viewport-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValueUnitComponent,
    BrnRadioComponent,
    BrnRadioGroupComponent,
    HlmRadioDirective,
    HlmRadioIndicatorComponent,
    HlmRadioGroupDirective,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    TranslateModule,
  ],
  templateUrl: './viewport-form.component.html',
  styleUrl: './viewport-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewportFormComponent extends Ready {
  fb = inject(FormBuilder);
  facade = inject(GridsFacade);
  viewport = this.facade.selectViewport$;
  gridId = this.facade.selectedId$;
  options = units;
  defaultUnit: Unit = 'px';
  mediaTypeValue: MediaType = 'both';

  selectedLimiter: Limiter = 'none';

  oldId: string | undefined;
  form = this.fb.nonNullable.group({
    limiter: [this.selectedLimiter, [Validators.required]],
    mediaType: [this.mediaTypeValue, [Validators.required]],
  });

  constructor() {
    super();
    effect(
      () => {
        this.resetForm(this.gridId());
      },
      { allowSignalWrites: true }
    );
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const limiter = value.limiter;
      if (limiter && isLimiter(limiter)) {
        this.selectedLimiter = limiter;
      }
      this.facade.updateViewport(this.gridId() ?? '', value);
    });
  }

  select(dimension: Limiter) {
    this.form.get('limiter')?.setValue(dimension);
    this.selectedLimiter = dimension;
  }

  resetForm(id: string | undefined) {
    if (id && this.oldId !== id) {
      this.form.reset(
        untracked(() => this.viewport()),
        { emitEvent: this.form.pristine }
      );
    }
    this.oldId = id;
  }

  selectMediaType(mt: string) {
    if (isMediaType(mt)) {
      this.mediaTypeValue = mt;
      this.form.get('mediaType')?.setValue(mt);
    }
  }
}
