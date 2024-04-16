import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./layout/index/index.routes').then(r => r.routes)},
    {path: 'login', loadChildren: () => import('./layout/login/login.routes').then(r => r.routes), title: 'Iniciar Sesion'},
];
