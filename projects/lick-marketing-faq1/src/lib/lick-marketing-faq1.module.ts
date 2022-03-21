import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LickMarketingFaq1Component } from './lick-marketing-faq1.component';

@NgModule({
  declarations: [LickMarketingFaq1Component],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LickMarketingFaq1Component]
})
export class LickMarketingFaq1Module { }
