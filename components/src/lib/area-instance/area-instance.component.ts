import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'grid-builder-area-instance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area-instance.component.html',
  styleUrl: './area-instance.component.scss',
})
export class AreaInstanceComponent {
  @Input()
  col?: number;
  @Input()
  row?: number;
}
