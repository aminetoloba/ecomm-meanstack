import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http=inject(HttpClient);
  items:CartItem[]=[]
  constructor() { }
  init(){
    this.getCartItems().subscribe(result=>{
      this.items = result;
    })
  }
  getCartItems(){
    return this.http.get<CartItem[]>(
      environment.apiUrl+'/customer/carts'
    );
  }
  addToCart(productId:string,quantity:number){
    return this.http.post(environment.apiUrl + '/customer/carts/' + productId, {
      quantity: quantity,
    });
  }
  removeFromCart(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/carts/' + productId);
  }
}
