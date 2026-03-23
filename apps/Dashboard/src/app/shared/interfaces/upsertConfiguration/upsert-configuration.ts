export type UpsertMode = 'Add Category' | 'Edit Category' | 'Add Occasion' | 'Edit Occasion';

export interface UpsertConfiguration {
  title: string;
  placeholderName: string;
  imageLabel: string;
  buttonName: string;
  functionType: UpsertMode;
}