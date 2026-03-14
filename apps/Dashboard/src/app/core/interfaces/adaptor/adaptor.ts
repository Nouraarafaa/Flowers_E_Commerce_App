import { Product } from "../../../features/products/interfaces/get-products/get-products";
import { ProductTableModel } from "../../../features/products/interfaces/product-table-model/product-table-model";


export interface Adaptor {
  productAdapt(products: Product[]): ProductTableModel[];

  

}
