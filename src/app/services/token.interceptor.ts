import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const user = inject(UserService);

  let token = user.getCurrentUserFromLocal();
  if(token != undefined){
  let tokenReq = req.clone({
    setHeaders:{
      Authorization:'bearer '+token.token
    }
  })
  return next(tokenReq);
  }else{
    return next(req);
  }

};
