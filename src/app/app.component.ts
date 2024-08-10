import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { animate, style, transition, trigger } from '@angular/animations';
import { BasketService } from './services/basket.service';
import { IBasket } from './Models/Basket';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,FooterComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('basicAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('0.8s ease-in', style({ opacity: 0, transform: 'scale(0.5)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  title = 'storeClient';

  constructor(private basketService:BasketService){

  }
  ngOnInit(): void {
    this.basketService.getBasket().subscribe({
      next:res=>{
        this.basketService._basket.set(res as IBasket);
      }
    })
  }
}
