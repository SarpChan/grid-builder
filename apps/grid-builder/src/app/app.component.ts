import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridsFacade, ItemsFacade } from '@grid-builder/state';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemsbarComponent } from './itemsbar/itemsbar.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    ItemsbarComponent,
    CdkDropListGroup,
  ],
  selector: 'grid-builder-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GridsFacade, ItemsFacade],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'grid-builder';
  exampleTextField = 'ExampleText';

  onClick() {}
}
