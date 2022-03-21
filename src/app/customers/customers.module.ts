import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LickAppWidgetTotalsModule } from 'lick-app-widget-totals';
import { SharedModule } from '../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFilterPipe } from './customer-filter.pipe';
import { CustomerScrollComponent } from './customer-scroll/customer-scroll.component';
import { LabStatusComponent } from './reports/lab-status/lab-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerHomeComponent,
    CustomerViewComponent,
    CustomerListComponent,
    CustomerFilterPipe,
    CustomerScrollComponent,
    LabStatusComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    LickAppWidgetTotalsModule,
    SharedModule
  ]
})
export class CustomersModule { }
