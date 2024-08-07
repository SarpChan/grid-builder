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
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class GridsEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private translateService = inject(TranslateService);

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
          let errorMessage = 'sonner.connect_area_to_grid.default';

          if (!grids) {
            errorMessage = 'sonner.connect_area_to_grid.no_grids';
          } else if (!areas) {
            errorMessage = 'sonner.connect_area_to_grid.no_areas';
          } else if (
            !payload?.gridId ||
            !payload?.areaId ||
            !payload?.areaInstanceId
          ) {
            errorMessage = 'sonner.connect_area_to_grid.missing_data';
          }
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: this.translateService.instant(errorMessage),
            })
          );
        }

        const area = areas[payload.areaId];
        const grid = grids[payload.gridId];

        if (!area) {
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: this.translateService.instant(
                'sonner.connect_area_to_grid.area_does_not_exist'
              ),
            })
          );
        }

        if (!grid) {
          return of(
            GridsActions.connectAreaToInstanceFailure({
              error: this.translateService.instant(
                'sonner.connect_area_to_grid.grid_does_not_exist'
              ),
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
              error: this.translateService.instant(
                'sonner.connect_area_to_grid.already_connected',
                {
                  areaName: area.name ?? area.color,
                  gridName: grid.name,
                }
              ),
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
        if (grids?.length && areas) {
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
          GridsActions.saveFileFailure({
            error: this.translateService.instant('sonner.file.save_file'),
          })
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
          GridsActions.loadFileFailure({
            error: this.translateService.instant('sonner.file.read_file'),
          })
        );
      }),
      catchError((error) => {
        console.error('Failed to load file', error);
        return of(
          GridsActions.loadFileFailure({
            error: this.translateService.instant('sonner.file.load_file'),
          })
        );
      })
    )
  );
}
