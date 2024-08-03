import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService)
  const router = inject(Router)
  return next(req).pipe(
    catchError((error:any)=>{
      if(error){
        console.log("error interceptor works")
        if(error.status === 401){
          router.navigate(['/home']);
        }
        if(error.error.message){
          toast.error(error.error.message , 'error');
        }
      }
      return throwError(error);
    })
  );
};
