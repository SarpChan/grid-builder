import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  inject,
  effect,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  GapFormComponent,
  GlobalsFormComponent,
  GridFormComponent,
  SelectableFormComponent,
  TooltipTitleComponent,
  ViewportFormComponent,
} from '@grid-builder/components';
import { Grid } from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import {
  HlmInputDirective,
  HlmInputErrorDirective,
} from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'grid-builder-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    GapFormComponent,
    GridFormComponent,
    ViewportFormComponent,
    GlobalsFormComponent,
    FormsModule,
    ReactiveFormsModule,
    TooltipTitleComponent,
    SelectableFormComponent,
    HlmInputDirective,
    HlmLabelDirective,
    HlmInputErrorDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarComponent {
  facade = inject(GridsFacade);
  fb = inject(FormBuilder);
  grid = this.facade.selectedGrid$;

  form: FormGroup;

  get name() {
    return this.form.get('name');
  }

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const grid = this.grid();
      if (grid) {
        this.facade.update(grid, value);
      }
    });

    effect(() => {
      this.resetForm(this.grid());
    });
  }

  resetForm(grid: Grid | undefined) {
    this.form.get('name')?.reset(grid?.name, { emitEvent: false });
  }
}
