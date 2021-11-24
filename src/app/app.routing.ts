import {Routes} from "@angular/router";

export const appRoutes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  // {
  //   path: 'other-path',
  //   component: OtherComponent
  // },
  {
    path: '**',
    redirectTo: ''
  }
];
