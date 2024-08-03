import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"home" , component:HomeComponent},
  {path:"category/:id" , component:CategoryComponent},
  {path:"**" , component:HomeComponent}
];
