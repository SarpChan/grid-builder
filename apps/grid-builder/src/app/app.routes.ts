import { Route } from '@angular/router';
import {
  AppSettingsEffects,
  GridsEffects,
  ItemsEffects,
  appSettingsReducer,
  gridsReducer,
} from '@grid-builder/state';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MainComponent } from './main/main.component';
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
    providers: [
      provideState('grids', gridsReducer),
      provideEffects(GridsEffects),
      provideState('appSettings', appSettingsReducer),
      provideEffects(AppSettingsEffects),
      provideEffects(ItemsEffects),
    ],
  },
  {
    path: 'preview',
    pathMatch: 'full',
    component: MainComponent,
  },
];
