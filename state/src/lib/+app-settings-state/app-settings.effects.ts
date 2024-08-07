import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import * as AppSettingsActions from './app-settings.actions';
import * as GridsActions from '../+state/grids.actions';
import { toast } from 'ngx-sonner';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppSettingsEffects {
  private actions = inject(Actions);
  private translateService = inject(TranslateService);

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

  showSonnerOnFailedFileDownload$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          GridsActions.saveFileFailure,
          GridsActions.loadFileFailure,
          GridsActions.generateFailure,
          GridsActions.connectAreaToInstanceFailure
        ),
        tap((action) => {
          toast.error(this.translateService.instant('sonner.error_title'), {
            description: this.translateService.instant(action.error),
          });
        })
      ),
    { dispatch: false }
  );
}
