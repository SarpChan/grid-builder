import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createAction } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import * as AppSettingsActions from './app-settings.actions';

@Injectable()
export class AppSettingsEffects {
  private actions = inject(Actions);
  private readonly store = inject(Store);

  setDarkMode$ = createEffect(() =>
    this.actions.pipe(
      ofType(AppSettingsActions.setDarkMode),
      switchMap(({ enable }) => {
        localStorage['theme'] = enable ? 'dark' : 'light';

        if (enable) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        return of(createAction('noop')());
      })
    )
  );
}
