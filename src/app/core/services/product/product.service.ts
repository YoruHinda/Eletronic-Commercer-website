import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../../environments/environment';
import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url: string = environment.apiUrl + '/products/'
  api_url_image: string = environment.apiUrl + '/products/product_image/'
  admin_api_url: string = environment.apiUrl + '/products/admin/'

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api_url);
  }

  getProductImage(imageName: string) {
    return this.httpClient.get(this.api_url_image + imageName, { responseType: 'blob' });
  }

  addNewProduct(product: Product, image: File) {
    const formData = new FormData();
    const productBlob = new Blob([JSON.stringify(product)], {
      type: 'application/json'
    })
    const imageBlob = new Blob([image], { type: image.type })
    formData.append('product', productBlob);
    formData.append('productImage', imageBlob)
    let header = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.securityService.getToken()
    })

    return this.httpClient.post(environment.apiUrl + '/products/admin', formData, { headers: header })
  }

  removeProduct(id: number) {
    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.securityService.getToken()
    })
    return this.httpClient.delete(this.admin_api_url + id, { headers: header })
  }

  updateProduct(id: number, product: Product) {
    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.securityService.getToken()
    })
    return this.httpClient.put(this.admin_api_url + id, product, { headers: header })
  }
}
