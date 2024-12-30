import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product/product.service';
import { Product_Image } from '../../core/models/Product_Image';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  images: Product_Image[] = []

  constructor(private product_service: ProductService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllImageByProducts();
  }

  getAllProducts() {
    this.product_service.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  getAllImageByProducts() {
    this.product_service.getProductImages().subscribe((data) => {
      this.images = data
    })
  }

  getImageByName(imageName: string) {
    let image = this.images.find((image) => image.product_image_name === imageName)
    let objectURL = 'data:image/jpeg;base64,' + image?.image
    return image != null ? this.sanitizer.bypassSecurityTrustUrl(objectURL) : null
  }
}