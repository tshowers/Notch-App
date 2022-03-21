import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


import { InvalidOrdersRoutingModule } from './invalid-orders-routing.module';
import { InvalidOrdersComponent } from './invalid-orders.component';
import { InvalidOrderHomeComponent } from './invalid-order-home/invalid-order-home.component';
import { InvalidOrderViewComponent } from './invalid-order-view/invalid-order-view.component';
import { InvalidOrderListComponent } from './invalid-order-list/invalid-order-list.component';


@NgModule({
  declarations: [
    InvalidOrdersComponent,
    InvalidOrderHomeComponent,
    InvalidOrderViewComponent,
    InvalidOrderListComponent,
  ],
  imports: [
    CommonModule,
    InvalidOrdersRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class InvalidOrdersModule { }
