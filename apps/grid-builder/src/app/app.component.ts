import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AppSettingsFacade,
  GridsFacade,
  ItemsFacade,
} from '@grid-builder/state';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemsbarComponent } from './itemsbar/itemsbar.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    ItemsbarComponent,
    CdkDropListGroup,
    HlmButtonDirective,
    CommonModule,
  ],
  selector: 'grid-builder-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GridsFacade, ItemsFacade, AppSettingsFacade],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  appSettingsFacade = inject(AppSettingsFacade);
}
