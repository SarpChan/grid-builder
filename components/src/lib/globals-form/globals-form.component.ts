import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit, units } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-globals-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './globals-form.component.html',
  styleUrl: './globals-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalsFormComponent {
  fb = inject(FormBuilder);
  options = units;
  defaultUnit = Unit.PX;
  mediaType = MediaType;
  referenceContainer = ReferenceContainer;

  form = this.fb.group({
    mediaType: [MediaType.BOTH, [Validators.required]],
    referenceContainer: [ReferenceContainer.VIEWPORT, [Validators.required]],
  });
}

enum MediaType {
  SCREEN = 'SCREEN',
  PRINT = 'PRINT',
  BOTH = 'BOTH',
}

enum ReferenceContainer {
  VIEWPORT = 'VIEWPORT',
  CONTAINER = 'CONTAINER',
}
