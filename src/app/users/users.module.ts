import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule  } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserFilterPipe } from './user-filter.pipe';


@NgModule({
  declarations: [
    UsersComponent,
    UserHomeComponent,
    UserListComponent,
    UserEditComponent,
    UserViewComponent,
    UserFilterPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UsersModule { }
