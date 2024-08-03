import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {

   }

   getCategories(){
    return this.http.get(environment.apiUrl + "Category/getAll");
   }
}
