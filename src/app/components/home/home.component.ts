import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';
import { ToastrService } from 'ngx-toastr';
import { HomeData } from '../../Models/HomeData';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  homeData!:HomeData;
constructor(private homeService:HomeServiceService , private toast:ToastrService){

}
  ngOnInit(): void {
    this.homeService.getHomeData().subscribe({
      next:res=>{
        this.homeData = res as HomeData;
      }
    })
  }

}
