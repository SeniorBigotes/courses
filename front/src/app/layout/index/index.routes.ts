import { Routes } from "@angular/router"
import { IndexComponent } from "./pages/index/index.component"

export const routes: Routes = [
    { path: '', component: IndexComponent, children: [
        { path: '', loadChildren: () => import('../main/main.routes').then(r => r.routes), title: 'Menu' },
        { path: 'upload', loadChildren: () => import('../upload-course/upload.routes').then(r => r.routes), title: 'Subir Curso' },
        { path: 'users', loadChildren: () => import('../user/user.routes').then(r => r.routes), title: 'Usuarios' },
        { path: 'view/:curso', loadChildren: () => import('../view-course/view.routes').then(r => r.routes), title: 'Lecciones' },
    ]},
]