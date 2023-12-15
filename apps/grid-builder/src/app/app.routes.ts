import { Route } from '@angular/router';
import { MainComponent } from './main/main.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'preview',
    pathMatch: 'full',
    component: MainComponent,
  },
];
