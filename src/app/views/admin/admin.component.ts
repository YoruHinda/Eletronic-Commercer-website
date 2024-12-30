import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
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

  addProductModal() {

  }

  editProductModal(id: number) {

  }
}
