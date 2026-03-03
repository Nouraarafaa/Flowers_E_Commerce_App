export interface TableColumn {
    field: string;
    header: string;
    type?: 'text' | 'image' | 'tag' | 'boolean' | 'custom';
    filter?: boolean;
}
