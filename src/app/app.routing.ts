import {Routes} from "@angular/router";
import {AuthGuard} from "./core/services/auth.guard";
import {UsersResolver} from "./features/user-management/users.resolver";

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/user-management/user-management.module').then((m) => m.UserManagementModule),
    resolve: {
      users: UsersResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  },
];
