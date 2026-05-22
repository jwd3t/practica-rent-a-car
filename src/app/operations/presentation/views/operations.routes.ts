import { Routes } from '@angular/router';

const newRental = () =>
  import('./new-rental/new-rental').then((m) => m.NewRental);

export const operationsRoutes: Routes = [
  { path: 'rentals/new', loadComponent: newRental, title: 'Enterprise Fleet Manager - New Rental' },
];
