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
    loadChildren: () => import('./features/user-management/user-management.module').then((m) => m.UserManagementModule),
    resolve: {
      users: UsersResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'spots',
    loadChildren: () => import('./features/spot-management/spot-management.module').then((m) => m.SpotManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/order-management/order-management.module').then((m) => m.OrderManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  },
];
