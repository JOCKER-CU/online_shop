import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from 'src/app/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  formModal: any;
  public categories!: Category[] | null;

  public editCategory?: Category;
  public deleteCategory?: Category;
  categoryForm: FormGroup;
  onDeleteProduct: any;
  

  ngOnInit() {
    this.getCategories();
  }

  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      // Create a FormControl property of the Category class
      name: ['', Validators.required]

    });
  }

  // Create a getter method for the categories FormArray
  get categories_ar() {
    return this.categoryForm.get('categories') as FormArray;
  }

  // Create a method to submit the productForm data
  onSubmit() {
    // Get the value of the productForm as a Product object
    const category = this.categoryForm.value as Category;
    // Do something with the product data, such as sending it to a service or an API console.log(product);

    this.categoryService.addCategory(category).subscribe(
      (response: Category) => {
        console.log(response);
        this.getCategories();
        this.formModal.hide();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset();
      }
    );

  }

  public onOpenModal(category: Category, mode: string): void {
    if (mode === 'add') {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('addCategoryModal')
      );
      this.formModal.show();
    }
    if (mode === 'edit') {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('updateCategoryModal')

      );
      this.formModal.show();
      this.editCategory = category

    }
    if (mode === 'delete') {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('deleteCategoryModal')
      );
      this.formModal.show();
      this.deleteCategory = category
    }
  }


  //Getting All Products in the Database
  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // update Category 
  public onUpdateCategory(category: Category): void {
    this.categoryService.editCategory(category).subscribe(
      (response: Category) => {
        console.log(response);
        this.getCategories();
        this.formModal.hide();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );
  }

  // Delete Category By Id 
  public onDeleteCategory(categoryId: number): void {
    this.categoryService.removeCategory(categoryId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCategories();
        this.formModal.hide();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );
  }

  //Modal Box for Adding, Deleting, Editing

  public onCloseModal() {
    this.formModal.hide();
  }
}
