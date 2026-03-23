export interface TableColumn {
    field: string;
    header: string;
    type?: 'text' | 'actions';
    filter?: boolean;
}
