import { Routes } from "@angular/router"
import { IndexComponent } from "./pages/index/index.component"

export const routes: Routes = [
    { path: '', component: IndexComponent, children: [
        { path: '', loadChildren: () => import('../main/main.routes').then(r => r.routes) },
        { path: 'upload', loadChildren: () => import('../upload-course/upload.routes').then(r => r.routes) },
        { path: 'users', loadChildren: () => import('../user/user.routes').then(r => r.routes) },
        { path: 'view', loadChildren: () => import('../view-course/view.routes').then(r => r.routes) },
    ]},
]