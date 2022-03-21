import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/commerice.model';


@Component({
  selector: 'notch-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];
  Total = 0;

  constructor() { }

  ngOnInit(): void {
  }

  decrementCartItem(item: any) : void {

  }

  incrementCartItem(item: any) : void {

  }

  removeItem(index : any) : void {

  }

}
