import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./components/users/users.component";
import {UserComponent} from "./components/user/user.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'user',
    children: [
      { path: '', component: UserComponent },
      { path: ':id', component: UserComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
