import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ProductService } from '../../core/services/product/product.service';
import { Product_Image } from '../../core/models/Product_Image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  products: Product[] = [];
  images: Product_Image[] = [];

  constructor(private product_service: ProductService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllImageByProducts()
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

  addProductInCart(productToCart: Product) {
    let productsCart = []
    if (localStorage.getItem('ProductsCart')) {
      productsCart = JSON.parse(localStorage.getItem('ProductsCart') as string)
      productsCart.push(productToCart)
      localStorage.setItem("ProductsCart", JSON.stringify(productsCart))
      window.location.reload()
      return
    }
    productsCart.push(productToCart);
    localStorage.setItem("ProductsCart", JSON.stringify(productsCart))
    window.location.reload()
  }
}