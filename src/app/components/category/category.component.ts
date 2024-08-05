import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../Models/Category';
import { Product } from '../../Models/Product';
import { ActivatedRoute } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ColorListComponent } from '../color-list/color-list.component';
import { SizeListComponent } from '../size-list/size-list.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryListComponent,ColorListComponent , SizeListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories!:Category[];
  Product!:Product;
  activeCatId = 0;
  searchStr:string = "";
  sorting:string= "";
  pageIdx:number = 0;
  pageSize:number=10;
  Sizes:number[] = [];
  colors:number[]=[];

  constructor(private productService:ProductService,private router:ActivatedRoute){

  }
  ngOnInit(): void {
    let catId = this.router.snapshot.paramMap.get("id");
    if(catId)
      this.activeCatId = Number.parseInt(catId);
    this.productService.getProducts().subscribe({
      next:res=>{
        this.Product = res as Product;
        this.loadScript('../assets/js/categories_custom.js');
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
  sizeChanged(sizeEvent:number[]){

  }

  colorChanged(colorEvent:number[]){

  }


}
