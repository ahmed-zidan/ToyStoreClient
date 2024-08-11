import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Pagination } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(pagination:Pagination){
    return this.http.post(environment.apiUrl + "Product/getAllProducts",pagination)
  }

  getProduct(id:string){
    return this.http.get(environment.apiUrl + "Product/getProduct/"+id)
  }
}
