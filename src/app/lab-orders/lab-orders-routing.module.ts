import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabOrderHomeComponent } from './lab-order-home/lab-order-home.component';
import { LabOrderResolverService } from './lab-order-resolver.service';
import { LabOrderViewEditComponent} from './lab-order-view-edit/lab-order-view-edit.component';

const routes: Routes = [
  { path: '', component: LabOrderHomeComponent, data: { title: 'Lab Order Admin' } },
  { path: 'new', component: LabOrderViewEditComponent, data: { title: 'Lab Order Create' } },
  { path: ':id',  component: LabOrderViewEditComponent, data: { title: 'Lab Order View' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LabOrderResolverService
  ]
})
export class LabOrdersRoutingModule { }
