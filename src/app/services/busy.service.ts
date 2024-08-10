import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  spinnerCounter = 0;
  constructor(private spinnerService:NgxSpinnerService) { }

  busy(){
    this.spinnerCounter++;
    this.spinnerService.show(undefined,{
      //type:'ball-scale-multiple',
      bdColor:'white',
      //color:'#333333',
    });
  }

  idle(){
    this.spinnerCounter--;
    if(this.spinnerCounter<=0){
      this.spinnerCounter = 0;
      this.spinnerService.hide();
    }
  }
}
