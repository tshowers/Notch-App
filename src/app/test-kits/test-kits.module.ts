import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LickAppWidgetTotalsModule } from 'lick-app-widget-totals';
import { SharedModule } from '../shared/shared.module';

import { TestKitsRoutingModule } from './test-kits-routing.module';
import { TestKitsComponent } from './test-kits.component';
import { TestKitHomeComponent } from './test-kit-home/test-kit-home.component';
import { TestKitListComponent } from './test-kit-list/test-kit-list.component';
import { TestKitViewComponent } from './test-kit-view/test-kit-view.component';
import { TestKitEditComponent } from './test-kit-edit/test-kit-edit.component';
import { TestKitOrderFilterPipe } from './test-kit-order-filter.pipe';


@NgModule({
  declarations: [
    TestKitsComponent,
    TestKitHomeComponent,
    TestKitListComponent,
    TestKitViewComponent,
    TestKitEditComponent,
    TestKitOrderFilterPipe
  ],
  imports: [
    CommonModule,
    TestKitsRoutingModule,
    FormsModule,
    LickAppWidgetTotalsModule,
    SharedModule

  ]
})
export class TestKitsModule { }
