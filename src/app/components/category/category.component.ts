import { afterNextRender, afterRender, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category } from '../../Models/Category';
import { Pagination, Product } from '../../Models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ColorListComponent } from '../color-list/color-list.component';
import { SizeListComponent } from '../size-list/size-list.component';
import { filter, map } from 'rxjs';

declare var jQuery:any;
//declare var Isotope: any;
declare function loadGrid():void;
import Isotope from 'isotope-layout';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryListComponent,ColorListComponent , SizeListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  private isotope!: Isotope;
  categories!:Category[];
  pagination!:Pagination;
  Product!:Product;
  activeCatId = 0;
  doAfterRender = 0;
  constructor(private productService:ProductService,private activeRouter:ActivatedRoute ){
    afterRender(()=>{
      if(this.doAfterRender){
        const grid = document.getElementsByClassName("product-grid")[0] as HTMLElement;
        this.isotope = new Isotope(grid, {
          itemSelector: '.product-item',
          //layoutMode: 'fitRows',
          filter:'*',
        });
        this.doAfterRender = 0;
      }
    })

  }


  ngOnInit(): void {
   this.activeRouter.paramMap
      .pipe(map(() => window.history.state)).subscribe({
        next:res=>{
          this.activeCatId = res.Id;
        }
      })
    this.pagination = {categoryId:this.activeCatId,colors:[],sizes:[],pageIdx:0,pageSize:10,search:'',sorting:''};
    this.productService.getProducts(this.pagination).subscribe({
      next:res=>{
        this.Product = res as Product;
        //console.log(this.Product)
        this.loadScript('../assets/js/categories_custom.js');
      }
    })
   //this.refreshProducts();
  }

  refreshProducts(){
    this.productService.getProducts(this.pagination).subscribe({
      next:res=>{
        this.Product = res as Product;
        this.doAfterRender = 1;
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
    this.pagination.sizes = sizeEvent;
    this.refreshProducts();
  }

  colorChanged(colorEvent:number[]){
    this.pagination.colors = colorEvent;
    this.refreshProducts();
  }


  changeCategory(categoryEvent:number){
    this.pagination.categoryId = categoryEvent;
    this.refreshProducts();
  }

  onPageIndedxClick(pageSize:number){
      if(this.pagination.pageSize > pageSize){
      console.log('this.pagination.pageSize > pageSize')

    }else{
      console.log('this.pagination.pageSize < pageSize')
      this.pagination.pageSize = pageSize;
      this.refreshProducts();
    }
  }


}
