import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalItems: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(newItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;
    // check if item already in cart
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find((item) => item.id === newItem.id)!;
      // for (let item of this.cartItems) {
      //   if (item.id === newItem.id) {
      //     existingCartItem = item;
      //     break;
      //   }
      // }

      // check if found in cart
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      // increment quantity
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(newItem);
    }

    this.calculateCartTotal();
  }
  calculateCartTotal() {
    let totalPriceValue: number = 0;
    let totalItemsValue: number = 0;

    for (let item of this.cartItems) {
      totalPriceValue += item.quantity * item.unitPrice;
      totalItemsValue += item.quantity;
    }

    // publish new values... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalItems.next(totalItemsValue);

    // log cart data for debugging
    this.logCartData(totalPriceValue, totalItemsValue);
  }
  logCartData(totalPriceValue: number, totalItemsValue: number) {
    console.log('Items in Cart: ');
    for (let item of this.cartItems) {
      const subTotalPrice = item.quantity * item.unitPrice;
      console.log(
        `name: ${item.name} - quantity=${item.quantity} - unitPrice=${item.unitPrice} - subTotalPrice=${subTotalPrice}`
      );
    }
    console.log(
      `totalPrice: ${totalPriceValue.toFixed(2)}, totalItems: ${
        this.totalItems
      }`
    );
    console.log('-----');
  }
}
