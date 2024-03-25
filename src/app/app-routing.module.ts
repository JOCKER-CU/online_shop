import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';

const routes: Routes = [
  {path: '' , redirectTo:'/category',  pathMatch: 'full'},
  {path: 'category',component: CategoryListComponent  },
  {path: 'category/category-list', component: CategoryListComponent  },
  {path: 'category/category-add', component: CategoryAddComponent  },
  {path: 'category/category-edit', component: ProductComponent  },
  {path: 'category/category-delete', component: CategoryDeleteComponent  },

  {path: 'product', component: ProductListComponent  },
  {path: 'product/product-list', component: ProductListComponent  },
  {path: 'product/product-add', component: ProductAddComponent  },
  {path: 'product/product-edit', component: ProductEditComponent  },
  {path: 'product/product-delete', component: ProductDeleteComponent  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
