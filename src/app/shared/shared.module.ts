import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        RouterModule,
        MatIconModule
    ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class SharedModule { }
