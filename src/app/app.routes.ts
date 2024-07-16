import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : 'dashboard',
        loadComponent : () => import('./components/users-dashboard/users-dashboard.component').then( comp => comp.UsersDashboardComponent)
    },
    {
        path : 'add-users',
        loadComponent : () => import('./components/add-users/add-users.component').then( comp => comp.AddUsersComponent)
    },
    {
        path : 'edit-users/:userId',
        loadComponent : () => import('./components/edit-users/edit-users.component').then( comp => comp.EditUsersComponent)
    },
    {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
    },
    {
        path : '**',
        redirectTo : ''
    }
];
