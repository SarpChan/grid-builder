import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, of } from 'rxjs';
import * as ItemsActions from './items.actions';

@Injectable()
export class ItemsEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);

  addArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.addArea),
      switchMap((action) => {
        const id = crypto.randomUUID();
        const item = {
          ...action.item,
          id,
          name: `Area-${Math.floor(Math.random() * 10000)}`,
        };
        return of(ItemsActions.addAreaSuccess({ item }));
      })
    )
  );
}
