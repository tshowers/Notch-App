import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerScrollComponent } from './customer-scroll/customer-scroll.component';

const routes: Routes = [
  { path: '', component: CustomersComponent, data: { title: 'Administration' } },
  { path: 'customers', component: CustomerHomeComponent, data: { title: 'Customer Admin' }},
  { path: 'customers-scroll', component: CustomerScrollComponent, data: { title: 'Customers Admin' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
