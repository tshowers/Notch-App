import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [{ path: '', component: UserHomeComponent, data: { title: 'User Admin' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
