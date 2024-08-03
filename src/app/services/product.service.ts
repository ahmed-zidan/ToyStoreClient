import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(categoryId:number = 0,txtSearch:string = "", sorting:string="",pageIdx:number=0,pageSize:number=10){
    return this.http.get(environment.apiUrl + "Product/getAllProducts?categoryId="+categoryId+
      "&search="+txtSearch+"&sorting="+sorting+"&pageIdx="+pageIdx+"&pageSize="+pageSize)
  }
}
