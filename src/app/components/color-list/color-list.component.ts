import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListNameAndId } from '../../Models/General';
import { ColorService } from '../../services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-list',
  standalone: true,
  imports: [],
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.css'
})
export class ColorListComponent implements OnInit {
  colors!:ListNameAndId[];
  activeColor:number[] = [];
  @Output() outColor = new EventEmitter<number[]>();
  constructor(private colorService:ColorService , private toast:ToastrService){

  }
  ngOnInit(): void {
    this.colorService.getColors().subscribe({
      next:res=>{
        this.colors = res as ListNameAndId[];
      }
    })
  }

  colorChanged(id:number){
    if(this.activeColor.includes(id)){
      this.activeColor = this.activeColor.filter(x=>x != id);
    }else{
      this.activeColor.push(id);
    }
    this.outColor.emit(this.activeColor);

  }

}
