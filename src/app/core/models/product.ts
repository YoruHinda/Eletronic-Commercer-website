export class Product {
    id!: number;
    product_name!: string;
    product_description!: string;
    product_quantity!: number;
    product_price!: number;
    product_image_name!: string;
    constructor(product_name: string, product_description: string, product_quantity: number, product_price: number) {
        this.product_name = product_name
        this.product_description = product_description
        this.product_quantity = product_quantity
        this.product_price = product_price
    }
}