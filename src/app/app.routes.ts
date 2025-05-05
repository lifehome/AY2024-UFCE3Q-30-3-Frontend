import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'branches',
    loadComponent: () => import('./branches/branches.component').then(m => m.BranchesComponent)
  },
];
