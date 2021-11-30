import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./components/users/users.component";
import {UserComponent} from "./components/user/user.component";
import {NgModule} from "@angular/core";
import {UserGuard} from "../../core/services/user.guard";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'user',
    children: [
      { path: '',
        canActivate: [UserGuard],
        component: UserComponent
      },
      { path: ':id',
        canActivate: [UserGuard],
        component: UserComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
