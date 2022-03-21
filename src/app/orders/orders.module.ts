import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LickAppWidgetTotalsModule } from 'lick-app-widget-totals';
import { SharedModule } from '../shared/shared.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderHomeComponent } from './order-home/order-home.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFilterPipe } from './order-filter.pipe';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderHomeComponent,
    OrderViewComponent,
    OrderListComponent,
    OrderFilterPipe
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    LickAppWidgetTotalsModule,
    SharedModule
  ]
})
export class OrdersModule { }
