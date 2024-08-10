import { v4 as uuidv4 } from 'uuid';
export interface IBasketItem{
  id:Number;
  productName:string;
  price:number;
  quantity:number;
  pictureUrl:string;
  categoryId:number;
  categoryName:string;
}

export interface IBasket{
  id:string;
  basketItem:IBasketItem[];
  deliveryMethodId:number;
  clientSecret:string;
  paymentIntentId:string;

}


export class Basket implements IBasket{
  id: string = uuidv4();
  basketItem: IBasketItem[] = [];
  deliveryMethodId: number = 0;
  clientSecret: string = "";
  paymentIntentId: string = "";

}
