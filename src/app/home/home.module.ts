import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from '../commerce/check-out/check-out.component';
import { CartComponent } from '../commerce/cart/cart.component';
import { CatalogComponent } from '../commerce/catalog/catalog.component';
import { SpotlightComponent } from '../commerce/spotlight/spotlight.component';



@NgModule({
  declarations: [
    HomeComponent,
    CheckOutComponent,
    CartComponent,
    CatalogComponent,
    SpotlightComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class HomeModule { }