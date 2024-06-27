import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  appSettingsReducer,
  gridsReducer,
  itemsReducer,
} from '@grid-builder/state';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      grids: gridsReducer,
      items: itemsReducer,
      appSettings: appSettingsReducer,
    }),

    provideRouter(appRoutes),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      },
    },
  ],
};
