import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  product!: Product[];
  image!: any;
  constructor(private product_service: ProductService, private sanitizer: DomSanitizer) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.product_service.getProducts().subscribe((data) => {
      this.product = data;
    })
  }

  loadImage(id: number): any {
    this.product_service.getProductImage(id).subscribe((data) => {
      let objectURL = 'data:image/jpeg;base64,' + data
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
    return this.image
  }

}
