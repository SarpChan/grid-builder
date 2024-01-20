import { Route } from '@angular/router';
import { GridsEffects, gridsReducer } from '@grid-builder/state';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MainComponent } from './main/main.component';
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
    providers: [
      provideState('grids', gridsReducer),
      provideEffects(GridsEffects),
    ],
  },
  {
    path: 'preview',
    pathMatch: 'full',
    component: MainComponent,
  },
];
