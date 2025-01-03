import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentLang,
  selectIsDarkMode,
  selectIsPreview,
  selectIsSidebarOpened,
} from './app-settings.selectors';
import * as AppSettingsActions from './app-settings.actions';

@Injectable()
export class AppSettingsFacade {
  private readonly store = inject(Store);

  isPreview$ = this.store.selectSignal(selectIsPreview);
  isDarkMode$ = this.store.selectSignal(selectIsDarkMode);
  currentLang$ = this.store.selectSignal(selectCurrentLang);
  isSidebarOpen$ = this.store.selectSignal(selectIsSidebarOpened);
  togglePreview() {
    this.store.dispatch(AppSettingsActions.togglePreview());
  }

  setDarkMode(enable: boolean) {
    this.store.dispatch(AppSettingsActions.setDarkMode({ enable }));
  }

  setCurrentLanguage(lang: string) {
    this.store.dispatch(AppSettingsActions.setCurrentLanguage({ lang }));
  }

  setSidebarOpened(open: boolean) {
    this.store.dispatch(AppSettingsActions.setSidebarOpened({ open }));
  }
}
