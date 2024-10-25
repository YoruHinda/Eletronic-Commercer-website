import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  product!: Product[];
  constructor(private product_service: ProductService) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.product_service.getProducts().subscribe((data) => {
      this.product = data;
    })
  }

}
