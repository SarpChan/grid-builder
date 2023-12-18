import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Element } from '@grid-builder/models';

@Component({
  selector: 'grid-builder-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
})
export class ElementComponent {
  @Input()
  col?: number;
  @Input()
  row?: number;
}
