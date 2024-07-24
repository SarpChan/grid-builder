import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AppSettingsFacade,
  GridsFacade,
  ItemsFacade,
} from '@grid-builder/state';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ItemsbarComponent } from './itemsbar/itemsbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
})
export class AppComponent implements OnInit {
  appSettingsFacade = inject(AppSettingsFacade);

  ngOnInit(): void {
    if (
      localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage['theme'] = 'dark';
      document.documentElement.classList.add('dark');
      this.appSettingsFacade.setDarkMode(true);
    } else {
      localStorage['theme'] = 'light';
      this.appSettingsFacade.setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }
}
