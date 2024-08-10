import { Injectable, signal } from '@angular/core';
import { Basket, IBasket } from '../Models/Basket';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  _basket = signal<IBasket>({basketItem:[] , id:"0",clientSecret:"",deliveryMethodId:0,paymentIntentId:""});

  constructor(private http:HttpClient) { }

  getBasketIdFromLocal(){
    return localStorage.getItem("basketId");
  }

  setBasketIdInLocalStorage(id:string){
    localStorage.setItem("basketId" , id);
  }

  getBasket(){
    let basketId = this.getBasketIdFromLocal();
    if(basketId == undefined){
      basketId = new Basket().id;
      this.setBasketIdInLocalStorage(basketId);
    }
    return this.http.get(environment.apiUrl + "Basket/getBasket/" +basketId);
   }


   updateBasket(basket:IBasket){
    return this.http.put(environment.apiUrl+"Basket/updateBasket",basket);
   }

   deleteBasket(basketId:string){
    return this.http.delete(environment.apiUrl+"Basket/deleteBasket/"+basketId);
   }

}
