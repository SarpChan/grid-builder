import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariants, HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnTooltipContentDirective,
  TooltipPosition,
} from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'grid-builder-tooltip-button',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
  ],
  templateUrl: './tooltip-button.component.html',
  styleUrl: './tooltip-button.component.scss',
})
export class TooltipButtonComponent {
  position = input.required<TooltipPosition>();
  variant = input<ButtonVariants['variant']>();
  description = input<string>();
  classOverride = input<string>();
}
