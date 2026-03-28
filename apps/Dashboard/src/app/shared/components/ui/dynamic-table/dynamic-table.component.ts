import { Component, inject, input, output, computed } from '@angular/core';
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
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dynamic-table',
  imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, ButtonModule, PopoverModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent {

  confirmationService = inject(ConfirmationService);

  data = input.required<any[]>();
  columns = input.required<TableColumn[]>();

  filterFields = computed(() => 
    this.columns()
      .filter(col => col.type === 'text' || !col.type)
      .map(col => col.field)
  );

  edit = output<string>();
  delete = output<string>();

  onEdit(id:string): void {
    this.edit.emit(id);
  }
  onDelete(id:string): void {
    this.delete.emit(id);
  }

  confirmDelete(event: Event, id:string) {
      this.confirmationService.confirm({
          key: 'globalConfirm',
          target: event.target as EventTarget,
          message: 'Are you sure you want to delete this?',
          header: '',
          icon: '',
          rejectLabel: 'Cancel',
          closable: true,
          closeOnEscape: true,
          dismissableMask: true,
          rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true,
          },
          acceptButtonProps: {
              label: 'Confirm',
              severity: 'danger',
          },
          accept: () => {
            this.onDelete(id);
          }
      });
  }

}