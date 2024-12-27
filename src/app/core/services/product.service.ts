import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url: string = environment.apiUrl + '/products/'
  api_url_image: string = environment.apiUrl + '/products/product_image/'
  admin_api_url: string = environment.apiUrl + '/admin/'

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api_url);
  }

  getProductImage(imageName: string) {
    return this.httpClient.get(this.api_url_image + imageName, { responseType: 'blob' });
  }

  addNewProduct() {

  }

  removeProduct() {

  }

  updateProduct() {

  }
}
