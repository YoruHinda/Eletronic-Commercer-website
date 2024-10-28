import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url: string = 'http://172.18.0.3:8080/products/'
  api_url_image: string = 'http://172.18.0.3:8080/products/product_image/'

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api_url);
  }

  getProductImage(imageName: string) {
    return this.httpClient.get(this.api_url_image + imageName, { responseType: 'blob' });
  }
}
