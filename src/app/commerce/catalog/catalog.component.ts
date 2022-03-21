import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/commerice.model';

@Component({
  selector: 'notch-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  currentFilter: any;

  items: CartItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setFilter(type: any) : void {

  }

  addToCart(item: any) : void {

  }

}
