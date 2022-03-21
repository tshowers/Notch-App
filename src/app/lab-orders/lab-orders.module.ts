import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LabOrdersRoutingModule } from './lab-orders-routing.module';
import { LabOrdersComponent } from './lab-orders.component';
import { LabOrderHomeComponent } from './lab-order-home/lab-order-home.component';
import { LabOrderListComponent } from './lab-order-list/lab-order-list.component';
import { LabOrderViewComponent } from './lab-order-view/lab-order-view.component';
import { LabOrderEditComponent } from './lab-order-edit/lab-order-edit.component';
import { LabOrderFilterPipe } from './lab-order-filter.pipe';
import { LabOrderViewEditComponent } from './lab-order-view-edit/lab-order-view-edit.component';
import { LabOrderUploadComponent } from './lab-order-upload/lab-order-upload.component';
import { ReportLinkComponent } from './report-link/report-link.component';

@NgModule({
  declarations: [
    LabOrdersComponent,
    LabOrderHomeComponent,
    LabOrderListComponent,
    LabOrderViewComponent,
    LabOrderEditComponent,
    LabOrderFilterPipe,
    LabOrderViewEditComponent,
    LabOrderUploadComponent,
    ReportLinkComponent,
  ],
  imports: [
    CommonModule,
    LabOrdersRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class LabOrdersModule { }
