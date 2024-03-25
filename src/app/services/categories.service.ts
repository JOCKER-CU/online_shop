import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  [x: string]: any;

  
  private  apiServerUrl=environment.apiBaseUrl;


  constructor(private http:HttpClient) {
console.log(environment.apiBaseUrl)
   }
   public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/all`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/category/add`, category);
  }

  public editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/category/edit`, category);
  }

  public removeCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/category/remove/${categoryId}`);
  }
}
