import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  GapFormComponent,
  GlobalsFormComponent,
  GridFormComponent,
  SelectableFormComponent,
  TooltipTitleComponent,
  ViewportFormComponent,
} from '@grid-builder/components';
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
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }
}
