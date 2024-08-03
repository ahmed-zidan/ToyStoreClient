import { Injectable } from '@angular/core';
import { UserLoginRes } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user!:UserLoginRes;
  constructor() { }

  getCurrentUserFromLocal(){
   return this.user;
  }
}
