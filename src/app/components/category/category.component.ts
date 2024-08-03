import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../Models/Category';
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories!:Category[];
  Product!:Product;
  constructor(private productService:ProductService , private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:res=>{
        this.Product = res as Product;
        console.log(this.Product)
      }
    })

    this.categoryService.getCategories().subscribe({
      next:res=>{
        this.categories = res as Category[];
      }
    })
  }
}
