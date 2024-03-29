import { Injectable, inject } from '@angular/core';
import { generateRaw, generateTailwind } from '@grid-builder/utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createAction } from '@ngrx/store';
import { catchError, of, switchMap, withLatestFrom } from 'rxjs';
import {
  selectAreaEntities,
  selectItemState,
} from '../+item-state/items.selectors';
import * as GridsActions from './grids.actions';
import { selectGridsEntities, selectGridsState } from './grids.selectors';
@Injectable()
export class GridsEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);

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
      ofType(GridsActions.addAreaInstance),
      switchMap((action) =>
        of(
          GridsActions.addAreaInstanceSuccess({
            id: action.id,
            item: {
              ...action.item,
            },
          })
        )
      )
    )
  );

  connectAreaToInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.connectAreaToInstance),
      withLatestFrom(
        this.store.select(selectGridsEntities),
        this.store.select(selectAreaEntities)
      ),
      switchMap(([payload, grids, areas]) => {
        if (
          !grids ||
          !areas ||
          !payload ||
          !payload.areaId ||
          !payload.areaInstanceId ||
          !payload.gridId
        ) {
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: 'Could not connect Area to Grid',
            })
          );
        }

        const area = areas[payload.areaId];
        const grid = grids[payload.gridId];

        if (!area) {
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: 'This Area does not exist',
            })
          );
        }

        if (!grid) {
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: 'This Grid does not exist',
            })
          );
        }

        if (
          area.connections.length &&
          area.connections.find(
            (connection) =>
              connection.gridId === payload.gridId ||
              connection.areaInstanceId === payload.areaInstanceId
          )
        ) {
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: `Area ${
                area.name ? area.name : area.color
              } is already connected to ${grid.name}`,
            })
          );
        }

        return of(
          GridsActions.connectAreaToInstanceSuccess({
            gridId: payload.gridId,
            areaId: payload.areaId,
            areaInstanceId: payload.areaInstanceId,
          })
        );
      })
    )
  );

  generateCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.generate),
      withLatestFrom(
        this.store.select(selectGridsState),
        this.store.select(selectItemState)
      ),
      switchMap(([_, gridState, areaState]) => {
        const shouldUseTailwind = true;

        const { html, css } = shouldUseTailwind
          ? generateTailwind(gridState, areaState)
          : generateRaw(gridState, areaState);

        return of(GridsActions.generateSuccess({ css, html }));
      })
    )
  );

  connectNewAreaToInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.connectNewAreaToInstance),
      withLatestFrom(this.store.select(selectItemState)),
      switchMap(([payload, itemState]) =>
        itemState.lastAddedId
          ? of(
              GridsActions.connectAreaToInstance({
                areaId: itemState.lastAddedId,
                areaInstanceId: payload.areaInstanceId,
                gridId: payload.gridId,
              })
            )
          : of(createAction('noop'))
      )
    )
  );
}
