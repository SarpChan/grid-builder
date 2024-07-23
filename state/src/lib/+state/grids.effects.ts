import { Injectable, inject } from '@angular/core';
import {
  generateRaw,
  generateTailwind,
  checkNoViewportOverlap,
} from '@grid-builder/utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createAction } from '@ngrx/store';
import {
  catchError,
  from,
  of,
  switchMap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import {
  selectAllItems,
  selectAreaEntities,
  selectItemState,
} from '../+item-state/items.selectors';
import * as GridsActions from './grids.actions';
import {
  selectAllGrids,
  selectGlobals,
  selectGridsEntities,
  selectGridsState,
} from './grids.selectors';
import { Grid } from '@grid-builder/models';
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
          let errorMessage = 'Could not connect area to grid';

          if (!grids) {
            errorMessage = 'Grids do not exist';
          } else if (!areas) {
            errorMessage = 'Areas do not exist';
          } else if (
            !payload?.gridId ||
            !payload?.areaId ||
            !payload?.areaInstanceId
          ) {
            errorMessage = 'Missing data for connecting area to grid';
          }
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: errorMessage,
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
        const { html, css } = gridState.useTailwind
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

  validate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.connectNewAreaToInstance),
      withLatestFrom(
        this.store.select(selectGridsState),
        this.store.select(selectItemState)
      ),
      switchMap(([_, gridState]) => {
        const { warnings, errors } = checkNoViewportOverlap(
          Object.values(gridState.entities) as Grid[]
        );

        return of(
          GridsActions.validationResults({
            warnings: Array.from(warnings),
            errors: Array.from(errors),
          })
        );
      })
    )
  );

  saveFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.saveFile),
      withLatestFrom(
        this.store.select(selectAllGrids),
        this.store.select(selectAllItems),
        this.store.select(selectGlobals)
      ),
      switchMap(([_, grids, areas, globals]) => {
        if (grids?.length && areas?.length) {
          try {
            const toDownload = {
              grids,
              areas,
              globals,
            };
            const blob = new Blob([JSON.stringify(toDownload, null, 2)], {
              type: 'application/json',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'grid.json';
            a.click();
            URL.revokeObjectURL(url);
            return of(GridsActions.saveFileSuccess());
          } catch (error) {
            console.error('Failed to save file');
          }
        }
        return of(
          GridsActions.saveFileFailure({ error: 'Failed to save file' })
        );
      })
    )
  );

  loadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridsActions.loadFile),
      switchMap((payload) => {
        const file = payload.file;
        if (file) {
          return from(file.text());
        }
        return throwError(() => new Error('No file provided'));
      }),
      switchMap((text) => {
        if (text) {
          const { grids, areas, globals } = JSON.parse(text);
          return of(GridsActions.loadFileSuccess({ grids, areas, globals }));
        }
        return of(
          GridsActions.loadFileFailure({ error: 'Failed to read file content' })
        );
      }),
      catchError((error) => {
        console.error('Failed to load file', error);
        return of(
          GridsActions.loadFileFailure({ error: 'Could not load file' })
        );
      })
    )
  );
}
