import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../../environments/environment';

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

  addNewProduct(product: Product, image: any) {
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('productImage', image)
    let header = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    return this.httpClient.post(this.admin_api_url, formData, { headers: header })
  }

  removeProduct(id: number) {
    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this.httpClient.delete(this.admin_api_url + id, { headers: header })
  }

  updateProduct(id: number, product: Product) {
    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this.httpClient.put(this.admin_api_url + id, product, { headers: header })
  }
}
