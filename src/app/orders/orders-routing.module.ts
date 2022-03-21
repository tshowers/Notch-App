import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderHomeComponent } from './order-home/order-home.component';

const routes: Routes = [{ path: '', component: OrderHomeComponent, data: { title: 'Order Admin' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
