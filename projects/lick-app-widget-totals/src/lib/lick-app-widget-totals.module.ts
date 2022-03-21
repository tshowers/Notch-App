import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LickAppWidgetTotalsComponent } from './lick-app-widget-totals.component';

@NgModule({
  declarations: [LickAppWidgetTotalsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LickAppWidgetTotalsComponent]
})
export class LickAppWidgetTotalsModule { }
