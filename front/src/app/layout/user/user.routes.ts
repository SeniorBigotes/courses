import { Routes } from "@angular/router";
import { UserComponent } from "./pages/user/user.component";
import { FormUserComponent } from "./components/form-user/form-user.component";

export const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'create', component: FormUserComponent },
    { path: 'update', component: FormUserComponent }
]