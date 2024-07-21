import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  alignmentContentOptions,
  alignmentItemsOptions,
} from '@grid-builder/models';
import { GridsFacade } from '@grid-builder/state';
import { Option, Ready, toOption, toRepr } from '@grid-builder/utils';
import { ComboboxComponent } from '../combobox/combobox.component';

@Component({
  selector: 'grid-builder-alignment-form',
  standalone: true,
  imports: [CommonModule, ComboboxComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './alignment-form.component.html',
  styleUrl: './alignment-form.component.scss',
})
export class AlignmentFormComponent extends Ready implements OnInit {
  fb = inject(FormBuilder);
  controlContainer = inject(ControlContainer);

  facade = inject(GridsFacade);
  form!: FormGroup;

  currentGrid = this.facade.selectedGrid$;
  currentContentJustification = signal<Option | undefined>(undefined);
  currentContentAlignment = signal<Option | undefined>(undefined);
  currentItemJustification = signal<Option | undefined>(undefined);
  currentItemAlignment = signal<Option | undefined>(undefined);

  iaOptions = alignmentItemsOptions.map(toOption);
  ijOptions = alignmentItemsOptions.map(toOption);
  caOptions = alignmentContentOptions.map(toOption);
  cjOptions = alignmentContentOptions.map(toOption);

  constructor() {
    super();
    effect(
      () => {
        if (this.form && this.ready()) {
          this.setManualFields();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.form = (
      this.controlContainer.formDirective as FormGroupDirective
    ).form;

    this.setManualFields();
  }

  private setManualFields() {
    const alignItems = this.currentGrid()?.alignItems || 'start';
    this.form.addControl('alignItems', this.fb.control(alignItems), {
      emitEvent: false,
    });
    this.currentItemAlignment.set(toRepr(alignItems));

    const justifyItems = this.currentGrid()?.justifyItems || 'start';
    this.form.addControl('justifyItems', this.fb.control(justifyItems), {
      emitEvent: false,
    });
    this.currentItemJustification.set(toRepr(justifyItems));

    const alignContent = this.currentGrid()?.alignContent || 'flex-start';
    this.form.addControl('alignContent', this.fb.control(alignContent), {
      emitEvent: false,
    });
    this.currentContentAlignment.set(toRepr(alignContent));

    const justifyContent = this.currentGrid()?.justifyContent || 'flex-start';
    this.form.addControl('justifyContent', this.fb.control(justifyContent), {
      emitEvent: false,
    });
    this.currentContentJustification.set(toRepr(justifyContent));
  }

  get contentJustification() {
    return this.form.get('justifyContent');
  }

  get contentAlignment() {
    return this.form.get('alignContent');
  }

  get itemJustification() {
    return this.form.get('justifyItems');
  }

  get itemAlignment() {
    return this.form.get('alignItems');
  }

  selectContentJustification(option: Option) {
    if (option?.value) {
      this.contentJustification?.setValue(option.value);
      this.currentContentJustification.set(option);
    }
  }
  selectContentAlignment(option: Option) {
    if (option?.value) {
      this.contentAlignment?.setValue(option.value);
      this.currentContentAlignment.set(option);
    }
  }
  selectItemJustification(option: Option) {
    if (option?.value) {
      this.itemJustification?.setValue(option.value);
      this.currentItemJustification.set(option);
    }
  }
  selectItemAlignment(option: Option) {
    if (option?.value) {
      this.itemAlignment?.setValue(option.value);
      this.currentItemAlignment.set(option);
    }
  }
}
