import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ProductsService } from './services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryDeleteComponent,
    ProductDeleteComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([{ path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent }])
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
