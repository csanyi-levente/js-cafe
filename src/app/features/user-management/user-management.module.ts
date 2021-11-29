import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserManagementRoutingModule} from "./user-management-routing.module";
import {UsersComponent} from "./components/users/users.component";
import {SharedModule} from "../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {UserComponent} from "./components/user/user.component";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserManagementRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
  ]
})
export class UserManagementModule { }
