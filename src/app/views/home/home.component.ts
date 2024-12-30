import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { forkJoin, map, tap } from 'rxjs';
import { ProductService } from '../../core/services/product/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  products: Product[] = [];
  images: any;

  constructor(private product_service: ProductService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllImageByProducts()
    console.log(this.products)
    console.log(this.images)
  }

  getAllProducts() {
    this.product_service.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  getAllImageByProducts() {
    const imagesRequest = this.products.map(product => {
      this.product_service.getProductImage(product.product_image_name).pipe(map(data => ({
        name: product.product_image_name,
        blob: data
      })))
    })
    forkJoin([imagesRequest]).subscribe(responseList => {
      this.images = responseList;
    })
  }

  // getImageByName(imageName: string) {
  // let image = this.images.find((image) => image.imageName === imageName)
  // return image != null ? image.imageData : null
  // }
}

class Image {
  imageName: string;
  imageData: any;
  constructor(imageName: string, imageData: any) {
    this.imageName = imageName;
    this.imageData = imageData;
  }
}
