import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SecurityService } from '../../core/services/security/security.service';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product/product.service';
import { Product_Image } from '../../core/models/Product_Image';
import { DomSanitizer } from '@angular/platform-browser';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @ViewChild('shopCart') shopCartModal!: ElementRef
  isLogged!: boolean
  productsCart: Product[] = []
  images: Product_Image[] = []

  constructor(private securityService: SecurityService, private router: Router, private product_service: ProductService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.isLogged = this.securityService.isLogged();
    this.getAllImageByProducts()
    if (localStorage.getItem('ProductsCart')) {
      this.productsCart = JSON.parse(localStorage.getItem("ProductsCart") as string)
    }
  }

  logout() {
    this.securityService.logout();
  }

  userLoginNavigator() {
    if (this.securityService.isLogged() && this.securityService.getUserRole() == 'USER') {
      this.router.navigate([''])
    }
    if (this.securityService.isLogged() && this.securityService.getUserRole() == 'ADMIN') {
      this.router.navigate(['/admin'])
    }
    if (!(this.securityService.isLogged())) {
      this.router.navigate(['/login'])
    }
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

  openShopCart() {
    const modal = new bootstrap.Modal(this.shopCartModal.nativeElement)
    modal.show();
  }
}