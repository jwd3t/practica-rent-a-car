import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

// Template note:
// Keep root routes here only.
// Each bounded context can expose its own child routes file.
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(
    (m) => m.PageNotFound,
  );

export const routes: Routes = [
  { path: 'home', component: Home, title: 'Enterprise Fleet Manager - Home' },
  {
    path: 'operations',
    loadChildren: () =>
      import('./operations/presentation/views/operations.routes').then(
        (m) => m.operationsRoutes,
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: pageNotFound,
    title: 'Enterprise Fleet Manager - Page Not Found',
  },
];
