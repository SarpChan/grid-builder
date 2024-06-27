import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsPreview } from './app-settings.selectors';
import * as AppSettingsActions from './app-settings.actions';

@Injectable()
export class AppSettingsFacade {
  private readonly store = inject(Store);

  isPreview$ = this.store.selectSignal(selectIsPreview);

  togglePreview() {
    this.store.dispatch(AppSettingsActions.togglePreview());
  }
}
