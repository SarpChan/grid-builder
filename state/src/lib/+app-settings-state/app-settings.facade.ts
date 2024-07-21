import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsDarkMode, selectIsPreview } from './app-settings.selectors';
import * as AppSettingsActions from './app-settings.actions';

@Injectable()
export class AppSettingsFacade {
  private readonly store = inject(Store);

  isPreview$ = this.store.selectSignal(selectIsPreview);
  isDarkMode$ = this.store.selectSignal(selectIsDarkMode);

  togglePreview() {
    this.store.dispatch(AppSettingsActions.togglePreview());
  }

  setDarkMode(enable: boolean) {
    this.store.dispatch(AppSettingsActions.setDarkMode({ enable }));
  }
}
