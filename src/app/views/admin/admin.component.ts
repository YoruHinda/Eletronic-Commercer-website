import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class AdminComponent implements OnInit {
  @ViewChild('addProductModal') addProductModal!: ElementRef;
  @ViewChild('editProductModal') editProductModal!: ElementRef;
  @ViewChild('editProductForm') form!: NgForm;

  products: Product[] = []

  constructor(private productService: ProductService) {

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

  openAddProductModal() {
    let modal = new bootstrap.Modal(this.addProductModal.nativeElement)
    modal.show()
  }

  openProductEditorModal(product: Product) {
    let modal = new bootstrap.Modal(this.editProductModal.nativeElement)
    modal.show()
    this.form.controls['productName'].setValue(product.product_name)
    this.form.controls['productDescription'].setValue(product.product_description)
    this.form.controls['productQuantity'].setValue(product.product_quantity)
    this.form.controls['productPrice'].setValue(product.product_price)
  }
}
