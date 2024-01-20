import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { GridsEffects, gridsReducer } from '@grid-builder/state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ grids: gridsReducer }),

    provideRouter(appRoutes),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
