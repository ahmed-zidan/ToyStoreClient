import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '../../Models/Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit  {
  product!:ProductItem;
  constructor(private toastService:ToastrService , private productService:ProductService , private basketService:BasketService,
    private activeRouter:ActivatedRoute
  ){

  }
  ngOnInit(): void {
    let currProductId = this.activeRouter.snapshot.paramMap.get("id");
    if(currProductId)
      this.productService.getProduct(currProductId).subscribe({
        next:res=>{
          this.product = res as ProductItem;
          this.loadScript('../assets/js/single_custom.js');
        }
      })
  }


  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
