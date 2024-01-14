import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
@Component({
  selector: 'grid-builder-tooltip-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip-title.component.html',
  styleUrl: './tooltip-title.component.scss',
})
export class TooltipTitleComponent {
  @Input() title!: string;
  @Input() tooltip!: string;
}
