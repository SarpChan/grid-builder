import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'grid-builder-tooltip-title',
  standalone: true,
  imports: [
    CommonModule,
    BrnTooltipContentDirective,
    HlmTooltipTriggerDirective,
    HlmTooltipComponent,
  ],
  templateUrl: './tooltip-title.component.html',
  styleUrl: './tooltip-title.component.scss',
})
export class TooltipTitleComponent {
  @Input() title!: string;
  @Input() tooltip!: string;
}
