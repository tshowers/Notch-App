import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitRegistrationHomeComponent } from './kit-registration-home/kit-registration-home.component';

const routes: Routes = [{ path: '', component: KitRegistrationHomeComponent, data: { title: 'Kit Registraions Admin' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitRegistrationsRoutingModule { }
