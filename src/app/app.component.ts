import { Component, OnInit } from '@angular/core';
import { Product } from './product/product';
import { ProductsService } from './services/products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  [x: string]: any;
  ngOnInit(): void {
   
  }
  

  
}
