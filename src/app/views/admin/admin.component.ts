import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product/product.service';
import { FormsModule, NgForm } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('addProductModal') addProductModal!: ElementRef;
  @ViewChild('editProductModal') editProductModal!: ElementRef;
  @ViewChild('editProductForm') form!: NgForm;

  products: Product[] = []

  productAddModal: any
  productEditModal: any

  fileToUpload!: File

  productToUpdate!: Product;

  constructor(private productService: ProductService) {

  }
  ngAfterViewInit(): void {
    this.productAddModal = new bootstrap.Modal(this.addProductModal.nativeElement)
    this.productEditModal = new bootstrap.Modal(this.editProductModal.nativeElement)
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

  deleteProduct(id: number) {
    this.productService.removeProduct(id).subscribe(() => {
      window.location.reload()
    });
  }

  createProduct(form: NgForm) {
    let productToSave = new Product(form.value['productName'], form.value['productDescription'], form.value['productQuantity'], form.value['productPrice'])
    this.productService.addNewProduct(productToSave, this.fileToUpload).subscribe(() => {
      this.productAddModal.hide()
      window.location.reload()
    })
  }

  updateProduct(form: NgForm) {
    let productUpdated = new Product(form.value['productName'], form.value['productDescription'], form.value['productQuantity'], form.value['productPrice'])
    this.productService.updateProduct(this.productToUpdate.id, productUpdated).subscribe(() => {
      this.productEditModal.hide()
      window.location.reload()
    })
  }

  openAddProductModal() {
    this.productAddModal.show()
  }

  openProductEditorModal(product: Product) {
    this.productEditModal.show()
    this.form.controls['productName'].setValue(product.product_name)
    this.form.controls['productDescription'].setValue(product.product_description)
    this.form.controls['productQuantity'].setValue(product.product_quantity)
    this.form.controls['productPrice'].setValue(product.product_price)
    this.productToUpdate = product;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0]
  }
}
