import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SpotsComponent} from "./components/spots/spots.component";
import {AuthGuard} from "../../core/services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: SpotsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotManagementRoutingModule { }
