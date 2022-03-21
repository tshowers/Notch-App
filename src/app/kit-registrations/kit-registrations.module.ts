import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitRegistrationsRoutingModule } from './kit-registrations-routing.module';
import { SharedModule } from '../shared/shared.module';

import { KitRegistrationListComponent } from './kit-registration-list/kit-registration-list.component';
import { KitRegistrationHomeComponent } from './kit-registration-home/kit-registration-home.component';
import { KitRegistrationViewComponent } from './kit-registration-view/kit-registration-view.component';
import { KitRegistrationFilterPipe } from './kit-registration-filter.pipe';
import { KitRegistrationEditComponent } from './kit-registration-edit/kit-registration-edit.component';



@NgModule({
  declarations: [KitRegistrationListComponent, KitRegistrationHomeComponent, KitRegistrationViewComponent, KitRegistrationFilterPipe, KitRegistrationEditComponent],
  imports: [
    CommonModule,
    KitRegistrationsRoutingModule,
    SharedModule
  ]
})
export class KitRegistrationsModule { }
