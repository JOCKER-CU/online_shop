import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/category/category';
import { Product } from '../product';

declare var window: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  formModal: any;
  public products!: Product[] | null;
  public editProduct?: Product;
  public deleteProduct?: Product;
  productForm: FormGroup;  

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    
  }

  

  // Inject the FormBuilder service , productService, categoryService
  constructor(private fb: FormBuilder,private productService: ProductsService, private categoryService: CategoriesService) {
   // Initialize the productForm with the FormBuilder group() method
   this.productForm = this.fb.group({
    // Create a FormControl for each property of the Product class
    
    name: ['', Validators.required],
    price: [null, Validators.required],
    quantity: [null, Validators.required],
    // Create a FormArray for the categories property with a fixed length of 3
    categories: this.fb.array([
      this.fb.group({
        id: [null],
        name: ['', Validators.required]
      })
    ])
  });
  
  }

  // // Create a getter method for the categories FormArray
  get categories() {
    return this.productForm.get('categories') as FormArray;
  }

  // Create a method to submit the productForm data
  onSubmit() {
    // Get the value of the productForm as a Product object
    const product = this.productForm.value as Product;
    // Do something with the product data, such as sending it to a service or an API console.log(product);
   
    this.productService.addProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        this.formModal.hide()      
        this.formModal.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );
    
  }
  

  public onOpenModal(product: Product, mode: string): void {
    if (mode === 'add') {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('addProductModal')
      );
      this.formModal.show();
    }
    if (mode === 'edit') {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('updateProductModal')
        
      ); 
      this.formModal.show();
      this.editProduct =product

    }
    if (mode === 'delete') {
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('deleteProductModal')
      );
      this.formModal.show();
      this.deleteProduct =product
    }
  }
  public onCloseModal(){
    this.formModal.hide();
  }


  // public onOpenModal(product: Product, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');

  //   button.setAttribute('name', 'add');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //  
  //   if (mode === 'edit') {
  //     this.editProduct = product;
  //     button.setAttribute('data-target', '#updateProductModal');
  //   }
  //   if (mode === 'delete') {
  //     this.deleteProduct = product;
  //     button.setAttribute('data-target', '#deleteProductModal');
  //   }
  //   container?.appendChild(button);
  //   button.click();
  // }


  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );
  }

  // public onAddProduct(addForm: NgForm): void {
  //   document.getElementById('add-Product-form')?.click();
  //   console.log(addForm.value)
  //   // this.productService.addProduct(addForm.value).subscribe(
  //   //   (response: Product) => {
  //   //     console.log(response);
  //   //     this.getProducts();
  //   //     // addForm.reset();
  //   //   },
  //   //   (error: HttpErrorResponse) => {
  //   //     alert(error.message);
  //   //   //  addForm.reset();
  //   //   }
  //   // );
  // }

// update Product 
  public onUpdateProduct(product: Product): void {
    this.productService.editProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        this.formModal.hide();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );
  }
// Delete Product By Id 
  public onDeleteProduct(productId: number): void {
    this.productService.removeProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
        this.formModal.hide();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );
  }

  public catefordropdown: Category[] | undefined;


  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.catefordropdown = response;
        console.log(this.catefordropdown);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.formModal.reset()
      }
    );}


  // To Join Product And Category  
    selectedId!: number;
    selectedName:string | undefined;

    onSelectChange(event:any){
    console.log(event.target.name);
    const category = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
    this.selectedId = event.target.value;
    this.selectedName =this.catefordropdown?.find(cate => cate.id == event.target.value)?.name;

  }

}
