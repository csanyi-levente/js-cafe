import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './components/orders/orders.component';
import {SharedModule} from "../../shared/shared.module";
import {OrderManagementRoutingModule} from "./order-management-routing.module";



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    OrderManagementRoutingModule
  ]
})
export class OrderManagementModule { }
