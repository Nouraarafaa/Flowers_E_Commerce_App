import { Injectable } from '@angular/core';
import { ProductTableModel } from '../../features/products/interfaces/product-table-model/product-table-model';
import { Adaptor } from '../interfaces/adaptor/adaptor';
import { Product } from '../../features/products/interfaces/Product/product';

@Injectable({
  providedIn: 'root',
})
export class productAdaptorService implements Adaptor {
    productAdapt(products: Product[]): ProductTableModel[] {
        return products.map((product) => ({
        name: product.title,
        price: product.price,
        id: product._id,
        rating: product.rateAvg,
        rateCount: product.rateCount,
        sales: product.sold ?? 0,
        stock: product.quantity > 0 ? product.quantity : 0,
        }));
    }
}
