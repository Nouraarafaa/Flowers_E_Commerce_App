import { Component, input, output } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableColumn } from '../../../interfaces/tableColumn/table-column';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-dynamic-table',
  imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, ButtonModule, PopoverModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent {

  data = input.required<any[]>();
  columns = input.required<TableColumn[]>();

  edit = output<string>();
  delete = output<string>();

  onEdit(id:string): void {
    this.edit.emit(id);
  }
  onDelete(id:string): void {
    this.delete.emit(id);
  }

}