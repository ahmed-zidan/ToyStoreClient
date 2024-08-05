import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListNameAndId } from '../../Models/General';
import { SizeService } from '../../services/size.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-size-list',
  standalone: true,
  imports: [],
  templateUrl: './size-list.component.html',
  styleUrl: './size-list.component.css'
})
export class SizeListComponent implements OnInit {
sizes!:ListNameAndId[];
activeSizes:number[]=[];
@Output() outSize = new EventEmitter<number[]>();
constructor(private sizeService:SizeService , private toast:ToastrService){
this.activeSizes.includes(0)
}
  ngOnInit(): void {
    this.sizeService.getSizes().subscribe({
      next:res=>{
        this.sizes = res as ListNameAndId[];
      }
    })
  }

  changeSize(id:number){
    if(this.activeSizes.includes(id) == true){
      this.activeSizes = this.activeSizes.filter(x=>x != id);
    }else{
      this.activeSizes.push(id);
    }
    this.outSize.emit(this.activeSizes);
  }
}
