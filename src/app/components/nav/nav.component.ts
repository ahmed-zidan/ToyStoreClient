import { Component, effect, OnInit } from '@angular/core';
import { IBasket } from '../../Models/Basket';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  basket!:IBasket;
  constructor(private basketService:BasketService){
    effect(()=>{
      this.basket = basketService._basket();
    })
  }
  ngOnInit(): void {
    this.basketService.getBasket();
  }
}
