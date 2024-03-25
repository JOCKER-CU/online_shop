import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private  apiServerUrl=environment.apiBaseUrl;


  constructor(private http:HttpClient) {
console.log(environment.apiBaseUrl)
   }
   public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/all`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/product/add`, product);
  }

  public editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/product/edit`, product);
  }

  public removeProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/product/remove/${productId}`);
  }

  
}
