import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../Models/Category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories!:Category[];
  @Input() activeCatId = 0;
  @Output() outCategoty = new EventEmitter<number>();
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next:res=>{
        this.categories = res as Category[];
      }
    })
  }

  changeCategory(id:number){
    this.activeCatId = id;
    this.outCategoty.emit(id);
  }
}
