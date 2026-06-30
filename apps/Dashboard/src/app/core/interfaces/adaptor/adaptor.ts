import { ProductTableModel } from "../../../features/products/interfaces/product-table-model/product-table-model";
import { Product } from "../../../features/products/interfaces/Product/product";


export interface Adaptor {
  productAdapt(products: Product[]): ProductTableModel[];
}
