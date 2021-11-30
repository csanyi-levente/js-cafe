import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotsComponent } from './components/spots/spots.component';
import {SharedModule} from "../../shared/shared.module";
import {SpotManagementRoutingModule} from "./spot-management-routing.module";



@NgModule({
  declarations: [
    SpotsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SpotManagementRoutingModule
  ]
})
export class SpotManagementModule { }
