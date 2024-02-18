import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as GridsActions from './grids.actions';

@Injectable()
export class GridsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.initGrids),
      switchMap(() => of(GridsActions.loadGridsSuccess({ grids: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(GridsActions.loadGridsFailure({ error }));
      })
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.addItem),
      switchMap((action) =>
        of(
          GridsActions.addItemSuccess({
            id: action.id,
            item: {
              ...action.item,
              color: this.getRandomColor(),
            },
          })
        )
      )
    )
  );

  private getRandomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}
