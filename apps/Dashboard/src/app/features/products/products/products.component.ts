import { Component } from '@angular/core';
import { DynamicTableComponent } from "../../../shared/components/ui/dynamic-table/dynamic-table.component";
import { TableColumn } from '../../../shared/interfaces/tableColumn/table-column';


export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
}

@Component({
  selector: 'app-products',
  imports: [DynamicTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

products = [
  {
    id: 'P1',
    name: 'Red Rose Bouquet',
    price: 350,
    stock: 15,
    sales: 120,
    rating: 4.5
  },
  {
    id: 'P2',
    name: 'Chocolate Box',
    price: 200,
    stock: 5,
    sales: 85,
    rating: 4.2
  },
  {
    id: 'P3',
    name: 'Wedding Decoration',
    price: 2500,
    stock: 2,
    sales: 30,
    rating: 4.8
  }
];


  productsColumns: TableColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'price', header: 'Price', type: 'text' },
    { field: 'stock', header: 'Stock', type: 'text' },
    { field: 'sales', header: 'Sales', type: 'text' },
    { field: 'rating', header: 'Ratings', type: 'text' }
  ];


}
