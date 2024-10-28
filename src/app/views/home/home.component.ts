import { Component, OnInit } from '@angular/core';
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

export class HomeComponent implements OnInit {
  products: Product[] = [];
  images: Image[] = []

  ngOnInit() {
    this.getAllProducts();
    this.getAllImageByProducts();
  }

  constructor(private product_service: ProductService, private sanitizer: DomSanitizer) {
  }

  getAllProducts() {
    this.product_service.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  getAllImageByProducts() {
    if (this.products != null) {
      this.products.forEach((product) => {
        this.product_service.getProductImage(product.product_image_name).subscribe((data) => {
          let objectURL = URL.createObjectURL(data);
          this.images.push(new Image(product.product_image_name, this.sanitizer.bypassSecurityTrustUrl(objectURL)))
        })
      })
    }
  }

  getImageByName(imageName: string) {
    if (this.images != null) {
      let image = this.images.find((image) => image.imageName === imageName)
      return image != null ? image.imageData : null
    }
  }
}

class Image {
  imageName: string;
  imageData: any;
  constructor(imageName: string, imageData: any) {
    this.imageName = imageName;
    this.imageData = imageData;
  }
}
