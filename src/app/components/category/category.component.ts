import { afterNextRender, afterRender, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category } from '../../Models/Category';
import { Pagination, Product, ProductItem } from '../../Models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ColorListComponent } from '../color-list/color-list.component';
import { SizeListComponent } from '../size-list/size-list.component';
import { filter, map } from 'rxjs';

//declare var jQuery:any;
//declare var Isotope: any;

import Isotope from 'isotope-layout';
import { animate, style, transition, trigger } from '@angular/animations';
import { BasketService } from '../../services/basket.service';
import { IBasket } from '../../Models/Basket';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryListComponent,ColorListComponent , SizeListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, transform: 'scale(0.5)' }))
      ])
    ])
  ]
})
export class CategoryComponent implements OnInit{
  categories!:Category[];
  pagination!:Pagination;
  Product!:Product;
  activeCatId = 0;
  doAfterRender = 0;
  constructor(private productService:ProductService,private activeRouter:ActivatedRoute,private basket:BasketService,
    private toasService:ToastrService
   ){
    afterRender(()=>{
      if(this.doAfterRender){
        const grid = document.getElementsByClassName("product-grid")[0] as HTMLElement;
        let isotope = new Isotope(grid, {
          itemSelector: '.product-item',
        });
        isotope.arrange({filter:'*',layoutMode: 'fitRows',transitionDuration: '3s',sortBy:"price"});

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
    this.pagination = {categoryId:this.activeCatId,colors:[],sizes:[],pageIdx:0,pageSize:10,search:'',sorting:'',minPrice:0,maxPrice:580};
    this.productService.getProducts(this.pagination).subscribe({
      next:res=>{
        this.Product = res as Product;
        console.log(res);
        console.log(this.Product)
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
      console.log('this.pagination.pageSize < pageSize')
      this.pagination.pageSize = pageSize;
      this.refreshProducts();
  }


  priceChanged(ammount:string){

    var priceMin =parseFloat(ammount.split('-')[0].replace('$', ''));
    var priceMax = parseFloat(ammount.split('-')[1].replace('$', ''));
    this.pagination.minPrice = priceMin;
    this.pagination.maxPrice = priceMax;
    this.refreshProducts();
  }

  changeSort(sort:string){
    this.pagination.sorting = sort;
    this.refreshProducts();
  }


  nextPage(){
    this.pagination.pageIdx+=1;
    this.refreshProducts();
  }

  getPaginationList(){
    let start = this.Product.pageNumber-5>0?this.Product.pageNumber-5:this.Product.pageNumber;
    let end = this.Product.pageNumber+5<this.Product.pageCount?this.Product.pageNumber+5:this.Product.pageCount;
    let pageList = [];
    for(let i = start+1;i<end;i++){
      pageList.push(i);
    }
    return pageList;
  }

  addToCart(item:ProductItem){
    let basketItem ={
      id:item.id,
      productName:item.name,
      price:item.sellPrice,
      quantity:1,
      pictureUrl:item.imageUrl,
      categoryId:item.categotyId,
      categoryName:item.categoryName
    }

    this.basket.getBasket().subscribe({
      next:res=>{
        let basketData = res as IBasket;
        console.log(res);
        basketData.basketItem.push(basketItem);
        this.basket.updateBasket(basketData).subscribe({
          next:res=>{
            this.basket._basket.set(basketData);
            this.toasService.success("Success" , "Added To Cart Successfully");
          }
        })
      }
    })
  }

}
