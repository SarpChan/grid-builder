import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AppSettingsFacade,
  GridsFacade,
  ItemsFacade,
} from '@grid-builder/state';
import { TranslateService } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ItemsbarComponent } from './itemsbar/itemsbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  providers: [GridsFacade, ItemsFacade, AppSettingsFacade, TranslateService],
})
export class AppComponent implements OnInit {
  appSettingsFacade = inject(AppSettingsFacade);
  translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(['en', 'de']);

    this.translateService.setDefaultLang('en');
    this.translateService.onDefaultLangChange
      .pipe(takeUntilDestroyed())
      .subscribe((a) => this.appSettingsFacade.setCurrentLanguage(a.lang));

    this.translateService.onTranslationChange
      .pipe(takeUntilDestroyed())
      .subscribe((t) => this.appSettingsFacade.setCurrentLanguage(t.lang));

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe((t) => this.appSettingsFacade.setCurrentLanguage(t.lang));
  }
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
