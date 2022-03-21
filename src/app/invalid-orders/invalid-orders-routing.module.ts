import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvalidOrdersComponent } from './invalid-orders.component';
import { InvalidOrderHomeComponent } from './invalid-order-home/invalid-order-home.component';

const routes: Routes = [{ path: '', component: InvalidOrderHomeComponent, data: { title: 'Invalid Orders Admin' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvalidOrdersRoutingModule { }
